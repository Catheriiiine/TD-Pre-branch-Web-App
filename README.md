# TD-Pre-branch-Web-App

A TD-inspired **university frontend prototype**. Explore scripted banking questions, sample service-channel recommendations, and a simulated branch appointment.

**Not affiliated with TD. All guidance, branches, and appointments are simulated. Do not enter personal or account information.**

## Current milestone

The only runnable application is `frontend/`. It works without Python, an API key, environment variables, or a backend server.

- Responsive Next.js interface with reusable components and a green-and-white theme.
- Seven scripted banking examples, covering online banking, ATM, phone, and branch channels.
- Follow-up buttons for next steps, sample documents, and a confirmed demo appointment.
- Fictional branch, purpose, date, and time selection.
- Simulated confirmation that adds a structured event and checklist to the conversation.
- Loading, unsupported-question, validation, and empty-availability states.
- Temporary React state only. Refresh or New conversation clears the demo.

This is **not an AI chatbot yet**. Typed questions match the displayed scripts exactly, ignoring case and terminal punctuation. Other input gets an explicit unsupported response. There is no intent detection, retrieval, LLM inference, account access, real reservation, or persistence.

## Run locally

Prerequisites: Node.js 22 or newer compatible with the installed Next.js release, and npm. The project was validated with Node.js 22.

```bash
cd frontend
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. No `.env` file is required. The API URL in `frontend/.env.example` is an unused future placeholder.

All JavaScript dependencies are installed locally in `frontend/node_modules`; no global npm packages are required. Python dependencies downloaded before the scope change are isolated in `backend/.venv`, which is ignored by Git and is not needed to run this milestone.

## Validate

From `frontend/`:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

On a machine without a Playwright browser, install Chromium into a project-local directory first:

```bash
PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright install chromium
```

The test configuration uses this local directory. If you already have a compatible browser installed, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its absolute path to avoid downloading another browser. Run `npm run build` before the browser tests. Tests start their own production frontend on port 3100; no backend is used. Do not rebuild while a browser test is running.

Production preview:

```bash
npm run build
npm run start
```

`npm run types:generate` and `npm run types:check` were reserved during initial full-stack setup. They intentionally report that API integration is deferred; they are not current validation commands.

## Repository map

```text
frontend/          Active Next.js app, mock fixtures, and frontend tests
backend/           Future backend documentation and preserved inactive Python drafts
rag/               Future RAG ownership and integration notes; documentation only
knowledge_base/    Future source-data requirements; documentation only
docs/              Architecture, milestone inventory, and demo guide
AGENTS.md          Current scope and conventions for future coding sessions
plan.md            User-owned original full-stack plan; preserved unchanged
```

The user narrowed the scope after initial backend scaffolding. Existing Python files have been preserved without deletion or further implementation. They do not form a runnable backend and are not connected to the frontend. See the [exact file inventory](docs/scope-map.md).

## Try the demo

1. Choose **Explore a TFSA**.
2. Read the clearly labelled sample branch recommendation.
3. Select **What should I bring?** to display the sample checklist. On mobile, close the booking sheet first.
4. Choose a fictional branch, a weekday, and a time in the appointment panel.
5. Select **Confirm simulated booking**.
6. Return to the conversation. The acknowledgement and checklist are now in chat.
7. Select **Where is my appointment?** to inspect the temporary booking context.
8. Select **New conversation** or refresh to start again.

For online, ATM, and phone examples, try chequing accounts, cash withdrawal, and sign-in help. Every channel choice is a fictional scenario, not a verified banking requirement.

## Documentation

- [Architecture and data flow](docs/architecture.md)
- [Current MVP and future milestones](docs/scope-map.md)
- [Demo guide and limitations](docs/demo-guide.md)
- [Backend status](backend/README.md)
- [Future RAG design](rag/README.md)
- [Future knowledge-base requirements](knowledge_base/README.md)

The existing [MIT license](LICENSE) is preserved.
