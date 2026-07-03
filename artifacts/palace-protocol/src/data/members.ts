import { Member } from "../types";

export const initialMembers: Member[] = [
  {
    id: "m1",
    name: "Aiden Mwangi",
    email: "aiden.mwangi@example.com",
    phone: "+254711111111",
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    sessionIds: ["1", "2"],
    status: "active",
  },
  {
    id: "m2",
    name: "Nia Omondi",
    email: "nia.omondi@example.com",
    phone: "+254722222222",
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    sessionIds: ["1", "3"],
    status: "active",
  },
  {
    id: "m3",
    name: "Leo Kiprono",
    email: "leo.kiprono@example.com",
    phone: "+254733333333",
    joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    sessionIds: [],
    status: "inactive",
  },
  {
    id: "m4",
    name: "Zara Wanjiku",
    email: "zara.wanjiku@example.com",
    phone: "+254744444444",
    joinedAt: new Date().toISOString(),
    sessionIds: ["2"],
    status: "active",
  }
];
