import { followUpQuestions, getTask, tasks } from "@/lib/demo/scenarios";
import { formatBookingDate } from "@/lib/dates";
import type { DemoBooking, MockReply, TaskId } from "@/types/demo";

const normalize = (value: string) => value.trim().toLowerCase().replace(/[?.!]$/, "");

/** Exact script selection only: no intent detection, retrieval, or text generation. */
export function scriptedReply(text: string, activeTask: TaskId | null, booking: DemoBooking | null): MockReply {
  const input = normalize(text);
  if (input === normalize(followUpQuestions.location)) {
    return { content: booking ? `Your simulated appointment is at ${booking.branch.name}, ${booking.branch.address}, on ${formatBookingDate(booking.date)} at ${booking.time} (Toronto time). No real appointment has been made.` : "You have not confirmed a simulated appointment yet. Choose a banking task or select Book an appointment to try the flow." };
  }
  if (input === normalize(followUpQuestions.booking)) {
    const task = getTask(activeTask ?? "general");
    return { content: "Choose a fictional branch and a time in the appointment panel. You can change the purpose before confirming. This is a simulation only.", taskId: task.id, openBooking: true };
  }
  if (input === normalize(followUpQuestions.documents) || input === normalize(followUpQuestions.steps)) {
    if (!activeTask) return { content: "Which task are you preparing for? Choose an example below so I can show the matching sample checklist." };
    const task = getTask(activeTask);
    return { content: "Here is the sample guidance for your selected task. These details are for this university demo and are not verified banking requirements.", taskId: task.id, guidance: { task, kind: input === normalize(followUpQuestions.documents) ? "documents" : "steps" } };
  }
  const task = tasks.find((item) => normalize(item.question) === input);
  if (task) return { content: task.answer, taskId: task.id, guidance: { task, kind: "steps" }, openBooking: task.channel === "branch" };
  return { content: "This preview uses scripted examples, so I can't answer that question yet. Choose a task or one of the follow-up buttons below to explore the demo. Please do not share personal or account information." };
}

export async function getMockReply(text: string, activeTask: TaskId | null, booking: DemoBooking | null): Promise<MockReply> {
  // A short delay makes the loading state visible. No network request is made.
  await new Promise((resolve) => setTimeout(resolve, 450));
  return scriptedReply(text, activeTask, booking);
}
