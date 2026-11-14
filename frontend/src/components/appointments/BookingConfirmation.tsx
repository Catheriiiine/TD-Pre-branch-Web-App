import { CalendarDays, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBookingDate } from "@/lib/dates";
import { getTask } from "@/lib/demo/scenarios";
import type { DemoBooking } from "@/types/demo";

export function BookingConfirmation({ booking, onClose }: { booking: DemoBooking; onClose: () => void }) {
  return <div>
    <div role="status" className="mb-6 text-center"><span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#eaf2e3] text-primary"><Check size={26} /></span><h3 className="text-lg font-semibold tracking-tight text-ink">Your demo visit is planned.</h3><p className="mt-2 text-xs leading-5 text-muted">A little preparation goes a long way.<br />This is a simulation, not a real booking.</p></div>
    <div className="space-y-4 rounded-xl border border-line bg-[#fafbf8] p-4">
      <div className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-primary" /><div><p className="text-sm font-semibold">{booking.branch.name}</p><p className="mt-1 text-xs leading-5 text-muted">{booking.branch.address}<br />Fictional branch</p></div></div>
      <div className="flex gap-3"><CalendarDays size={17} className="mt-0.5 shrink-0 text-primary" /><div><p className="text-xs font-semibold">{formatBookingDate(booking.date)}</p><p className="mt-1 text-xs text-muted">{booking.time} · 30 minutes · Toronto time</p></div></div>
      <p className="border-t border-line pt-3 text-xs leading-5 text-muted">Purpose: <span className="font-medium text-ink">{getTask(booking.purpose).title}</span></p>
    </div>
    <p className="my-5 text-xs leading-6 text-muted">Your sample preparation checklist is ready in the conversation. This confirmation disappears when you refresh the page.</p>
    <Button className="w-full text-xs" onClick={onClose}>Back to conversation</Button>
    <p className="mt-4 text-center text-[10px] text-muted">Demo reference: {booking.id.slice(0, 8).toUpperCase()}</p>
  </div>;
}
