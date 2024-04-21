import { css } from "@/lib/boomer" with {type: 'macro'}
import { createConfig } from "@/lib/boomer" with {type: 'macro'}

const config = createConfig({
  media: {
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
    smallScreen: "(max-width: 499px)",
    normalScreen: "(min-width: 500px)",
    largeScreen: "(min-width: 1000px)",
    withoutAnimation: "(prefers-reduced-motion)",
    print: "(print)",
  },
  theme: {
    base: {
      colors: {
        text: 'red'
      }
    },
    print: {
      colors: {
        shouldFail: 'green'
      }
    }
  }
})

const boomer = css({
  base: {
    color: config.theme.colors.text.variable,
  }
}, { name: 'title' })

export default function Home() {
  return (
    <h1 className={boomer({})}>BoomerCSS</h1>
  )
};
