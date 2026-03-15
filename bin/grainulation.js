#!/usr/bin/env node

'use strict';

/**
 * grainulation
 *
 * The unified entry point for the grainulation ecosystem.
 * Routes to the right tool based on what you need.
 *
 * Usage:
 *   grainulation                  Show ecosystem overview
 *   grainulation doctor           Check which tools are installed
 *   grainulation setup            Interactive setup wizard
 *   grainulation serve            Start the ecosystem control center
 *   grainulation <tool> [args]    Delegate to a grainulation tool
 */

const command = process.argv[2];

// Serve command — start the HTTP server (ESM module)
if (command === 'serve') {
  const path = require('node:path');
  const { spawn } = require('node:child_process');
  const serverPath = path.join(__dirname, '..', 'lib', 'server.js');

  // Forward remaining args to the server
  const serverArgs = process.argv.slice(3);
  const child = spawn(process.execPath, [serverPath, ...serverArgs], {
    stdio: 'inherit',
  });

  child.on('close', (code) => process.exit(code ?? 0));
  child.on('error', (err) => {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  });
} else {
  const { route } = require('../lib/router');
  route(process.argv.slice(2));
}
