'use strict';

/**
 * The grainulation ecosystem registry.
 *
 * Eight tools. Each grows from the same soil:
 * question -> evidence -> decision.
 */

const TOOLS = [
  {
    name: 'wheat',
    package: '@grainulation/wheat',
    icon: 'W',
    role: 'Grows evidence',
    description: 'Research sprint engine. Ask a question, grow claims, compile a brief.',
    category: 'core',
    entryPoint: true,
  },
  {
    name: 'farmer',
    package: '@grainulation/farmer',
    icon: 'F',
    role: 'Permission dashboard',
    description: 'Permission dashboard. Approve tool calls, review AI actions in real time.',
    category: 'core',
    entryPoint: false,
  },
  {
    name: 'barn',
    package: '@grainulation/barn',
    icon: 'B',
    role: 'Shared tools',
    description: 'Public utilities. Claim schemas, HTML templates, shared validators.',
    category: 'foundation',
    entryPoint: false,
  },
  {
    name: 'mill',
    package: '@grainulation/mill',
    icon: 'M',
    role: 'Processes output',
    description: 'Export and publish. Turn compiled research into PDFs, slides, wikis.',
    category: 'output',
    entryPoint: false,
  },
  {
    name: 'silo',
    package: '@grainulation/silo',
    icon: 'S',
    role: 'Stores knowledge',
    description: 'Reusable claim libraries. Share vetted claims across sprints and teams.',
    category: 'storage',
    entryPoint: false,
  },
  {
    name: 'harvest',
    package: '@grainulation/harvest',
    icon: 'H',
    role: 'Analytics & retrospectives',
    description: 'Cross-sprint learning. Track prediction accuracy, find blind spots over time.',
    category: 'analytics',
    entryPoint: false,
  },
  {
    name: 'orchard',
    package: '@grainulation/orchard',
    icon: 'O',
    role: 'Orchestration',
    description: 'Multi-sprint coordination. Run parallel research tracks, merge results.',
    category: 'orchestration',
    entryPoint: false,
  },
  {
    name: 'grainulation',
    package: 'grainulation',
    icon: 'G',
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
  return TOOLS.filter((t) => t.name !== 'grainulation');
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
