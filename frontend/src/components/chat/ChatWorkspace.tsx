"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CircleHelp, RotateCcw, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { PrototypeNotice } from "@/components/layout/PrototypeNotice";
import { SuggestedTasks } from "@/components/chat/SuggestedTasks";
import { MessageList } from "@/components/chat/MessageList";
import { MessageComposer } from "@/components/chat/MessageComposer";
import { JourneyOverview } from "@/components/chat/JourneyOverview";
import { AppointmentPanel } from "@/components/appointments/AppointmentPanel";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/useConversation";
import { useAppointmentBooking } from "@/hooks/useAppointmentBooking";
import { followUpQuestions } from "@/lib/demo/scenarios";

export function ChatWorkspace() {
  const conversation = useConversation();
  const booking = useAppointmentBooking(conversation.confirmBooking);
  const [version, setVersion] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const busy = conversation.pending || booking.pending;
  const send = async (text: string) => {
    if (busy) return;
    setShowExamples(false);
    const reply = await conversation.send(text);
    if (reply?.openBooking && reply.taskId) booking.prefill(reply.taskId);
  };
  const reset = () => { conversation.reset(); booking.reset(); setVersion((value) => value + 1); setShowExamples(false); };
  const closePanel = () => { conversation.setPanelOpen(false); requestAnimationFrame(() => document.getElementById("chat-message")?.focus()); };
  const book = () => { if (booking.confirmation) conversation.setPanelOpen(true); else void send(followUpQuestions.booking); };

  return <>
    <AppHeader onReset={reset} />
    <PrototypeNotice />
    <main id="main" className="mx-auto max-w-[1320px] px-5 pb-8 pt-8 sm:px-9 sm:pt-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
        <div><p className="eyebrow mb-3 text-primary">A warm welcome. A clear way forward.</p><h1 className="text-[32px] font-semibold leading-[1.14] tracking-[-1.3px] text-ink sm:text-[42px]">Your next step,<br className="sm:hidden" /> <span className="text-primary">made simple.</span></h1></div>
        <p className="max-w-[330px] text-xs leading-6 text-muted sm:pb-1">A little guidance before you bank.<br className="hidden sm:block" /> Explore your options and arrive prepared.</p>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px] xl:grid-cols-[minmax(0,1fr)_350px]">
        <section aria-label="Banking assistant" className="chat-shell flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_6px_28px_-18px_rgba(33,60,33,.22)]">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-line px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-[#eaf1e4] text-primary"><Sparkles size={19} strokeWidth={1.5} /></span><div><h2 className="text-sm font-semibold text-ink">Your banking guide</h2><p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted"><span className="size-1.5 rounded-full bg-[#7b9d64]" />Here to help you explore</p></div></div>
            <span className="rounded-full border border-[#e0e7d8] bg-[#f7f9f2] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#6a7c59]">Demo mode</span>
          </div>
          {conversation.messages.length === 0 ? <div className="chat-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-7 sm:px-7">
            <div className="mb-7"><span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#f1f5eb] text-primary"><Sparkles size={25} strokeWidth={1.3} /></span><h2 className="text-[25px] font-semibold tracking-[-.8px] text-ink">Let’s make your next move easier.</h2><p className="mt-2 max-w-lg text-[13px] leading-6 text-muted">Not sure where to start? Choose a sample task and we’ll walk through the options together.</p></div>
            <SuggestedTasks onSelect={send} disabled={busy} />
          </div> : <MessageList messages={conversation.messages} pending={conversation.pending} />}
          {conversation.error && <div role="alert" className="mx-5 mb-3 flex items-center justify-between gap-3 rounded-lg bg-red-50 p-3 text-xs text-red-800"><p>{conversation.error}</p><Button size="sm" variant="outline" onClick={() => void conversation.retry()} disabled={busy}><RotateCcw size={12} />Retry</Button></div>}
          {conversation.messages.length > 0 && <div className="shrink-0 border-t border-line/70 px-5 py-3 sm:px-7">
            <div className="flex flex-wrap gap-2">
              {conversation.activeTask && <button className="suggestion-chip" disabled={busy} onClick={() => void send(followUpQuestions.documents)}>What should I bring?</button>}
              {conversation.activeTask && <button className="suggestion-chip" disabled={busy} onClick={() => void send(followUpQuestions.steps)}>Next steps <ArrowRight size={11} /></button>}
              {conversation.booking && <button className="suggestion-chip" disabled={busy} onClick={() => void send(followUpQuestions.location)}>Where is my appointment?</button>}
              <button className="suggestion-chip" disabled={busy} aria-expanded={showExamples} onClick={() => setShowExamples((value) => !value)}><CircleHelp size={12} />Explore another task</button>
            </div>
            {showExamples && <div className="mt-3 border-t border-line pt-3"><SuggestedTasks compact onSelect={send} disabled={busy} /></div>}
          </div>}
          <MessageComposer key={version} onSend={send} disabled={busy} />
        </section>
        {conversation.panelOpen ? <AppointmentPanel open onClose={closePanel} booking={booking} disabled={conversation.pending} /> : <JourneyOverview taskId={conversation.activeTask} onBook={book} disabled={busy} />}
      </div>
      <div className="mt-4 flex justify-center lg:hidden"><Button variant="outline" className="w-full max-w-sm text-xs" onClick={book} disabled={busy}><CalendarDays size={15} />{booking.confirmation ? "View simulated booking" : "Explore an appointment"}</Button></div>
      <footer className="mt-7 flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted"><p>Built for learning. Designed around you.</p><p>TD-inspired university project <span className="mx-2 text-[#b6bfb0]">·</span> No bank connection</p></footer>
    </main>
  </>;
}
