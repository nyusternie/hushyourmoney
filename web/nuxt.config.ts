/* Import modules. */
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: `Hush Your Money — Spend Privately. Fearlessly!`,
            meta: [
                { name: 'description', content: `Spend Privately. Fearlessly!` },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },

    /* Progressive Web Application Settings */
    pwa: {
        manifest: {
            name: 'Hush Your Money — Spend Privately. Fearlessly!',
            short_name: 'Hush Your Money',
            description: `Spend Privately. Fearlessly!`,
            lang: 'en',
            theme_color: '#518c96',
            background_color: '#518c96',
            // useWebmanifestExtension: false,
        },
        meta: {
            name: 'Hush Your Money — Spend Privately. Fearlessly!',
            description: `Spend Privately. Fearlessly!`,
            author: `Nexa contributors`,
        },
        // icon: false, // disables the icon module
        workbox: {
            // workboxURL: 'TBD',
            // enabled: true, // FOR DEV PURPOSES ONLY
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',

        /* Plausible */
        '@nuxtjs/plausible',

        /* Internationalization for Nuxt */
        '@nuxtjs/i18n',

        /* Progressive Web Application */
        '@kevinmarrec/nuxt-pwa',
    ],

    /* Plausible */
    plausible: {
        apiHost: 'https://plausible.hos.im',
    },

    /* Route Rules */
    routeRules: {
        /* Add CORS headers to root. */
        // NOTE: We need this to make <token>.json available to web apps.
        '/**': { cors: true },
    },

    runtimeConfig: {
        public: {
            PSF_JWT_AUTH_TOKEN: process.env.PSF_JWT_AUTH_TOKEN,
        },
    },

    // FIXME Polyfills (at least `assert`) are currently required to support
    //       `@psf/bch-js` node dependencies.
    vite: {
        plugins: [nodePolyfills()],
    },

    /* Set compatibility date. */
    compatibilityDate: '2024-07-04',
})
