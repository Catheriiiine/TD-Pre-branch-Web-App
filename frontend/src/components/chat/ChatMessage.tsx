import { Sparkles, UserRound } from "lucide-react";
import { GuidanceCard } from "@/components/chat/GuidanceCard";
import type { Message } from "@/types/demo";

export function ChatMessage({ message }: { message: Message }) {
  const assistant = message.role === "assistant";
  return <article aria-label={assistant ? "Assistant message" : "Your message"} className={`flex gap-3 ${assistant ? "" : "flex-row-reverse"}`}>
    <span className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full ${assistant ? "bg-[#eaf1e4] text-primary" : "border border-line bg-white text-muted"}`}>{assistant ? <Sparkles size={15} /> : <UserRound size={14} />}</span>
    <div className={`min-w-0 max-w-[92%] ${assistant ? "flex-1" : ""}`}>
      <p className={`mb-1.5 text-[10px] font-semibold ${assistant ? "text-muted" : "text-right text-muted"}`}>{assistant ? "PREBRANCH GUIDE" : "YOU"}</p>
      <div className={assistant ? "text-[13px] leading-[1.8] text-ink" : "rounded-2xl rounded-tr-sm bg-[#edf3e8] px-4 py-3 text-[13px] leading-6 text-ink"}><p className="whitespace-pre-wrap break-words">{message.content}</p></div>
      {message.booking && <p className="mt-3 rounded-lg border border-dashed border-primary/30 bg-surface px-3 py-2 text-[11px] text-primary">Simulation reference: {message.booking.id.slice(0, 8).toUpperCase()}</p>}
      {message.guidance && <GuidanceCard guidance={message.guidance} />}
    </div>
  </article>;
}
