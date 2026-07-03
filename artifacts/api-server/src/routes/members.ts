import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, membersTable } from "@workspace/db";
import { UpdateMemberBody } from "@workspace/api-zod";

const router: IRouter = Router();

const fmt = (m: typeof membersTable.$inferSelect) => ({
  id: m.id, name: m.name, email: m.email, phone: m.phone,
  status: m.status, userId: m.userId ?? null, joinedAt: m.joinedAt.toISOString(),
});

router.get("/members", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const members = await db.select().from(membersTable).orderBy(membersTable.joinedAt);
  res.json(members.map(fmt));
});

router.patch("/members/:id", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const parsed = UpdateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [member] = await db.update(membersTable).set(parsed.data).where(eq(membersTable.id, id)).returning();
  if (!member) {
    res.status(404).json({ error: "Member not found" });
    return;
  }
  res.json(fmt(member));
});

export default router;
