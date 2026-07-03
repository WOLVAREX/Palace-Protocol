import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import { logger } from "./logger";

export async function seedAdminUser(): Promise<void> {
  const [existing] = await db.select().from(usersTable).where(eq(usersTable.username, "admin"));
  if (existing) {
    logger.info("Admin user already exists — skipping seed");
    return;
  }

  const passwordHash = await bcrypt.hash("Palace2026!", 12);
  await db.insert(usersTable).values({
    username: "admin",
    email: "admin@palaceprotocolacademy.com",
    passwordHash,
    role: "admin",
    name: "Academy Administrator",
  });
  logger.info("Admin user created — username: admin, password: Palace2026!");
}
