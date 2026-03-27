import { FastifyInstance } from "fastify";
import { appointmentReminderWorkflow } from "../workflows/appointment_reminder";
import { noshowLogWorkflow } from "../workflows/noshow_log";
import { labNotifyWorkflow } from "../workflows/lab_notify";
import { psaRecallWorkflow } from "../workflows/psa_recall";
import { vasektomieCheckWorkflow } from "../workflows/vasektomie_check";

type WorkflowHandler = () => Promise<unknown>;

const workflows: Record<string, WorkflowHandler> = {
  appointment_reminder: appointmentReminderWorkflow,
  noshow_log: noshowLogWorkflow,
  lab_notify: labNotifyWorkflow,
  psa_recall: psaRecallWorkflow,
  vasektomie_check: vasektomieCheckWorkflow,
};

interface TriggerBody {
  workflow: string;
  payload: Record<string, unknown>;
}

export async function n8nRoutes(fastify: FastifyInstance) {
  // GET /api/n8n/status
  fastify.get("/api/n8n/status", async () => ({
    status: "ok",
    service: "Urologie Neuwied Automation",
    timestamp: new Date().toISOString(),
  }));

  // POST /api/n8n/trigger
  fastify.post<{ Body: TriggerBody }>("/api/n8n/trigger", async (request, reply) => {
    const secret = request.headers["x-webhook-secret"];
    if (!secret || secret !== process.env.N8N_WEBHOOK_SECRET) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const { workflow } = request.body;
    const handler = workflows[workflow];

    if (!handler) {
      return reply.status(400).send({
        error: "Unknown workflow",
        available: Object.keys(workflows),
      });
    }

    try {
      const result = await handler();
      return reply.send({ success: true, workflow, result });
    } catch (error) {
      fastify.log.error({ workflow, error }, "n8n workflow failed");
      return reply.status(500).send({ error: "Workflow execution failed", details: String(error) });
    }
  });
}
