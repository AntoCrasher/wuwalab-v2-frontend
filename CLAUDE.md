# WuwaLab v2 frontend

React 19, Vite, TypeScript strict. A new project, not a port of `C:\WuwaLab\wuwalab-com`: that repo shows what
each screen has to do, and pages are rewritten here one at a time. The plan is in
`C:\WuwaLab\wuwalab-backend\docs\design\v2-engine\project-plan.md`.

## Before every commit

`npm run check` must pass: Prettier, `tsc -b`, oxlint, the CSS size check and the import boundaries. The git
pre-commit hook runs it (`git config core.hooksPath .githooks` on a fresh clone).

`npm run format` applies the code style.

TypeScript is pinned to 6.0: dependency-cruiser cannot read 7.0 yet.

## Rules

**Size.** File 300 lines (CSS too), function 50, 5 parameters, nesting depth 3. Over the limit means split
before commit. Never raise a limit or add a disable comment.

**Comments.** None by default. Allowed: one line pointing at the source of a rule, and a warning the code
cannot express. Never: restating the code, commented-out code, history, a TODO without an owner.

**Folders.** `.dependency-cruiser.cjs` enforces the arrows.

| Folder                   | Holds                                | May import                                         |
| ------------------------ | ------------------------------------ | -------------------------------------------------- |
| `src/app`                | the shell: layout, routes, providers | everything                                         |
| `src/features/<feature>` | one screen or one piece of one       | `src/ui`, `src/lib`, itself. Never another feature |
| `src/ui`                 | shared components                    | `src/lib`                                          |
| `src/lib`                | pure helpers, no React               | nothing in `src`                                   |
| `src/styles`             | theme variables and base rules       |                                                    |

A feature folder has fixed slots: `<Feature>Page.tsx` (layout only), `use<Feature>.ts` (data and state), one
file per table, row, dialog or panel, `<feature>Format.ts` for pure helpers. One component per file. What two
features share moves to `src/ui` or `src/lib`.

**Also.**

- No `any`, no non-null `!`. Narrow the type.
- Fail loudly: missing data throws or shows an error, never a silent default.
- No dead code and nothing kept "in case".
- Settings belong to the account, never `localStorage`.
- The look: sharp corners only (no `border-radius` except true circles), hairlines instead of boxes, dense
  ledger tables, colours from `src/styles/theme.css`. US spelling in visible text.
- The component library (Astryx) and its styling tool are added with the component layer, not before.

## Working with Anton

- Show the approach and wait for approval before building a feature.
- No `Co-Authored-By` trailer on commits.
