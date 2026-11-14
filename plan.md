## 1. Project Overview

Build a prototype web application for a TD-inspired pre-branch banking assistant.

The application helps customers understand banking procedures, answer policy questions, and determine the most appropriate channel for completing a banking task.

Available channels include:

- Online banking
- ATM
- Phone banking
- In-person branch visits

The assistant should reduce unnecessary branch visits while helping customers prepare for tasks that require visiting a branch.

This is a university project prototype, not an official TD application. Use mock data and clearly distinguish simulated information from verified banking policies.

## 2. Core Features

A. Conversational AI Assistant

- Build a modern chatbot interface.
- Support multi-turn conversations.
- Display user and assistant messages.
- Show loading states and errors.
- Maintain conversation history during the session.
- Provide suggested example questions.

B. Banking Task Guidance

- Recognize the user's banking intent.
- Recommend an appropriate service channel.
- Provide step-by-step instructions.
- Support questions about common banking tasks.
- Allow users to ask follow-up questions.

Example user queries:

- How do I open a chequing account?
- Can I replace my debit card online?
- Do I need to visit a branch to open a TFSA?
- What documents should I bring to my appointment?

C. RAG Architecture
Design the backend to support a Retrieval-Augmented Generation pipeline.

The intended workflow is:

User message
-> Intent detection
-> Relevant policy retrieval
-> Response generation
-> Chat response with guidance

For the initial prototype:

- Use a small local knowledge base containing sample banking FAQs and policies.
- Clearly label sample policies as mock data.
- Design interchangeable retrieval and generation interfaces.
- Allow mock responses initially so the application can run without paid API keys.
- Make it straightforward to integrate a real LLM, embeddings, and a vector database later.
- Do not build a complicated ML training pipeline at this stage.

D. Appointment Booking Side Panel

- Detect when the user wants or needs a branch appointment.
- Open an appointment booking panel beside the chatbot.
- Allow users to choose a branch, date, time, and appointment purpose.
- Use mock appointment availability.
- Allow the user to confirm a simulated booking.
- Send a structured booking event back to the chat system.
- Have the assistant acknowledge the appointment and provide a preparation checklist.

The booking interface must be integrated with the conversation rather than functioning as an unrelated form.

E. User Interface
Build a professional, modern, responsive banking interface.

The design should include:

- Header/navigation
- Main chatbot interface
- Suggested banking tasks
- Recommended service channel
- Appointment booking side panel
- Clear loading, empty, and error states

Use a clean visual style inspired by modern banking applications, with green and white as the primary colors.

The UI should look like a realistic product prototype rather than a generic chatbot demonstration.

## 3. Preferred Technology Stack

Frontend:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate

Backend:

- Python
- FastAPI
- Pydantic
- Modular services for intent detection, retrieval, generation, and appointment management

Data:

- Local JSON or Markdown knowledge base for initial development
- Mock appointment data
- No production database required for MVP
- Architecture should support adding a vector database later

Development:

- Git
- ESLint and TypeScript checks
- Pytest for backend testing
- Environment variable management
- Clear README and setup instructions

You may recommend small changes to the stack if there is a compelling architectural reason, but avoid unnecessary complexity.

## 4. Project Architecture Requirements

I want a clean, well-organized repository.

Separate responsibilities clearly:

- Frontend pages and components
- Frontend API clients
- Shared TypeScript types
- Backend API routes
- Backend business logic
- RAG/retrieval services
- Appointment management
- Data schemas and mock data
- Configuration
- Tests
- Documentation

Use modular, maintainable architecture.

Avoid:

- Putting all functionality into one file
- Overengineering
- Premature microservices
- Unnecessary abstractions
- Too many dependencies
- Duplicated logic

Structure the project so that a future developer can understand the system and extend it easily.

Include an AGENTS.md file in the proposed architecture with development conventions for future Codex sessions.

## 5. Expected Plan Output

Please provide:

1. Architecture overview
   - Explain the major components.
   - Explain why you selected the architecture.
2. Complete proposed directory structure
   - Show the folder tree.
   - Explain the purpose of important files and directories.
3. System data flow
   - Explain the flow from a user's message to an assistant response.
   - Explain the booking panel interaction.
   - Include a Mermaid architecture or sequence diagram.
