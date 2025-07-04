/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface ImportMetaEnv {
  readonly UMAMI_AUTH_TOKEN: string;
  readonly UMAMI_WEBSITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals extends Runtime {
    env: Record<string, string>;
  }
}
