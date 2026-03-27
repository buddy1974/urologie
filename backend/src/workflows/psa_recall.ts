import { db } from "../db/index";
import { patients } from "../db/schema";
import { ilike } from "drizzle-orm";

export async function psaRecallWorkflow() {
  const rows = await db
    .select({
      id: patients.id,
      vorname: patients.firstName,
      nachname: patients.lastName,
    })
    .from(patients)
    .where(ilike(patients.notes, "%PSA%"));

  return { count: rows.length, patients: rows };
}