4. API design
   - Propose the necessary endpoints.
   - Define the key request/response schemas.
   - Explain how frontend and backend communicate.
5. MVP implementation plan
   Divide the work into phases:

   Phase 1: Project initialization and structure
   Phase 2: Frontend layout and reusable components
   Phase 3: Backend API and mock data
   Phase 4: Chatbot and banking task guidance
   Phase 5: Appointment booking integration
   Phase 6: Testing, documentation, and local deployment
6. Future RAG integration
   - Explain how real LLM inference, embeddings, and retrieval could replace the mock implementation.
   - Identify which modules would change and which would remain unchanged.
7. Development setup
   - List the required dependencies.
   - Provide the commands needed to run frontend and backend locally.
   - Include a practical testing strategy.
8. Acceptance criteria
   - Define what a working prototype should demonstrate.
   - Include at least one complete end-to-end user journey.

## 6. Important Instructions

- Prioritize a functioning MVP over unnecessary complexity.
- Design the architecture to be extendable without being overengineered.
- Make reasonable technical decisions independently.
- Explain important tradeoffs.
- Keep the implementation beginner-friendly enough that I can understand and maintain it.
- Do not introduce authentication, payment processing, or external banking integrations for the initial version.
- Do not assume access to real TD APIs or customer information.
- Include clear separation between mock implementations and future production implementations.

Once you have completed the plan, STOP.

Do not implement anything until I explicitly approve the architecture and implementation plan.

I will inspect the project folder and check the relevant framework documentation. Then I will prepare the architecture and implementation plan. I will not create files or install dependencies.
• Explored
  └ Read SKILL.md (sites:sites skill)
• Ran pwd && rg --files --hidden -g '!\.git/**' -g '!node_modules/**' -g '!\.venv/**'
  └ LICENSE
    README.md
    .gitignore
The folder has a README, a license, and a Git ignore file. There is no application code.

I am using the Sites skill’s guidance for local development. The plan will use your chosen Next.js and FastAPI stack. It will not include hosted services or publication.
• Browsing the web
• Searched the web for site.nextjs.org/docs app getting started installation minimum Node.js version ESLint Next.js 16, site.fastapi.ti…
• Browsing the web
• Ran for path in /AGENTS.md /Users/AGENTS.md /Users/bluewater/AGENTS.md /Users/bluewater/Desktop/AGENTS.md /Users/bluewater/Desktop/TD…
  └ (no output)
• Opened https://ui.shadcn.com/docs/installation/next
• Ran cat README.md .gitignore && git status --short && rg --files --hidden -g AGENTS.md -g '!node_modules/**' -g '!\.git/**' /Users/bl…
  └ # Streamlit
    .streamlit/secrets.toml
    /Users/bluewater/Desktop/user-simulator/src/training/verl/AGENTS.md
The plan will use one Next.js frontend and one FastAPI backend. FastAPI will own the task rules, chat context, and simulated bookings. This keeps banking rules out of the UI.

A confirmed booking will also create a chat event and a preparation checklist. The first version will use fixed mock responses and local sample data, so it can run without an API key.
• Proposed Plan
 
 
# TD Pre-Branch Virtual Assistant: Architecture and Implementation Plan

## 1. Summary and architecture

Build a local university prototype with a Next.js frontend and a FastAPI backend. Use your preferred stack.

The repository currently contains a README, a license, and a Git ignore file. There is no application code to preserve.

The first version will support chat, banking task guidance, and simulated appointment booking. It will run without paid API keys.

Display this notice throughout the application:

> University prototype. Not affiliated with TD. Banking guidance and appointments are simulated. Do not enter personal or account information.

### Major components

| Component | Responsibility |
|---|---|
| Next.js frontend | Display chat, guidance, source labels, and appointment controls. |
| Frontend API client | Send requests, handle timeouts, and convert API errors into clear messages. |
| FastAPI routes | Validate requests and return defined response schemas. |
| Chat service | Manage conversation context and coordinate intent detection, retrieval, and generation. |
| RAG services | Find relevant sample policies and produce structured guidance. |
| Appointment service | Supply mock availability, validate selections, and confirm simulated bookings. |
| In-memory store | Hold sessions, messages, booking events, and reservations. |
| Local JSON data | Supply sample policies, fictional branches, and availability rules. |

