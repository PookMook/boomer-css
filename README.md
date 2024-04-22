# Boomer-stack/CSS

## State of this library

This library is in alpha version, lots of functionality is expected to be added or changed. To ease testing and make sure people building solutions with that (probably shouldn't do it but you know). The only way to "install" the library is to copy `src/lib/boomer.ts` to your project.

## How to use

You first need to [install unplugin-parcel-macros](https://github.com/devongovett/unplugin-parcel-macros) and @parcel/macros as devDepencies. You can follow the instructions on how to setup your bundler configuration.
You can also use [parcel and leverage macros](https://parceljs.org/features/macros/) and not worry about anything.

Whenever you import a function from `boomer.ts`, you *need* to use `import { css } from '@/src/lib/boomer.ts' with { type: 'macro' }`. If you don't, the library will thrown at runtime. 

## Examples

This repo is a nextjs example. You can fork this repo and get started or inspire yourself from the setup for your own project. More examples will be available later, as well as ready made configuration to use in your projects.

## Dev 

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
