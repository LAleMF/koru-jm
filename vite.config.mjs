import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'public/build',
        emptyOutDir: true,

        rollupOptions: {
            input: 'src/js/main.js',

            output: {
                entryFileNames: 'main.js',
                chunkFileNames: 'chunks/[name].js',
                assetFileNames: 'assets/[name][extname]'
            }
        }
    }
});