Use one repository and two application processes. The backend will be a modular application, with separate files for each responsibility.

┌────────────────────────────────┐
│ Customer browser               │
│                                ├────────────────────────────┐
└────────────────────────────────┘                            │
                                                              │
                                                              │
┌────────────────────────────────┐                            │
│ Next.js interface              │                            │
│                                ├◄───────────────────────────┘
│                                ├──────────────────────────────┐
└────────────────────────────────┘                              │
                                                                │
                                                                │
┌────────────────────────────────┐                              │
│ Typed API client               │                              │
│                                ├◄─────────────────────────────┘
│                                ├──HTTP / JSON───────────────────┐
│                                ├◄───────────────────────────────╪───────────────────────┐
└────────────────────────────────┘                                │                       │
                                                                  │                       │
                                                                  │                       │
┌────────────────────────────────┐                                │                       │
│ FastAPI routes                 │                                │                       │
│                                ├◄───────────────────────────────┘                       │
│                                ├──────────────────────────────────┐                     │
│                                ├──────────────────────────────────╪───────────┐         │
│                                ├──────────────────────────────────╪───────────╪─────────┘
└────────────────────────────────┘                                  │           │
                                                                    │           │
                                                                    │           │
┌────────────────────────────────┐                                  │           │
│ Chat service                   │                                  │           │
│                                ├◄─────────────────────────────────┘           │
│                                ├────────────────────────────────────┐         │
│                                ├◄───────────────────────────────────╪─────┐   │
│                                ├◄───────────────────────────────────╪─────╪───╪───┐
│                                ├────────────────────────────────────╪─────╪───╪───╪─┐
└────────────────────────────────┘                                    │     │   │   │ │
                                                                      │     │   │   │ │
                                                                      │     │   │   │ │
┌────────────────────────────────┐                                    │     │   │   │ │
│ Intent detection               │                                    │     │   │   │ │
│                                ├◄───────────────────────────────────┘     │   │   │ │
│                                ├──────────────────────────────────────┐   │   │   │ │
└────────────────────────────────┘                                      │   │   │   │ │
                                                                        │   │   │   │ │
                                                                        │   │   │   │ │
┌────────────────────────────────┐                                      │   │   │   │ │
│ Policy retrieval               │                                      │   │   │   │ │
│                                ├◄─────────────────────────────────────┘   │   │   │ │
│                                ├────────────────────────────────────────┐ │   │   │ │
│                                ├────────────────────────────────────────╪─╪─┐ │   │ │
└────────────────────────────────┘                                        │ │ │ │   │ │
                                                                          │ │ │ │   │ │
                                                                          │ │ │ │   │ │
┌────────────────────────────────┐                                        │ │ │ │   │ │
│ Response generation            │                                        │ │ │ │   │ │
│                                ├◄───────────────────────────────────────┘ │ │ │   │ │
│                                ├──────────────────────────────────────────┘ │ │   │ │
└────────────────────────────────┘                                            │ │   │ │
                                                                              │ │   │ │
                                                                              │ │   │ │
┌────────────────────────────────┐                                            │ │   │ │
│ Local mock knowledge base      │                                            │ │   │ │
│                                ├◄───────────────────────────────────────────┘ │   │ │
└────────────────────────────────┘                                              │   │ │
                                                                                │   │ │
                                                                                │   │ │
┌────────────────────────────────┐                                              │   │ │
│ Appointment service            │                                              │   │ │
│                                ├◄─────────────────────────────────────────────┘   │ │
│                                ├────────────────────────────────────────────────┐ │ │
│                                ├──Confirmed booking event───────────────────────╪─┘ │
│                                ├────────────────────────────────────────────────╪───╪─┐
└────────────────────────────────┘                                                │   │ │
                                                                                  │   │ │
                                                                                  │   │ │
┌────────────────────────────────┐                                                │   │ │
│ Mock branches and availability │                                                │   │ │
│                                ├◄───────────────────────────────────────────────┘   │ │
└────────────────────────────────┘                                                    │ │
                                                                                      │ │
                                                                                      │ │
