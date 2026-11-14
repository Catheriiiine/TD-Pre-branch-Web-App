"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUp, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessageComposer({ onSend, disabled }: { onSend: (message: string) => void; disabled: boolean }) {
  const [value, setValue] = useState("");
  const tooLong = value.trim().length > 2000;
  const submit = () => {
    if (disabled || !value.trim() || tooLong) return;
    onSend(value); setValue("");
  };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(); }
  };
  return <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="shrink-0 border-t border-line bg-white px-5 pb-4 pt-4 sm:px-7">
    <div className="flex items-end gap-3 rounded-xl border border-[#d6dfd4] bg-[#fbfcfa] p-2 pl-4 transition-shadow focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10">
      <label htmlFor="chat-message" className="sr-only">Your banking question</label>
      <textarea id="chat-message" rows={2} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={keyDown} disabled={disabled} aria-describedby="composer-note" aria-invalid={tooLong} placeholder="Ask a question, or try an example above…" className="max-h-32 min-h-12 flex-1 resize-y bg-transparent py-2 text-[13px] leading-6 text-ink outline-none placeholder:text-[#939d91] disabled:opacity-60" />
      <Button type="submit" size="icon" className="mb-0.5 shrink-0 rounded-lg" aria-label="Send message" disabled={disabled || !value.trim() || tooLong}><ArrowUp size={19} /></Button>
    </div>
    {tooLong && <p role="alert" className="mt-2 text-xs text-red-700">Keep your question to 2,000 characters or fewer.</p>}
    <div id="composer-note" className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted"><span className="flex items-center gap-1.5"><LockKeyhole size={11} />Keep personal and account details private.</span><span>Scripted demo · Not live banking advice</span></div>
  </form>;
}
