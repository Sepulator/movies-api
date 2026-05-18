import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/vitest.setup.ts'],
    coverage: {
      reporter: 'text',
      provider: 'v8', // or 'istanbul'
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/__tests__/vitest.setup.{js,ts,tsx}',
        'src/__tests__/test-utils.{js,ts,tsx}',
        'src/__tests__/handlers.{js,ts,tsx}',
        'src/**/*.d.ts',
        'src/main.tsx',
        'src/routeTree.gen.ts',
      ],
    },
  },
});
