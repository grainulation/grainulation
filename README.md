<p align="center">
  <img src="site/wordmark.svg" alt="grainulation" width="400">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@grainulation/grainulation"><img src="https://img.shields.io/npm/v/@grainulation/grainulation" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@grainulation/grainulation"><img src="https://img.shields.io/npm/dm/@grainulation/grainulation" alt="npm downloads"></a>
  <a href="https://github.com/grainulation/grainulation/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@grainulation/grainulation" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/@grainulation/grainulation" alt="node"></a>
  <a href="https://github.com/grainulation/grainulation/actions"><img src="https://github.com/grainulation/grainulation/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

<p align="center"><strong>Structured research for decisions that satisfice.</strong></p>

Most decisions fail not because the team lacked data, but because they lacked a process for turning data into evidence and evidence into conviction. Grainulation is that process.

You start with a question. You grow evidence: claims with types, confidence levels, and evidence tiers. You challenge what you find. You look for blind spots. And only when the evidence compiles -- when conflicts are resolved and gaps are acknowledged -- do you write the brief.

## Install

```bash
npm install -g @grainulation/grainulation
```

Or start a research sprint directly:

```bash
npx @grainulation/wheat init
```

## Quick start

```bash
grainulation              # Ecosystem overview
grainulation doctor       # Health check: which tools, which versions
grainulation setup        # Install the right tools for your role
grainulation wheat init   # Delegate to any tool
grainulation farmer start
```

## The ecosystem

Eight tools. Each does one thing. Use what you need.

| Tool | What it does | Install |
|------|-------------|---------|
| [wheat](https://github.com/grainulation/wheat) | Research engine. Grow structured evidence. | `npx @grainulation/wheat init` |
| [farmer](https://github.com/grainulation/farmer) | Permission dashboard. Approve AI actions in real time. | `npm i -g @grainulation/farmer` |
| [barn](https://github.com/grainulation/barn) | Shared tools. Templates, validators, sprint detection. | `npm i -g @grainulation/barn` |
| [mill](https://github.com/grainulation/mill) | Format conversion. Export to PDF, CSV, slides, 24 formats. | `npm i -g @grainulation/mill` |
| [silo](https://github.com/grainulation/silo) | Knowledge storage. Reusable claim libraries and packs. | `npm i -g @grainulation/silo` |
| [harvest](https://github.com/grainulation/harvest) | Analytics. Cross-sprint patterns and prediction scoring. | `npm i -g @grainulation/harvest` |
| [orchard](https://github.com/grainulation/orchard) | Orchestration. Multi-sprint coordination and dependencies. | `npm i -g @grainulation/orchard` |
| [grainulation](https://github.com/grainulation/grainulation) | Unified CLI. Single entry point to the ecosystem. | `npm i -g @grainulation/grainulation` |

**You don't need all eight.** Start with wheat. That's it. One command. Everything else is optional -- add tools when you feel the friction.

## The journey

```
Question --> Seed Claims --> Grow Evidence --> Compile Brief
  /init       /research       /challenge        /brief
                              /blind-spot
                              /witness
```

Every step is tracked. Every claim has provenance. Every decision is reproducible.

## Philosophy

**Satisficing over maximizing.** You will never have perfect information. The goal is enough evidence to make a defensible decision, not a perfect one.

**Claims over opinions.** Every finding is a typed claim with an evidence tier. "I think" becomes "r003: factual, tested -- measured 340ms p95 latency under load."

**Adversarial pressure over consensus.** The `/challenge` command exists because comfortable agreement is the enemy of good decisions.

**Process over heroics.** A reproducible sprint that anyone can pick up beats a brilliant analysis that lives in one person's head.

## Zero dependencies

Every grainulation tool runs on Node built-ins only. No npm install waterfall. No left-pad. No supply chain anxiety.

## The name

You build the crop (wheat), the steward (farmer), the barn, the mill, the silo, the harvest, the orchard -- and only then do you name the machine that connects them all.

Grainulation: the machine that processes the grain.

## License

MIT
