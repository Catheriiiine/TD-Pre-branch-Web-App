from app.repositories.memory_store import ConversationContext
from app.schemas.chat import AssistantDraft, Guidance, OpenBookingAction
from app.schemas.knowledge import KnowledgeRecord, SourceReference
from app.services.rag.interfaces import IntentResult


class MockGenerator:
    def generate(self, message: str, context: ConversationContext, intent: IntentResult, policies: list[KnowledgeRecord]) -> AssistantDraft:
        if not policies:
            content = "Which banking task are you preparing for? Try opening a chequing account, replacing a debit card, or opening a TFSA." if intent.question_kind == "documents" else "I don't have a sample policy for that question. I can help with chequing accounts, debit cards, TFSAs, cash withdrawals, balance checks, online access, or a simulated appointment."
            return AssistantDraft(content=content)
        policy = policies[0]
        checklist = list(dict.fromkeys(item for record in policies for item in record.preparation_checklist))
        guidance = Guidance(
            intent=policy.intent,
            recommended_channel=policy.recommended_channel,
            reason=policy.content,
            steps=policy.steps,
            checklist=checklist,
            sources=[SourceReference(policy_id=record.id, title=record.title, excerpt=record.content) for record in policies],
        )
        content = "Here is your preparation checklist from our sample policy. These are demo requirements, not verified banking requirements." if intent.question_kind == "documents" else policy.content
        # Do not reopen a dismissed panel for a contextual document follow-up.
        open_panel = intent.wants_booking or (policy.recommended_channel == "branch" and intent.question_kind == "task")
        actions = [OpenBookingAction(purpose=policy.appointment_purpose or policy.intent, policy_ids=[record.id for record in policies])] if open_panel else []
        if intent.wants_booking:
            content += " You can choose a time in the appointment panel. No real appointment will be made."
        return AssistantDraft(content=content, guidance=guidance, actions=actions)
