import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { patients, labResults, appointments, patientOtp } from "../db/schema";
import { eq, and, gt, asc } from "drizzle-orm";

export async function portalRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { birthDate: string; insuranceNumber: string; phone: string } }>(
    "/api/portal/request-otp",
    async (request, reply) => {
      const { birthDate, insuranceNumber, phone } = request.body;
      if (!birthDate || !insuranceNumber || !phone) {
        return reply.status(400).send({ error: "Alle Felder sind erforderlich" });
      }

      try {
        const result = await db.select().from(patients).where(
          and(
            eq(patients.dateOfBirth, birthDate),
            eq(patients.insuranceNumber, insuranceNumber),
            eq(patients.phone, phone)
          )
        );

        if (result.length === 0) {
          return reply.status(401).send({ error: "Zugangsdaten nicht gefunden" });
        }

        const patient = result[0];
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await db.insert(patientOtp).values({ patientId: patient.id, otpCode: otp, expiresAt });

        await fetch("https://gateway.seven.io/api/sms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.SEVEN_API_KEY ?? "",
          },
          body: JSON.stringify({
            to: patient.phone,
            from: "Urologie",
            text: `Ihr Einmalcode: ${otp}. Gültig 10 Minuten. Nicht weitergeben.`,
          }),
        });

        return reply.send({ success: true, message: "Code gesendet" });
      } catch (error) {
        return reply.status(500).send({ error: "Fehler beim Senden des Codes", details: String(error) });
      }
    }
  );

  fastify.post<{ Body: { birthDate: string; insuranceNumber: string; otp: string } }>(
    "/api/portal/verify-otp",
    async (request, reply) => {
      const { birthDate, insuranceNumber, otp } = request.body;
      if (!birthDate || !insuranceNumber || !otp) {
        return reply.status(400).send({ error: "Alle Felder sind erforderlich" });
      }

      try {
        const patientResult = await db.select().from(patients).where(
          and(
            eq(patients.dateOfBirth, birthDate),
            eq(patients.insuranceNumber, insuranceNumber)
          )
        );

        if (patientResult.length === 0) {
          return reply.status(401).send({ error: "Code ungültig oder abgelaufen" });
        }

        const patient = patientResult[0];

        const otpResult = await db.select().from(patientOtp).where(
          and(
            eq(patientOtp.patientId, patient.id),
            eq(patientOtp.otpCode, otp),
            eq(patientOtp.used, false),
            gt(patientOtp.expiresAt, new Date())
          )
        );

        if (otpResult.length === 0) {
          return reply.status(401).send({ error: "Code ungültig oder abgelaufen" });
        }

        await db.update(patientOtp).set({ used: true }).where(eq(patientOtp.id, otpResult[0].id));

        return reply.send({
          success: true,
          patient: {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.dateOfBirth,
            insurance: patient.insurance,
            insuranceNumber: patient.insuranceNumber,
            phone: patient.phone,
            email: patient.email,
            address: patient.address,
            doctor: patient.doctor,
          },
        });
      } catch (error) {
        return reply.status(500).send({ error: "Datenbankfehler", details: String(error) });
      }
    }
  );

  fastify.get<{ Params: { patientId: string } }>(
    "/api/portal/results/:patientId",
    async (request, reply) => {
      try {
        const result = await db.select({
          id: labResults.id,
          test: labResults.test,
          value: labResults.value,
          unit: labResults.unit,
          status: labResults.status,
          resultDate: labResults.resultDate,
          sent: labResults.sent,
          doctorComment: labResults.doctorComment,
        })
          .from(labResults)
          .where(eq(labResults.patientId, request.params.patientId))
          .orderBy(asc(labResults.resultDate));
        return reply.send(result);
      } catch (error) {
        return reply.status(500).send({ error: "Datenbankfehler", details: String(error) });
      }
    }
  );

  fastify.get<{ Params: { patientId: string } }>(
    "/api/portal/appointments/:patientId",
    async (request, reply) => {
      try {
        const result = await db.select({
          id: appointments.id,
          date: appointments.date,
          time: appointments.time,
          type: appointments.type,
          doctor: appointments.doctor,
          status: appointments.status,
          room: appointments.room,
        })
          .from(appointments)
          .where(eq(appointments.patientId, request.params.patientId))
          .orderBy(asc(appointments.date), asc(appointments.time));
        return reply.send(result);
      } catch (error) {
        return reply.status(500).send({ error: "Datenbankfehler", details: String(error) });
      }
    }
  );
}
