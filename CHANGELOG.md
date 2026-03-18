## [2.1.1](https://github.com/santychuycom/santychuy.com/compare/v2.1.0...v2.1.1) (2026-03-18)

### Bug Fixes

* **ci:** handle stale SST locks in preview deploy ([dde095e](https://github.com/santychuycom/santychuy.com/commit/dde095ee4234faa782e54db8e05fafe368222c30))
* **ci:** harden preview deploy lock retry handling ([ae403c9](https://github.com/santychuycom/santychuy.com/commit/ae403c96ac21c69740ed104b26e7cafc8db491c1))
* **check:** resolve Astro check type diagnostics ([1dc26f1](https://github.com/santychuycom/santychuy.com/commit/1dc26f126584954a978079cbc39b83da1078e4ad))
* **ci:** retry preview deploy after SST lock failures ([ee7d89f](https://github.com/santychuycom/santychuy.com/commit/ee7d89f4ba954530a29848e01f755c0a180c8c89))

## [2.1.0](https://github.com/santychuycom/santychuy.com/compare/v2.0.1...v2.1.0) (2026-03-16)

### Features

* **skill:** add grill-me interview skill ([78c31bf](https://github.com/santychuycom/santychuy.com/commit/78c31bf438e108091989ff58e4a36b903e8e7f40))

### Bug Fixes

* **assets:** normalize blog cover filenames to lowercase ([37e9ca5](https://github.com/santychuycom/santychuy.com/commit/37e9ca512451fd40100552390b8522e131df4bd6))

## [2.0.1](https://github.com/santychuycom/santychuy.com/compare/v2.0.0...v2.0.1) (2026-03-15)

### Bug Fixes

* **blog:** disable Astro streaming for SSR responses ([563c721](https://github.com/santychuycom/santychuy.com/commit/563c721dcebae8531a7bbc5a0da5045872fd48f6))
* **cloudflare:** disable SSR streaming in worker entrypoint ([06e6a89](https://github.com/santychuycom/santychuy.com/commit/06e6a8901784ad87ee14201ae9f72f32216604dd))

## [2.0.0](https://github.com/santychuycom/santychuy.com/compare/v1.6.0...v2.0.0) (2026-03-14)

### ⚠ BREAKING CHANGES

* Blog post URLs now use 'id' instead of 'slug' parameter

### Features

* **ui:** add base-maia primitives and brand token mapping ([4544742](https://github.com/santychuycom/santychuy.com/commit/4544742a58c9107427b0bdb74c676913eb3bc446))
* **seo:** add GEO support with AI bot directives, BreadcrumbList, and SpeakableSpecification ([75c32c2](https://github.com/santychuycom/santychuy.com/commit/75c32c2bdd173f7d84a73fa871e5f593f6b5cdc8))
* **layout:** add logo to center of footer ([4d6aa0b](https://github.com/santychuycom/santychuy.com/commit/4d6aa0beb7f63dd615cb30941cccfac1c0f12dec))
* **theme:** add persistent light/dark mode toggle ([9641601](https://github.com/santychuycom/santychuy.com/commit/96416012a31787210cf7e366415018b23bd681da))
* **home:** add readability-first editorial shell ([4bea989](https://github.com/santychuycom/santychuy.com/commit/4bea989eb070da450f9775d9b2986f66f36c5f29))
* **skills:** add ship skill for atomic commit and push workflow ([cf18a90](https://github.com/santychuycom/santychuy.com/commit/cf18a9013014b4c526a2071e5a842517840a5cbb))
* **seo:** add technical SEO and LLM discovery surfaces ([a9f0176](https://github.com/santychuycom/santychuy.com/commit/a9f0176b2b38b4311ff41e0eb22494429076cd09))
* **geo:** add tldr, faq frontmatter fields and FAQPage schema for AI citation ([887d4ae](https://github.com/santychuycom/santychuy.com/commit/887d4ae4cc0f5a1ddd9d616b3ad0d8937bdf3208))
* **content:** enable MDX posts with reading metadata ([7ca2f03](https://github.com/santychuycom/santychuy.com/commit/7ca2f0386fa3bc2c319950d03e8c8cf3ca4495cb))
* **react:** integrate React into Astro ([6479add](https://github.com/santychuycom/santychuy.com/commit/6479addd780efe8ab291a5d5c54bff846cb09659))
* **content:** migrate blog editing config to astro editor ([51dd672](https://github.com/santychuycom/santychuy.com/commit/51dd67208724b74d806c2bcf19d6a80eac8811f2))
* **blog:** migrate share actions to base-ui components ([9989fca](https://github.com/santychuycom/santychuy.com/commit/9989fca0033c2012a0469aec134d3aed79ce3987))
* **analytics:** proxy Umami tracking and add post events ([3d56fca](https://github.com/santychuycom/santychuy.com/commit/3d56fcaedd24c05c2faf39c7d9627c21426c466f))
* **site:** redesign homepage and blog reading experience ([f2d2eeb](https://github.com/santychuycom/santychuy.com/commit/f2d2eebc1da3adb7efe5f01f5f92f8dc96f85833))
* **blog:** redesign post page with sticky TOC rails ([2cfd1f7](https://github.com/santychuycom/santychuy.com/commit/2cfd1f7c73effff93f0496beea9920d7ee3e63ef))
* **blog:** refine post page layout with wider content, scroll-aware UI ([ecbd5a9](https://github.com/santychuycom/santychuy.com/commit/ecbd5a950df013a952fe85509f256f5ddec8986f))
* **home:** refresh intro and centralize design context ([04cbd8b](https://github.com/santychuycom/santychuy.com/commit/04cbd8b8089b7a656d34da6a6fc5a5144e846bcb))
* **styles:** register project tokens in Tailwind v4 theme and add shared utilities ([d9ad079](https://github.com/santychuycom/santychuy.com/commit/d9ad079afa6388b5d5ff0c2f5cda5f1e1b91bc30))
* upgrade Astro from v4 to v5 ([2371bd4](https://github.com/santychuycom/santychuy.com/commit/2371bd40b2fe3346d5543569040c6c9facb3e78f))
* **skills:** upgrade skill-creator with eval, benchmark, and agent tooling ([5c7f589](https://github.com/santychuycom/santychuy.com/commit/5c7f589480b99c32464d4caf4ea74b81dc63d23a))

### Bug Fixes

* **404:** add visible page-not-found content ([995bc50](https://github.com/santychuycom/santychuy.com/commit/995bc50a916b296ddbaf0d5fc5dc613f294b11a2))
* **ci:** correct SST worker handler path and add logging ([f0694d6](https://github.com/santychuycom/santychuy.com/commit/f0694d6b3924629c73e4966693cf80f8fa5fd532))
* **analytics:** inline umami public script tag ([e73aace](https://github.com/santychuycom/santychuy.com/commit/e73aacec582dbf0e531c57906009aabe09e9ddcd))
* **blog:** normalize post slugs for links and feed ([706a8f8](https://github.com/santychuycom/santychuy.com/commit/706a8f8298bfc090f3366d079509bb2f2af5e99a))
* **hooks:** remove bun test from pre-push hook (no test files exist) ([7caaab3](https://github.com/santychuycom/santychuy.com/commit/7caaab3d397b54d56c3734bc66fef2205ed3ff51))
* **content:** remove inline mark styles, editorial note, and HTTP link ([f4c3d75](https://github.com/santychuycom/santychuy.com/commit/f4c3d7591be956403493559f27cea4e6cbc994b3))
* **llms:** strip HTML tags from llms-full.txt excerpt generation ([b4a7862](https://github.com/santychuycom/santychuy.com/commit/b4a78626f709f2b2e0b553c03d832f3b0297c715))
* **icons:** update arrow icon to use currentColor for theme compatibility ([9195f40](https://github.com/santychuycom/santychuy.com/commit/9195f409c79f22e8d917f17808a30d0c0ca6b78c))
* **ci:** use bash grep instead of node for url extraction ([d4f3e51](https://github.com/santychuycom/santychuy.com/commit/d4f3e51f817712c51e4314cabd331d41bb7934a3))
* **styles:** wrap reset.css in [@layer](https://github.com/layer) base for correct cascade order ([62b5d65](https://github.com/santychuycom/santychuy.com/commit/62b5d6599dcecb140bf1fdb681ae095234be99ba))
