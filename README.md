<p align="center">
  <img src="public/assets/banner.png" alt="Destiny Flair Collection: complete list of emblems and shaders and how to obtain them" width="100%" />
</p>

<p align="center">
  <a href="https://destiny-flair-collection.vercel.app/"><strong>Live site</strong></a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-7f97ae?style=flat-square&logo=react&logoColor=white&labelColor=3a4757" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-7f97ae?style=flat-square&logo=typescript&logoColor=white&labelColor=3a4757" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-7f97ae?style=flat-square&logo=vite&logoColor=white&labelColor=3a4757" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-7f97ae?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=3a4757" />
</p>

---

## About

Destiny Flair Collection is a web app for browsing every shader and emblem in Destiny 1 and finding out how to obtain each one. Item data comes from the Destiny 1 manifest provided through the Bungie API.

## Features

- **Shader catalog:** every Destiny 1 shader, shown with its in-game icon.
- **Emblem catalog:** every Destiny 1 emblem, shown with its icon. Hovering an emblem reveals its banner, as in the game.
- **Acquisition details:** each item's tooltip explains how to obtain it and whether it can still be acquired.
- **Paginated browsing:** large collections are split into pages for faster navigation.
- **Switch between catalogs:** move between shaders and emblems without leaving the app.

## Screenshots

<!--

<p align="center">
  <img src="public/assets/screenshots/1.webp" alt="Shader catalog" width="48%" />

  <img src="public/assets/screenshots/2.webp" alt="Emblem catalog" width="48%" />
</p>
-->

-TODO

## Technologies

| Area            | Tools                                |
| --------------- | ------------------------------------ |
| UI              | React 19, TypeScript                 |
| Build tooling   | Vite, `@vitejs/plugin-react`         |
| Styling         | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Animation       | Framer Motion                        |
| Analytics       | Vercel Analytics                     |
| Linting         | ESLint, `typescript-eslint`          |
| Data scripts    | Node.js (see `scripts/`), `adm-zip`  |
| Package manager | pnpm                                 |
| Hosting         | Vercel                               |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **22.5 or newer** (required by the `engines` field in `package.json`)
- [pnpm](https://pnpm.io/)

### Installation

```bash
git clone https://github.com/sebastian-fraga/destiny-flair-collection.git
cd destiny-flair-collection
pnpm install
```

### Development

```bash
pnpm dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

### Available scripts

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `pnpm dev`     | Start the Vite development server                        |
| `pnpm build`   | Type-check with `tsc -b`, then create a production build |
| `pnpm preview` | Serve the production build locally                       |
| `pnpm lint`    | Run ESLint across the project                            |

## Project Structure

```text
.
├── public/             Static assets served as-is
├── scripts/            Node scripts that generate catalog data from the Destiny 1 manifest
├── src/                Application source (React + TypeScript)
├── index.html          App entry point
├── vite.config.ts      Vite configuration
├── eslint.config.js    ESLint configuration
├── tsconfig*.json      TypeScript configuration
└── package.json        Scripts and dependencies
```

## Acknowledgements

Item data and icons are provided through the [Bungie API](https://github.com/Bungie-net/api). Destiny and all related content are property of Bungie.
