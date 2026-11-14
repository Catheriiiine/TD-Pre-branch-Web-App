import type { BookingEvent, DemoBooking, Message, MockReply, TaskId } from "@/types/demo";

export interface ConversationState {
  messages: Message[];
  activeTask: TaskId | null;
  booking: DemoBooking | null;
  events: BookingEvent[];
  pending: boolean;
  error: string | null;
  panelOpen: boolean;
}

export const initialConversation: ConversationState = {
  messages: [], activeTask: null, booking: null, events: [], pending: false, error: null, panelOpen: false,
};

type Action =
  | { type: "send"; message: Message }
  | { type: "reply"; message: Message; reply: MockReply }
  | { type: "error"; message: string }
  | { type: "retry" }
  | { type: "panel"; open: boolean }
  | { type: "booking"; event: BookingEvent; message: Message }
  | { type: "reset" };

export function conversationReducer(state: ConversationState, action: Action): ConversationState {
  switch (action.type) {
    case "send": return { ...state, messages: [...state.messages, action.message], pending: true, error: null };
    case "reply": return { ...state, messages: [...state.messages, action.message], activeTask: action.reply.taskId ?? state.activeTask, pending: false, panelOpen: action.reply.openBooking ? true : state.panelOpen };
    case "error": return { ...state, pending: false, error: action.message };
    case "retry": return { ...state, pending: true, error: null };
    case "panel": return { ...state, panelOpen: action.open };
    case "booking":
      if (state.events.some((event) => event.booking.id === action.event.booking.id)) return state;
      return { ...state, booking: action.event.booking, activeTask: action.event.booking.purpose, events: [...state.events, action.event], messages: [...state.messages, action.message] };
    case "reset": return { ...initialConversation };
  }
}
