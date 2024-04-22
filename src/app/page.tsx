import { css } from "@/lib/boomer" with {type: 'macro'}
import { createConfig } from "@/lib/boomer" with {type: 'macro'}

const { theme, media } = createConfig({
  media: {
    dark: "media screen and (prefers-color-scheme: dark)",
    light: "media screen and (prefers-color-scheme: light)",
    smallScreen: "media screen and (max-width: 499px)",
    normalScreen: "media all and (min-width: 500px)",
    largeScreen: "media screen and (min-width: 1000px)",
    withoutAnimation: "media print, (prefers-reduced-motion)",
    print: "media print",
  },
  theme: {
    base: {
      colors: {
        text: 'red'
      }
    },
    smallScreen: {
      colors: {
        text: 'blue'
      }
    },
    normalScreen: {
      colors: {
        text: 'yellow'
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
    color: theme.colors.text,
  }
}, { name: 'title' })

export default function Home() {
  return (
    <h1 className={boomer({})}>BoomerCSS</h1>
  )
};
