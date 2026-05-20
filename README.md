# solid-teams

**Federated team workspace on your own pods.**

A team's day-to-day — group chat, DMs, shared docs, announcements, tasks,
files — running entirely on Solid pods. No central platform.
For teams that want to own their conversation.

**[solid-teams.github.io](https://solid-teams.github.io/)**

## Install

```bash
npm i -g jspod solid-teams
solid-teams install --pod https://your-team.example
```

That installs the canonical team bundle into your pod:

| App | What |
|---|---|
| **plaza** | Group chat (Slack-shaped UI, Solid-native data) |
| **chat** | 1:1 DMs across pods |
| **vellum** | Shared markdown docs |
| **plume** | Team blog / announcements |
| **taskify** | Task tracking + record of work |
| **explorer** | Shared file browser with per-row ACL |
| **hub** | Multi-app workspace shell |
| **chrome** | Desktop-style window manager |

Everything writes to your pod as JSON-LD. Other pod-aware tools can read it.
Replace any app tomorrow and your data is still there.

## Why pods, not platforms

Slack owns your messages. Notion owns your docs. Linear owns your tasks.
When you outgrow the price, the integration, or the company itself, your
team's history is locked behind their export tools.

solid-teams flips that. Each member's messages, files, and writing live on
their own pod. The team works across pods. The apps are open source. The
data shape is JSON-LD any tool can read.

It's not "self-hosted Slack." It's "your team's data was always yours; here
are the apps that respect that."

## For enterprises

solid-teams is **built for teams that want to own their data**. That means:

- Each member's pod is theirs — leaving the team doesn't lose their work
- Cross-pod by default — no Slack Connect, no shared workspace setup
- Open source (AGPL-3.0) — read it, audit it, modify it
- Self-host on your own infrastructure, or use any compatible Solid provider

**What's *not* here yet:** SSO, audit logs, retention policies, SOC2
compliance. If those are deal-breakers today, watch this space.

## How it's built

solid-teams is a thin installer over [jspod](https://github.com/JavaScriptSolidServer/jspod),
which is itself a thin layer over [JSS](https://github.com/JavaScriptSolidServer/JavaScriptSolidServer)
(JavaScript Solid Server). When you run `solid-teams install`, it calls
`jspod install --bundle teams` — the bundle definition lives at
[solid-apps/bundles](https://github.com/solid-apps/bundles/blob/gh-pages/teams.jsonld).

Each app in the bundle is its own repo under [solid-apps](https://github.com/solid-apps),
installed into your pod via `git push` to a JSS endpoint.

## License

[AGPL-3.0-only](./LICENSE). Commercial licensing available — get in touch.
