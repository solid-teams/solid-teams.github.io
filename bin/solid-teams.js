#!/usr/bin/env node
// solid-teams — install the canonical team workspace into a Solid pod.
//
// Thin wrapper over `jspod install --bundle teams`. Exists so you can
// `npx solid-teams` instead of remembering bundle names.

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === '--version' || cmd === '-v') {
  console.log(pkg.version);
  process.exit(0);
}

if (cmd === '--help' || cmd === '-h' || !cmd) {
  console.log(`solid-teams ${pkg.version} — federated team workspace installer

Usage:
  solid-teams install [--pod <url>] [...]
      Install the teams bundle (plaza, chat, vellum, plume, taskify,
      explorer, hub, chrome) into a running Solid pod. Forwards all
      flags to \`jspod install --bundle teams\`.

  solid-teams --version
      Print the installed version.

Examples:
  solid-teams install
  solid-teams install --pod https://my-team.solid.example
  solid-teams install --user alice --password ...

Requires: jspod (\`npm i -g jspod\`).
More: https://solid-teams.github.io/
`);
  process.exit(cmd ? 0 : 1);
}

if (cmd === 'install') {
  const rest = args.slice(1);
  const r = spawnSync('jspod', ['install', '--bundle', 'teams', ...rest], {
    stdio: 'inherit',
  });
  if (r.error && r.error.code === 'ENOENT') {
    console.error('\nsolid-teams: jspod not found. Install it first:\n  npm i -g jspod\n');
    process.exit(127);
  }
  process.exit(r.status ?? 1);
}

console.error(`solid-teams: unknown command "${cmd}". Try \`solid-teams --help\`.`);
process.exit(2);
