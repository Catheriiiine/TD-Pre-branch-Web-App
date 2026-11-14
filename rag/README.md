# RAG — future milestone

Documentation only. No pipeline runs in the current MVP.

Future responsibilities, subject to approval:

- Intent interfaces and implementations.
- Retrieval interfaces for local records and, later, vector search.
- Generation interfaces for a mock implementation and optional LLM providers.
- Provenance-aware outputs and tests for unsupported queries.

The current frontend selects canned scripts directly. It does not import this folder or the older Python drafts in `backend/app/services/rag/`.

Those older drafts remain in place to preserve existing changes. A future restructuring can move or replace them only with approval. No embeddings, provider SDKs, vector database, training pipeline, or external calls have been added.
