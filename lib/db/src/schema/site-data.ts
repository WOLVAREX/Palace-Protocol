import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteDataTable = pgTable("site_data", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSiteDataSchema = createInsertSchema(siteDataTable).omit({ id: true, updatedAt: true });
export type InsertSiteData = z.infer<typeof insertSiteDataSchema>;
export type SiteData = typeof siteDataTable.$inferSelect;
