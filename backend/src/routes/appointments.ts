import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { appointments } from "../db/schema";
import { eq } from "drizzle-orm";

export async function appointmentsRoutes(fastify: FastifyInstance) {
  // GET appointments — optional ?patientId filter
  fastify.get<{ Querystring: { date?: string; patientId?: string } }>("/api/appointments", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const { patientId } = request.query;
      const query = db.select().from(appointments).orderBy(appointments.date, appointments.time);
      const result = patientId
        ? await query.where(eq(appointments.patientId, patientId))
        : await query;
      return reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // POST create appointment
  fastify.post<{ Body: typeof appointments.$inferInsert }>("/api/appointments", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.insert(appointments).values(request.body).returning();
      return reply.status(201).send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // PUT update appointment status
  fastify.put<{ Params: { id: string }; Body: Partial<typeof appointments.$inferInsert> }>("/api/appointments/:id", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.update(appointments)
        .set({ ...request.body, updatedAt: new Date() })
        .where(eq(appointments.id, request.params.id))
        .returning();
      if (result.length === 0) return reply.status(404).send({ error: "Appointment not found" });
      return reply.send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // DELETE appointment
  fastify.delete<{ Params: { id: string } }>("/api/appointments/:id", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      await db.delete(appointments).where(eq(appointments.id, request.params.id));
      return reply.send({ success: true });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });
}
