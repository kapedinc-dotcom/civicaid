import type { Application, Household } from "./types";

export const DEFAULT_HOUSEHOLD: Household = {
  surname: "Chen",
  city: "Ontario",
  state: "CA",
  zip: "91761",
  monthlyIncome: 3200,
  monthlyRent: 1650,
  xp: 180,
  entered: true,
  verified: {
    identity: true,
    income: true,
    residency: false,
    household: true,
  },
  members: [
    {
      id: "m1",
      name: "Maya Chen",
      age: 34,
      role: "self",
      employed: true,
      student: false,
      disabled: false,
      pregnant: false,
      veteran: false,
    },
    {
      id: "m2",
      name: "Jordan Chen",
      age: 36,
      role: "partner",
      employed: true,
      student: false,
      disabled: true,
      pregnant: false,
      veteran: false,
    },
    {
      id: "m3",
      name: "Aiden Chen",
      age: 3,
      role: "child",
      employed: false,
      student: false,
      disabled: false,
      pregnant: false,
      veteran: false,
    },
  ],
};

export const DEFAULT_APPLICATIONS: Record<string, Application> = {
  calfresh: {
    programId: "calfresh",
    status: "awarded",
    awardedAt: Date.now() - 1000 * 60 * 60 * 24 * 40,
    monthlyAward: 430,
  },
  liheap: {
    programId: "liheap",
    status: "needs-docs",
    submittedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    monthlyAward: 75,
  },
  "medi-cal": {
    programId: "medi-cal",
    status: "in-review",
    submittedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    monthlyAward: 630,
  },
};
