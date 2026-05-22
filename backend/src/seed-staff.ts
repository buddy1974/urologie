import { db } from "./db/index";
import { staff } from "./db/schema";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 12;

const members = [
  {
    email: "dr.fomuki@urologie-neuwied.de",
    password: "ChangeMe_Fomuki_2026!",
    name: "Dr. Walters T. Fomuki",
    role: "inhaber",
  },
  {
    email: "theismann@urologie-neuwied.de",
    password: "ChangeMe_Theismann_2026!",
    name: "Bettina Theismann",
    role: "mfa",
  },
  {
    email: "jakoby@urologie-neuwied.de",
    password: "ChangeMe_Jakoby_2026!",
    name: "Frau Jakoby",
    role: "buero",
  },
];

async function seed() {
  console.log("Seeding staff accounts...");

  for (const member of members) {
    const passwordHash = await bcrypt.hash(member.password, SALT_ROUNDS);

    await db
      .insert(staff)
      .values({
        email: member.email,
        passwordHash,
        name: member.name,
        role: member.role,
        active: true,
      })
      .onConflictDoNothing();   // safe to re-run

    console.log(`  ✓ ${member.name} (${member.role})`);
  }

  console.log("\nDone. Passwords are temporary — change them after first login.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
