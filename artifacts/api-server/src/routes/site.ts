import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteDataTable } from "@workspace/db";
import { UpdateSiteSettingsBody, UpdateSiteContentBody } from "@workspace/api-zod";

const router: IRouter = Router();

const SETTINGS_DEFAULTS: Record<string, string> = {
  whatsappNumber: "+254700000000",
  email: "info@palaceprotocolacademy.com",
  location: "Nairobi, Kenya",
  sessionTimes: "Saturdays, 9:00 AM – 12:00 PM",
  ceoName: "[ CEO name ]",
  ceoTitle: "Founder & CEO",
};

const CONTENT_DEFAULTS: Record<string, string> = {
  heroHeadline: "Command the room before you ever enter it.",
  heroSubheadline: "We mentor young people in the etiquette, presence and discretion expected in the company of leaders — the unwritten rules that shape first impressions and lasting respect.",
  aboutHeading: "Founded on the belief that conduct opens doors talent alone cannot.",
  aboutBody1: "Palace Protocol Academy trains youth in the etiquette, composure and discretion required when engaging with dignitaries, employers and elders. Every session is built around real scenarios — how to enter a room, how to address someone senior to you, how to carry yourself when it matters most.",
  aboutBody2: "Members progress through structured sessions with a dedicated mentor, and can track their enrolment and schedule through their own academy login.",
  ceoPhoto: "",
  terms: `TERMS OF SERVICE\n\nLast updated: July 2026\n\n1. ACCEPTANCE OF TERMS\nBy enrolling in Palace Protocol Academy sessions or purchasing any of our publications, you agree to be bound by these Terms of Service.\n\n2. ENROLMENT\nEnrolment requests are subject to review and approval by the Academy.\n\n3. CONDUCT\nAll members are expected to maintain the highest standards of conduct.\n\n4. PAYMENTS\nAll payments for sessions and publications are arranged directly.\n\n5. INTELLECTUAL PROPERTY\nAll Academy materials are the intellectual property of Palace Protocol Academy.\n\n6. CONTACT\nFor any queries regarding these terms, contact us at the details listed on the Contact page.`,
  policies: `PRIVACY POLICY\n\nLast updated: July 2026\n\n1. INFORMATION WE COLLECT\nWhen you submit an enrolment request or contact the Academy, we collect your name, phone number and any information you voluntarily provide.\n\n2. HOW WE USE YOUR INFORMATION\nYour personal information is used solely for processing enrolment requests and communicating session schedules.\n\n3. DATA SHARING\nWe do not sell, trade or transfer your personal information to any third parties.\n\n4. CONTACT\nFor any privacy-related enquiries, contact us at the details listed on the Contact page.`,
  pillar1Numeral: "I.", pillar1Title: "Presence",
  pillar1Description: "How you enter a room, how you sit, how you hold yourself when every eye is on you.",
  pillar2Numeral: "II.", pillar2Title: "Respect",
  pillar2Description: "Correct greeting, address and deference — knowing exactly how to speak to whom.",
  pillar3Numeral: "III.", pillar3Title: "Discretion",
  pillar3Description: "Knowing what to say, what to withhold, and when silence serves you better.",
};

async function setKeyValue(key: string, value: string): Promise<void> {
  const [existing] = await db.select().from(siteDataTable).where(eq(siteDataTable.key, key));
  if (existing) {
    await db.update(siteDataTable).set({ value }).where(eq(siteDataTable.key, key));
  } else {
    await db.insert(siteDataTable).values({ key, value });
  }
}

async function getMap(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteDataTable);
  const map: Record<string, string> = {};
  rows.forEach(r => { map[r.key] = r.value; });
  return map;
}

function d(map: Record<string, string>, key: string): string {
  return map[key] ?? SETTINGS_DEFAULTS[key] ?? CONTENT_DEFAULTS[key] ?? "";
}

router.get("/site/settings", async (_req, res): Promise<void> => {
  const map = await getMap();
  res.json({
    whatsappNumber: d(map, "whatsappNumber"),
    email: d(map, "email"),
    location: d(map, "location"),
    sessionTimes: d(map, "sessionTimes"),
    ceoName: d(map, "ceoName"),
    ceoTitle: d(map, "ceoTitle"),
  });
});

router.patch("/site/settings", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const parsed = UpdateSiteSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined && typeof value === "string") await setKeyValue(key, value);
  }
  const map = await getMap();
  res.json({
    whatsappNumber: d(map, "whatsappNumber"),
    email: d(map, "email"),
    location: d(map, "location"),
    sessionTimes: d(map, "sessionTimes"),
    ceoName: d(map, "ceoName"),
    ceoTitle: d(map, "ceoTitle"),
  });
});

router.get("/site/content", async (_req, res): Promise<void> => {
  const map = await getMap();
  const c = CONTENT_DEFAULTS;
  res.json({
    heroHeadline: map.heroHeadline ?? c.heroHeadline,
    heroSubheadline: map.heroSubheadline ?? c.heroSubheadline,
    aboutHeading: map.aboutHeading ?? c.aboutHeading,
    aboutBody1: map.aboutBody1 ?? c.aboutBody1,
    aboutBody2: map.aboutBody2 ?? c.aboutBody2,
    ceoPhoto: map.ceoPhoto || null,
    terms: map.terms ?? c.terms,
    policies: map.policies ?? c.policies,
    pillar1Numeral: map.pillar1Numeral ?? c.pillar1Numeral,
    pillar1Title: map.pillar1Title ?? c.pillar1Title,
    pillar1Description: map.pillar1Description ?? c.pillar1Description,
    pillar2Numeral: map.pillar2Numeral ?? c.pillar2Numeral,
    pillar2Title: map.pillar2Title ?? c.pillar2Title,
    pillar2Description: map.pillar2Description ?? c.pillar2Description,
    pillar3Numeral: map.pillar3Numeral ?? c.pillar3Numeral,
    pillar3Title: map.pillar3Title ?? c.pillar3Title,
    pillar3Description: map.pillar3Description ?? c.pillar3Description,
  });
});

router.patch("/site/content", async (req, res): Promise<void> => {
  if (req.session.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const parsed = UpdateSiteContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined) await setKeyValue(key, value === null ? "" : value);
  }
  const map = await getMap();
  const c = CONTENT_DEFAULTS;
  res.json({
    heroHeadline: map.heroHeadline ?? c.heroHeadline,
    heroSubheadline: map.heroSubheadline ?? c.heroSubheadline,
    aboutHeading: map.aboutHeading ?? c.aboutHeading,
    aboutBody1: map.aboutBody1 ?? c.aboutBody1,
    aboutBody2: map.aboutBody2 ?? c.aboutBody2,
    ceoPhoto: map.ceoPhoto || null,
    terms: map.terms ?? c.terms,
    policies: map.policies ?? c.policies,
    pillar1Numeral: map.pillar1Numeral ?? c.pillar1Numeral,
    pillar1Title: map.pillar1Title ?? c.pillar1Title,
    pillar1Description: map.pillar1Description ?? c.pillar1Description,
    pillar2Numeral: map.pillar2Numeral ?? c.pillar2Numeral,
    pillar2Title: map.pillar2Title ?? c.pillar2Title,
    pillar2Description: map.pillar2Description ?? c.pillar2Description,
    pillar3Numeral: map.pillar3Numeral ?? c.pillar3Numeral,
    pillar3Title: map.pillar3Title ?? c.pillar3Title,
    pillar3Description: map.pillar3Description ?? c.pillar3Description,
  });
});

export default router;
