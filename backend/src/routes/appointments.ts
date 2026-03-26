import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { appointments } from "../db/schema";
import { eq } from "drizzle-orm";

export async function appointmentsRoutes(fastify: FastifyInstance) {
  // GET appointments (optionally filter by date)
  fastify.get<{ Querystring: { date?: string } }>("/api/appointments", async (request, reply) => {
    try {
      const result = await db.select().from(appointments).orderBy(appointments.time);
      return reply.send(result);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  // POST create appointment
  fastify.post<{ Body: typeof appointments.$inferInsert }>("/api/appointments", async (request, reply) => {
    try {
      const result = await db.insert(appointments).values(request.body).returning();
      return reply.status(201).send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  // PUT update appointment status
  fastify.put<{ Params: { id: string }; Body: Partial<typeof appointments.$inferInsert> }>("/api/appointments/:id", async (request, reply) => {
    try {
      const result = await db.update(appointments)
        .set({ ...request.body, updatedAt: new Date() })
        .where(eq(appointments.id, request.params.id))
        .returning();
      if (result.length === 0) return reply.status(404).send({ error: "Appointment not found" });
      return reply.send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  // DELETE appointment
  fastify.delete<{ Params: { id: string } }>("/api/appointments/:id", async (request, reply) => {
    try {
      await db.delete(appointments).where(eq(appointments.id, request.params.id));
      return reply.send({ success: true });
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });
}
