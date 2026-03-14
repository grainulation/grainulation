'use strict';

const { execSync, spawn } = require('node:child_process');
const { getByName, getInstallable } = require('./ecosystem');

/**
 * Intent-based router.
 *
 * Given a command or nothing at all, figure out where to send the user.
 */

const DELEGATE_COMMANDS = new Set(
  getInstallable().map((t) => t.name)
);

function overview() {
  const { TOOLS } = require('./ecosystem');
  const lines = [
    '',
    '  \x1b[1;33mgrainulator\x1b[0m',
    '  Structured research for decisions that satisfice.',
    '',
    '  \x1b[2mEcosystem:\x1b[0m',
    '',
  ];

  for (const tool of TOOLS) {
    const installed = isInstalled(tool.package);
    const status = installed ? '\x1b[32m+\x1b[0m' : '\x1b[2m-\x1b[0m';
    lines.push(`    ${status} \x1b[1m${tool.name.padEnd(12)}\x1b[0m ${tool.role}`);
  }

  lines.push('');
  lines.push('  \x1b[2mStart here:\x1b[0m');
  lines.push('    npx @grainulator/wheat init');
  lines.push('');
  lines.push('  \x1b[2mCommands:\x1b[0m');
  lines.push('    grainulator doctor     Check ecosystem health');
  lines.push('    grainulator setup      Interactive setup wizard');
  lines.push('    grainulator <tool>     Delegate to a grainulator tool');
  lines.push('');

  return lines.join('\n');
}

function isInstalled(packageName) {
  try {
    if (packageName === 'grainulator') return true;
    execSync(`npm list -g ${packageName} --depth=0 2>/dev/null`, { stdio: 'pipe' });
    return true;
  } catch {
    try {
      require.resolve(packageName);
      return true;
    } catch {
      return false;
    }
  }
}

function delegate(toolName, args) {
  const tool = getByName(toolName);
  if (!tool) {
    console.error(`\x1b[31mUnknown tool: ${toolName}\x1b[0m`);
    console.error(`Run \x1b[1mgrainulator\x1b[0m to see available tools.`);
    process.exit(1);
  }

  const child = spawn('npx', [tool.package, ...args], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', (code) => {
    process.exit(code ?? 0);
  });

  child.on('error', (err) => {
    console.error(`\x1b[31mFailed to run ${tool.package}: ${err.message}\x1b[0m`);
    console.error(`Try: npm install -g ${tool.package}`);
    process.exit(1);
  });
}

function route(args) {
  const command = args[0];
  const rest = args.slice(1);

  // No args — show overview
  if (!command) {
    console.log(overview());
    return;
  }

  // Built-in commands
  if (command === 'doctor') {
    require('./doctor').run();
    return;
  }
  if (command === 'setup') {
    require('./setup').run();
    return;
  }
  if (command === 'help' || command === '--help' || command === '-h') {
    console.log(overview());
    return;
  }
  if (command === '--version' || command === '-v') {
    const pkg = require('../package.json');
    console.log(`grainulator v${pkg.version}`);
    return;
  }

  // Delegate to a tool
  if (DELEGATE_COMMANDS.has(command)) {
    delegate(command, rest);
    return;
  }

  // Unknown
  console.error(`\x1b[31mUnknown command: ${command}\x1b[0m`);
  console.log(overview());
  process.exit(1);
}

module.exports = { route, overview, isInstalled, delegate };
