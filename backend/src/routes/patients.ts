import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { patients } from "../db/schema";
import { eq, and, ilike } from "drizzle-orm";

export async function patientsRoutes(fastify: FastifyInstance) {
  // GET all patients
  fastify.get("/api/patients", async (request, reply) => {
    try {
      const result = await db.select().from(patients).orderBy(patients.lastName);
      return reply.send(result);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  // GET single patient
  fastify.get<{ Params: { id: string } }>("/api/patients/:id", async (request, reply) => {
    try {
      const result = await db.select().from(patients).where(eq(patients.id, request.params.id));
      if (result.length === 0) return reply.status(404).send({ error: "Patient not found" });
      return reply.send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  // POST create patient
  fastify.post<{ Body: typeof patients.$inferInsert }>("/api/patients", async (request, reply) => {
    try {
      const result = await db.insert(patients).values(request.body).returning();
      return reply.status(201).send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });

  // POST login (Patientenportal)
  fastify.post<{ Body: { birthDate: string; insuranceNumber: string } }>(
    "/api/patients/login",
    async (request, reply) => {
      const { birthDate, insuranceNumber } = request.body;
      if (!birthDate || !insuranceNumber) {
        return reply.status(400).send({ error: "birthDate and insuranceNumber required" });
      }

      try {
        const result = await db
          .select()
          .from(patients)
          .where(
            and(
              eq(patients.dateOfBirth, birthDate),
              ilike(patients.notes, `%Vers.Nr.: ${insuranceNumber}%`)
            )
          );

        if (result.length === 0) {
          return reply.status(401).send({ error: "Patient nicht gefunden" });
        }

        const patient = result[0];
        return reply.send({
          success: true,
          patient: {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.dateOfBirth,
            insurance: patient.insurance,
            phone: patient.phone,
            email: patient.email,
            address: patient.address,
            conditions: patient.conditions,
            doctor: patient.doctor,
          },
        });
      } catch (error) {
        return reply.status(500).send({ error: "Database error", details: String(error) });
      }
    }
  );

  // PUT update patient
  fastify.put<{ Params: { id: string }; Body: Partial<typeof patients.$inferInsert> }>("/api/patients/:id", async (request, reply) => {
    try {
      const result = await db.update(patients)
        .set({ ...request.body, updatedAt: new Date() })
        .where(eq(patients.id, request.params.id))
        .returning();
      if (result.length === 0) return reply.status(404).send({ error: "Patient not found" });
      return reply.send(result[0]);
    } catch (error) {
      return reply.status(500).send({ error: "Database error", details: String(error) });
    }
  });
}
