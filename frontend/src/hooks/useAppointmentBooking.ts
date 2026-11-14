"use client";

import { useRef, useState } from "react";
import { demoBranches, demoTimes } from "@/lib/demo/appointments";
import { firstDemoDate } from "@/lib/dates";
import type { DemoBooking, TaskId } from "@/types/demo";

export function useAppointmentBooking(onConfirm: (booking: DemoBooking) => void) {
  const [branchId, setBranchId] = useState(demoBranches[0].id);
  const [date, setDate] = useState(firstDemoDate);
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState<TaskId>("general");
  const [confirmation, setConfirmation] = useState<DemoBooking | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitting = useRef(false);
  const generation = useRef(0);
  const slots = demoTimes(branchId, date);

  const change = (update: () => void) => { update(); setTime(""); setError(null); setConfirmation(null); };
  const reset = () => {
    generation.current += 1; submitting.current = false;
    setBranchId(demoBranches[0].id); setDate(firstDemoDate()); setTime(""); setPurpose("general"); setConfirmation(null); setError(null); setPending(false);
  };
  const prefill = (value: TaskId) => {
    if (value !== purpose && !submitting.current) { setPurpose(value); setTime(""); setConfirmation(null); setError(null); }
  };
  const confirm = async () => {
    if (submitting.current || confirmation) return;
    if (!slots.includes(time)) { setError("Choose an available time before confirming."); return; }
    submitting.current = true; setPending(true); setError(null);
    const currentGeneration = generation.current;
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (currentGeneration !== generation.current) return;
    const booking: DemoBooking = { id: crypto.randomUUID(), branch: demoBranches.find((branch) => branch.id === branchId)!, date, time, purpose, timezone: "America/Toronto", status: "simulated_confirmed" };
    setConfirmation(booking); onConfirm(booking); setPending(false); submitting.current = false;
  };

  return { branchId, date, time, purpose, confirmation, pending, error, slots, confirm, reset, prefill,
    setBranch: (value: string) => change(() => setBranchId(value)),
    setDate: (value: string) => change(() => setDate(value)),
    setPurpose: (value: TaskId) => change(() => setPurpose(value)),
    setTime: (value: string) => { setTime(value); setError(null); },
  };
}
