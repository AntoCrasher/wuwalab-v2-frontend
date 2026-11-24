import { defineTheme } from '@astryxdesign/core/theme'

export const wuwalabTheme = defineTheme({
  name: 'wuwalab',
  radius: { base: 0, multiplier: 0 },
  typography: {
    scale: { base: 13, ratio: 1.2 },
    body: { family: 'Albert Sans', fallbacks: "'Segoe UI', system-ui, -apple-system, sans-serif" },
    heading: { family: 'Albert Sans', fallbacks: "'Segoe UI', system-ui, sans-serif" },
    code: { family: 'IBM Plex Mono', fallbacks: 'Consolas, monospace' },
  },
  tokens: {
    '--color-background-body': '#15171c',
    '--color-background-surface': '#1b1e24',
    '--color-background-card': '#20232a',
    '--color-background-muted': '#262932',
    '--color-border': '#2b2d33',
    '--color-border-emphasized': '#3a3d45',
    '--color-text-primary': '#e8e6df',
    '--color-text-secondary': '#8c8f99',
    '--color-accent': '#c9b178',
    '--color-on-accent': '#15171c',
    '--color-accent-muted': 'rgba(201, 177, 120, 0.14)',
    '--color-error': '#c0392b',
    '--color-warning': '#e8a020',
    '--radius-full': '0px',
  },
  components: {
    'table-cell': { 'density:compact': { paddingBlock: '6px', paddingInline: '8px' } },
    'table-header-cell': { 'density:compact': { paddingBlock: '6px', paddingInline: '8px' } },
  },
})
