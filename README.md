# Payload + TanStack Start Demo

A demo of [Payload CMS](https://payloadcms.com) running on [TanStack Start](https://tanstack.com/start) instead of Next.js, based on the website template.

> **This is an experimental demo and is not intended for production use.**
> It exists to showcase the framework adapter pattern being developed in
> [payloadcms/payload#16139](https://github.com/payloadcms/payload/pull/16139).

## What is this?

This project demonstrates that Payload's admin panel can run on frameworks other than Next.js. It uses TanStack Start + TanStack Router with [Vite+](https://viteplus.dev/guide) as the toolchain, replacing Next.js's RSC rendering with SSR + route loaders.

For details on the architecture, adapter contracts, and current test pass rates, see the PR:
**https://github.com/payloadcms/payload/pull/16139**

## Getting started

Use Node.js 24.22.1 (pinned in `.node-version`) and pnpm 10.30.1 (pinned in
`package.json`). The supported Node.js ranges are `^22.18.0 || ^24.11.0 || >=26.0.0`.
A global Vite+ installation is optional.

```bash
pnpm install
cp .env.example .env  # configure POSTGRES_URL and PAYLOAD_SECRET
pnpm exec vp dev
```

The admin panel is available at `http://localhost:3000/admin` and the frontend at `http://localhost:3000`.

## Development commands

With a global `vp` installation, use `vp install`, `vp dev`, `vp check`, and
`vp build`. Without it, use `pnpm install` and prefix toolchain commands with
`pnpm exec`:

```bash
pnpm exec vp check       # formatting, lint, and TypeScript checks
pnpm exec vp fmt         # apply formatting
pnpm exec vp build       # production application build
pnpm exec vp run start   # preview the production build
```

Formatting and lint settings live in `vite.config.ts`. Generated Payload and
TanStack files keep their generator's formatting. `pnpm-workspace.yaml` contains
the Vite+ catalog and the Vite alias required by framework plugins.

GitHub Actions runs `vp check` and `vp build` as separate jobs on pull requests
and pushes to `main`.

`vp dev` and `vp test` run the built-in development server and Vitest runner.
`vp run <task>` runs a package script; for example, `vp run dev` also applies
this project's `NODE_OPTIONS`, and `vp run generate:types` invokes Payload's type
generator. The `packageManager` field selects pnpm for `vp install`, `vp add`,
and `vp remove`.

There are no Vitest test files, coverage suites, benchmarks, or library builds
in this demo. `vp test` currently reports that no tests were found. To run the
existing browser screenshot check, configure the database and start the dev
server, then run:

```bash
pnpm exec playwright install chromium
pnpm exec vp run test:screenshot
```
