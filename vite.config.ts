import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import UnpluginParcelMacros from 'unplugin-parcel-macros'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    nitro(),
    UnpluginParcelMacros.vite(),
    viteReact(),
    {
      name: 'strip-macro-sourcemaps',
      enforce: 'post',
      transform(code, id) {
        const isSourceFile = /\.[jt]sx?$/.test(id)
        const hasMacroOutput = code.includes('.macro-')

        if (!isSourceFile || !hasMacroOutput) {
          return null
        }

        // unplugin-parcel-macros can emit sourcemaps that reference ephemeral
        // generated files. Returning an empty map prevents Vite from trying to
        // hydrate missing sources while preserving transformed output.
        return {
          code,
          map: {
            version: 3,
            names: [],
            sources: [],
            sourcesContent: [],
            mappings: '',
          },
        }
      },
    },
  ],
})
