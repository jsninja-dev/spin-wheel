import {
  API_PREFIX,
  // STORAGE_PREFIX,
} from './constants/variables';
import localeCodes from './constants/localeCodes';
import seoMeta from './configs/seo-meta';
// import { getFontsPreloadList } from './utils/helpers.js';

const isDev = process.env.NODE_ENV === 'development';

const serverUrl = import.meta.env.SERVER_URL;
const clientUrl = import.meta.env.CLIENT_URL;

let robotsRules = {};
const nuxtRobots =
  import.meta.env.NUXT_ROBOTS?.replace(/'/g, '"') ||
  JSON.stringify({ Disallow: ' / ' });
if (nuxtRobots) {
  try {
    robotsRules = JSON.parse(nuxtRobots);
  } catch (error) {
    console.error('NUXT_ROBOTS parsing error:', error);
  }
}

// const fontsToPreload = getFontsPreloadList([
//   {
//     path: 'font-name/FontName-',
//     weights: ['Light', 'Bold'],
//   },
// ]);

const routeRules = {
  // Cache
  // '/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
  // No-ssr
  // '/profile/**': { ssr: false },
};
if (isDev) {
  Object.assign(routeRules, {
    [`/${API_PREFIX}/**`]: { proxy: `${clientUrl}/${API_PREFIX}/**` },
    // [`/${STORAGE_PREFIX}/**`]: { proxy: `${clientUrl}/${STORAGE_PREFIX}/**` },
  });
}

const baseURL = '/spin-wheel/';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    serverUrl,
    apiToken: process.env.BACKOFFICE_TOKEN,
    smtpHost: process.env.SMTP_SERVER,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USERNAME,
    smtpPass: process.env.SMTP_PASSWORD,
    smtpFrom: process.env.SMTP_FROM,
    smtpFromName: process.env.SMTP_NAME,
    smtpSecure: process.env.SMTP_SECURE,
    ipstackKey: process.env.IPSTACK_API_KEY,
    ipgeoKey: process.env.IPGEO_API_KEY,
    public: {
      clientUrl,
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  app: {
    head: {
      title: seoMeta.title,
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: seoMeta.description },

        { property: 'og:title', content: seoMeta.title },
        { property: 'og:description', content: seoMeta.description },
        { property: 'og:image', content: seoMeta.image },
        { property: 'og:type', content: 'website' },

        { name: 'twitter:title', content: seoMeta.title },
        { name: 'twitter:description', content: seoMeta.description },
        { name: 'twitter:image', content: seoMeta.image },
        { name: 'twitter:card', content: 'summary_large_image' },

        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: `${baseURL}apple-touch-icon.png`,
        },
        {
          rel: 'shortcut icon',
          href: `${baseURL}favicon.ico`,
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `${baseURL}favicon.svg`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: `${baseURL}favicon-96x96.png`,
        },
        {
          rel: 'manifest',
          href: `${baseURL}site.webmanifest`,
        },
      ],
    },

    baseURL,
  },

  components: ['@/components', { path: '@/components/common', prefix: 'C' }],

  css: ['reset-css', '@/assets/styles/base/index.scss'],

  swiper: {
    styleLang: 'scss',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@use "@/assets/styles/utils" as *;' },
      },
    },
    build: {
      modulePreload: {
        polyfill: false,
        resolveDependencies: () => {
          return [];
        },
      },
    },
  },

  hooks: {
    // https://github.com/nuxt/nuxt/issues/14584#issuecomment-2166544081
    'build:manifest': (manifest) => {
      for (const item of Object.values(manifest)) {
        item.dynamicImports = [];
        item.prefetch = false;
        // Removing preload links is the magic that drops the FCP on mobile
        item.preload = false;
        item.modulePreload = false;
      }
    },
  },

  sourcemap: true,

  routeRules,

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    // '@nuxtjs/device',
    '@nuxtjs/robots',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-svgo',
    'nuxt-swiper', // https://github.com/cpreston321/nuxt-swiper/tree/v1.2.2
  ],

  robots: {
    rules: robotsRules,
  },

  svgo: {
    defaultImport: 'component',
    explicitImportsOnly: true,
  },

  i18n: {
    compilation: { strictMessage: false },
    locales: [
      {
        code: localeCodes.EN,
        language: 'en-US',
        file: 'en.json',
      },
      {
        code: localeCodes.ES,
        language: 'es',
        file: 'es.json',
      },
      {
        code: localeCodes.VI,
        language: 'vi',
        file: 'vi.json',
      },
      {
        code: localeCodes.AR,
        language: 'ar',
        file: 'ar.json',
      },
      {
        code: localeCodes.NG,
        language: 'ng',
        file: 'ng.json',
      },
      {
        code: localeCodes.TH,
        language: 'th',
        file: 'th.json',
      },
      {
        code: localeCodes.DE,
        language: 'de',
        file: 'de.json',
      },
      {
        code: localeCodes.ID,
        language: 'id',
        file: 'id.json',
      },
      {
        code: localeCodes.IT,
        language: 'it',
        file: 'it.json',
      },
      {
        code: localeCodes.MS,
        language: 'ms',
        file: 'ms.json',
      },
      {
        code: localeCodes.PT,
        language: 'pt',
        file: 'pt.json',
      },
      {
        code: localeCodes.ZH,
        language: 'zh',
        file: 'zh.json',
      },
    ],
    detectBrowserLanguage: false,
    baseUrl: baseURL,
    defaultLocale: localeCodes.EN,
  },

  features: {
    inlineStyles: false,
  },

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800],
    },
  },

  compatibilityDate: '2025-02-21',

  nitro: {
    routeRules: {
      '/api/**': { cors: true },
    },
  },
});
