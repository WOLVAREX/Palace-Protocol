import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, booksTable } from "@workspace/db";
import { CreateBookBody, UpdateBookBody } from "@workspace/api-zod";

const router: IRouter = Router();

const fmt = (b: typeof booksTable.$inferSelect) => ({
  id: b.id, title: b.title, volume: b.volume, price: b.price,
  description: b.description, coverImage: b.coverImage ?? null, coverPending: b.coverPending,
});

router.get("/books", async (_req, res): Promise<void> => {
  const books = await db.select().from(booksTable).orderBy(booksTable.volume);
  res.json(books.map(fmt));
});

router.post("/books", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const parsed = CreateBookBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [book] = await db.insert(booksTable).values({
    title: parsed.data.title,
    volume: parsed.data.volume,
    price: parsed.data.price,
    description: parsed.data.description ?? "",
    coverImage: parsed.data.coverImage ?? null,
    coverPending: parsed.data.coverPending ?? !parsed.data.coverImage,
  }).returning();
  res.status(201).json(fmt(book));
});

router.patch("/books/:id", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const parsed = UpdateBookBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [book] = await db.update(booksTable).set(parsed.data).where(eq(booksTable.id, id)).returning();
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.json(fmt(book));
});

router.delete("/books/:id", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [book] = await db.delete(booksTable).where(eq(booksTable.id, id)).returning();
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
