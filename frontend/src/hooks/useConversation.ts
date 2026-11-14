"use client";

import { useCallback, useReducer, useRef } from "react";
import { conversationReducer, initialConversation } from "@/lib/conversationReducer";
import { getMockReply } from "@/lib/demo/chat";
import { getTask } from "@/lib/demo/scenarios";
import { formatBookingDate } from "@/lib/dates";
import type { DemoBooking } from "@/types/demo";

export function useConversation() {
  const [state, dispatch] = useReducer(conversationReducer, initialConversation);
  const generation = useRef(0);
  const busy = useRef(false);
  const lastText = useRef("");

  const send = useCallback(async (text: string, retry = false) => {
    const content = text.trim();
    if (!content || content.length > 2000 || busy.current) return;
    busy.current = true;
    lastText.current = content;
    const currentGeneration = generation.current;
    if (retry) dispatch({ type: "retry" });
    else dispatch({ type: "send", message: { id: crypto.randomUUID(), role: "user", content } });
    try {
      const reply = await getMockReply(content, state.activeTask, state.booking);
      if (currentGeneration !== generation.current) return;
      dispatch({ type: "reply", reply, message: { id: crypto.randomUUID(), role: "assistant", content: reply.content, guidance: reply.guidance } });
      return reply;
    } catch {
      if (currentGeneration === generation.current) dispatch({ type: "error", message: "The demo could not display a response. Please try again." });
    } finally {
      if (currentGeneration === generation.current) busy.current = false;
    }
  }, [state.activeTask, state.booking]);

  const reset = () => { generation.current += 1; busy.current = false; lastText.current = ""; dispatch({ type: "reset" }); };
  const confirmBooking = (booking: DemoBooking) => {
    const task = getTask(booking.purpose);
    dispatch({ type: "booking", event: { id: crypto.randomUUID(), type: "appointment.confirmed", booking, isMock: true }, message: {
      id: crypto.randomUUID(), role: "assistant", booking,
      content: `You're all set for the demo. Your simulated appointment at ${booking.branch.name} is on ${formatBookingDate(booking.date)} at ${booking.time} (Toronto time). No real appointment has been made. Here's your sample preparation checklist.`,
      guidance: { task, kind: "documents" },
    } });
  };

  return { ...state, send, reset, confirmBooking, retry: () => send(lastText.current, true), setPanelOpen: (open: boolean) => dispatch({ type: "panel", open }) };
}
