<div style="display: flex; align-items: center;">
   <img src="docs/images/santychuyISO.svg" alt="Santychuy Logo" width="45" height="104" />
   <h1 style="border-bottom: none; margin-left: 10px;">Contributing to Santychuy.com</h1>
</div>

Thank you for considering contributing to Santychuy.com!

## Ways to Contribute

There are several ways you can contribute to Santychuy.com:

- **Report Issues:**

  - Found a bug or have a suggestion? Open an issue to let us know.

- **Look out the open Issues and Pull Requests**

  - Be up to date with the issues and pull requests already reported that you can contribute working on.

- **Submit Pull Requests:**

  - Contribute directly by submitting pull requests for bug fixes, new features, or improvements.

- **Documentation:**
  - Help improve our documentation to make it more user-friendly.

## How to contribute

1. Set up your environment

   - Fork the project to have a copy
   - Clone your fork to have it locally
   - Add the original repository as remote: `git remote add upstream [URL from original repo]` to sync future updates

   a. Install dependencies

   - Execute `bun install` to install the necessary dependencies

   b. Blog post editing tool **(recommended)**

   - You can always edit markdown files manually, but we recommend using **Astro Editor** for blog posts.
   - Astro Editor gives you a visual metadata form (title, date, description, categories, image, etc.) based on the schema.

2. Start working

   - Create a new local branch with this name conviction **(recommended)**:

     - type/name-branch
     - Example: `git checkout -b feat/blog-section`

   - Work on your implementation/changes

   - Test your changes on your local machine: `bun dev`

   - Commit your changes and push your fork to Github `git push origin type/name-branch`

   - Create a Pull Request from your fork, be sure to be very specific

## Thank you

Thank you for contributing to Santychuy.com! Your support helps make this project even better.

## Writing blog posts with Astro Editor (recommended)

If you want to create or edit blog content, this is the recommended workflow:

1. Open the repository folder in Astro Editor.
2. Start the local website in parallel with `bun dev`.
3. In Astro Editor, open files from `src/content/posts/`.
4. Edit both markdown content and metadata from the right sidebar.
5. Save your changes and refresh the browser preview to verify the result.
6. Commit and open your PR once everything looks correct.

Notes:

- Metadata fields are generated from `src/schemas/post.ts` through `src/content/config.ts`.
- If a new/updated field does not appear in Astro Editor, run `bunx astro sync` once and reopen the project.
