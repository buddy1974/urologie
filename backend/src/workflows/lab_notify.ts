import { db } from "../db/index";
import { labResults } from "../db/schema";
import { eq } from "drizzle-orm";

export async function labNotifyWorkflow() {
  const rows = await db
    .select({
      id: labResults.id,
      patient: labResults.patientName,
      test: labResults.test,
      status: labResults.status,
    })
    .from(labResults)
    .where(eq(labResults.sent, false));

  const criticalCount = rows.filter((r) => r.status === "critical").length;

  const results = rows.map((r) => ({
    ...r,
    urgency: r.status === "critical",
  }));

  return { count: rows.length, critical: criticalCount, results };
}
