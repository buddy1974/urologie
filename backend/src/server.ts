import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { patientsRoutes } from "./routes/patients";
import { appointmentsRoutes } from "./routes/appointments";
import { labRoutes } from "./routes/lab";
import { n8nRoutes } from "./routes/n8n";
import { portalRoutes } from "./routes/portal";

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
      "http://localhost:3001",
      "http://localhost:5173",
      "https://urologie-six.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  await fastify.register(patientsRoutes);
  await fastify.register(appointmentsRoutes);
  await fastify.register(labRoutes);
  await fastify.register(n8nRoutes);
  await fastify.register(portalRoutes);

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
