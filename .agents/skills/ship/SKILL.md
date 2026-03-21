---
name: ship
description: "Ship changes end-to-end: analyze diffs, create atomic conventional commits, push, and open an assigned PR with a rich description. Use this skill whenever the user says 'ship it', 'ship my changes', 'commit and create a PR', 'push and PR', 'let's wrap up', or asks to commit, push, and create a pull request. Also trigger when the user mentions atomic commits followed by a PR, wants to package their work for review, or says anything like 'let's get this merged'. If the user asks to commit AND create a PR in the same breath, this is the skill to use — even if they don't say 'ship'."
---

# Ship

Analyze changes, create atomic conventional commits, push, and open an assigned PR — all in one pass.

The goal is to get from "I have local changes" to "here's the PR link" as fast as possible without sacrificing commit quality or PR clarity.

## Step 1 — Gather state

Run these in parallel to get a full snapshot in one round-trip:

```bash
git status --porcelain
git diff
git diff --staged
git branch --show-current
git log --oneline -5
```

If there are zero changes (clean working tree, nothing staged), tell the user and stop.

## Step 2 — Ask for target branch

Before doing anything else, ask the user:

> Which branch should this PR target? (e.g. `main`, `dev`, `staging`)

Wait for their answer. Never assume. This avoids pushing work toward the wrong base.

## Step 3 — Analyze and group

Read every diff hunk and group related changes into logical commits. Each commit = one coherent idea.

**Grouping signals:**
- Files implementing the same feature or fix → one commit
- Test files → group with the production code they cover
- Config, tooling, or dependency changes → separate commit
- Pure formatting or style changes → separate commit
- Unrelated changes → separate commits

If everything is one logical change, make one commit. Don't split artificially — atomicity means "one idea per commit", not "one file per commit".

## Step 4 — Commit each group

For each group, stage and commit:

```bash
git add <files>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<body — only if the what isn't obvious>
EOF
)"
```

**Conventional commit rules:**
- **Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore
- **Scope:** area affected (component, module, config file)
- **Description:** imperative mood, present tense, lowercase, no trailing period, under 72 chars
- **Body:** only when the description alone doesn't convey the reasoning

Commit directly — no pausing for confirmation. The user trusts the analysis.

**Safety:** Stage specific files only. Never use `git add .` or `git add -A`. Never skip hooks. If a hook fails, fix the issue and create a new commit (don't amend).

## Step 5 — Push

```bash
git push origin HEAD
```

If the branch has no upstream yet:

```bash
git push -u origin HEAD
```

## Step 6 — Create the PR

Run these in parallel to gather what you need for the PR:

```bash
gh api user --jq '.login'
gh label list --json name,description
```

Check whether a PR template exists:

```bash
cat .github/pull_request_template.md 2>/dev/null
```

**If a template exists:** follow its structure and fill every section with substance.

**If no template exists:** write a clear freeform PR with a title and description that explains the purpose of the changes — what problem it solves, what was changed, and any context a reviewer would need.

---

**Title:** A short conventional-commit-style summary of the overall change. If there's one commit, match its message. If there are several, synthesize the theme. Under 70 characters.

**Description (template or freeform):**
- Start from the beginning — explain the idea, the problem, and how it's solved
- Someone reading this should understand the full context without opening the code
- When it helps, use analogies or Mermaid diagrams to illustrate architecture, data flow, or component relationships
- Be thorough but not padded — every sentence should earn its place

**Labels:** From the list returned by `gh label list`, pick the ones that fit. Use the label names and descriptions to decide — don't apply labels that don't match the nature of the change. It's fine to apply multiple labels if they all apply.

```bash
gh pr create \
  --title "<title>" \
  --body "$(cat <<'EOF'
<filled description>
EOF
)" \
  --base <target-branch> \
  --assignee <detected-username> \
  --label "<label1>" --label "<label2>"
```

Omit `--label` flags if no labels are a good fit.

## Step 7 — Done

Output the PR URL. That's it.

## Principles

**Token efficiency matters.** Gather state in one batch. Analyze once. Don't re-read files already visible in the diff. Keep commit messages tight. PR descriptions should be thorough but not padded.

**Move fast, be safe.** Commit without confirmation, but never force-push, never amend, never skip hooks, and always stage files explicitly.
