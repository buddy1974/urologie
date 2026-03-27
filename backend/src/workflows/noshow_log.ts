import { db } from "../db/index";
import { appointments, auditLog } from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function noshowLogWorkflow() {
  const today = new Date().toISOString().split("T")[0];

  const rows = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        eq(appointments.date, today),
        eq(appointments.status, "scheduled")
      )
    );

  const ids = rows.map((r) => r.id);

  if (ids.length > 0) {
    await db
      .update(appointments)
      .set({ status: "no-show", updatedAt: new Date() })
      .where(inArray(appointments.id, ids));

    await db.insert(auditLog).values(
      ids.map((id) => ({
        action: "noshow_logged",
        resource: "noshow_log",
        resourceId: id,
      }))
    );
  }

  return { count: ids.length, updated: ids };
}
