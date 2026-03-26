import { db } from "./db/index";
import { patients, appointments, labResults } from "./db/schema";

async function seed() {
  console.log("🌱 Seeding Urologie Neuwied database...");

  // Clear existing data
  await db.delete(labResults);
  await db.delete(appointments);
  await db.delete(patients);

  // Seed patients
  const insertedPatients = await db.insert(patients).values([
    { firstName:"Hans",     lastName:"Müller",         dateOfBirth:"1958-03-15", insurance:"GKV", phone:"0172-1234567", email:"h.mueller@email.de",   conditions:["BPH","PSA erhöht"],             doctor:"Dr. Fomuki" },
    { firstName:"Klaus",    lastName:"Weber",          dateOfBirth:"1952-07-22", insurance:"PKV", phone:"0163-2345678",                               conditions:["Prostatakarzinom Nachsorge"],    doctor:"Dr. Fomuki" },
    { firstName:"Thomas",   lastName:"Schmidt",        dateOfBirth:"1975-11-08", insurance:"GKV", phone:"0151-3456789",                               conditions:["Vasektomie geplant"],           doctor:"Dr. Fomuki" },
    { firstName:"Mehmet",   lastName:"Yilmaz",         dateOfBirth:"1968-05-03", insurance:"GKV", phone:"0176-4567890",                               conditions:["Harnwegsinfekt","Diabetes"],    doctor:"Dr. Nwankwo" },
    { firstName:"Peter",    lastName:"Hoffmann",       dateOfBirth:"1955-09-19", insurance:"PKV", phone:"0170-5678901",                               conditions:["UroLift post-OP"],              doctor:"Dr. Fomuki" },
    { firstName:"Andreas",  lastName:"Klein",          dateOfBirth:"1971-02-14", insurance:"GKV", phone:"0152-6789012",                               conditions:["Harnsteine"],                   doctor:"Dr. Nwankwo" },
    { firstName:"Stefan",   lastName:"Wagner",         dateOfBirth:"1983-06-30", insurance:"Selbstzahler", phone:"0178-7890123",                      conditions:["Erektionsstörung","Andrologie"],doctor:"Dr. Fomuki" },
    { firstName:"Jürgen",   lastName:"Fischer",        dateOfBirth:"1949-12-11", insurance:"PKV", phone:"0172-9012345",                               conditions:["Blasenkarzinom Nachsorge"],     doctor:"Dr. Fomuki" },
    { firstName:"Dimitri",  lastName:"Papadopoulos",   dateOfBirth:"1961-08-25", insurance:"GKV", phone:"0151-1234560",                               conditions:["PSA 6.2 — Biopsie"],            doctor:"Dr. Fomuki" },
    { firstName:"Robert",   lastName:"Zimmermann",     dateOfBirth:"1978-04-07", insurance:"PKV", phone:"0176-2345601",                               conditions:["Inkontinenz","Magnetstimulation"],doctor:"Dr. Nwankwo" },
    { firstName:"Frank",    lastName:"Becker",         dateOfBirth:"1965-10-18", insurance:"GKV", phone:"0164-8901234",                               conditions:["Vorsorge","PSA normal"],        doctor:"Dr. Nwankwo" },
    { firstName:"Martin",   lastName:"Schulz",         dateOfBirth:"1970-01-29", insurance:"GKV", phone:"0163-0123456",                               conditions:["Kontrolltermin"],               doctor:"Dr. Fomuki" },
  ]).returning();

  console.log(`✅ Inserted ${insertedPatients.length} patients`);

  const today = new Date().toISOString().split("T")[0];

  // Seed appointments
  const insertedAppts = await db.insert(appointments).values([
    { patientName:"Hans Müller",           date:today, time:"08:00", duration:30, type:"Erstvorstellung",     doctor:"Dr. Fomuki",  status:"done",        insurance:"GKV", room:"1", phone:"0172-1234567" },
    { patientName:"Klaus Weber",           date:today, time:"08:30", duration:15, type:"PSA-Kontrolle",       doctor:"Dr. Fomuki",  status:"done",        insurance:"PKV", room:"1", phone:"0163-2345678" },
    { patientName:"Thomas Schmidt",        date:today, time:"09:00", duration:30, type:"Vasektomie-Beratung", doctor:"Dr. Fomuki",  status:"in-progress", insurance:"GKV", room:"2", phone:"0151-3456789" },
    { patientName:"Mehmet Yilmaz",         date:today, time:"09:30", duration:20, type:"Kontrolltermin",      doctor:"Dr. Nwankwo", status:"arrived",     insurance:"GKV", room:"3", phone:"0176-4567890" },
    { patientName:"Peter Hoffmann",        date:today, time:"10:00", duration:30, type:"UroLift Nachsorge",   doctor:"Dr. Fomuki",  status:"scheduled",   insurance:"PKV", phone:"0170-5678901" },
    { patientName:"Andreas Klein",         date:today, time:"10:30", duration:15, type:"Laborergebnis",       doctor:"Dr. Nwankwo", status:"scheduled",   insurance:"GKV", phone:"0152-6789012" },
    { patientName:"Stefan Wagner",         date:today, time:"11:00", duration:30, type:"Andrologie",          doctor:"Dr. Fomuki",  status:"scheduled",   insurance:"Selbstzahler", phone:"0178-7890123" },
    { patientName:"Frank Becker",          date:today, time:"11:30", duration:20, type:"Vorsorge Mann",       doctor:"Dr. Nwankwo", status:"scheduled",   insurance:"GKV", phone:"0164-8901234" },
    { patientName:"Jürgen Fischer",        date:today, time:"14:00", duration:30, type:"Zystoskopie",         doctor:"Dr. Fomuki",  status:"scheduled",   insurance:"PKV", phone:"0172-9012345" },
    { patientName:"Martin Schulz",         date:today, time:"14:30", duration:15, type:"Kontrolltermin",      doctor:"Dr. Fomuki",  status:"no-show",     insurance:"GKV", phone:"0163-0123456" },
    { patientName:"Dimitri Papadopoulos",  date:today, time:"15:00", duration:30, type:"Prostatabiopsie",     doctor:"Dr. Fomuki",  status:"scheduled",   insurance:"GKV", phone:"0151-1234560" },
    { patientName:"Robert Zimmermann",     date:today, time:"15:30", duration:20, type:"Magnetstimulation",   doctor:"Dr. Nwankwo", status:"scheduled",   insurance:"PKV", phone:"0176-2345601" },
  ]).returning();

  console.log(`✅ Inserted ${insertedAppts.length} appointments`);

  // Seed lab results
  const insertedLab = await db.insert(labResults).values([
    { patientName:"Müller, Hans",           test:"PSA",            value:"5.8",           unit:"ng/ml",   refMin:"0", refMax:"4", status:"high",     doctor:"Dr. Fomuki",  resultDate:today, sent:false },
    { patientName:"Weber, Klaus",           test:"PSA",            value:"0.12",          unit:"ng/ml",   refMin:"0", refMax:"4", status:"normal",   doctor:"Dr. Fomuki",  resultDate:today, sent:true  },
    { patientName:"Papadopoulos, Dimitri",  test:"PSA",            value:"6.2",           unit:"ng/ml",   refMin:"0", refMax:"4", status:"critical", doctor:"Dr. Fomuki",  resultDate:today, sent:false },
    { patientName:"Fischer, Jürgen",        test:"Kreatinin",      value:"1.1",           unit:"mg/dl",   refMin:"0.7", refMax:"1.2", status:"normal", doctor:"Dr. Fomuki", resultDate:today, sent:true },
    { patientName:"Yilmaz, Mehmet",         test:"Leukozyten Urin",value:"+++",           unit:"",        refMin:"0", refMax:"0", status:"high",     doctor:"Dr. Nwankwo", resultDate:today, sent:false },
    { patientName:"Wagner, Stefan",         test:"Testosteron",    value:"2.1",           unit:"ng/ml",   refMin:"2.8", refMax:"8.0", status:"low",  doctor:"Dr. Fomuki",  resultDate:today, sent:false },
    { patientName:"Schmidt, Thomas",        test:"Spermiogramm",   value:"18 Mio/ml",     unit:"",        refMin:"0", refMax:"0", status:"normal",   doctor:"Dr. Fomuki",  resultDate:today, sent:true  },
    { patientName:"Klein, Andreas",         test:"Urinkultur",     value:"E.coli >100.000",unit:"KBE/ml", refMin:"0", refMax:"0", status:"critical", doctor:"Dr. Nwankwo", resultDate:today, sent:false },
  ]).returning();

  console.log(`✅ Inserted ${insertedLab.length} lab results`);
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