┌────────────────────────────────┐                                                    │ │
│ In-memory session store        │                                                    │ │
│                                ├◄───────────────────────────────────────────────────┘ │
│                                ├◄─────────────────────────────────────────────────────┘
└────────────────────────────────┘

### Main decisions and tradeoffs

- Keep business rules in Python. The frontend displays the backend’s decisions. It does not decide which channel a banking task requires.
- Use normal HTTP requests. Streaming and WebSockets are outside the MVP. Loading indicators are sufficient for the first version.
- Use React state and a reducer. A global state library is not needed for one main workspace.
- Use local JSON. Structured records make sample policies easy to validate and test.
- Use memory for runtime data. This removes database setup. Sessions and bookings will be lost when the backend restarts.
- Use small Python interfaces for replaceable services. Do not add an agent framework, message broker, or ML training pipeline.

## 2. Proposed directory structure

The following tree shows the planned application files. Standard generated files and Python package markers are omitted.

TD-Pre-branch-Web-App/
├── AGENTS.md
├── README.md
├── LICENSE
├── .gitignore
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── mock-data.md
│   └── demo-guide.md
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── components.json
│   ├── playwright.config.ts
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── error.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppHeader.tsx
│   │   │   │   └── PrototypeNotice.tsx
│   │   │   ├── chat/
│   │   │   │   ├── ChatWorkspace.tsx
│   │   │   │   ├── MessageList.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── MessageComposer.tsx
│   │   │   │   ├── SuggestedTasks.tsx
│   │   │   │   └── GuidanceCard.tsx
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentPanel.tsx
│   │   │   │   ├── AppointmentForm.tsx
│   │   │   │   └── BookingConfirmation.tsx
│   │   │   └── ui/
│   │   │       └── [selected shadcn/ui components]
│   │   ├── hooks/
│   │   │   ├── useConversation.ts
│   │   │   └── useAppointmentBooking.ts
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── client.ts
│   │   │   │   ├── conversations.ts
│   │   │   │   └── appointments.ts
│   │   │   ├── conversationReducer.ts
│   │   │   ├── dates.ts
│   │   │   └── utils.ts
│   │   └── types/
│   │       ├── api.generated.ts
│   │       ├── api.ts
│   │       └── ui.ts
│   └── tests/
│       └── e2e/
│           ├── chat.spec.ts
│           ├── booking.spec.ts
│           └── recovery.spec.ts
└── backend/
    ├── .env.example
    ├── requirements.txt
    ├── requirements-dev.txt
    ├── pytest.ini
    ├── app/
    │   ├── main.py
    │   ├── config.py
    │   ├── dependencies.py
    │   ├── api/
    │   │   ├── errors.py
    │   │   └── routes/
    │   │       ├── health.py
    │   │       ├── sessions.py
    │   │       ├── chat.py
    │   │       └── appointments.py
    │   ├── schemas/
    │   │   ├── common.py
    │   │   ├── chat.py
    │   │   ├── knowledge.py
    │   │   └── appointments.py
    │   ├── services/
    │   │   ├── chat_service.py
    │   │   ├── appointment_service.py
    │   │   └── rag/
    │   │       ├── interfaces.py
    │   │       ├── rule_based_intent.py
    │   │       ├── local_retriever.py
    │   │       └── mock_generator.py
    │   ├── repositories/
    │   │   ├── memory_store.py
    │   │   └── knowledge_loader.py
    │   └── data/
    │       ├── knowledge_base.json
    │       ├── branches.json
    │       └── availability_rules.json
    └── tests/
        ├── conftest.py
        ├── test_intent.py
        ├── test_retrieval.py
        ├── test_chat.py
        ├── test_appointments.py
        └── test_api.py

### File ownership and conventions

- app/page.tsx composes the page. It does not contain the chat or booking logic.
- Frontend hooks manage requests and UI state. Components handle presentation and user input.
- schemas/ defines the API contract through Pydantic.
- services/ contains business rules. Routes remain small.
- repositories/ handles data access. It does not select channels or produce responses.
- dependencies.py selects and connects the service implementations.
- docs/mock-data.md explains every simulated banking assumption.

