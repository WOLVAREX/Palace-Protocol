import { Enrollment } from "../types";

export const initialEnrollments: Enrollment[] = [
  {
    id: "e1",
    name: "Samuel Ochieng",
    phone: "+254755555555",
    message: "I am interested in joining the academy to improve my professional etiquette.",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "e2",
    name: "Faith Njoroge",
    phone: "+254766666666",
    message: "Looking forward to learning from the best.",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
];
