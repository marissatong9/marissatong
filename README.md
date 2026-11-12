# Marissa Tong — Portfolio

My personal portfolio website.

**Live site:** https://marissatong.dev

## Built with

🎨 **Frontend:** React, TypeScript, Tailwind CSS, Vite

☕ **Backend:** Java 25, Spring Boot, PostgreSQL (Neon)

🚀 **Hosting:** GitHub Pages, deployed automatically with GitHub Actions

📋 **Project tracking:** Linear

## Project structure

```
.github/workflows/   CI checks and deployment
frontend/            the website (see frontend/README.md)
  app/               source code
  public/            static files (icons, 404 page)
backend/             Spring Boot API (see backend/README.md)
  src/main/java/     source code
  src/test/java/     tests
```

## Running locally

The frontend and backend run separately. Setup steps are in each folder's README:

- [frontend/README.md](frontend/README.md): React app at http://localhost:5173
- [backend/README.md](backend/README.md): Spring Boot API at http://localhost:8080

Run them in separate terminal tabs. The frontend calls the backend using `VITE_API_URL`.

## CI and deployment

| Workflow              | Runs on                                  | Does                                                         |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `frontend.ci.yml`     | PRs into `main` that change `frontend/`  | Typecheck, lint, format check, build                         |
| `backend.ci.yml`      | PRs into `main` that change `backend/`   | Format check, build and test                                 |
| `frontend.deploy.yml` | Merges to `main` that change `frontend/` | Builds the site and deploys to GitHub Pages                  |
| `backend.deploy.yml`  | Merges to `main` that change `backend/`  | Builds the API and deploys it to EC2 (`api.marissatong.dev`) |

Changes that only touch Markdown or `.gitignore` files don't trigger a deploy. Both deploy workflows can also be run by hand from the **Actions** tab.