Generate shared TypeScript API types from FastAPI’s OpenAPI schema with openapi-typescript. Commit the generated file. Keep frontend-only state types separate. Do not manually maintain a second copy of the API schemas.

The proposed AGENTS.md will include:

- Setup and validation commands.
- Responsibility boundaries between frontend, routes, services, and data access.
- Strict TypeScript and typed Python conventions.
- Instructions to regenerate API types after schema changes.
- Requirements to label mock information and simulated bookings.
- Instructions to preserve the license and avoid committing secrets.
- Requirements to test changed behaviour and update relevant documentation.
- Your instructions to use ASD-STE100 language for explanations and diagrams for architecture and relationships.

## 3. User interface and system flow

### Interface design

Use a green and white theme, dark readable text, light neutral surfaces, and clear spacing. Use a text title rather than an official TD logo.

The desktop layout will contain:

- A header with the application name, prototype label, “New conversation,” and “About this demo.”
- Suggested banking tasks in the empty chat state.
- A main conversation column with a fixed message composer.
- Structured guidance cards with a recommended channel, numbered steps, and mock source labels.
- An appointment panel beside the conversation when booking is relevant.

Below the desktop breakpoint, show the appointment form in an accessible full-width sheet. Preserve the conversation and unfinished form selections when the sheet closes.

Use selected shadcn/ui components for buttons, cards, alerts, labels, selects, and the mobile sheet. Use a native date input to keep the first booking form small. The project supports installation into Next.js. shadcn/ui documentation

Include keyboard operation, visible focus, labelled fields, status announcements, and focus return when the mobile panel closes.

### Chat flow

1. Create an anonymous session when the workspace loads.
2. Send the message and a request ID to FastAPI.
3. Load the session’s recent messages, active banking task, and booking context.
4. Detect the task with rules and phrase aliases.
5. Retrieve relevant sample policy records.
6. Produce a structured response from fixed templates and retrieved content.
7. Save the completed turn.
8. Return messages, guidance, source labels, and any booking action.
9. Update the chat and appointment panel.

Explicit topic changes replace the active task. Follow-up questions such as “What documents do I need?” use the active task. If there is no clear task, the assistant asks a clarification question.

Unknown questions receive an honest response that the sample knowledge base does not contain the answer. They must not receive an invented policy or an automatic branch recommendation.

### Initial banking coverage

Include sample records for:

- Opening a chequing account.
- Replacing a debit card.
- Opening a TFSA.
- Preparing appointment documents.
- Withdrawing cash.
- Checking a balance.
- Getting help with online banking access.
- Requesting a branch appointment.

The fixtures will demonstrate all four channels. For example, the demo can route account opening to online banking, cash withdrawal to an ATM, access support to phone banking, and TFSA guidance to a branch appointment.

These are test-data choices, not statements about TD policy. Each answer will identify its source as mock data.

### Booking flow

A structured open_booking action opens the panel when the user requests an appointment or a sample policy requires a branch visit. The action includes the purpose and the policy IDs used for preparation guidance.

This Mermaid diagram doesn't fit the current terminal width.
sequenceDiagram
    actor User
    participant UI as Chat and booking UI
    participant API as FastAPI
    participant Booking as Appointment service
    participant Chat as Chat service

    User->>UI: Ask about a branch task
    UI->>API: Send message
    API->>Chat: Process message
    Chat-->>UI: Guidance and open_booking action
    UI->>API: Request branches and available slots
    API-->>UI: Mock choices
    User->>UI: Select branch, date, time, and purpose
    User->>UI: Confirm simulated booking
    UI->>API: Submit selected slot and request ID
    API->>Booking: Validate and reserve slot
    Booking-->>API: Booking and confirmed event
    API->>Chat: Apply confirmed booking event
    Chat-->>API: Acknowledgement and checklist
    API-->>UI: Booking, event, and assistant turn
    UI-->>User: Display receipt and chat acknowledgement

The backend creates the authoritative booking event. The browser does not submit a second chat message claiming that a booking succeeded.

Booking confirmation and its chat acknowledgement are committed together in memory. A retry returns the same result. This prevents duplicate reservations and duplicate assistant messages.

## 4. API and data contracts

