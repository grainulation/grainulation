# grainulator

**Structured research for decisions that satisfice.**

---

## Slow down and trust the process

Most decisions fail not because the team lacked data, but because they lacked a process for turning data into evidence and evidence into conviction.

Grainulator is that process.

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
| **wheat** | Grows evidence. Research sprint engine. | `npx @grainulator/wheat init` |
| **farmer** | Watches the field. Real-time permission dashboard. | `npm i -g @grainulator/farmer` |
| **grove** | Shared tools. Claim schemas, templates, validators. | `npm i -g @grainulator/grove` |
| **mill** | Processes output. Export to PDF, slides, wiki. | `npm i -g @grainulator/mill` |
| **silo** | Stores knowledge. Reusable claim libraries. | `npm i -g @grainulator/silo` |
| **harvest** | Analytics. Cross-sprint learning and prediction scoring. | `npm i -g @grainulator/harvest` |
| **field** | Orchestration. Multi-sprint coordination. | `npm i -g @grainulator/field` |
| **grainulator** | The machine. Unified CLI and brand. | `npm i -g grainulator` |

**You don't need all eight.** Start with wheat. That's it. One command:

```bash
npx @grainulator/wheat init
```

Everything else is optional. Add tools when you feel the friction.

## Quick start

```bash
# Start a research sprint
npx @grainulator/wheat init

# Or install the unified CLI first
npm install -g grainulator

# See what's installed
grainulator doctor

# Interactive setup based on your role
grainulator setup

# Delegate to any tool
grainulator wheat init
grainulator farmer start
```

## The unified CLI

```bash
grainulator              # Ecosystem overview
grainulator doctor       # Health check: which tools, which versions
grainulator setup        # Install the right tools for your role
grainulator <tool> ...   # Delegate to any grainulator tool
```

The CLI is the wayfinder. It doesn't do the work -- it points you to the tool that does.

## Philosophy

**Satisficing over maximizing.** You will never have perfect information. The goal is enough evidence to make a defensible decision, not a perfect one.

**Claims over opinions.** Every finding is a typed claim with an evidence tier. "I think" becomes "r003: factual, tested -- measured 340ms p95 latency under load."

**Adversarial pressure over consensus.** The `/challenge` command exists because comfortable agreement is the enemy of good decisions. If nobody is stress-testing the claims, the research isn't done.

**Process over heroics.** A reproducible sprint that anyone can pick up beats a brilliant analysis that lives in one person's head.

## Zero dependencies

Every grainulator tool runs on Node built-ins only. No npm install waterfall. No left-pad. No supply chain anxiety. Just `node`, `fs`, `http`, and `crypto`.

## The name

The name comes last.

You build the crop (wheat), the steward (farmer), the orchard (grove), the mill, the silo, the harvest, the field -- and only then do you name the machine that connects them all.

Grainulator: the machine that processes the grain.

## License

MIT
