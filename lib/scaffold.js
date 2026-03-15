/**
 * scaffold.js — create a new project directory with tool configs
 *
 * Sets up claims.json, CLAUDE.md, and optional orchard.json
 * for a new wheat sprint or multi-sprint project.
 * Zero npm dependencies.
 */

import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * Scaffold a new sprint directory.
 *
 * @param {string} targetDir - path to create
 * @param {object} [opts] - options
 * @param {string} [opts.question] - sprint question
 * @param {boolean} [opts.includeOrchard] - add orchard.json for multi-sprint
 * @param {string[]} [opts.constraints] - initial constraints
 * @returns {{ ok: boolean, path?: string, files?: string[], error?: string }}
 */
export function scaffold(targetDir, opts = {}) {
  const dir = resolve(targetDir);

  if (existsSync(dir)) {
    try {
      if (readdirSync(dir).length > 0) {
        return { ok: false, error: 'Directory already exists and is not empty' };
      }
    } catch {
      return { ok: false, error: 'Cannot read directory' };
    }
  }

  mkdirSync(dir, { recursive: true });
  const files = [];

  // claims.json
  const claims = {
    claims: [],
    meta: {
      created: new Date().toISOString(),
      tool: 'grainulation',
      version: '0.1.0',
    },
  };
  writeFileSync(join(dir, 'claims.json'), JSON.stringify(claims, null, 2) + '\n');
  files.push('claims.json');

  // CLAUDE.md
  const question = opts.question || 'What should we build?';
  const constraints = (opts.constraints || [])
    .map(c => `- ${c}`)
    .join('\n') || '- (add constraints here)';

  const claudeMd = [
    '# Sprint',
    '',
    `**Question:** ${question}`,
    '',
    '**Constraints:**',
    constraints,
    '',
    '**Done looks like:** (describe the output)',
    '',
  ].join('\n');

  writeFileSync(join(dir, 'CLAUDE.md'), claudeMd);
  files.push('CLAUDE.md');

  // orchard.json for multi-sprint
  if (opts.includeOrchard) {
    const orchard = {
      sprints: [],
      settings: { sync_interval: 'manual' },
    };
    writeFileSync(join(dir, 'orchard.json'), JSON.stringify(orchard, null, 2) + '\n');
    files.push('orchard.json');
  }

  // Subdirectories
  for (const sub of ['research', 'prototypes', 'output']) {
    mkdirSync(join(dir, sub), { recursive: true });
  }

  return { ok: true, path: dir, files };
}
