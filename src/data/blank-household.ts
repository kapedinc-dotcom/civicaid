import type { Household } from "./types";

export function blankHousehold(name: string): Household {
  const trimmed = name.trim() || "You";
  const parts = trimmed.split(/\s+/);
  const surname = parts.length > 1 ? parts[parts.length - 1]! : trimmed;
  return {
    surname,
    city: "Ontario",
    state: "CA",
    zip: "91761",
    monthlyIncome: 0,
    monthlyRent: 0,
    xp: 0,
    entered: true,
    verified: {
      identity: false,
      income: false,
      residency: false,
      household: false,
    },
    members: [
      {
        id: "m1",
        name: trimmed,
        age: 30,
        role: "self",
        employed: false,
        student: false,
        disabled: false,
        pregnant: false,
        veteran: false,
      },
    ],
  };
}
