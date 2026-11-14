import { addDays, localDemoDate } from "@/lib/dates";
import type { DemoBranch } from "@/types/demo";

export const demoBranches: DemoBranch[] = [
  { id: "harbour", name: "Harbour Centre", address: "100 Sample Street, Toronto, ON", neighbourhood: "Waterfront" },
  { id: "maple", name: "Maple Square", address: "200 Example Avenue, Toronto, ON", neighbourhood: "Midtown" },
  { id: "cedar", name: "Cedar Park", address: "300 Demo Road, Ottawa, ON", neighbourhood: "West end" },
];

/** Fixed presentation fixtures. No reservations are made or stored. */
export function demoTimes(branchId: string, date: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !demoBranches.some((branch) => branch.id === branchId)) return [];
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return [];
  if (date <= localDemoDate() || date > addDays(localDemoDate(), 14) || [0, 6].includes(parsed.getUTCDay())) return [];
  return branchId === "maple" ? ["09:30", "11:00", "13:30", "15:00"] : ["09:00", "10:30", "11:30", "14:00", "15:30"];
}
