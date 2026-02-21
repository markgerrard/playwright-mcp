#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { program } = require('playwright-core/lib/utilsBundle');
const { decorateMCPCommand } = require('playwright/lib/mcp/program');

const packageJSON = require('./package.json');

// Enable devtools capability by default so video recording tools
// (browser_start_video / browser_stop_video) are always available.
const args = process.argv.slice();
if (!args.some(a => a.startsWith('--caps'))) {
  args.push('--caps=devtools');
} else {
  const idx = args.findIndex(a => a.startsWith('--caps='));
  if (idx !== -1 && !args[idx].includes('devtools')) {
    args[idx] += ',devtools';
  }
}

const p = program.version('Version ' + packageJSON.version).name('Playwright MCP');
decorateMCPCommand(p, packageJSON.version)
void program.parseAsync(args);
