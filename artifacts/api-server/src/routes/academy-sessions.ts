import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, academySessionsTable } from "@workspace/db";
import { CreateAcademySessionBody, UpdateAcademySessionBody } from "@workspace/api-zod";

const router: IRouter = Router();

const fmt = (s: typeof academySessionsTable.$inferSelect) => ({
  id: s.id, title: s.title, date: s.date, time: s.time,
  location: s.location, description: s.description, capacity: s.capacity,
});

router.get("/academy-sessions", async (_req, res): Promise<void> => {
  const sessions = await db.select().from(academySessionsTable).orderBy(academySessionsTable.date);
  res.json(sessions.map(fmt));
});

router.post("/academy-sessions", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const parsed = CreateAcademySessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [session] = await db.insert(academySessionsTable).values(parsed.data).returning();
  res.status(201).json(fmt(session));
});

router.patch("/academy-sessions/:id", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const parsed = UpdateAcademySessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [session] = await db.update(academySessionsTable).set(parsed.data).where(eq(academySessionsTable.id, id)).returning();
  if (!session) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  res.json(fmt(session));
});

router.delete("/academy-sessions/:id", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [session] = await db.delete(academySessionsTable).where(eq(academySessionsTable.id, id)).returning();
  if (!session) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
