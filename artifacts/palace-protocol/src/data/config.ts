import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  whatsappNumber: "+254700000000",
  email: "info@palaceprotocolacademy.com",
  location: "Nairobi, Kenya",
  sessionTimes: "Saturdays, 9:00 AM – 12:00 PM",
  ceoName: "[ CEO name ]",
  ceoTitle: "Founder & CEO",
  accentColor: "#A67C3D",
  terms: `TERMS OF SERVICE

Last updated: July 2026

1. ACCEPTANCE OF TERMS
By enrolling in Palace Protocol Academy sessions or purchasing any of our publications, you agree to be bound by these Terms of Service.

2. ENROLMENT
Enrolment requests are subject to review and approval by the Academy. Acceptance is at the sole discretion of Palace Protocol Academy.

3. CONDUCT
All members are expected to maintain the highest standards of conduct, both within Academy sessions and in all correspondence with staff and fellow members. Disrespectful behaviour will result in immediate suspension.

4. PAYMENTS
All payments for sessions and publications are arranged directly and are non-refundable unless the Academy cancels the relevant session or item is unavailable.

5. INTELLECTUAL PROPERTY
All Academy materials, including books, session notes and training resources, are the intellectual property of Palace Protocol Academy. Reproduction or distribution without written consent is prohibited.

6. LIMITATION OF LIABILITY
Palace Protocol Academy provides mentorship and training in good faith. We are not liable for outcomes resulting from the application of knowledge gained in sessions.

7. AMENDMENTS
These terms may be updated from time to time. Continued participation in Academy programmes constitutes acceptance of any revised terms.

8. CONTACT
For any queries regarding these terms, contact us at the details listed on the Contact page.`,

  policies: `PRIVACY POLICY

Last updated: July 2026

1. INFORMATION WE COLLECT
When you submit an enrolment request or contact the Academy, we collect your name, phone number and any information you voluntarily provide.

2. HOW WE USE YOUR INFORMATION
Your personal information is used solely for:
- Processing and responding to enrolment requests
- Communicating session schedules and Academy updates
- Sending books and other requested publications

3. DATA SHARING
We do not sell, trade or transfer your personal information to any third parties. Your details remain confidential within the Academy administration.

4. DATA SECURITY
We take reasonable precautions to protect your personal information. All enrolment data is handled with the same discretion we teach our members.

5. WHATSAPP COMMUNICATION
When you contact us via WhatsApp, your communication is subject to WhatsApp's own Privacy Policy. We use WhatsApp solely for direct Academy-related communication.

6. YOUR RIGHTS
You may request access to, correction of, or deletion of your personal data at any time by contacting us directly.

7. COOKIES
This website uses minimal session storage to maintain your login state. No third-party tracking cookies are used.

8. CONTACT
For any privacy-related enquiries, contact us at the details listed on the Contact page.`,
};

export const DEFAULT_CONTENT: SiteContent = {
  heroHeadline: "Command the room before you ever enter it.",
  heroSubheadline:
    "We mentor young people in the etiquette, presence and discretion expected in the company of leaders — the unwritten rules that shape first impressions and lasting respect.",
  aboutHeading: "Founded on the belief that conduct opens doors talent alone cannot.",
  aboutBody1:
    "Palace Protocol Academy trains youth in the etiquette, composure and discretion required when engaging with dignitaries, employers and elders. Every session is built around real scenarios — how to enter a room, how to address someone senior to you, how to carry yourself when it matters most.",
  aboutBody2:
    "Members progress through structured sessions with a dedicated mentor, and can track their enrolment and schedule through their own academy login.",
  ceoPhoto: undefined,
  pillars: [
    {
      numeral: "I.",
      title: "Presence",
      description:
        "How you enter a room, how you sit, how you hold yourself when every eye is on you.",
    },
    {
      numeral: "II.",
      title: "Respect",
      description:
        "Correct greeting, address and deference — knowing exactly how to speak to whom.",
    },
    {
      numeral: "III.",
      title: "Discretion",
      description:
        "Knowing what to say, what to withhold, and when silence serves you better.",
    },
  ],
};

export function getConfig(): SiteConfig {
  try {
    const stored = localStorage.getItem("pp_settings");
    if (stored) return { ...SITE_CONFIG, ...JSON.parse(stored) };
  } catch (_) {}
  return SITE_CONFIG;
}

export function getContent(): SiteContent {
  try {
    const stored = localStorage.getItem("pp_content");
    if (stored) return { ...DEFAULT_CONTENT, ...JSON.parse(stored) };
  } catch (_) {}
  return DEFAULT_CONTENT;
}
