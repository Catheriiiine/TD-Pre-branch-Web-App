# Demonstration guide

## Suggested walkthrough

1. Start the frontend and show the university-prototype notice.
2. Select **Open a chequing account**. Show the sample online-channel card and source label.
3. Select **Explore another task**, then **Withdraw cash**. Show the ATM example.
4. Select **Get help signing in** from the example list. Show the phone-channel example.
5. Start a new conversation and select **Explore a TFSA**.
6. The sample branch guidance opens the appointment panel. On mobile it opens as a sheet; close it to inspect the chat.
7. Select **What should I bring?** for a contextual sample checklist.
8. Select a fictional branch, purpose, future weekday, and time. Confirm the simulation.
9. Show the receipt and the assistant acknowledgement in the same conversation.
10. Select **Where is my appointment?**. Then refresh to demonstrate that there is no persistence.

## Other states to inspect

- Enter an unsupported question: the guide explains that it uses scripts and offers examples.
- Enter the exact displayed example questions: they work without clicking the cards.
- Ask for documents before selecting a task: the guide asks the user to choose a scenario.
- Select a weekend: the panel displays an empty-availability state.
- Confirm without choosing a time: a field-level message explains the missing selection.
- Change branch, purpose, or date after selecting a time: the old time is cleared.
- Reset while a reply is loading: the old reply must not appear in the new conversation.
- Press Tab to navigate and Escape to close a mobile sheet or About dialog.

## Scripted questions

- How do I open a chequing account?
- Can I replace my debit card online?
- Do I need to visit a branch to open a TFSA?
- Where can I withdraw cash?
- How can I check my balance?
- I need help accessing online banking.
- I'd like to book a branch appointment.

Follow-ups: “What documents should I bring to my appointment?”, “Show me the next steps.”, and “Where is my appointment?”. Matching ignores case, surrounding spaces, and one terminal punctuation mark. Other variations are intentionally unsupported: there is no intent detector.

## Limitations

All policy-like text is illustrative and unverified. Fictional branches do not identify real locations. Times do not reflect real availability. Confirmation does not create a reservation or contact anyone. No user information is collected. Chat, form, event, and receipt data exist only in React memory until refresh or reset.
