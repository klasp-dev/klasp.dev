# klasp v0.5.0 — soft-launch kit

Audience: **indie / AI-forward devs (primary)** and **agent-infra builders
(secondary)**. Tone: terse, honest, technical — the same voice as the README and
the site. No hype, no enterprise-speak. Lead with the demo, not the manifesto.

> **Go / no-go:** soft-launch **yes**, broad enterprise push **no**. Run the
> channels below. **Hold** platform-engineering / enterprise channels (Console.dev
> enterprise list, platform Slacks, "for teams" framing) until **v1.0**, when
> fail-closed mode + fleet visibility + a production reference exist. Pitching
> governance now over-promises what the product backs today and burns the first
> impression with exactly the evaluator who's hardest to win back.

---

## The one-liner

**klasp blocks AI coding agents on the same quality gates your humans hit — in
the agent's own loop, before the commit lands.**

Alt (builder framing): **A deterministic done-signal for autonomous coding
agents: structured pass/fail at the tool-call surface, not a log it ignores.**

---

## Pre-launch checklist (do these first)

1. **Ship the klasp.dev v0.5.0 refresh** (the site PR) — the landing page is the
   destination for every link below.
2. **Record the shareable asset** — an asciinema/GIF of `klasp demo`. This is the
   single most shareable unit; it carries the whole pitch in ~20s. Script in the
   appendix.
3. **"klasp gates klasp"** is live (root `klasp.toml` in the klasp repo, and now
   `klasp.dev` too) — say it; it's the cheapest credibility you have.
4. **SECURITY.md** merged (done) — evaluators check for it.

---

## Show HN

**Title:** `Show HN: klasp – block your AI coding agent on the same gates as your humans`

**Body:**
> AI agents commit broken code. They run green-ish locally, route around your
> pre-commit hook with `--no-verify`, force-push, and your CI eats the cost a few
> minutes later — after the agent's loop already closed and moved on.
>
> klasp wires your existing fmt / lint / type-check / test commands into the
> agent's *own* tool-call surface (e.g. Claude Code's PreToolUse hook) and the git
> hooks. When a gate fails the agent gets a structured "blocked — here's the file
> and line" verdict it can act on, so it fixes in the same loop instead of
> guessing or force-pushing. One `klasp.toml` is the single source of truth — the
> same gate guards your humans' pre-commit hook and the agent loop, so they can't
> drift.
>
> It's a Rust CLI. `cargo install klasp && klasp demo` shows it working without
> touching a repo. First-class for Claude Code, Codex, and Aider today; other
> surfaces via a subprocess plugin protocol. Fail-open by default — it never
> silently wedges your commits. Apache-2.0.
>
> v0.5.0 adds the zero-setup `klasp demo`, hook-conflict detection (won't clobber
> your husky/lefthook/pre-commit), and a second reference plugin that gates on
> agentic-flow receipts.
>
> It's pre-1.0 and honest about it — the config and plugin schemas stabilize at
> v1.0, and the security model is a quality gate, not a sandbox (SECURITY.md spells
> it out). Feedback very welcome, especially on the plugin protocol.
>
> Site: https://klasp.dev · Repo: https://github.com/klasp-dev/klasp

**Comment-thread prep (have these ready):**
- *"How is this different from pre-commit / husky?"* → Those guard humans; agents
  bypass them with `--no-verify` and don't *read* the failure. klasp fires at the
  agent surface and returns a structured verdict the agent acts on. `klasp init
  --adopt` keeps your existing husky/lefthook/pre-commit and adds agent coverage —
  no rip-and-replace.
- *"Can't the agent just bypass klasp too?"* → Yes — it's a quality gate for a
  cooperating agent, not a containment boundary. Honest about that in SECURITY.md.
  The value is the in-loop structured verdict, not jail.
- *"Why not just CI?"* → CI catches it after the loop closed and the spend
  happened. klasp catches it in-loop, in seconds.

---

## Reddit

**r/ClaudeAI / r/ChatGPTCoding** — title: *"I got tired of Claude Code committing
broken code and force-pushing, so I built a gate that blocks it in-loop"*
> Same pitch, first-person and concrete: the 11pm "I tabbed back and it had
> committed three times, one with `--no-verify`" moment. Lead with the `klasp
> demo` GIF. Ask what agents/checks people want supported. Link the site.

**r/LocalLLaMA** (builder lean) — title: *"Deterministic done-signal for
autonomous coding agents (structured gate verdict, plugin protocol)"*
> Lead with the gate contract: `klasp gate --format json` → versioned doc,
> exit 2 on fail, SARIF/JUnit out, subprocess plugin protocol. Mention the
> agentic-flow receipts plugin. This crowd wants the contract, not the story.

---

## X / Bluesky thread

1. AI agents commit broken code. They run green locally, `--no-verify` past your
   hook, force-push, and CI fails 6 minutes later — after the loop already moved
   on. 🧵
2. klasp blocks the agent on your *existing* fmt/lint/test gates — at the agent's
   own tool-call surface. It gets a structured "blocked, here's the line" verdict
   and fixes in the same loop. [klasp demo GIF]
3. One `klasp.toml`. Same gate for your humans' pre-commit hook and the agent
   loop — they can't drift. First-class for Claude Code, Codex, Aider.
4. v0.5.0: zero-setup `klasp demo`, won't-clobber-your-husky conflict detection, a
   receipts-gating reference plugin. Rust CLI, fail-open by default, Apache-2.0.
5. `cargo install klasp && klasp demo` · https://klasp.dev

---

## Builder channels (secondary, high-signal)

Post the builder-framed angle (gate contract + plugin protocol + agentic-flow):
- **agentic-flow / claude-flow / ruvnet** community spaces (the receipts plugin is
  a direct hook — lead with it there).
- **Latent Space** Discord, **aider** Discord, **Continue / Cline** Discords.
- `awesome-claude-code` and similar lists (PR to add klasp).
- Anthropic / Claude Developers Discord (indie + builder overlap).

---

## Sequencing

1. Site refresh live + `klasp demo` cast recorded.
2. **Show HN** (Tue–Thu, ~8–10am ET). Babysit the thread for the first 3 hours.
3. Same day: the two Reddit posts + the X/Bluesky thread.
4. Day 2–3: builder Discords + `awesome-*` list PRs, referencing the HN thread.
5. **Not yet:** enterprise/platform channels — revisit at v1.0.

---

## Appendix — `klasp demo` asciinema script

```sh
# record (install asciinema first):
asciinema rec klasp-demo.cast -c "klasp demo"
# convert to GIF for social (agg or svg-term):
agg klasp-demo.cast klasp-demo.gif
```
Keep it ≤25s, default terminal theme, dark background to match the site. The
without/with split is the payload — make sure the FAIL→fix→PASS beat is legible.