Use JSON over HTTP. All application routes use /api/v1.

The frontend calls FastAPI directly through NEXT_PUBLIC_API_BASE_URL. Allow the frontend origin explicitly in FastAPI’s CORS configuration. Different localhost ports are different origins. FastAPI CORS documentation

### Endpoints

| Method and path | Request | Response |
|---|---|---|
| GET /health | None | Status and mode: "mock". |
| POST /api/v1/sessions | Empty body | Session ID and expiry time. |
| POST /api/v1/chat | Session ID, request ID, message. | Completed chat turn. |
| GET /api/v1/branches | None | Fictional branch list. |
| GET /api/v1/appointments/availability | Branch ID, local date, purpose. | Available slots and branch timezone. |
| POST /api/v1/appointments | Session ID, request ID, branch ID, slot ID, purpose. | Simulated booking, event, and assistant turn. |

FastAPI also exposes /docs and /openapi.json.

### Main schemas

| Schema | Key fields |
|---|---|
| Session | session_id, expires_at. |
| ChatRequest | session_id, request_id, message. |
| ChatMessage | id, role: user | assistant, content, created_at. |
| ChatTurn | session_id, request_id, messages[], guidance, actions[]. |
| Guidance | intent, recommended_channel, reason, steps[], checklist[], sources[]. |
| SourceReference | policy_id, title, excerpt, provenance: "mock". |
| OpenBookingAction | type: "open_booking", purpose, policy_ids[]. |
| Branch | id, name, display_address, timezone, supported_purposes[], is_mock: true. |
| AppointmentSlot | id, branch_id, starts_at, ends_at. |
| BookingRequest | session_id, request_id, branch_id, slot_id, purpose. |
| Booking | id, branch_id, purpose, starts_at, ends_at, timezone, status: "simulated_confirmed". |
| BookingConfirmedEvent | id, type: "appointment.confirmed", session_id, booking_id, purpose, occurred_at, is_mock: true. |
| BookingResponse | booking, event, chat_turn. |
| ApiError | error: { code, message, field_errors? }. |

Use the channel values online, atm, phone, and branch. Guidance is nullable when the assistant needs clarification or cannot answer.

Use UUIDs for session, message, request, event, and booking IDs. Use stable string IDs for sample policies, branches, and slots.

### Validation and error handling

- Reject blank messages and messages longer than 2,000 characters.
- Validate purpose, branch support, slot ownership, and slot availability on the server.
- Return 422 for invalid fields, 404 for missing sessions or resources, and 409 for a slot conflict.
- Normalize errors into the same error schema.
- Preserve a failed message or form so the user can retry.
- Reuse the request ID on retries. Reject reuse with different request content.
- Use an in-memory lock for reservation checks so two requests cannot take the same slot.
- Show a session-expired message after expiry or a backend restart. Start a new session through an explicit UI action.
- Render response text without raw HTML.

### State and appointment defaults

- Keep frontend state in memory for the current page session. Refresh starts a new conversation.
- Expire backend sessions after 60 minutes of inactivity.
- Supply the most recent 20 messages plus active task and booking context to the pipeline.
- Run one backend worker while using in-memory storage.
- Use three fictional Ontario branches with America/Toronto as the timezone.
- Generate 30-minute slots for weekdays from 09:00 to 16:00 over the next 14 calendar days. Remove past and reserved slots.
- Store appointment timestamps with timezone offsets. Display the branch timezone explicitly.
- Do not request names, email addresses, phone numbers, or account numbers.
- Exclude cancellation and rescheduling from the MVP.

## 5. MVP implementation phases

### Phase 1: Project initialization and structure

- Preserve the existing Git repository and license.
- Create the frontend and backend structures.
- Configure TypeScript, Tailwind, ESLint, FastAPI, Pydantic, and Pytest.
- Add environment examples and ignore rules.
- Write AGENTS.md and the initial README.
- Add a health endpoint and a frontend connection check.
- Establish OpenAPI-to-TypeScript generation.

Completion check: Both processes start locally, and the frontend can reach FastAPI.

### Phase 2: Frontend layout and reusable components

