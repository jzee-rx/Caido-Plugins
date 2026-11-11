import * as esbuild from 'esbuild';
import { mkdirSync, existsSync } from 'fs';

// Ensure dist directories exist
if (!existsSync('./dist')) mkdirSync('./dist');
if (!existsSync('./dist/backend')) mkdirSync('./dist/backend');
if (!existsSync('./dist/frontend')) mkdirSync('./dist/frontend');

// Build backend
await esbuild.build({
  entryPoints: ['./src/backend/index.ts'],
  bundle: true,
  outfile: './dist/backend/index.js',
  platform: 'node',
  target: 'es2020',
  format: 'esm',
  external: ['caido:*'],
});

console.log('✓ Backend built');

// Build frontend
await esbuild.build({
  entryPoints: ['./src/frontend/index.ts'],
  bundle: true,
  outfile: './dist/frontend/index.js',
  platform: 'browser',
  target: 'es2020',
  format: 'esm',
  external: ['caido:*'],
});

console.log('✓ Frontend built');
console.log('✓ Build complete!');
