"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import type { Message } from "@/types/demo";

export function MessageList({ messages, pending }: { messages: Message[]; pending: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = container.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, pending]);
  return <div ref={container} className="chat-scroll min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
    <div className="space-y-6">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}
      {pending && <div role="status" className="flex items-center gap-3 text-xs text-muted"><span className="flex size-8 items-center justify-center rounded-full bg-[#eaf1e4] text-primary"><Sparkles size={15} /></span><span className="flex gap-1" aria-hidden="true"><i className="loading-dot" /><i className="loading-dot [animation-delay:150ms]" /><i className="loading-dot [animation-delay:300ms]" /></span><span>Preparing your sample guidance…</span></div>}
    </div>
  </div>;
}
