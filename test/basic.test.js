'use strict';

const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const path = require('node:path');

const BIN = path.join(__dirname, '..', 'bin', 'grainulator.js');
const run = (args = '') =>
  execSync(`node ${BIN} ${args}`, { encoding: 'utf-8', timeout: 10_000 });

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  \x1b[32m\u2713\x1b[0m ${name}`);
  } catch (err) {
    failed++;
    console.log(`  \x1b[31m\u2717\x1b[0m ${name}`);
    console.log(`    ${err.message}`);
  }
}

console.log('\n  grainulator tests\n');

// ── Ecosystem registry ──────────────────────────────────────────

test('ecosystem exports all 8 tools', () => {
  const { TOOLS } = require('../lib/ecosystem');
  assert.equal(TOOLS.length, 8);
});

test('ecosystem includes wheat as entry point', () => {
  const { getByName } = require('../lib/ecosystem');
  const wheat = getByName('wheat');
  assert.ok(wheat);
  assert.equal(wheat.entryPoint, true);
  assert.equal(wheat.package, '@grainulator/wheat');
});

test('ecosystem getInstallable excludes grainulator itself', () => {
  const { getInstallable } = require('../lib/ecosystem');
  const tools = getInstallable();
  assert.equal(tools.length, 7);
  assert.ok(!tools.find((t) => t.name === 'grainulator'));
});

test('ecosystem getCategories groups correctly', () => {
  const { getCategories } = require('../lib/ecosystem');
  const cats = getCategories();
  assert.ok(cats.core);
  assert.ok(cats.meta);
});

// ── CLI basics ──────────────────────────────────────────────────

test('no args shows ecosystem overview', () => {
  const out = run();
  assert.ok(out.includes('grainulator'));
  assert.ok(out.includes('wheat'));
  assert.ok(out.includes('Ecosystem'));
});

test('--version prints version', () => {
  const out = run('--version');
  assert.match(out.trim(), /^grainulator v\d+\.\d+\.\d+$/);
});

test('--help shows overview', () => {
  const out = run('--help');
  assert.ok(out.includes('grainulator'));
  assert.ok(out.includes('doctor'));
});

test('unknown command exits with error', () => {
  try {
    run('nonexistent-command-xyz');
    assert.fail('should have thrown');
  } catch (err) {
    assert.ok(err.status !== 0);
  }
});

// ── Doctor ──────────────────────────────────────────────────────

test('doctor runs without error', () => {
  const out = run('doctor');
  assert.ok(out.includes('doctor'));
  assert.ok(out.includes('Node'));
  assert.ok(out.includes('npm'));
});

// ── Summary ─────────────────────────────────────────────────────

console.log('');
if (failed > 0) {
  console.log(`  \x1b[31m${failed} failed\x1b[0m, ${passed} passed\n`);
  process.exit(1);
} else {
  console.log(`  \x1b[32m${passed} passed\x1b[0m\n`);
}
