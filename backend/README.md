# Backend — future milestone

This folder is **not a runnable service** in the current frontend MVP.

Some Python schema, configuration, error-handling, repository, and RAG drafts were created before the scope was narrowed. They are preserved unchanged, not connected, and not validated as a working backend. There are no HTTP endpoints or application entrypoint. The knowledge loader references future data files that do not yet exist.

The current frontend needs no Python environment or backend command. A local ignored `.venv` was created and dependencies downloaded before clarification; it remains isolated and unused.

After explicit approval, this folder could own FastAPI routes, application services, validation, and appointment management. The future `rag/` and `knowledge_base/` top-level folders would own their separate concerns. Any move or removal of preserved drafts requires approval.

See [the full inventory](../docs/scope-map.md) and [architecture](../docs/architecture.md).
