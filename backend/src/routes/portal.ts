import { FastifyInstance } from "fastify";
import { db } from "../db/index";
import { patients, labResults, appointments, patientOtp } from "../db/schema";
import { eq, and, gt, asc } from "drizzle-orm";

export async function portalRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { birthDate: string; insuranceNumber: string; phone: string } }>(
    "/api/portal/request-otp",
    {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: "10 minutes",
          errorResponseBuilder: () => ({
            error: "Zu viele Versuche. Bitte warten Sie 10 Minuten.",
          }),
        },
      },
    },
    async (request, reply) => {
      if (!process.env.SEVEN_API_KEY) {
        return reply.status(503).send({ error: "SMS-Dienst nicht konfiguriert" });
      }

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

        const smsResponse = await fetch("https://gateway.seven.io/api/sms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.SEVEN_API_KEY,
          },
          body: JSON.stringify({
            to: patient.phone,
            from: "Urologie",
            text: `Ihr Einmalcode: ${otp}. Gültig 10 Minuten. Nicht weitergeben.`,
          }),
        });

        if (!smsResponse.ok) {
          return reply.status(500).send({ error: "SMS konnte nicht gesendet werden" });
        }

        return reply.send({ success: true, message: "Code gesendet" });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
  );

  fastify.post<{ Body: { birthDate: string; insuranceNumber: string; otp: string } }>(
    "/api/portal/verify-otp",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "10 minutes",
          errorResponseBuilder: () => ({
            error: "Zu viele Versuche. Bitte warten Sie 10 Minuten.",
          }),
        },
      },
    },
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

        const token = fastify.jwt.sign(
          { patientId: patient.id },
          { expiresIn: "1h" }
        );

        return reply.send({
          success: true,
          token,
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
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
  );

  fastify.get(
    "/api/portal/results",
    { preHandler: [fastify.requirePatient] },
    async (request, reply) => {
      try {
        const { patientId } = request.user as { patientId: string };
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
          .where(and(eq(labResults.patientId, patientId), eq(labResults.freigabeStatus, "freigegeben")))
          .orderBy(asc(labResults.resultDate));
        return reply.send(result);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
  );

  fastify.get(
    "/api/portal/appointments",
    { preHandler: [fastify.requirePatient] },
    async (request, reply) => {
      try {
        const { patientId } = request.user as { patientId: string };
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
          .where(eq(appointments.patientId, patientId))
          .orderBy(asc(appointments.date), asc(appointments.time));
        return reply.send(result);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
}
