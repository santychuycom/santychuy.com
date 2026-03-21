---
title: 'ESLint Esencial: Entendiendo la Configuración'
pubDate: 2024-07-31T23:31:22.487Z
lang: es
author:
  name: Santiago Carrasco
  img: /imgs/profile.jpg
image: /uploads/eslint-essentials-thumbnail.jpg
imageAlt: Miniatura del artículo sobre ESLint esencial con la marca del linter
keywords:
  - configuración
  - eslint
  - javascript
  - linter
  - typescript
categories:
  - eslint
  - javascript
  - tools
  - typescript
description: Simplifica tu configuración de ESLint con esta guía. Aprende conceptos clave, explora las opciones de configuración y personaliza ESLint para tus proyectos.
shortDesc: 'Domina ESLint desde cero: simplifica la configuración y mejora la calidad de tu código.'
---

[ESLint](https://eslint.org/) es un linter de código abierto para el ecosistema JavaScript/Node. Puede integrarse en la mayoría de los editores de texto y ejecutarse en tu proceso de pipeline (terminal).

> 🗣️ <mark>NOTA IMPORTANTE</mark>: algunos conceptos están basados en las versiones más recientes de ESLint (^v9.0.0), tenlo en cuenta si encuentras diferencias. Si quieres [leer](https://eslint.org/docs/latest/use/configure/migration-guide) el proceso de migración y sus diferencias, puedes ir al artículo y revisarlo.

Un problema que suelo tener es no entender del todo bien toda la <mark>configuración y ajustes de ESLint</mark>: cuáles son las diferencias entre configuraciones y plugins, qué significa cada propiedad dentro del archivo `.eslintrc` (o similar).

El objetivo de esta nota será <mark>explicar y entender ESLint</mark> para no confundirnos y hacer las cosas bien en nuestro próximo proyecto que use ESLint.

## Terminología

> _Lista completa [aquí](https://eslint.org/docs/latest/use/core-concepts/glossary#shareable-config-configuration)_

- **Abstract Syntax Tree (AST)**: Es una representación estructurada de la sintaxis del código.

- **Regla (Rule)**: Código que verifica un AST en busca de patrones esperados. Muchas reglas pueden ser cargadas mediante plugins.

- **Plugin**: Paquete que <mark>puede contener un conjunto de configuraciones, procesadores y/o reglas</mark>.

- **Configuración (Configuration)**: Conjunto de reglas que también puede incluir plugins.

- **Archivo de configuración (Configuration file)**: Archivo que contiene las preferencias de cómo ESLint debe <mark>analizar archivos y ejecutar reglas</mark>.

- **Parser**: Objeto que contiene un método que lee una cadena de texto y la convierte a un <mark>formato estandarizado</mark>. ESLint usa parsers para convertir el código fuente en una estructura AST. Son parsers personalizados para permitir que ESLint analice sintaxis JavaScript no estándar; por ejemplo, [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) es un parser personalizado incluido en el proyecto [typescript-eslint](https://typescript-eslint.io/) que permite a ESLint analizar código TypeScript.

- **Procesador (Processor)**: Parte de un plugin que extrae código JavaScript de otros tipos de archivos, y luego permite que ESLint lo analice. Por ejemplo, [`eslint-plugin-markdown`](https://github.com/eslint/eslint-plugin-markdown) incluye un procesador que convierte el texto de los bloques de código ` ``` ` en archivos Markdown en código que puede ser analizado.

- **Override**: Como la palabra indica, sobreescribe opciones y reglas previamente definidas en el archivo de configuración.

## Entendiendo ESLint

> _ESLint es completamente extensible. <mark>Cada regla es un plugin</mark>, y puedes agregar más en tiempo de ejecución._

### Valores para las reglas

Las reglas se definen dentro de la propiedad `rules`, que es un objeto, y se declaran como `'nombre-regla': 'valor'`.

- `nombre-regla`: Identifica el tipo de error/advertencia que quieres usar.

- `valor`: Puede ser de tipo `string` o `number`; independientemente de lo que elijas, el resultado es el mismo. <mark>El orden de cada valor en ambos tipos es equivalente entre sí</mark>:
  - `string`
    - `off`
    - `warn`
    - `error`
  - `number`
    - `0`
    - `1`
    - `2`

## Archivo de configuración de ESLint

Sirve para configurar tu <mark>proyecto con ESLint</mark> en un solo lugar. Puedes incluir reglas integradas, cómo quieres que se apliquen, plugins con reglas personalizadas, configuraciones compartidas, a qué archivos aplican las reglas, y más.

Configúralo así (para ^v9.0.0):

- `eslint.config.js`
- `eslint.config.mjs`
- `eslint.config.cjs`

Y para versiones anteriores a v9.0.0:

- `.eslintrc`
- `.eslintrc.json`
- `.eslintrc.js`
- `.eslintrc.mjs`

Colócalo en la <mark>raíz de tu proyecto y exporta un arreglo</mark>.

[Aquí](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects) puedes consultar cada objeto de configuración que contiene toda la información necesaria para que ESLint funcione correctamente.

### Estructura base de un archivo de configuración

> *Definiré algunas propiedades para el archivo de configuración basadas en versiones <v9.0.0 usando la convención `*rc.{json|js|mjs}`*

- `root`: Es un booleano que indica si el archivo de configuración actual es la raíz de la jerarquía de configuración de ESLint.

- `env`: Declara en qué entornos se espera que corra tu código. Cada entorno trae consigo un conjunto de variables globales predefinidas. Por ejemplo, evita errores de la regla `no-undef` al esperar variables del <mark>navegador</mark> como `window` o `document`. [Lista de entornos](https://eslint.org/docs/v8.x/use/configure/language-options#specifying-environments)

  Los más comunes:

  - **browser**: Habilita variables globales del navegador como `window` y `document`.
  - **node**: Habilita variables globales de Node.js como `process` y `require`.
  - **es6**: Habilita variables y características de ES6, como `Promise` y `Set`. También establece `ecmaVersion` en 6.
  - **jest**: Habilita variables globales del framework de pruebas Jest como `describe`, `it` y `test`.
  - **mocha**: Habilita variables globales de Mocha como `describe`, `it` y `beforeEach`.
  - **jquery**: Habilita variables globales de jQuery como `$` y `jQuery`.
  - **serviceworker**: Habilita variables globales disponibles en service workers.
  - **worker**: Habilita variables globales disponibles en web workers.

- `extends`: En lugar de configurar cada regla manualmente, puedes aplicar una configuración masiva de reglas desde una configuración compartida usando la propiedad `extends`.

- `ignorePatterns`: Propiedad en el archivo de configuración de ESLint que permite especificar archivos y directorios que ESLint debe ignorar durante el análisis. Puede separarse en un archivo llamado `.eslintignore` siguiendo el mismo patrón.

- `parser`: Declara qué parser debe usar ESLint para analizar el código. El predeterminado es `espree`.

- `parserOptions`: Pasa opciones adicionales al parser, como `ecmaVersion` para especificar la versión de ECMAScript o `sourceType` para especificar el estilo del código (`"script"`, `"module"` o `"commonjs"`).

- `plugins`: Permite usar plugins de terceros para aplicar reglas de análisis específicas para distintas bases de código. Por ejemplo, `eslint-plugin-react` agrega reglas para proyectos React. Las reglas definidas en el plugin aún necesitan configurarse en `rules` o `extends`.

```javascript
module.exports = {
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
```

- `rules`: Permite habilitar reglas adicionales de plugins y sobrescribir opciones para reglas definidas por configuraciones existentes.

- `overrides`: Esta propiedad es un <mark>arreglo de objetos</mark>, donde cada objeto puede contener su <mark>propio conjunto de opciones de configuración</mark>. Estas opciones sobreescriben la configuración predeterminada para los archivos o patrones especificados. Puedes reutilizar las propiedades mencionadas anteriormente.

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

Hay otras opciones disponibles para configurar, pero estas son las que más frecuentemente veremos en nuestro día a día.

Sé que aquí cubrí los términos básicos y cómo configurarlo, y hay temas más avanzados por explorar, pero <mark>no necesitamos saber todo lo que ESLint nos ofrece</mark>; comenzar y conocer los fundamentos es más importante que intentar saberlo todo y abrumarse en el proceso. ¡Sigue aprendiendo!

## Recursos

- [Documentación de ESLint](https://eslint.org/docs/latest/use/core-concepts/)
