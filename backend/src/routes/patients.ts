import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { patients } from "../db/schema";
import { eq } from "drizzle-orm";

export async function patientsRoutes(fastify: FastifyInstance) {
  // GET all patients
  fastify.get("/api/patients", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.select().from(patients).orderBy(patients.lastName);
      return reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // GET single patient
  fastify.get<{ Params: { id: string } }>("/api/patients/:id", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.select().from(patients).where(eq(patients.id, request.params.id));
      if (result.length === 0) return reply.status(404).send({ error: "Patient not found" });
      return reply.send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // POST create patient
  fastify.post<{ Body: typeof patients.$inferInsert }>("/api/patients", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.insert(patients).values(request.body).returning();
      return reply.status(201).send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // POST /api/patients/login — removed (insecure legacy auth)
  // Patient portal login now uses OTP flow via /api/portal/
  fastify.post("/api/patients/login", async (_request, reply) => {
    return reply.status(410).send({
      error: "This endpoint has been removed. Please use the OTP patient portal.",
    });
  });

  // PUT update patient
  fastify.put<{ Params: { id: string }; Body: Partial<typeof patients.$inferInsert> }>("/api/patients/:id", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.update(patients)
        .set({ ...request.body, updatedAt: new Date() })
        .where(eq(patients.id, request.params.id))
        .returning();
      if (result.length === 0) return reply.status(404).send({ error: "Patient not found" });
      return reply.send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });
}
