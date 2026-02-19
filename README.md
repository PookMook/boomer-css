# Boomer-stack/CSS

## State of this library

This library is in alpha version, lots of functionality is expected to be added or changed. To ease testing and make sure people building solutions with that (probably shouldn't do it but you know). The only way to "install" the library is to copy `src/lib/boomer.ts` to your project.

## How to use

You first need to [install unplugin-parcel-macros](https://github.com/devongovett/unplugin-parcel-macros) and @parcel/macros as devDepencies. You can follow the instructions on how to setup your bundler configuration.
You can also use [parcel and leverage macros](https://parceljs.org/features/macros/) and not worry about anything.

Whenever you import a function from `boomer.ts`, you *need* to use `import { css } from '@/src/lib/boomer.ts' with { type: 'macro' }`. If you don't, the library will thrown at runtime. 

## Examples

This repo is a TanStack Start example. You can fork this repo and get started or inspire yourself from the setup for your own project. More examples will be available later, as well as ready made configuration to use in your projects.

## Dev 

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `src/routes/index.tsx` and other files under `src/routes`. The page auto-updates as you edit the file.

WIP Documentation below

# BoomerCSS

BoomerCSS is a TypeScript CSS preprocessor built for zero runtime everywhere. It generates static CSS at build time using Parcel macros and provides a type-safe way to author CSS with themes, variants, and responsive designs.

## Core Concepts

### Theme Configuration

The theme system is configured using `createConfig` which sets up your design tokens and media queries:

```typescript
export const { queries, theme } = createConfig({
  queries: {
    desktop: 'media (min-width: 1024px)',
    tablet: 'media (min-width: 768px)',
    mobile: 'media (max-width: 767px)',
    dark: 'media (prefers-color-scheme: dark)',
    light: 'media (prefers-color-scheme: light)',
    highContrast: 'media (forced-colors: active)',
  },
  theme: {
    base: {
      colors: {
        colorScheme: 'light dark',
        primary: '#000',
        secondary: '#fff',
        background: '#f0f0f0',
      },
    },
    dark: {
      colors: {
        colorScheme: 'dark',
        primary: '#fff',
        secondary: '#000',
        background: '#101010',
      },
    }
  },
})
```

This generates CSS custom properties and media query utilities at build time.

### Styled Components

Create components using the `styled` function:

```typescript
interface ICounterProps {
  count: number;
  onIncrement: () => Promise<void>;
}

const Button = styled('button', {
  base: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  }
}, { name: 'button' })

export function Counter({ count, onIncrement }: ICounterProps): JSX.Element {
  return (
    <Button
      type="button"
      onClick={onIncrement}
    >
      Add 1 to {count}?
    </Button>
  )
}
```

### CSS Layer System

BoomerCSS uses CSS layers for predictable style application, they are defined in this order (last layer wins):

1. `tokenBase` - Theme tokens base values
2. `tokenMedia` - Media query-based token overrides
3. `reset` - Global reset styles
4. `base` - Component base styles
5. `variants` - Variant styles
6. `compoundVariants` - Complex variant combinations

### Build-time CSS Generation

The styling system works through Parcel macros that:
1. Generate unique class names based on style content
2. Create CSS files at build time
3. Insert the CSS into your application
4. Provide type-safe props for variants

## API Reference

### createConfig
Creates theme tokens and media query configurations:
```typescript
createConfig({
  queries: Record<string, string>,
  theme: {
    base: ThemeTokens,
    [mediaQuery: string]: Partial<ThemeTokens>
  }
})
```

### css

Creates styled components with variants:
```typescript
const buttonCSS = css({
  base: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  variants: {
    type: {
      primary: {
        backgroundColor: v('colors.primaryBackground'),
      },
      secondary: {
        backgroundColor: v('colors.secondaryBackground'),
      }
    }
  }
}, { name: 'button' })

```


### styled
Creates styled components with variants:
```typescript
const Button = styled('button', {
  base: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  variants: {
    type: {
      primary: {
        backgroundColor: v('colors.primaryBackground'),
      },
      secondary: {
        backgroundColor: v('colors.secondaryBackground'),
      }
    }
  }
}, { name: 'button' })
```

### globalCSS
Applies global styles:
```typescript
globalCSS({
  selector: CSSRules
})
```

## Type Safety

BoomerCSS provides TypeScript types for:
- Theme tokens and values
- Component variants
- CSS properties
- Media queries
- HTML element props

## Performance Benefits

- Zero runtime style logic in JavaScript
- CSS is generated at build time
- Styles are loaded via standard CSS files
- No style calculation or injection at runtime, anywhere in the app
- Optimal browser caching of CSS

## Best Practices

1. Always import with macro directive:
```typescript
import { styled, css, q, v } from '../libs/boomer' with { type: 'macro' }
```
2. As much as possible, use the css function to define styles, this offers better reusability to different html tags and better portability across different ui frameworks:
```typescript
const boxCSS = css({
  base: {
    color: v('colors.primary'),
    backgroundColor: v('colors.background')
  }
}, { name: 'box' })
// then use the css function in the component

function Box({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={boxCSS()}>{children}</div>
}

```
3. Use theme tokens via the v function for consistent styling:
```typescript
const boxCSS = css({
  base: {
    color: v('colors.primary'),
    backgroundColor: v('colors.background')
  }
})
```
4. use media queries via the q function to define responsive styles
```ts
const buttonCSS = css({
  base: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    query: {
      [q('tablet/media  (min-width: 768px) and (max-width: 1023px)')]: {
        fontSize: '1rem',
      }
    }
  }
}, { name: 'button' })
```
5. Use variants rather than redeclaring similar styles.
```typescript
const boxCSS = css({
  base: {
    color: v('colors.primary'),
    backgroundColor: v('colors.background')
  },
  variants: {
    size: {
        large: {
            padding: v('size.paddingL'),
        },
        small: {
            padding: v('size.paddingS'),
        }
    },
  }
}, { name: 'box' })
// then use the css function in the component

function Box({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={boxCSS({ size: 'big' })}>{children}</div>
}
```

6. Use semantic tokens and variant names, this will make your styles more readable and maintainable in the long run

## Browser Support

BoomerCSS generates standard CSS using:
- CSS Custom Properties
- CSS Layers
- Standard media queries
- No runtime requirements

This ensures broad browser compatibility while maintaining modern CSS features, regardless of the ui framework you are using or if this library is updated.
