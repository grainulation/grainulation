# grainulation

**Structured research for decisions that satisfice.**

---

## Slow down and trust the process

Most decisions fail not because the team lacked data, but because they lacked a process for turning data into evidence and evidence into conviction.

Grainulation is that process.

You start with a question. Not an answer, not a hypothesis -- a question. Then you grow evidence: claims with types, confidence levels, and evidence tiers. You challenge what you find. You look for blind spots. You corroborate with external sources. And only when the evidence compiles -- when conflicts are resolved and gaps are acknowledged -- do you write the brief.

The brief is not the goal. The brief is the receipt. The goal is the thinking that got you there.

## The journey

```
 Question                Evidence                  Decision
    |                       |                         |
    |   /init               |   /research             |   /brief
    |   Define the          |   Grow claims           |   Compile the
    |   question            |   from multiple          |   recommendation
    |                       |   angles                |
    v                       v                         v
 +-------+   /research   +--------+   /compile    +-------+
 | Seed  | ------------> | Claims | ----------->  | Brief |
 +-------+               +--------+               +-------+
              ^                |
              |   /challenge   |   /witness
              |   /blind-spot  |   /feedback
              +----------------+
                 Adversarial
                  pressure
```

Every step is tracked. Every claim has provenance. Every decision is reproducible.

## The ecosystem

Eight tools. Each does one thing. Use what you need.

| Tool | What it does | Install |
|------|-------------|---------|
| **wheat** | Grows evidence. Research sprint engine. | `npx @grainulation/wheat init` |
| **farmer** | Permission dashboard. Approve AI actions in real time. | `npm i -g @grainulation/farmer` |
| **barn** | Shared tools. Claim schemas, templates, validators. | `npm i -g @grainulation/barn` |
| **mill** | Processes output. Export to PDF, slides, wiki. | `npm i -g @grainulation/mill` |
| **silo** | Stores knowledge. Reusable claim libraries. | `npm i -g @grainulation/silo` |
| **harvest** | Analytics. Cross-sprint learning and prediction scoring. | `npm i -g @grainulation/harvest` |
| **orchard** | Orchestration. Multi-sprint coordination. | `npm i -g @grainulation/orchard` |
| **grainulation** | The machine. Unified CLI and brand. | `npm i -g grainulation` |

**You don't need all eight.** Start with wheat. That's it. One command:

```bash
npx @grainulation/wheat init
```

Everything else is optional. Add tools when you feel the friction.

## Quick start

```bash
# Start a research sprint
npx @grainulation/wheat init

# Or install the unified CLI first
npm install -g @grainulation/grainulation

# See what's installed
grainulation doctor

# Interactive setup based on your role
grainulation setup

# Delegate to any tool
grainulation wheat init
grainulation farmer start
```

## The unified CLI

```bash
grainulation              # Ecosystem overview
grainulation doctor       # Health check: which tools, which versions
grainulation setup        # Install the right tools for your role
grainulation <tool> ...   # Delegate to any grainulation tool
```

The CLI is the wayfinder. It doesn't do the work -- it points you to the tool that does.

## Philosophy

**Satisficing over maximizing.** You will never have perfect information. The goal is enough evidence to make a defensible decision, not a perfect one.

**Claims over opinions.** Every finding is a typed claim with an evidence tier. "I think" becomes "r003: factual, tested -- measured 340ms p95 latency under load."

**Adversarial pressure over consensus.** The `/challenge` command exists because comfortable agreement is the enemy of good decisions. If nobody is stress-testing the claims, the research isn't done.

**Process over heroics.** A reproducible sprint that anyone can pick up beats a brilliant analysis that lives in one person's head.

## Zero dependencies

Every grainulation tool runs on Node built-ins only. No npm install waterfall. No left-pad. No supply chain anxiety. Just `node`, `fs`, `http`, and `crypto`.

## The name

The name comes last.

You build the crop (wheat), the steward (farmer), the barn, the mill, the silo, the harvest, the orchard -- and only then do you name the machine that connects them all.

Grainulation: the machine that processes the grain.

## License

MIT
