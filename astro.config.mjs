import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://sistemas21atp.github.io',
    base: '/DINERBOT-T10',

    // Optimizaciones de imagen SUPER POTENCIADAS
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                quality: 80,
                format: ['webp', 'avif', 'jpeg']
            }
        },
        remotePatterns: [
            { protocol: 'https' },
            { protocol: 'http' }
        ]
    },

    // Optimizaciones de build
    build: {
        inlineStylesheets: 'auto',
        assets: '_astro'
    },

    // Compresión y minificación
    compressHTML: true,

    // Integrations disponibles
    integrations: [
        sitemap()
    ],

    // Configuración de build
    build: {
        format: 'directory',
        inlineStylesheets: 'auto'
    },

    // Configuración de TypeScript
    typescript: {
        strict: false
    },

    // Configuración de dev server
    server: {
        port: 4321,
        host: true,
        open: true
    },

    // Configuración de Vite optimizada
    vite: {
        css: {
            devSourcemap: true
        },
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: 'assets/[name].[hash][extname]'
                }
            }
        }
    }
});