- Build the header, prototype notice, chat workspace, and suggested tasks.
- Build message, guidance, source, loading, and error components.
- Build the responsive appointment panel shell.
- Add keyboard and focus behaviour.
- Keep temporary visual fixtures inside development and test code.

Completion check: The complete interface works at desktop and mobile widths with fixture data.

### Phase 3: Backend API and mock data

- Define Pydantic request, response, and knowledge schemas.
- Add approximately 12 sample policy records covering the listed tasks.
- Add fictional branches and availability rules.
- Validate all local data during startup.
- Implement session storage, appointment availability, error handling, and configuration.
- Regenerate frontend API types.

Completion check: API responses match the schemas, and invalid data fails clearly.

### Phase 4: Chatbot and banking task guidance

- Implement intent detection with phrase aliases and active-task context.
- Implement local retrieval and deterministic response generation.
- Connect the frontend to the chat endpoint.
- Display channel recommendations, numbered steps, and mock sources.
- Add clarification, unsupported-question, retry, and new-conversation behaviour.
- Prevent overlapping chat submissions.

Completion check: The supplied example questions and relevant follow-ups work through the real backend.

### Phase 5: Appointment booking integration

- Open the panel from structured chat actions.
- Prefill the purpose while allowing the user to change it.
- Load branches and slots from the API.
- Clear obsolete slot selections when branch, date, or purpose changes.
- Ignore outdated availability responses.
- Add confirmation, conflict recovery, and duplicate-request protection.
- Create the booking event and assistant checklist in the same backend operation.
- Make confirmed booking details available to later chat questions.

Completion check: A user can complete a booking from the conversation and ask about it afterwards.

### Phase 6: Testing, documentation, and local deployment

- Complete backend tests and browser journey tests.
- Run lint, TypeScript checks, and the frontend production build.
- Check keyboard access, small screens, and visible mock labels.
- Document setup, API contracts, sample policies, limitations, and the demonstration script.
- Test the application with a production frontend build and one FastAPI worker.

Completion check: A fresh checkout runs from the README without an API key or external banking service.

## 6. Future RAG integration

The MVP follows the RAG sequence, but uses local retrieval and fixed response templates. It does not claim to use an LLM.

### Replaceable interfaces

Define three small Python protocols:

IntentDetector.detect(message, context) -> IntentResult

Retriever.retrieve(query, intent, context) -> list[RetrievedPolicy]

Generator.generate(message, context, intent, policies) -> AssistantDraft

AssistantDraft uses a validated structure. The chat service checks its source IDs and supported actions before returning a response.

Each knowledge record contains:

id, title, intent, keywords, content,
recommended_channel, alternative_channels,
steps, preparation_checklist, appointment_purpose,
provenance

Every MVP record has provenance: "mock".

The local retriever first filters by the resolved task, then ranks matches using keyword overlap. It returns up to three records. Unrelated records must not be used to fill an empty result.

### Future replacement points

| Capability | MVP implementation | Future implementation |
|---|---|---|
| Intent detection | Rules and phrase aliases. | LLM classifier or improved rules. |
| Retrieval | Local JSON and keyword matching. | Embeddings and vector search. |
| Generation | Templates populated from retrieved records. | LLM with structured output validation. |
| Knowledge ingestion | Startup JSON validation. | Separate document loading, chunking, and indexing command. |
| Runtime storage | In-memory store. | Database-backed sessions and bookings. |

Future work would add provider adapters under services/rag/ and select them in dependencies.py. It would also add an offline indexing script and provider configuration.

The frontend, public API schemas, booking form, and booking event contract should remain unchanged.

A real generator must:

- Use retrieved sources for banking claims.
- Preserve mock labels when sources are still simulated.
- Treat retrieved document text as data.
- Return a clear unsupported response when evidence is missing.
- Keep appointment confirmation under server control.
- Store API keys only in backend configuration.

A vector database or real LLM does not make source material verified. Verified banking content would require a separate review process.

## 7. Development setup and testing

### Dependencies

| Area | Planned dependencies |
|---|---|
| Frontend runtime | Next.js App Router, React, React DOM. |
| Frontend styling | Tailwind CSS, its PostCSS integration, selected shadcn/ui dependencies, Lucide icons. |
| Frontend development | TypeScript, React/Node types, ESLint, eslint-config-next, openapi-typescript, Playwright. |
| Backend runtime | FastAPI, Uvicorn, Pydantic v2, pydantic-settings. |
| Backend development | Pytest and HTTPX. |

