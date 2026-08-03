import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { labResults, auditLog } from "../db/schema";
import { eq } from "drizzle-orm";

export async function labRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { patientId?: string } }>("/api/lab", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const { patientId } = request.query;
      const query = db.select().from(labResults).orderBy(labResults.resultDate);
      const result = patientId
        ? await query.where(eq(labResults.patientId, patientId))
        : await query;
      return reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  fastify.post<{ Body: typeof labResults.$inferInsert }>("/api/lab", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.insert(labResults).values(request.body).returning();
      return reply.status(201).send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  fastify.put<{ Params: { id: string }; Body: { sent: boolean } }>("/api/lab/:id/sent", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.update(labResults)
        .set({ sent: request.body.sent })
        .where(eq(labResults.id, request.params.id))
        .returning();
      return reply.send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  fastify.put<{ Params: { id: string }; Body: { comment: string } }>("/api/lab/:id/comment", { preHandler: [fastify.requireStaff] }, async (request, reply) => {
    try {
      const result = await db.update(labResults)
        .set({ doctorComment: request.body.comment })
        .where(eq(labResults.id, request.params.id))
        .returning();
      return reply.send(result[0]);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  // Befund-Freigabe: release or revoke a lab result's visibility in the patient portal.
  // Restricted to inhaber/arzt at the route level (not just hidden in the UI).
  fastify.put<{ Params: { id: string }; Body: { status: "freigegeben" | "gesperrt"; freigegebenVon: string } }>(
    "/api/lab/:id/freigabe",
    { preHandler: [fastify.requireFreigabeRole] },
    async (request, reply) => {
      try {
        const { status, freigegebenVon } = request.body;
        if (status !== "freigegeben" && status !== "gesperrt") {
          return reply.status(400).send({ error: "Ungültiger Status" });
        }
        if (!freigegebenVon) {
          return reply.status(400).send({ error: "freigegebenVon ist erforderlich" });
        }

        const result = await db.update(labResults)
          .set({ freigabeStatus: status, freigegebenVon, freigegebenAm: new Date() })
          .where(eq(labResults.id, request.params.id))
          .returning();

        if (result.length === 0) {
          return reply.status(404).send({ error: "Befund nicht gefunden" });
        }

        const payload = request.user as { staffId: string };
        await db.insert(auditLog).values({
          userId: payload.staffId,
          userName: freigegebenVon,
          action: "befund_freigabe",
          resource: "lab_result",
          resourceId: request.params.id,
          ipAddress: request.headers["x-forwarded-for"]?.toString() ?? request.ip,
        });

        return reply.send(result[0]);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
}
