import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { labResults } from "../db/schema";
import { eq } from "drizzle-orm";

export async function labRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { patientId?: string } }>("/api/lab", async (request, reply) => {
    try {
      const { patientId } = request.query;
      const query = db.select().from(labResults).orderBy(labResults.resultDate);
      const result = patientId
        ? await query.where(eq(labResults.patientId, patientId))
        : await query;
      return reply.send(result);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  fastify.post<{ Body: typeof labResults.$inferInsert }>("/api/lab", async (request, reply) => {
    try {
      const result = await db.insert(labResults).values(request.body).returning();
      return reply.status(201).send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  fastify.put<{ Params: { id: string }; Body: { sent: boolean } }>("/api/lab/:id/sent", async (request, reply) => {
    try {
      const result = await db.update(labResults)
        .set({ sent: request.body.sent })
        .where(eq(labResults.id, request.params.id))
        .returning();
      return reply.send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  fastify.put<{ Params: { id: string }; Body: { comment: string } }>("/api/lab/:id/comment", async (request, reply) => {
    try {
      const result = await db.update(labResults)
        .set({ doctorComment: request.body.comment })
        .where(eq(labResults.id, request.params.id))
        .returning();
      return reply.send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });
}
