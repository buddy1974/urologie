import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { staff } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function authRoutes(fastify: FastifyInstance) {

  // POST /api/auth/login
  fastify.post<{ Body: { email: string; password: string } }>(
    "/api/auth/login",
    async (request, reply) => {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply.status(400).send({ error: "Email and password required" });
      }

      const [member] = await db
        .select()
        .from(staff)
        .where(eq(staff.email, email.toLowerCase().trim()));

      if (!member || !member.active) {
        // Same error for both "not found" and "inactive" — don't leak which
        return reply.status(401).send({ error: "E-Mail oder Passwort ist falsch." });
      }

      const valid = await bcrypt.compare(password, member.passwordHash);
      if (!valid) {
        return reply.status(401).send({ error: "E-Mail oder Passwort ist falsch." });
      }

      const token = fastify.jwt.sign(
        { staffId: member.id, role: member.role },
        { expiresIn: "8h" }
      );

      return reply.send({
        token,
        user: {
          id: member.id,
          name: member.name,
          email: member.email,
          role: member.role,
        },
      });
    }
  );

  // POST /api/auth/change-password — authenticated, requires current password
  fastify.post<{ Body: { currentPassword: string; newPassword: string } }>(
    "/api/auth/change-password",
    { preHandler: [fastify.requireStaff] },
    async (request, reply) => {
      const payload = request.user as { staffId: string; role: string };
      const { currentPassword, newPassword } = request.body;

      if (!currentPassword || !newPassword) {
        return reply.status(400).send({ error: "Both fields required" });
      }
      if (newPassword.length < 12) {
        return reply.status(400).send({ error: "Password must be at least 12 characters" });
      }

      const [member] = await db
        .select()
        .from(staff)
        .where(eq(staff.id, payload.staffId));

      if (!member) return reply.status(404).send({ error: "User not found" });

      const valid = await bcrypt.compare(currentPassword, member.passwordHash);
      if (!valid) return reply.status(401).send({ error: "Current password incorrect" });

      const passwordHash = await bcrypt.hash(newPassword, 12);
      await db
        .update(staff)
        .set({ passwordHash, updatedAt: new Date() })
        .where(eq(staff.id, payload.staffId));

      return reply.send({ success: true });
    }
  );

  // POST /api/auth/me  — validate a token and return current user
  fastify.post(
    "/api/auth/me",
    { preHandler: [fastify.requireStaff] },
    async (request, reply) => {
      const payload = request.user as { staffId: string; role: string };

      const [member] = await db
        .select({ id: staff.id, name: staff.name, email: staff.email, role: staff.role })
        .from(staff)
        .where(eq(staff.id, payload.staffId));

      if (!member) {
        return reply.status(401).send({ error: "User not found" });
      }

      return reply.send({ user: member });
    }
  );
}
