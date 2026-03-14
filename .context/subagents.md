# Subagent Patterns

## Core Concept

The main agent acts as an **orchestrator** that delegates tasks to sub-agents. Each sub-agent receives initial instructions, works independently, and returns results. The orchestrator does not reprocess the sub-agents' internal work -- only the final results are passed back.

This pattern reduces token usage and keeps the orchestrator focused on coordination.

## Benefits

- **Token efficiency:** Sub-agents use their own context window. The orchestrator only sees results.
- **Parallel work:** Multiple sub-agents can work simultaneously on different tasks.
- **Specialization:** Each sub-agent can be given task-specific context and skills.
- **Isolation:** Sub-agent failures don't pollute the orchestrator's context.

## Delegation Pattern

1. **Orchestrator** receives the user's request.
2. **Orchestrator** breaks the task into sub-tasks.
3. For each sub-task, the orchestrator launches a **sub-agent** with:
   - Clear instructions describing the task.
   - Relevant file paths or context references.
   - Expected output format.
4. **Sub-agent** performs the work and returns a concise result.
5. **Orchestrator** aggregates results and responds to the user.

## Git Worktrees (ccmanager)

For tasks that require modifying files in parallel (e.g., two agents working on different features), git worktrees prevent conflicts:

- Each sub-agent works in its own worktree (separate working directory, same repo).
- Changes are isolated per branch.
- The orchestrator coordinates merging when all sub-agents complete.

**Tool:** ccmanager (https://github.com/kbwo/ccmanager) -- experimental.

## Feedback Loop

After a sub-agent returns results:

1. The orchestrator reviews the output.
2. If the result needs refinement, the orchestrator can re-delegate with additional context.
3. The cycle continues until the task meets requirements.

## When to Use Sub-agents

- **Multi-file refactoring** across different areas of the codebase.
- **Research tasks** that require exploring documentation or codebases.
- **Parallel implementation** of independent features.
- **Code review** where one agent writes and another reviews.

## When NOT to Use Sub-agents

- Simple, single-file changes.
- Tasks that require deep sequential reasoning across the full codebase.
- When the overhead of delegation exceeds the task complexity.
