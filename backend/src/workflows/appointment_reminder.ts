import { db } from "../db/index";
import { appointments, auditLog } from "../db/schema";
import { and, eq, ne } from "drizzle-orm";

export async function appointmentReminderWorkflow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const rows = await db
    .select({
      id: appointments.id,
      patientId: appointments.patientId,
      date: appointments.date,
      time: appointments.time,
      type: appointments.type,
    })
    .from(appointments)
    .where(
      and(
        eq(appointments.date, tomorrowStr),
        ne(appointments.status, "cancelled")
      )
    );

  const result = { count: rows.length, appointments: rows };

  await db.insert(auditLog).values({
    action: "n8n_trigger",
    resource: "appointment_reminder",
    resourceId: `date:${tomorrowStr}`,
  });

  return result;
}
