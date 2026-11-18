# Marissa Tong — Portfolio

My personal portfolio website.

**Live site:** https://marissatong.dev

## Built with

🎨 **Frontend:** React, TypeScript, Tailwind CSS, Vite

☕ **Backend:** Java 25, Spring Boot, PostgreSQL (Neon)

☁️ **Hosting:** GitHub Pages (frontend), AWS EC2 with Caddy (backend), my own domain

🚀 **Deployment:** GitHub Actions, AWS (OIDC, S3, SSM)

📋 **Project tracking:** Linear

## How it's hosted

```
marissatong.dev       →  GitHub Pages  →  React site
api.marissatong.dev   →  EC2 (Caddy)   →  Spring Boot API  →  Postgres (Neon)
```

- **Domain:** I own `marissatong.dev`. The main domain points to GitHub Pages, and the `api` subdomain points to the EC2 server through a DNS A record and an Elastic IP, so the address stays the same if the server restarts.
- **Frontend:** a static React build served by GitHub Pages with a custom domain.
- **Backend:** a Spring Boot jar running on an AWS EC2 instance (Amazon Linux, ARM) as a `systemd` service, so it starts on boot and restarts if it crashes.
- **HTTPS:** [Caddy](https://caddyserver.com) sits in front of the API as a reverse proxy. It gets and renews a free Let's Encrypt certificate automatically and forwards requests to the app on port 8080.
- **Database:** PostgreSQL hosted on [Neon](https://neon.tech). Connection details live in an environment file on the server, never in the repo.
- **Deploys:** GitHub Actions signs in to AWS with OIDC (no stored access keys), uploads the built jar to S3, and uses SSM to swap it on the server. If the health check fails, it rolls back to the previous version.

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
