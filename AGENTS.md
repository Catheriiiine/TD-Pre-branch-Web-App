# Development conventions

This is a local university prototype. It is not a TD service.

## Approved current scope — frontend only

The user narrowed the scope after initial scaffolding. These instructions take precedence over the future conventions below.

- Finish only the Next.js frontend with reusable UI, scripted chat examples, channel cards, and a simulated appointment panel.
- Keep all active demo fixtures in `frontend/src/lib/demo/`. Use exact script selection, not an intent classifier.
- Keep state in React memory. Do not add localStorage, sessionStorage, cookies, a database, or server sessions.
- Do not implement or run FastAPI endpoints, backend services, intent detection, retrieval, or LLM generation.
- Preserve the existing Python drafts unchanged. They are inactive, incomplete future work. Do not move, delete, or revert them without user approval.
- The top-level `backend/`, `rag/`, and `knowledge_base/` folders document future ownership; they are not frontend dependencies.
- Current checks: from `frontend/`, run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`.
- Python packages, already installed before scope clarification, are isolated in `backend/.venv`. JavaScript packages are local in `frontend/node_modules`. Never install packages globally.
- `types:generate` and `types:check` are reserved future commands and intentionally unavailable. Current types are in `src/types/demo.ts`.
- See `docs/scope-map.md` for the exact current/future file inventory.

## General and future full-stack conventions

The full-stack conventions below were written before the scope change. Backend commands and generated API types apply only after that future milestone is explicitly approved.

- Use ASD-STE100 language when explaining work to the user. This rule does not apply to generated files or code.
- Use diagrams to explain architecture, modes, and relationships.
- Keep the Next.js UI in `frontend/` and all banking decisions in `backend/`.
- Keep routes small. Services own business rules; repositories own data access.
- Use strict TypeScript, Python type hints, and Pydantic API models.
- Regenerate API types with `cd frontend && npm run types:generate` after schema changes. Never hand-edit `api.generated.ts`.
- All policy data and bookings must be clearly labelled simulated. Do not add personal data collection, authentication, real banking links, payments, or external services without a scope change.
- Preserve the LICENSE and user-owned plan.md. Never commit secrets, virtual environments, or build output.
- Add behaviour tests for changed business rules and update relevant docs.
- Backend checks: `cd backend && .venv/bin/python -m pytest`.
- Frontend checks: `cd frontend && npm run lint && npm run typecheck && npm run build`.
- Start the backend before `npm run types:check` or `npm run test:e2e`; see README for commands.
- In-memory storage requires one backend worker. Booking confirmation and its chat event must remain atomic and idempotent.
- No service keys are needed. Future provider adapters must preserve source labels and validated output contracts.
