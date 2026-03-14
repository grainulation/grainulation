'use strict';

const { execSync } = require('node:child_process');
const { getInstallable } = require('./ecosystem');

/**
 * Health check.
 *
 * Scans the system for installed grainulator tools,
 * reports versions, and flags missing pieces.
 */

function getVersion(packageName) {
  try {
    const out = execSync(`npm list -g ${packageName} --depth=0 2>/dev/null`, {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    const match = out.match(new RegExp(`${packageName}@(\\S+)`));
    return match ? match[1] : 'installed';
  } catch {
    return null;
  }
}

function getNodeVersion() {
  return process.version;
}

function getNpmVersion() {
  try {
    return execSync('npm --version', { stdio: 'pipe', encoding: 'utf-8' }).trim();
  } catch {
    return 'not found';
  }
}

function run() {
  const tools = getInstallable();
  let installed = 0;
  let missing = 0;

  console.log('');
  console.log('  \x1b[1;33mgrainulator doctor\x1b[0m');
  console.log('  Checking ecosystem health...');
  console.log('');

  // Environment
  console.log('  \x1b[2mEnvironment:\x1b[0m');
  console.log(`    Node     ${getNodeVersion()}`);
  console.log(`    npm      v${getNpmVersion()}`);
  console.log('');

  // Tools
  console.log('  \x1b[2mTools:\x1b[0m');
  for (const tool of tools) {
    const version = getVersion(tool.package);
    if (version) {
      installed++;
      console.log(`    \x1b[32m\u2713\x1b[0m ${tool.name.padEnd(12)} ${version}`);
    } else {
      missing++;
      console.log(`    \x1b[2m\u2717 ${tool.name.padEnd(12)} not installed\x1b[0m`);
    }
  }

  console.log('');

  // Summary
  if (missing === tools.length) {
    console.log('  \x1b[33mNo grainulator tools installed yet.\x1b[0m');
    console.log('  Start with: npx @grainulator/wheat init');
  } else if (missing > 0) {
    console.log(`  \x1b[32m${installed} installed\x1b[0m, \x1b[2m${missing} not installed\x1b[0m`);
    console.log('  Run \x1b[1mgrainulator setup\x1b[0m to install what you need.');
  } else {
    console.log('  \x1b[32mAll tools installed. Full ecosystem ready.\x1b[0m');
  }

  console.log('');
}

module.exports = { run, getVersion };
