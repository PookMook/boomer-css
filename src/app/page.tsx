import { css } from "@/lib/boomer" with {type: 'macro'}

const boomer = css({
  base: {
    color: 'red'
  }
}, { name: 'title' })

export default function Home() {
  return (
    <h1 className={boomer({})}>BoomerCSS</h1>
  )
};
