"use client";

import { CalendarDays, X } from "lucide-react";
import { AppointmentForm, type AppointmentState } from "@/components/appointments/AppointmentForm";
import { BookingConfirmation } from "@/components/appointments/BookingConfirmation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function AppointmentPanel({ open, onClose, booking, disabled }: { open: boolean; onClose: () => void; booking: AppointmentState; disabled: boolean }) {
  const mobile = useMediaQuery("(max-width: 1023px)");
  const body = booking.confirmation ? <BookingConfirmation booking={booking.confirmation} onClose={onClose} /> : <AppointmentForm booking={booking} disabled={disabled} />;
  if (mobile) return <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}><DialogContent sheet onCloseAutoFocus={(event) => { event.preventDefault(); document.getElementById("chat-message")?.focus(); }}>
    <p className="eyebrow mb-2 text-primary">Your next step</p><DialogTitle className="pr-6 text-xl font-semibold tracking-tight">Plan a branch visit</DialogTitle><DialogDescription className="mb-7 mt-2 text-xs leading-5 text-muted">A fictional branch. A sample time. A clearer plan.</DialogDescription>{body}
  </DialogContent></Dialog>;
  if (!open) return null;
  return <Card className="self-start overflow-hidden" role="region" aria-label="Appointment booking">
    <div className="flex items-start justify-between gap-2 border-b border-line bg-[#f7f9f3] px-5 py-5"><div><p className="eyebrow mb-2 flex items-center gap-1.5 text-primary"><CalendarDays size={12} />Your next step</p><h2 className="text-lg font-semibold tracking-tight">Plan a branch visit</h2><p className="mt-1.5 text-[11px] leading-5 text-muted">Fictional branches. Simulated appointments.</p></div><Button size="icon" variant="ghost" className="-mr-2 -mt-2 size-8" onClick={onClose} aria-label="Close appointment panel"><X size={16} /></Button></div>
    <div className="p-5">{body}</div>
  </Card>;
}
