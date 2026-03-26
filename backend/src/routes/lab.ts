import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { labResults } from "../db/schema";
import { eq } from "drizzle-orm";

export async function labRoutes(fastify: FastifyInstance) {
  fastify.get("/api/lab", async (request, reply) => {
    try {
      const result = await db.select().from(labResults).orderBy(labResults.createdAt);
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
}
