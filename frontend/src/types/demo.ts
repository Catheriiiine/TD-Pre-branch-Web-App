export type Channel = "online" | "atm" | "phone" | "branch";
export type TaskId = "chequing" | "debit" | "tfsa" | "cash" | "balance" | "access" | "general";

export interface DemoTask {
  id: TaskId;
  title: string;
  shortTitle: string;
  description: string;
  question: string;
  answer: string;
  channel: Channel;
  steps: string[];
  checklist: string[];
  source: string;
}

export interface Guidance {
  task: DemoTask;
  kind: "steps" | "documents";
}

export interface DemoBranch {
  id: string;
  name: string;
  address: string;
  neighbourhood: string;
}

export interface DemoBooking {
  id: string;
  branch: DemoBranch;
  date: string;
  time: string;
  purpose: TaskId;
  timezone: "America/Toronto";
  status: "simulated_confirmed";
}

export interface BookingEvent {
  id: string;
  type: "appointment.confirmed";
  booking: DemoBooking;
  isMock: true;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  guidance?: Guidance;
  booking?: DemoBooking;
}

export interface MockReply {
  content: string;
  taskId?: TaskId;
  guidance?: Guidance;
  openBooking?: boolean;
}
