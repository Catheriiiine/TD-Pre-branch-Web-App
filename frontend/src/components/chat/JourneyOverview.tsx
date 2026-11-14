import { ArrowRight, Check, Compass, Landmark, Route } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { channelIcons } from "@/components/chat/GuidanceCard";
import { channels, getTask } from "@/lib/demo/scenarios";
import type { TaskId } from "@/types/demo";

export function JourneyOverview({ taskId, onBook, disabled }: { taskId: TaskId | null; onBook: () => void; disabled: boolean }) {
  const task = taskId ? getTask(taskId) : null;
  const Icon = task ? channelIcons[task.channel] : Compass;
  return <aside className="hidden space-y-4 lg:block" aria-label="Your next step">
    <Card className="overflow-hidden">
      <div className="relative overflow-hidden bg-[#edf2e5] px-6 pb-7 pt-6">
        <p className="eyebrow relative z-10 text-primary">A little planning. A lot easier.</p>
        <div aria-hidden="true" className="relative my-7 flex h-20 items-center justify-between px-5">
          <div className="absolute inset-x-9 top-10 border-t-2 border-dashed border-[#a9bd96]" />
          <span className="relative flex size-11 items-center justify-center rounded-full border border-[#c9d6bd] bg-[#f8faf4] text-primary"><Route size={20} strokeWidth={1.5} /></span>
          <span className="relative flex size-20 items-center justify-center rounded-[24px] border-[5px] border-white/70 bg-primary text-white shadow-lg shadow-primary/10"><Landmark size={34} strokeWidth={1.4} /></span>
          <span className="relative flex size-11 items-center justify-center rounded-full border border-[#c9d6bd] bg-[#f8faf4] text-primary"><Check size={20} /></span>
        </div>
        <h2 className="text-[23px] font-semibold leading-[1.3] tracking-[-.7px] text-[#24412f]">The right channel.<br />A clearer next step.</h2>
        <p className="mt-3 text-xs leading-6 text-[#687760]">A quick task online, or a conversation in person. Explore what works for your next banking task.</p>
      </div>
      <div className="space-y-4 px-6 py-5">{["Explore your options", "Know what to prepare", "Make your visit count"].map((item, index) => <div key={item} className="flex items-center gap-3 text-xs text-ink"><span className="flex size-6 items-center justify-center rounded-full border border-line text-[10px] font-semibold text-primary">0{index + 1}</span>{item}</div>)}</div>
    </Card>
    <Card className="p-5">
      <div className="flex items-center gap-2 text-primary"><Icon size={17} /><h2 className="text-xs font-semibold">{task ? "Your sample channel" : "Prefer to speak in person?"}</h2></div>
      <p className="my-3 text-xs leading-6 text-muted">{task ? `${channels[task.channel].label} · ${channels[task.channel].detail}. This recommendation is simulated.` : "Try a branch appointment, with a sample checklist to help you feel prepared."}</p>
      <Button variant="outline" className="w-full justify-between text-xs" onClick={onBook} disabled={disabled}>Explore an appointment <ArrowRight size={15} /></Button>
    </Card>
    <p className="px-2 text-[10px] leading-5 text-muted">All examples are fictional. No account access, real reservations, or personal information required.</p>
  </aside>;
}
