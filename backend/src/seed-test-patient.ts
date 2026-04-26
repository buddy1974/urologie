import dotenv from "dotenv";
dotenv.config();

import { db } from "./db";
import { patients, labResults, appointments } from "./db/schema";
import { eq } from "drizzle-orm";

async function seedTestPatient() {
  // Step 1 — Remove existing test patient to avoid duplicates
  const [existing] = await db
    .select()
    .from(patients)
    .where(eq(patients.insuranceNumber, "TK987654321"));

  if (existing) {
    await db.delete(labResults).where(eq(labResults.patientId, existing.id));
    await db.delete(appointments).where(eq(appointments.patientId, existing.id));
    await db.delete(patients).where(eq(patients.id, existing.id));
    console.log("🗑  Existing test patient removed.");
  }

  // Step 2 — Insert patient
  const [patient] = await db
    .insert(patients)
    .values({
      firstName: "Thomas",
      lastName: "Müller",
      dateOfBirth: "1975-03-22",
      phone: "+4915112345678",
      insuranceNumber: "TK987654321",
      insurance: "GKV",
      email: "thomas.mueller.test@example.de",
      address: "Teststraße 1, 56564 Neuwied",
      notes: "Testpatient PSA-Kontrolle",
    })
    .returning();

  const pid = patient.id;
  const today = new Date().toISOString().split("T")[0];

  const addDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  // Step 3 — Lab results
  await db.insert(labResults).values([
    {
      patientId: pid,
      patientName: "Thomas Müller",
      test: "PSA-Wert",
      value: "4.8",
      unit: "ng/ml",
      status: "high",
      sent: false,
      doctorComment: "Leicht erhöht — bitte in 3 Monaten kontrollieren",
      resultDate: today,
    },
    {
      patientId: pid,
      patientName: "Thomas Müller",
      test: "Kreatinin",
      value: "0.9",
      unit: "mg/dl",
      status: "normal",
      sent: false,
      doctorComment: "Nierenwerte im Normbereich",
      resultDate: today,
    },
    {
      patientId: pid,
      patientName: "Thomas Müller",
      test: "Leukozyten",
      value: "11.2",
      unit: "G/l",
      status: "critical",
      sent: false,
      doctorComment: "Bitte kommen Sie zeitnah zur Besprechung",
      resultDate: today,
    },
  ]);

  // Step 4 — Appointments
  await db.insert(appointments).values([
    {
      patientId: pid,
      patientName: "Thomas Müller",
      date: addDays(7),
      time: "09:00",
      type: "PSA-Kontrolle",
      status: "scheduled",
      duration: 30,
      doctor: "Dr. Walters T. Fomuki",
    },
    {
      patientId: pid,
      patientName: "Thomas Müller",
      date: addDays(90),
      time: "10:30",
      type: "Nachsorge Urologie",
      status: "scheduled",
      duration: 30,
      doctor: "Dr. Walters T. Fomuki",
    },
  ]);

  // Step 5 — Print instructions
  console.log("✅ Testpatient Thomas Müller angelegt");
  console.log("Portal-Login: Geburtsdatum 22.03.1975 + Versicherungsnummer TK987654321 + Telefon +4915112345678");
  console.log("Oder: Dr. Fomuki trägt seine eigene Nummer ein wenn er den SMS-Code auf seinem Handy empfangen möchte");

  process.exit(0);
}

seedTestPatient().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
