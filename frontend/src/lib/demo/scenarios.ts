import type { Channel, DemoTask, TaskId } from "@/types/demo";

// Presentation fixtures only. These are not verified TD policies or a knowledge base.
export const tasks: DemoTask[] = [
  {
    id: "chequing", title: "Open a chequing account", shortTitle: "Everyday banking",
    description: "Start with the essentials", question: "How do I open a chequing account?",
    answer: "In this sample scenario, you can start online. Take a look at the steps below, or choose a simulated branch appointment if you would prefer some help.",
    channel: "online", source: "Sample guide 01 · Chequing accounts",
    steps: ["Compare the sample account options and choose one that fits your everyday needs.", "Review the demo identity-document checklist before you start.", "In a real service, you would continue through the bank's verified account-opening process. This prototype does not open accounts."],
    checklist: ["A sample photo identification document", "Your questions about account features", "A list of services you would like to discuss"],
  },
  {
    id: "debit", title: "Replace a debit card", shortTitle: "Cards & access",
    description: "Get back to everyday banking", question: "Can I replace my debit card online?",
    answer: "For this demo, a debit-card replacement is a branch task. You can explore a simulated appointment and see what preparation might look like. This is not a verified card-replacement policy.",
    channel: "branch", source: "Sample guide 02 · Debit-card replacement",
    steps: ["Review the sample preparation checklist.", "Choose a fictional branch and an available demo time.", "Confirm your simulated appointment. No card is ordered or replaced."],
    checklist: ["A sample photo identification document", "Your existing card, if available in the scenario", "Questions about your replacement card"],
  },
  {
    id: "tfsa", title: "Explore a TFSA", shortTitle: "Saving for tomorrow",
    description: "Prepare for your next goal", question: "Do I need to visit a branch to open a TFSA?",
    answer: "In this sample scenario, we recommend a branch appointment to discuss a TFSA. This is a demonstration route, not a statement about TD requirements or financial advice.",
    channel: "branch", source: "Sample guide 03 · TFSA appointment",
    steps: ["Write down the savings goals you would like to discuss.", "Review the sample documents and questions below.", "Choose a branch and time to try the simulated appointment flow."],
    checklist: ["A sample photo identification document", "Your savings goals and questions", "Any account details you want to discuss — do not enter them here"],
  },
  {
    id: "cash", title: "Withdraw cash", shortTitle: "Cash & ATMs",
    description: "A quick stop, on your schedule", question: "Where can I withdraw cash?",
    answer: "This sample task uses an ATM, so a branch appointment is not needed. Actual access, fees, and limits depend on the bank and account and are not covered by this demo.",
    channel: "atm", source: "Sample guide 04 · Cash withdrawal",
    steps: ["Find an appropriate ATM through a bank's verified location service.", "Follow the ATM's on-screen instructions.", "Review any displayed fees and limits before continuing. This demo does not process withdrawals."],
    checklist: ["Your card for the real service", "Your intended withdrawal amount — do not enter it here"],
  },
  {
    id: "balance", title: "Check an account balance", shortTitle: "Account information",
    description: "An everyday check, made simple", question: "How can I check my balance?",
    answer: "The online-banking channel is the sample route for a balance check. This prototype does not connect to an account or display a real balance.",
    channel: "online", source: "Sample guide 05 · Balance checks",
    steps: ["Open your bank's verified app or website separately.", "Sign in through that official service.", "Open the account summary to view the information available there."],
    checklist: ["Access to your bank's verified app or website"],
  },
  {
    id: "access", title: "Get help signing in", shortTitle: "Online banking help",
    description: "Find the right support channel", question: "I need help accessing online banking.",
    answer: "This demo recommends phone banking for help with online access. Use contact information from a verified bank source. This prototype does not supply or verify phone numbers.",
    channel: "phone", source: "Sample guide 06 · Online access support",
    steps: ["Locate the bank's contact information through an official source.", "Explain the access issue to the support representative.", "Follow the bank's own process. Never enter passwords, PINs, or security codes into this prototype."],
    checklist: ["A description of the issue", "Any non-sensitive error message you want to explain"],
  },
  {
    id: "general", title: "Meet at a branch", shortTitle: "A little extra help",
    description: "Try a simulated appointment", question: "I'd like to book a branch appointment.",
    answer: "Let's try the appointment flow. Choose a fictional branch, a purpose, and a time. Your booking stays in this page only and does not contact a bank.",
    channel: "branch", source: "Sample guide 07 · General appointment",
    steps: ["Choose the topic you would like to discuss.", "Select a fictional branch and a demo time.", "Confirm the simulation and review your preparation checklist."],
    checklist: ["Your questions for the appointment", "The sample documents listed for your selected purpose"],
  },
];

export const featuredTasks = tasks.slice(0, 4);
export const getTask = (id: TaskId): DemoTask => tasks.find((task) => task.id === id)!;

export const channels: Record<Channel, { label: string; detail: string }> = {
  online: { label: "Online banking", detail: "From wherever you are" },
  atm: { label: "ATM", detail: "For a quick everyday task" },
  phone: { label: "Phone banking", detail: "Help from a representative" },
  branch: { label: "Branch visit", detail: "A conversation in person" },
};

export const followUpQuestions = {
  documents: "What documents should I bring to my appointment?",
  steps: "Show me the next steps.",
  booking: "I'd like to book a branch appointment.",
  location: "Where is my appointment?",
} as const;
