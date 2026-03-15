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
 *   grainulation <tool> [args]    Delegate to a grainulation tool
 */

const { route } = require('../lib/router');

route(process.argv.slice(2));
