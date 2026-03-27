import { db } from "../db/index";
import { appointments } from "../db/schema";
import { and, ilike, lte } from "drizzle-orm";

export async function vasektomieCheckWorkflow() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  const cutoffStr = cutoff.toISOString().split("T")[0];

  const rows = await db
    .select({
      patientId: appointments.patientId,
      date: appointments.date,
    })
    .from(appointments)
    .where(
      and(
        ilike(appointments.type, "%vasektomie%"),
        lte(appointments.date, cutoffStr)
      )
    );

  return { count: rows.length, due: rows };
}
