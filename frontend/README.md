# Frontend

The portfolio website, built with React, TypeScript, Tailwind CSS and Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173. The page reloads as you save changes.

## Scripts

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the local dev server                      |
| `npm run build`        | Type-check and build the site into `dist/`      |
| `npm run preview`      | Serve the built `dist/` folder locally          |
| `npm run typecheck`    | Check TypeScript types                          |
| `npm run lint`         | Check code with ESLint                          |
| `npm run format`       | Format all files with Prettier                  |
| `npm run format:check` | Report files that aren't formatted (used in CI) |

## Before opening a PR

Run the same checks CI runs:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run build
```

If `format:check` fails, run `npm run format` and commit the changes.

## Project structure

```
index.html        HTML page that loads the app
app/
  main.tsx        Entry point: renders <App /> into the page
  App.tsx         Main component (page content)
  index.css       Global styles, loads Tailwind
public/           Files copied as-is (favicon, 404 page, CNAME)
dist/             Build output (generated, not committed)
```

## Environment variables

| Variable       | Local (`.env.development`) | Production (set in `deploy.yml`) |
| -------------- | -------------------------- | -------------------------------- |
| `VITE_API_URL` | `http://localhost:8080`    | `https://api.marissatong.dev`    |

Only variables starting with `VITE_` are available in the app, via `import.meta.env.VITE_API_URL`.

## CI and deployment

- **Pull requests into `main`** run typecheck, lint, format check and build (`.github/workflows/frontend.ci.yml`).
- **Merging into `main`** builds the site and deploys it to GitHub Pages at https://marissatong.dev (`.github/workflows/deploy.yml`).
