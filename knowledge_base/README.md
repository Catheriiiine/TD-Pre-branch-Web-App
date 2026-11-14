# Knowledge base — future milestone

Documentation only. No policy corpus, loader, or retrieval index is active in this milestone.

The current frontend presentation fixtures live in `frontend/src/lib/demo/scenarios.ts`. They are not verified bank policies and are not an operational knowledge base.

If a future knowledge base is approved, each record should have a stable ID, title, task, source text, provenance, review status, and source reference. Mock records must remain explicitly labelled mock. Real source material must not become “verified” merely because it has been indexed or retrieved.

Proposed future organization:

```text
knowledge_base/
  mock/          Clearly labelled sample records
  sources/       Approved source documents and provenance
  README.md      Content rules, review process, and update instructions
```

Only this README exists now. No banking documents have been downloaded or presented as official policy.
