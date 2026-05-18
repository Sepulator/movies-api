import { defineConfig } from 'vitest/config';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackRouter({
      // Configure for test environment
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      disableLogging: true,
    }),
  ],
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
        'src/__tests__/file-route-utils.{js,ts,tsx}',
        'src/**/*.d.ts',
        'src/main.tsx',
        'src/routeTree.gen.ts',
      ],
    },
  },
});
