# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### EnzymeEase Dehusking System (`artifacts/enzyme-ease`)
- **Type**: react-vite, preview at `/`
- **Purpose**: Production-ready industrial demo website for the EnzymeEase dal mill optimization system
- **Tech**: React + Vite + Tailwind CSS + Framer Motion + Three.js + Recharts
- **Theme**: Dark industrial, blue/green glow accents
- **Sections**:
  - `HeroSection` — animated headline with 3D dal grain (Three.js with CSS fallback)
  - `ProfitCalculator` — interactive sliders, animated counters, Recharts bar comparison
  - `ProcessSimulation` — step-by-step animation of Traditional vs EnzymeEase milling
  - `HowItWorks` — 3-stage mechanism (Enzyme Pre-treatment, Incubation, Reduced Milling)
  - `ImplementationTimeline` — 16-week Gantt-style rollout roadmap
  - `ComparisonTable` — Oil vs Steam vs EnzymeEase metric table
  - `TrustSection` — FSSAI compliance, Dabhi et al. research, Lohia Industries mention
  - `FinalCTA` — Run Numbers + Start Pilot CTAs
- **Components**:
  - `DalGrain3D` — Three.js WebGL grain with enzyme separation animation (with WebGL detection + CSS fallback)
  - `DalGrainFallback` — Pure CSS/SVG animated fallback for non-WebGL environments
  - `NavBar` — Fixed top nav with scroll-aware styling
  - `Footer` — Simple footer with branding
- **Hooks**: `useAnimatedCounter`, `useIntersectionObserver`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
