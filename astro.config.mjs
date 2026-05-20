import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
    site: 'https://nexalive.ai',
    output: 'static',

    integrations: [
        react(),
        tailwind(),
        sitemap(),
    ],

    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ar', 'ru', 'de', 'fr', 'tr', 'uk', 'ro', 'pl', 'it', 'nl'],
        routing: {
            prefixDefaultLocale: false,
        },
    },

    vite: {
        resolve: {
            alias: {
                'react-router-dom': path.resolve('./src/lib/react-router-shim.tsx'),
                '@/components/landing': path.resolve('./src/components/react'),
                '@/pages': path.resolve('./src/pages-react'),
            },
        },
    },

    adapter: cloudflare()
});