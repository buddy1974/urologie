import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { authRoutes } from "./routes/auth";
import { patientsRoutes } from "./routes/patients";
import { appointmentsRoutes } from "./routes/appointments";
import { labRoutes } from "./routes/lab";
import { n8nRoutes } from "./routes/n8n";
import { portalRoutes } from "./routes/portal";
import { cmsRoutes } from "./routes/cms";

dotenv.config();

const fastify = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
});

async function main() {
  await fastify.register(cors, {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://urologie-neuwied.de",
      "https://www.urologie-neuwied.de",
      "https://urologie-six.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  await fastify.register(import("@fastify/rate-limit"), {
    global: false,
    redis: undefined,
  });

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required — refusing to start");
  }

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  });

  // Staff-only routes (dashboard/PraxisOS). A patient portal token has no
  // staffId in its payload and must not pass — jwtVerify() alone only checks
  // the signature, not who the token belongs to.
  fastify.decorate("requireStaff", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    const payload = request.user as { staffId?: string; role?: string };
    if (!payload.staffId) {
      return reply.status(403).send({ error: "Forbidden" });
    }
  });

  // Befund-Freigabe: only inhaber/arzt may release or revoke lab results.
  // MFA and Büro can still read status via requireStaff-protected GET routes.
  fastify.decorate("requireFreigabeRole", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    const payload = request.user as { staffId?: string; role?: string };
    if (!payload.staffId || !["inhaber", "arzt"].includes(payload.role ?? "")) {
      return reply.status(403).send({ error: "Forbidden" });
    }
  });

  // Patient portal routes. A staff token has no patientId and must not pass.
  fastify.decorate("requirePatient", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    const payload = request.user as { patientId?: string };
    if (!payload.patientId) {
      return reply.status(403).send({ error: "Forbidden" });
    }
  });

  // Multipart support for file uploads
  await fastify.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  });

  // Static file serving for uploaded media
  const uploadsDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  await fastify.register(fastifyStatic, {
    root: uploadsDir,
    prefix: "/uploads/",
  });

  await fastify.register(authRoutes);
  await fastify.register(patientsRoutes);
  await fastify.register(appointmentsRoutes);
  await fastify.register(labRoutes);
  await fastify.register(n8nRoutes);
  await fastify.register(portalRoutes);
  await fastify.register(cmsRoutes);

  fastify.get("/health", async () => ({
    status: "ok",
    service: "Urologie Neuwied API",
    timestamp: new Date().toISOString(),
  }));

  const port = parseInt(process.env.PORT ?? "3002");

  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🏥 Urologie API running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
