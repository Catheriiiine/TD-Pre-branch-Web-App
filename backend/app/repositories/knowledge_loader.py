import json
from pathlib import Path

from pydantic import TypeAdapter

from app.schemas.appointments import AvailabilityRules, Branch
from app.schemas.knowledge import KnowledgeRecord


def load_data(directory: Path) -> tuple[list[KnowledgeRecord], list[Branch], AvailabilityRules]:
    policies = TypeAdapter(list[KnowledgeRecord]).validate_json((directory / "knowledge_base.json").read_text())
    branches = TypeAdapter(list[Branch]).validate_json((directory / "branches.json").read_text())
    rules = AvailabilityRules.model_validate(json.loads((directory / "availability_rules.json").read_text()))
    if len({record.id for record in policies}) != len(policies):
        raise ValueError("Knowledge IDs must be unique")
    if len({branch.id for branch in branches}) != len(branches):
        raise ValueError("Branch IDs must be unique")
    if not policies or not branches or rules.start_hour >= rules.end_hour:
        raise ValueError("The demo needs policies, branches, and valid opening hours")
    return policies, branches, rules
