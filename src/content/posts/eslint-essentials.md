---
title: 'ESLint Essentials: Clarifying Configuration'
pubDate: 2024-07-31T23:31:22.487Z
author:
  name: Santiago Carrasco
  img: /imgs/profile.jpg
type: posts
image: /uploads/ESLint-Essentials-Thumbnail.jpg
keywords:
  - configuration
  - eslint
  - javascript
  - linter
  - typescript
categories:
  - eslint
  - javascript
  - tools
  - typescript
description: Simplify ESLint setup with this guide. Learn key concepts, explore config options, and customize ESLint for your projects. Master linting effortlessly.
shortDesc: "Start understanding ESLint's power: Simplify setup, master configs, boost your code quality."
---

[ESLint](https://eslint.org/) is an open source linter for the JavaScript/Node (←might change this part) ecosystem. Can be integrated on most of your text editors and run it on your pipeline process (terminal).

> 🗣️ <mark style="background: #BBFABB; padding-inline: 4px;">IMPORTANT NOTE</mark>: some of the concepts are based on the newer versions of ESLint (^v9.0.0) to have it in mind if you encounter with some differences. If you want to [read](https://eslint.org/docs/latest/use/configure/migration-guide) the migration process and its differences you can go to the article and check it out

One struggle that I often have is to not understand quite good of all the <mark style="background: #BBFABB; padding-inline: 4px;">configuration and set ups for eslint</mark>, what are the differences of configurations and plugins, what means each property inside the `.eslintrc` (or similar) file.

The goal of this note will be to <mark style="background: #BBFABB; padding-inline: 4px;">explain and understand ESLint</mark> to not get confused and do the right thing on our next project that will be using ESLint.

## Terminology

> _Full list [here](https://eslint.org/docs/latest/use/core-concepts/glossary#shareable-config-configuration)_

- **Abstract Syntax Tree**: AST is a structured representation of code syntax

- **Rule**: Code that checks an AST for expected patterns, many rules can be loaded in by plugins

- **Plugin**: Package that <mark style="background: #BBFABB; padding-inline: 4px;">can contain a set of configurations, processors and/or rules</mark>

- **Configuration**: Set of a bunch of rules, and can include plugins

- **Configuration file**: File containing preferences of how ESLint should <mark style="background: #BBFABB; padding-inline: 4px;">parse files and run rules</mark>

- **Parser**: An object containing a method that reads in a string and coverts it to a <mark style="background: #BBFABB; padding-inline: 4px;">standardized format</mark>. ESLint uses parsers to convert source code strings into an AST shape. They’re custom parsers to let ESLint parse non-standard JavaScript syntax, for example [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) is a custom parser included in the [typescript-eslint](https://typescript-eslint.io/) project that lets ESLint parse TypeScript code

- **Processor**: Part of a plugin that extracts JavaScript code from other kinds of files, then lets ESLint lint the JavaScript code. For example [`eslint-plugin-markdown`](https://github.com/eslint/eslint-plugin-markdown) includes a processor that converts the text of ` ``` ` code blocks in Markdown files into code that can be linted

- **Override**: Like the word says, overwrites options and rules previously set on the configuration file

## Understand ESLint

> _ESLint is completely pluggable. <mark style="background: #BBFABB; padding-inline: 4px;">Every single rule is a plugin</mark>, and you can add more at runtime_

### Values for rules

The rules will be defined inside the property `rules` that is an object and will be declared `'name-rule': 'value'`

- `name-rule`: Will be to identify the kind of error/warning you want to use

- `value`: Could be of type `string` or `number` whatever you choose will be the same result; <mark style="background: #BBFABB; padding-inline: 4px;">the order of each value of the two types will be the equivalent of each one</mark>:
  - `string`
    - `off`
    - `warn`
    - `error`
  - `number`
    - `0`
    - `1`
    - `2`

## ESLint Config File

Will be to configure your <mark style="background: #BBFABB; padding-inline: 4px;">ESLint project</mark> in a single place. You can include built-in rules, how you want them enforced, plugins with custom rules, shareable configurations, which files you want rules to apply to, and more.

Set it up like (for ^v9.0.0):

- `eslint.config.js`
- `eslint.config.mjs`
- `eslint.config.cjs`

And for versions below <v9.0.0:

- `.eslintrc`
- `.eslintrc.json`
- `.eslintrc.js`
- `.eslintrc.mjs`

And placed on the <mark style="background: #BBFABB; padding-inline: 4px;">root of your project and exports an array</mark>.

[Here](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects) you can consult each configuration object that contains all the information needed for ESLint to execute correctly.

### How is based a config file

> *I’ll define some properties for the configuration file based on versions <v9.0.0 using the `*rc.{json|js|mjs}` convention\*

- `root`: Is a boolean that indicates whether the current configuration file is the root of the ESLint configuration hierarchy

- `env`: Declares which environments your code is expected to run in. Each environment brings with it a certain set of predefined global variables. For example this prevents of throwing `no-undef` rule errors when expecting variables from the <mark style="background: #BBFABB; padding-inline: 4px;">browser</mark> like `window` or `document`. [List of envs](https://eslint.org/docs/v8.x/use/configure/language-options#specifying-environments)

  Some of the most commons:

  - **browser**: Enables browser global variables like `window` and `document`.
  - **node**: Enables Node.js global variables like `process` and `require`.
  - **es6**: Enables ES6 global variables and features, such as `Promise` and `Set`. This also sets the `ecmaVersion` to 6.
  - **jest**: Enables Jest testing framework global variables like `describe`, `it`, and `test`.
  - **mocha**: Enables Mocha testing framework global variables like `describe`, `it`, and `beforeEach`.
  - **jquery**: Enables jQuery global variables like `$` and `jQuery`.
  - **serviceworker**: Enables global variables available in service workers.
  - **worker**: Enables global variables available in web workers.

- `extends`: Instead of manually configuring each rule individually, you can apply a bulk rule configuration from a shared config using the `extends` property.

- `ignorePatterns`: Property in an ESLint configuration file allows you to specify files and directories that ESLint should ignore during the linting process. Can be separated to a single file named `.eslintignore` following the same pattern

- `parser`: Declares which parser ESLint should use to analyze the code. The default is `espree`.

- `parserOptions`: Passes additional options to the parser, such as `ecmaVersion` to specify the ECMAScript version or `sourceType` to specify the code style (`"script"`, `"module"`, or `"commonjs"`)

- `plugins`: Allows using third-party plugins to apply specific linting rules for different codebases. For example, `eslint-plugin-react` adds linting rules for React projects. The defined plugin rules still need to be configured under `rules` or `extends`.

```javascript
module.exports = {
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
```

- `rules`: Allows enabling additional rules from plugins and overriding options for rules set by existing configurations.

- `overrides`: This property is an <mark style="background: #BBFABB; padding-inline: 4px;">array of objects</mark>, where each object can contain its <mark style="background: #BBFABB; padding-inline: 4px;">own set of configuration options</mark>. These options will override the default configuration for the specified files or patterns. So you’ll reuse some of the properties mentioned above

```javascript
module.exports = {
  overrides: [
    {
      files: ['src/**/*.jsx'],
      rules: { 'no-console': 'error' },
    },
  ],
};
```

---

There are other options available to set up, but these are the most often we’re going to see in our day-to-day.

I know that here I covered the basic terms and how to set it up, and there are more advance topics to cover, but <mark style="background: #BBFABB; padding-inline: 4px;">we don’t need to worry to know everything that ESLint offer us</mark>, getting started and knowing the basics is more important than trying to know everything and getting overwhelm in the process. Keep learning!

## Resources

- [ESLint Docs](https://eslint.org/docs/latest/use/core-concepts/)
