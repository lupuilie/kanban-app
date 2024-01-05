import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@kanban-app/core': path.resolve(__dirname, '../core/src'),
      '@kanban-app/functions': path.resolve(__dirname, '../functions/src'),
    },
  },
});
