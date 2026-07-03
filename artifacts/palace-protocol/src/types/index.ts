export interface Book {
  id: string;
  title: string;
  volume: number;
  price: number;
  description: string;
  coverImage?: string;
  coverPending: boolean;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
}

export interface Enrollment {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  sessionIds: string[];
  status: "active" | "inactive";
}

export interface User {
  role: "admin" | "member";
  name: string;
}

export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  aboutHeading: string;
  aboutBody1: string;
  aboutBody2: string;
  ceoPhoto?: string;
  pillars: { numeral: string; title: string; description: string }[];
}

export interface SiteConfig {
  whatsappNumber: string;
  email: string;
  location: string;
  sessionTimes: string;
  ceoName: string;
  ceoTitle: string;
  accentColor: string;
  terms: string;
  policies: string;
}
