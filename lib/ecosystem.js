'use strict';

/**
 * The grainulator ecosystem registry.
 *
 * Eight tools. Each grows from the same soil:
 * question -> evidence -> decision.
 */

const TOOLS = [
  {
    name: 'wheat',
    package: '@grainulator/wheat',
    icon: '\u{1F33E}',
    role: 'Grows evidence',
    description: 'Research sprint engine. Ask a question, grow claims, compile a brief.',
    category: 'core',
    entryPoint: true,
  },
  {
    name: 'farmer',
    package: '@grainulator/farmer',
    icon: '\u{1F9D1}\u200D\u{1F33E}',
    role: 'Permission dashboard',
    description: 'Permission dashboard. Approve tool calls, review AI actions in real time.',
    category: 'core',
    entryPoint: false,
  },
  {
    name: 'barn',
    package: '@grainulator/barn',
    icon: '\u{1F333}',
    role: 'Shared tools',
    description: 'Public utilities. Claim schemas, HTML templates, shared validators.',
    category: 'foundation',
    entryPoint: false,
  },
  {
    name: 'mill',
    package: '@grainulator/mill',
    icon: '\u{1F3ED}',
    role: 'Processes output',
    description: 'Export and publish. Turn compiled research into PDFs, slides, wikis.',
    category: 'output',
    entryPoint: false,
  },
  {
    name: 'silo',
    package: '@grainulator/silo',
    icon: '\u{1F3DB}\uFE0F',
    role: 'Stores knowledge',
    description: 'Reusable claim libraries. Share vetted claims across sprints and teams.',
    category: 'storage',
    entryPoint: false,
  },
  {
    name: 'harvest',
    package: '@grainulator/harvest',
    icon: '\u{1F33B}',
    role: 'Analytics & retrospectives',
    description: 'Cross-sprint learning. Track prediction accuracy, find blind spots over time.',
    category: 'analytics',
    entryPoint: false,
  },
  {
    name: 'orchard',
    package: '@grainulator/orchard',
    icon: '\u{1F3DE}\uFE0F',
    role: 'Orchestration',
    description: 'Multi-sprint coordination. Run parallel research tracks, merge results.',
    category: 'orchestration',
    entryPoint: false,
  },
  {
    name: 'grainulator',
    package: 'grainulator',
    icon: '\u2699\uFE0F',
    role: 'The machine',
    description: 'Unified CLI and brand. Routes to the right tool, checks ecosystem health.',
    category: 'meta',
    entryPoint: false,
  },
];

function getAll() {
  return TOOLS;
}

function getByName(name) {
  return TOOLS.find((t) => t.name === name);
}

function getInstallable() {
  return TOOLS.filter((t) => t.name !== 'grainulator');
}

function getCategories() {
  const cats = {};
  for (const tool of TOOLS) {
    if (!cats[tool.category]) cats[tool.category] = [];
    cats[tool.category].push(tool);
  }
  return cats;
}

module.exports = { TOOLS, getAll, getByName, getInstallable, getCategories };
