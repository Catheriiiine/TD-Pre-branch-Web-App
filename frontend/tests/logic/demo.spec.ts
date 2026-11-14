import { expect, test } from "@playwright/test";
import { scriptedReply } from "../../src/lib/demo/chat";
import { demoTimes } from "../../src/lib/demo/appointments";
import { firstDemoDate, addDays, localDemoDate } from "../../src/lib/dates";
import { conversationReducer, initialConversation } from "../../src/lib/conversationReducer";
import { followUpQuestions } from "../../src/lib/demo/scenarios";
import type { BookingEvent, Message } from "../../src/types/demo";

test("exact script selection does not pretend to understand arbitrary questions", () => {
  expect(scriptedReply(" HOW DO I OPEN A CHEQUING ACCOUNT? ", null, null).guidance?.task.channel).toBe("online");
  expect(scriptedReply("Please infer my intent from the word TFSA", null, null).guidance).toBeUndefined();
  expect(scriptedReply("What is the current TFSA contribution limit?", "tfsa", null).content).toContain("scripted examples");
});

test("document follow-up needs a selected scenario and uses that scenario only", () => {
  expect(scriptedReply(followUpQuestions.documents, null, null).content).toContain("Which task");
  const reply = scriptedReply(followUpQuestions.documents, "debit", null);
  expect(reply.guidance?.task.id).toBe("debit");
  expect(reply.guidance?.kind).toBe("documents");
  expect(reply.openBooking).toBeUndefined();
});

test("sample availability rejects past, invalid, and out-of-window dates", () => {
  expect(demoTimes("harbour", localDemoDate())).toEqual([]);
  expect(demoTimes("harbour", "2026-02-31")).toEqual([]);
  expect(demoTimes("harbour", addDays(localDemoDate(), 15))).toEqual([]);
  expect(demoTimes("missing", firstDemoDate())).toEqual([]);
  expect(demoTimes("harbour", firstDemoDate())).toContain("14:00");
});

test("booking event is recorded once and reset clears all temporary context", () => {
  const event: BookingEvent = { id: "event", type: "appointment.confirmed", isMock: true, booking: { id: "booking", branch: { id: "harbour", name: "Harbour Centre", address: "Fictional", neighbourhood: "Waterfront" }, date: firstDemoDate(), time: "14:00", purpose: "tfsa", timezone: "America/Toronto", status: "simulated_confirmed" } };
  const message: Message = { id: "message", role: "assistant", content: "Simulated booking" };
  const first = conversationReducer(initialConversation, { type: "booking", event, message });
  const duplicate = conversationReducer(first, { type: "booking", event, message });
  expect(duplicate.events).toHaveLength(1);
  expect(duplicate.messages).toHaveLength(1);
  expect(duplicate.activeTask).toBe("tfsa");
  expect(conversationReducer(duplicate, { type: "reset" })).toEqual(initialConversation);
});
