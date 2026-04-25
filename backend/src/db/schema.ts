import { pgTable, text, timestamp, varchar, date, boolean, integer, serial, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const patients = pgTable("patients", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  dateOfBirth: date("date_of_birth"),
  insurance: varchar("insurance", { length: 20 }).notNull().default("GKV"),
  insuranceNumber: varchar("insurance_number", { length: 50 }),
  phone: varchar("phone", { length: 30 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  conditions: text("conditions").array(),
  doctor: varchar("doctor", { length: 100 }),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: text("patient_id").references(() => patients.id),
  patientName: varchar("patient_name", { length: 200 }).notNull(),
  date: date("date").notNull(),
  time: varchar("time", { length: 10 }).notNull(),
  duration: integer("duration").notNull().default(20),
  type: varchar("type", { length: 100 }).notNull(),
  doctor: varchar("doctor", { length: 100 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("scheduled"),
  insurance: varchar("insurance", { length: 20 }).default("GKV"),
  room: varchar("room", { length: 10 }),
  phone: varchar("phone", { length: 30 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const labResults = pgTable("lab_results", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: text("patient_id").references(() => patients.id),
  patientName: varchar("patient_name", { length: 200 }).notNull(),
  test: varchar("test", { length: 100 }).notNull(),
  value: varchar("value", { length: 50 }).notNull(),
  unit: varchar("unit", { length: 30 }),
  refMin: varchar("ref_min", { length: 20 }),
  refMax: varchar("ref_max", { length: 20 }),
  status: varchar("status", { length: 20 }).notNull().default("normal"),
  doctor: varchar("doctor", { length: 100 }),
  resultDate: date("result_date").notNull(),
  sent: boolean("sent").notNull().default(false),
  doctorComment: text("doctor_comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const patientOtp = pgTable("patient_otp", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: text("patient_id").references(() => patients.id),
  otpCode: text("otp_code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const auditLog = pgTable("audit_log", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 100 }),
  userName: varchar("user_name", { length: 200 }),
  action: varchar("action", { length: 200 }).notNull(),
  resource: varchar("resource", { length: 100 }),
  resourceId: varchar("resource_id", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 50 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── CMS ─────────────────────────────────────────────────────────────────────

export const pages = pgTable("pages", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: jsonb("content").notNull().$defaultFn(() => ({})),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  updatedAt: timestamp("updated_at").defaultNow(),
  updatedBy: text("updated_by"),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  status: text("status").notNull().default("draft"),
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  authorName: text("author_name").default("Dr. Walters T. Fomuki"),
  category: text("category").default("Allgemein"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const media = pgTable("media", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type"),
  size: integer("size"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  uploadedBy: text("uploaded_by"),
});
