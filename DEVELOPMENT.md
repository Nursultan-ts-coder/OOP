# Developing the OOP plugin

A Grafana app plugin (`mcd-oop-app`, with a Go backend) that serves the Owner Operator Portal
inside Grafana. Scaffolded with `@grafana/create-plugin` ("App with Scenes" + backend).

## Where things are

| Path                        | What it is                                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/portal/`               | The portal's React code (MUI, NEXT look), **copied** from the standalone app `Asset-Manager/artifacts/operator-portal/src` by `npm run sync:portal`. Change it there, then sync; it is not linted here. |
| `src/components/App/`       | The app's root page: Grafana's page frame, the portal's routes under `/a/mcd-oop-app`, its MUI theme following Grafana's light/dark theme                                                               |
| `src/components/AppConfig/` | Settings: the Google Maps key (map view) and the backend's API URL/key                                                                                                                                  |
| `webpack.config.ts`         | Grafana's build plus what the portal needs: `@/` alias, automatic JSX, `*.svg?react`/`?raw`, the Maps key from the settings                                                                             |
| `pkg/`                      | Go backend (resource handlers under `/api/plugins/mcd-oop-app/resources/...`)                                                                                                                           |
| `scripts/sync-portal.mjs`   | Copies the portal code in (default source: `../../../Projects/OOP/Asset-Manager/artifacts/operator-portal/src`)                                                                                         |

`@grafana/scenes` stays installed for Grafana-native pages (panels, time picker, variables) next to
the portal's pages. The template's demo scenes were moved out.

## Develop (local Grafana from Homebrew, no Docker)

| Command                  | What it does                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `npm run grafana:setup`  | Once: installs Grafana, links `dist/` into its plugins folder, allows this unsigned plugin |
| `npm start`              | Builds the backend, restarts Grafana, runs the frontend in watch mode                      |
| `npm run grafana:open`   | Opens the app at http://localhost:3000/a/mcd-oop-app (sign in as admin/admin)              |
| `npm run backend:reload` | Rebuilds the Go backend and restarts Grafana                                               |
| `npm run build:all`      | Production frontend plus the backend for every platform (what a release ships)             |

The Google Maps key: development builds read `VITE_GOOGLE_MAPS_API_KEY` from `.env` (git-ignored).
Production builds never bundle it; set it on the app's Configuration page instead.
Restart `npm run dev` after changing `webpack.config.ts`; watch mode ignores config edits.

Checks: `npm run typecheck`, `npm run lint`, `npm run test:ci`, `go test ./pkg/...`,
`npm run build`, and with Grafana running, `npm run e2e`.

## Release

1. Bump `version` in `package.json` and add an entry to `CHANGELOG.md`.
2. Commit, then tag and push: `git tag v1.0.0 && git push origin main --tags`.
3. The `Release` GitHub workflow builds, signs (repository secret `GRAFANA_ACCESS_POLICY_TOKEN`)
   and attaches the plugin zip to a GitHub release.
4. Submit that zip's URL and its SHA1 at grafana.com → My Plugins → Submit plugin.

See Grafana's [publishing guide](https://grafana.com/developers/plugin-tools/publish-a-plugin/publish-a-plugin).
