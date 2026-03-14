#!/usr/bin/env node

'use strict';

/**
 * grainulator
 *
 * The unified entry point for the grainulator ecosystem.
 * Routes to the right tool based on what you need.
 *
 * Usage:
 *   grainulator                  Show ecosystem overview
 *   grainulator doctor           Check which tools are installed
 *   grainulator setup            Interactive setup wizard
 *   grainulator <tool> [args]    Delegate to a grainulator tool
 */

const { route } = require('../lib/router');

route(process.argv.slice(2));
