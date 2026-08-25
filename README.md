# dreamingdragons.net

## 🐉 About

DreamingDragons is a community founded by [ArchangelGCA](https://archangelgca.eu) that brings together 2.7K+ members and 2.6K+ watchers across multiple platforms:

- **Discord**: Active community chat, support and announcements
- **DeviantArt**: Main art gallery and contest hub
- **Tales Platform**: Our own platform for dragon art and stories

## 🛠️ Tech Stack

- **Bun 1.4.0** — package manager & runtime (replaces Node.js / npm)
- **Svelte 5** (`5.56.9`)
- **SvelteKit 2** (`2.70.2`) with [`@sveltejs/adapter-static`](https://svelte.dev/docs/kit/adapters#static) (fully prerendered)
- **Vite 8** (`8.2.1`) + `@sveltejs/vite-plugin-svelte` + `@sveltejs/enhanced-img`
- **Bootstrap 5.3.8**
- **Font Awesome 7.3.1**
- **Cloudflare Pages** (static) via **Wrangler 4** (`wrangler pages deploy`)

## 🚀 Getting Started

Prerequisites: **Bun ≥1.4.0** (`bun --version` should print `1.4.0`). Install from https://bun.sh. The pinned version is in `.bun-version` and `package.json#packageManager`.

Install dependencies (auto-migrates `package-lock.json` → `bun.lock` on first run):

```sh
bun install
```

Start a development server:

```sh
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

> `bun run dev` executes `vite dev` with Bun's runtime (`[run].bun = true` in `bunfig.toml`), which is significantly faster than Node for SvelteKit.

Useful scripts:

```sh
bun run check:maps   # validates RPG map reachability (runs with `bun`, not `node`)
bun run build        # vite build → static output in `build/`
bun run preview      # build + `wrangler pages dev build` (local Pages emulation)
bun run preview2     # `vite preview` without Pages emulation
```

## Building

To create a production version of your app:

```sh
bun run build
```

Static output is emitted to `build/` (via `@sveltejs/adapter-static` with `precompress: true`).

You can preview the production build with:

```sh
bun run preview          # Cloudflare Pages emulation (recommended)
# or
bun run preview2         # plain Vite preview
```

## ☁️ Deploy — 2026 Cloudflare Pages (static)

This site is **fully static** (`adapter-static` + `prerender = true`). No Worker is needed.

**Cloudflare Pages dashboard settings (2026):**

| Setting            | Value               |
| ------------------ | ------------------- |
| Build command      | `bun run build`     |
| Build output dir   | `build`             |
| Node version       | _not used_          |
| Bun version        | `1.4.0` (or `latest`) |

Manual deploy via Wrangler:

```sh
bun run deploy              # = bun run build && bunx wrangler pages deploy build
# or explicitly
bunx wrangler pages deploy build --project-name dreamingdragons-net
```

Local Pages emulation:

```sh
bun run preview             # builds and serves `build/` with `wrangler pages dev`
```

Configuration is in `wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "dreamingdragons-net",
  "compatibility_date": "2026-08-22",
  "assets": { "directory": "./build" }
}
```

> Previous `wrangler.jsonc` pointed at `.svelte-kit/cloudflare` (adapter-cloudflare). It has been corrected to `./build` for static Pages.

## 📦 Bun 1.4 Notes

- `packageManager: "bun@1.4.0"` and `engines.bun >=1.4.0` enforce the runtime.
- `bunfig.toml` enables `[run].bun = true` and trusts `workerd`/`esbuild` postinstall scripts.
- `.npmrc` `engine-strict` is disabled — Bun validates via `engines.bun` instead.
- `bun.lock` (text-based, Bun 1.4 default) replaces `package-lock.json`. `bun.lockb` (legacy binary) is gitignored.
- `svelte-kit sync` is run via `prepare` (`bun run prepare`) without the `|| echo ''` fallback needed for npm.
- For CI, use `bun install --frozen-lockfile` and `bun run build`.
