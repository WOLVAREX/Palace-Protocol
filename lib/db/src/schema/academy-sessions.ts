import { pgTable, text, serial, integer, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const academySessionsTable = pgTable("academy_sessions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: date("date", { mode: "string" }).notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull().default(""),
  capacity: integer("capacity").notNull().default(15),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertAcademySessionSchema = createInsertSchema(academySessionsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAcademySession = z.infer<typeof insertAcademySessionSchema>;
export type AcademySession = typeof academySessionsTable.$inferSelect;