Use Python 3.12 and a supported Node.js LTS release that meets Next.js requirements. Pin compatible package versions during initialization and commit the dependency lock files. Next.js documents a minimum Node.js version of 20.9 and requires linting to run separately from the build. Next.js installation documentation

Use npm for the frontend and venv with pip for the backend. Keep pinned Python runtime dependencies in requirements.txt; let requirements-dev.txt include that file and the test dependencies.

### Environment variables

Frontend:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

Backend:

APP_ENV=development
CORS_ORIGINS=["http://localhost:3000"]
INTENT_PROVIDER=rules
RETRIEVAL_PROVIDER=local
GENERATION_PROVIDER=mock
SESSION_TTL_MINUTES=60

Resolve data file paths relative to the backend package. Validate environment settings at startup with pydantic-settings. FastAPI settings documentation

### Planned local commands

These commands apply after implementation. They are not to be run during this planning stage.

Backend terminal:

cd backend
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
cp .env.example .env
python -m uvicorn app.main:app --reload --port 8000

Frontend terminal:

cd frontend
npm ci
cp .env.example .env.local
npm run dev

Open the frontend at http://localhost:3000 and API documentation at http://localhost:8000/docs.

Planned validation commands:

# From backend/, with the virtual environment active
python -m pytest

# From frontend/
npm run lint
npm run typecheck
npm run build
npm run types:check
npx playwright install chromium
npm run test:e2e

types:check will compare generated TypeScript types with the running backend’s OpenAPI schema without overwriting committed files.

For local production verification, use npm run build and npm run start; run Uvicorn without --reload, with one worker.

### Practical test strategy

Use Pytest with FastAPI’s test client and HTTPX for API tests. This follows FastAPI’s documented testing approach. FastAPI testing documentation

Test these behaviours:

- Intent aliases, unclear requests, explicit topic changes, and contextual follow-ups.
- Relevant retrieval, empty retrieval, and preservation of mock source labels.
- All four channel recommendations.
- No unsupported policy claims.
- Valid booking, unsupported purpose, past slot, and unavailable slot.
- Two requests competing for one slot.
- Retried confirmation producing one booking and one chat acknowledgement.
- Session isolation, expiry, and restart recovery.
- Date and timezone behaviour with a fixed test clock.
- Chat and booking API responses matching the declared schemas.

Use Playwright for the main chat journey, the complete booking journey, and recovery from API errors. Include desktop and mobile viewports. Do not add tests for simple static component markup.

## 8. Acceptance criteria

The prototype is complete when:

- It starts from the README with no paid API key.
- It displays the university-project and simulation notices.
- It supports the four supplied example questions.
- It retains context for relevant follow-up questions.
- It demonstrates online, ATM, phone, and branch guidance.
- It displays steps and identifiable mock sources.
- It asks for clarification when intent is unclear.
- It reports missing knowledge without inventing banking policy.
- It opens the booking panel from the conversation.
- It supports branch, date, time, and purpose selection.
- It confirms a simulated booking and returns a structured event.
- It acknowledges the booking in chat and supplies a preparation checklist.
- A retry does not create a duplicate booking.
- Loading, empty, validation, and network-error states work.
- The interface works with a keyboard and at mobile widths.
- Backend tests, browser tests, lint, TypeScript checks, and the production build pass.

### Complete demonstration journey

1. The user asks, “Do I need to visit a branch to open a TFSA?”
2. The assistant retrieves the mock TFSA record, displays its simulation label, and recommends the sample branch route.
3. The booking panel opens with the purpose filled in.
4. The user asks, “What documents should I bring?”
5. The assistant uses the TFSA context and displays the sample preparation checklist.
6. The user selects a fictional branch, future date, and available time.
7. The user selects “Confirm simulated booking.”
8. The backend reserves the mock slot and records the booking event.
9. The interface displays the booking receipt.
10. The assistant states the branch, date, time, and preparation checklist.
11. The user asks, “Where is my appointment?”
12. The assistant answers from the confirmed booking context.

