import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, enrollmentsTable } from "@workspace/db";
import { CreateEnrollmentBody, UpdateEnrollmentBody } from "@workspace/api-zod";

const router: IRouter = Router();

const fmt = (e: typeof enrollmentsTable.$inferSelect) => ({
  id: e.id, name: e.name, phone: e.phone, message: e.message,
  status: e.status, createdAt: e.createdAt.toISOString(),
});

router.get("/enrollments", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const enrollments = await db.select().from(enrollmentsTable).orderBy(enrollmentsTable.createdAt);
  res.json(enrollments.map(fmt));
});

router.post("/enrollments", async (req, res): Promise<void> => {
  const parsed = CreateEnrollmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [enrollment] = await db.insert(enrollmentsTable).values({
    name: parsed.data.name,
    phone: parsed.data.phone,
    message: parsed.data.message ?? "",
    status: "pending",
  }).returning();
  res.status(201).json(fmt(enrollment));
});

router.patch("/enrollments/:id", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const parsed = UpdateEnrollmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [enrollment] = await db.update(enrollmentsTable).set({ status: parsed.data.status }).where(eq(enrollmentsTable.id, id)).returning();
  if (!enrollment) {
    res.status(404).json({ error: "Enrollment not found" });
    return;
  }
  res.json(fmt(enrollment));
});

export default router;
