---
name: research
description: Use this skill whenever the user asks about a topic, wants to learn or understand something, needs information gathered from external or internal sources, or wants to explore options. Trigger on questions like "what is X", "how does Y work", "what are the options for Z", "research X", "explain X to me", "look into X", "find out about X", or anything that would benefit from web search, library/framework documentation, or codebase exploration to answer well. Also trigger when the user asks you to compare technologies, summarize findings, or investigate something — even if they don't use the word "research." When in doubt, use this skill rather than answering from training knowledge alone.
---

Answer the user's question by gathering information from the best available sources, then respond conversationally.

## Goal

Give the user a clear, grounded answer — not a wall of links, not a shallow summary. Use sources to go deeper than training knowledge allows and to keep the answer accurate and current.

## Delegation

Always handle this skill via a sub-agent (general-purpose). This keeps the main context lean and lets the research run without polluting the primary conversation.

The sub-agent should return its findings as a conversational response — not as a rigid report or a list of bullet points unless that's genuinely the best format for the content.

## Source priority

Use sources in this order, combining them when the question benefits from it:

1. **Exa web search** — for general topics, recent developments, comparisons, tutorials, and anything that benefits from current web content
2. **Context7 MCP** — for library and framework documentation; prefer this over web search when the question is specifically about a library's API, behavior, or patterns
3. **Codebase and local docs** — when the question is about this specific project, look at the actual code and any docs in the repo before going to external sources

Don't limit yourself to one source if combining gives a more complete answer.

## Response format

Write a freeform, conversational response that directly addresses what the user asked. The format should fit the content:

- For a conceptual question, explain it clearly
- For a comparison, lay out the trade-offs
- For a how-to, walk through the approach
- For a codebase question, ground the answer in actual code and files

Avoid rigid section headers unless the content genuinely calls for structure. Write like you're explaining to a colleague, not filing a report.

## Citing sources

Include links or source references only when they add real value — when the user would actually want to follow up, when the source is authoritative and specific, or when the content came directly from a page worth bookmarking.

Don't pad the response with a list of links. One well-chosen reference beats five generic ones.

## Written output

The default output is a chat response. Only write a file if:

- The user explicitly asks for it ("save this", "write a doc", "create a summary I can reference")
- OR the context makes it obvious a written artifact is wanted

When writing a file, use the path the user specifies. If no path is given, write to `docs/research/<topic>.md`.

## Boundaries

This is a research and explanation skill. Don't drift into:

- Writing or generating code (unless a small snippet genuinely clarifies the explanation)
- Building or implementing things
- Creating full documentation sets unless explicitly asked
- Exhaustive research that goes well beyond what the user's question actually needs
