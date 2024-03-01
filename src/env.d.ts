/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PLAUSIBLE_TOKEN: string;
  readonly PLAUSIBLE_SITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
