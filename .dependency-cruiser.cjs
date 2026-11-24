module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'features-do-not-import-each-other',
      severity: 'error',
      from: { path: '^src/features/([^/]+)/' },
      to: { path: '^src/features/', pathNot: '^src/features/$1/' },
    },
    {
      name: 'lib-is-pure',
      severity: 'error',
      from: { path: '^src/lib/' },
      to: { path: '^src/(app|features|ui)/|node_modules/react' },
    },
    {
      name: 'ui-knows-no-feature',
      severity: 'error',
      from: { path: '^src/ui/' },
      to: { path: '^src/(app|features)/' },
    },
    {
      name: 'only-main-imports-app',
      severity: 'error',
      from: { path: '^src/', pathNot: '^src/(main[.]tsx|app/)' },
      to: { path: '^src/app/' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.app.json' },
  },
}
