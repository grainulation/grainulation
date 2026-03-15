#!/usr/bin/env node
/**
 * grainulation serve — local HTTP server for the ecosystem control center
 *
 * Tool catalog, doctor health checks, scaffold actions, and
 * cross-tool navigation. SSE for live updates.
 * Zero npm dependencies (node:http only).
 *
 * Usage:
 *   grainulation serve [--port 9098]
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, readdirSync, statSync, mkdirSync, writeFileSync, watchFile } from 'node:fs';
import { join, resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

// ── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}

const PORT = parseInt(arg('port', '9098'), 10);

// ── Tool registry ─────────────────────────────────────────────────────────────

const TOOLS = [
  { name: 'wheat',       pkg: '@grainulation/wheat',       port: 9091, accent: '#fbbf24', role: 'Research sprint engine', category: 'core' },
  { name: 'farmer',      pkg: '@grainulation/farmer',      port: 9092, accent: '#fb923c', role: 'Permission dashboard', category: 'core' },
  { name: 'barn',        pkg: '@grainulation/barn',        port: 9093, accent: '#ef4444', role: 'Design system & templates', category: 'foundation' },
  { name: 'mill',        pkg: '@grainulation/mill',        port: 9094, accent: '#3b82f6', role: 'Export & publish engine', category: 'output' },
  { name: 'silo',        pkg: '@grainulation/silo',        port: 9095, accent: '#22d3ee', role: 'Reusable claim libraries', category: 'storage' },
  { name: 'harvest',     pkg: '@grainulation/harvest',     port: 9096, accent: '#34d399', role: 'Analytics & retrospectives', category: 'analytics' },
  { name: 'orchard',     pkg: '@grainulation/orchard',     port: 9097, accent: '#a3e635', role: 'Multi-sprint orchestrator', category: 'orchestration' },
  { name: 'grainulation', pkg: 'grainulation',             port: 9098, accent: '#94a3b8', role: 'Ecosystem entry point', category: 'meta' },
];

// ── State ─────────────────────────────────────────────────────────────────────

let state = {
  ecosystem: [],
  doctorResults: null,
  lastCheck: null,
};

const sseClients = new Set();

function broadcast(event) {
  const data = `data: ${JSON.stringify(event)}\n\n`;
  for (const res of sseClients) {
    try { res.write(data); } catch { sseClients.delete(res); }
  }
}

// ── Doctor — health checks ────────────────────────────────────────────────────

function detectTool(pkg) {
  // 1. Global npm
  try {
    const out = execSync(`npm list -g ${pkg} --depth=0 2>/dev/null`, { stdio: 'pipe', encoding: 'utf-8' });
    const match = out.match(new RegExp(escapeRegex(pkg) + '@(\\S+)'));
    if (match) return { installed: true, version: match[1], method: 'global' };
  } catch { /* not found */ }

  // 2. npx cache
  try {
    const prefix = execSync('npm config get cache', { stdio: 'pipe', encoding: 'utf-8' }).trim();
    const npxDir = join(prefix, '_npx');
    if (existsSync(npxDir)) {
      const entries = readdirSync(npxDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const pkgJson = join(npxDir, entry.name, 'node_modules', pkg, 'package.json');
        if (existsSync(pkgJson)) {
          try {
            const p = JSON.parse(readFileSync(pkgJson, 'utf8'));
            return { installed: true, version: p.version || 'installed', method: 'npx-cache' };
          } catch {
            return { installed: true, version: 'installed', method: 'npx-cache' };
          }
        }
      }
    }
  } catch { /* not found */ }

  // 3. Local node_modules
  const localPkg = join(process.cwd(), 'node_modules', pkg, 'package.json');
  if (existsSync(localPkg)) {
    try {
      const p = JSON.parse(readFileSync(localPkg, 'utf8'));
      return { installed: true, version: p.version || 'installed', method: 'local' };
    } catch { /* ignore */ }
  }

  // 4. Sibling source directory
  const siblingDir = join(__dirname, '..', '..', pkg.replace(/^@[^/]+\//, ''));
  const siblingPkg = join(siblingDir, 'package.json');
  if (existsSync(siblingPkg)) {
    try {
      const p = JSON.parse(readFileSync(siblingPkg, 'utf8'));
      if (p.name === pkg) {
        return { installed: true, version: p.version || 'source', method: 'source' };
      }
    } catch { /* ignore */ }
  }

  return { installed: false, version: null, method: null };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function runDoctor() {
  const nodeVersion = process.version;
  let npmVersion = 'unknown';
  try {
    npmVersion = execSync('npm --version', { stdio: 'pipe', encoding: 'utf-8' }).trim();
  } catch { /* ignore */ }

  const checks = [];

  // Environment checks
  checks.push({
    name: 'Node.js',
    status: parseInt(nodeVersion.slice(1)) >= 18 ? 'pass' : 'warning',
    detail: nodeVersion,
    category: 'environment',
  });

  checks.push({
    name: 'npm',
    status: npmVersion !== 'unknown' ? 'pass' : 'fail',
    detail: `v${npmVersion}`,
    category: 'environment',
  });

  // Tool checks
  const toolStatuses = [];
  for (const tool of TOOLS) {
    const result = detectTool(tool.pkg);
    const status = result.installed ? 'pass' : (tool.category === 'core' ? 'warning' : 'info');

    checks.push({
      name: tool.name,
      status,
      detail: result.installed ? `v${result.version} (${result.method})` : 'not installed',
      category: 'tools',
    });

    toolStatuses.push({
      ...tool,
      installed: result.installed,
      version: result.version,
      method: result.method,
    });
  }

  const passCount = checks.filter(c => c.status === 'pass').length;
  const warnCount = checks.filter(c => c.status === 'warning').length;
  const failCount = checks.filter(c => c.status === 'fail').length;

  return {
    checks,
    toolStatuses,
    summary: { pass: passCount, warning: warnCount, fail: failCount, total: checks.length },
    nodeVersion,
    npmVersion,
    timestamp: new Date().toISOString(),
  };
}

// ── Ecosystem — aggregate status ──────────────────────────────────────────────

function getEcosystem() {
  return TOOLS.map(tool => {
    const result = detectTool(tool.pkg);
    return {
      ...tool,
      installed: result.installed,
      version: result.version,
      method: result.method,
      url: `http://localhost:${tool.port}`,
    };
  });
}

// ── Scaffold — create project directory ───────────────────────────────────────

function scaffold(targetDir, options = {}) {
  const dir = resolve(targetDir);
  if (existsSync(dir) && readdirSync(dir).length > 0) {
    return { ok: false, error: 'Directory already exists and is not empty' };
  }

  mkdirSync(dir, { recursive: true });

  // claims.json
  writeFileSync(join(dir, 'claims.json'), JSON.stringify({
    claims: [],
    meta: { created: new Date().toISOString(), tool: 'grainulation' }
  }, null, 2) + '\n');

  // CLAUDE.md
  const question = options.question || 'What should we build?';
  writeFileSync(join(dir, 'CLAUDE.md'), `# Sprint\n\n**Question:** ${question}\n\n**Constraints:**\n- (add constraints here)\n\n**Done looks like:** (describe the output)\n`);

  // orchard.json (if multi-sprint)
  if (options.includeOrchard) {
    writeFileSync(join(dir, 'orchard.json'), JSON.stringify({
      sprints: [],
      settings: { sync_interval: 'manual' }
    }, null, 2) + '\n');
  }

  return { ok: true, path: dir, files: ['claims.json', 'CLAUDE.md'] };
}

// ── Refresh state ─────────────────────────────────────────────────────────────

function refreshState() {
  state.ecosystem = getEcosystem();
  state.doctorResults = runDoctor();
  state.lastCheck = new Date().toISOString();
  broadcast({ type: 'state', data: state });
}

// ── MIME types ────────────────────────────────────────────────────────────────

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

// ── HTTP server ───────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── SSE ──
  if (req.method === 'GET' && url.pathname === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write(`data: ${JSON.stringify({ type: 'state', data: state })}\n\n`);
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  // ── API: ecosystem ──
  if (req.method === 'GET' && url.pathname === '/api/ecosystem') {
    json(res, { tools: state.ecosystem, lastCheck: state.lastCheck });
    return;
  }

  // ── API: doctor ──
  if (req.method === 'GET' && url.pathname === '/api/doctor') {
    // Run fresh doctor check
    const results = runDoctor();
    json(res, results);
    return;
  }

  // ── API: tool detail ──
  if (req.method === 'GET' && url.pathname.startsWith('/api/tools/')) {
    const name = url.pathname.split('/').pop();
    const tool = state.ecosystem.find(t => t.name === name);
    if (!tool) {
      json(res, { error: 'Tool not found' }, 404);
      return;
    }
    json(res, tool);
    return;
  }

  // ── API: scaffold ──
  if (req.method === 'POST' && url.pathname === '/api/scaffold') {
    const body = await readBody(req);
    if (!body.path) {
      json(res, { error: 'Missing path' }, 400);
      return;
    }
    const result = scaffold(body.path, body);
    json(res, result, result.ok ? 200 : 400);
    return;
  }

  // ── Static files ──
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  const resolved = resolve(PUBLIC_DIR, '.' + filePath);

  if (!resolved.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }

  if (existsSync(resolved) && statSync(resolved).isFile()) {
    const ext = extname(resolved);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(readFileSync(resolved));
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

// ── Start ─────────────────────────────────────────────────────────────────────

refreshState();

server.listen(PORT, () => {
  const installed = state.ecosystem.filter(t => t.installed).length;
  console.log(`grainulation: serving on http://localhost:${PORT}`);
  console.log(`  tools: ${installed}/${TOOLS.length} installed`);
  console.log(`  doctor: ${state.doctorResults.summary.pass} pass, ${state.doctorResults.summary.warning} warn, ${state.doctorResults.summary.fail} fail`);
});
