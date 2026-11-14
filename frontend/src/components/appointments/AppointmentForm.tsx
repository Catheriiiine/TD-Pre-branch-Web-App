import { CalendarDays, Clock3, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoBranches } from "@/lib/demo/appointments";
import { tasks } from "@/lib/demo/scenarios";
import { addDays, localDemoDate } from "@/lib/dates";
import type { useAppointmentBooking } from "@/hooks/useAppointmentBooking";
import type { TaskId } from "@/types/demo";

export type AppointmentState = ReturnType<typeof useAppointmentBooking>;

export function AppointmentForm({ booking, disabled }: { booking: AppointmentState; disabled: boolean }) {
  const branch = demoBranches.find((item) => item.id === booking.branchId)!;
  return <form onSubmit={(event) => { event.preventDefault(); void booking.confirm(); }}>
    <fieldset disabled={booking.pending || disabled} className="space-y-5 disabled:opacity-60">
      <div><label className="field-label" htmlFor="appointment-purpose">What brings you in?</label><select id="appointment-purpose" value={booking.purpose} onChange={(event) => booking.setPurpose(event.target.value as TaskId)} className="form-control">{tasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></div>
      <div><label className="field-label" htmlFor="appointment-branch">Choose a branch</label><select id="appointment-branch" value={booking.branchId} onChange={(event) => booking.setBranch(event.target.value)} className="form-control">{demoBranches.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.neighbourhood}</option>)}</select><p className="mt-2 flex items-start gap-1.5 text-[10px] leading-5 text-muted"><MapPin size={12} className="mt-1 shrink-0" />{branch.address}<br />Fictional location</p></div>
      <div><label className="field-label flex items-center gap-1.5" htmlFor="appointment-date"><CalendarDays size={13} />Choose a date</label><input id="appointment-date" type="date" value={booking.date} min={addDays(localDemoDate(), 1)} max={addDays(localDemoDate(), 14)} onChange={(event) => booking.setDate(event.target.value)} required className="form-control" /><p className="mt-1.5 text-[10px] text-muted">Weekdays in the next 14 days.</p></div>
      <fieldset><legend className="field-label flex items-center gap-1.5"><Clock3 size={13} />Available times <span className="ml-1 font-normal text-muted">Toronto time</span></legend>
        {booking.slots.length ? <div className="grid grid-cols-3 gap-2">{booking.slots.map((slot) => <label key={slot} className="relative block cursor-pointer"><input type="radio" name="appointment-time" value={slot} checked={booking.time === slot} onChange={() => booking.setTime(slot)} className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0" /><span className="flex h-10 items-center justify-center rounded-lg border border-line text-xs font-medium text-muted transition-colors peer-hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">{slot}</span></label>)}</div> : <p role="status" className="rounded-lg bg-surface p-3 text-xs leading-5 text-muted">No sample times for this date. Choose a weekday within the next 14 days.</p>}
      </fieldset>
      <div className="flex gap-2 rounded-lg bg-[#f5f6ef] p-3 text-[10px] leading-[1.7] text-muted"><Info size={13} className="mt-0.5 shrink-0" /><p>This is a 30-minute simulated appointment. No branch will be contacted and no time will be reserved.</p></div>
      {booking.error && <p role="alert" className="text-xs text-red-700">{booking.error}</p>}
      <Button type="submit" className="w-full text-xs" disabled={booking.pending || disabled}>{booking.pending ? "Preparing your confirmation…" : "Confirm simulated booking"}</Button>
    </fieldset>
  </form>;
}
