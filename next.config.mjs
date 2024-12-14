/** @type {import('next').NextConfig} */
import UnpluginParcelMacros from 'unplugin-parcel-macros'

const plugin = UnpluginParcelMacros.webpack()

/** @type {import('next').NextConfig} */
export default {
	eslint: {
		ignoreDuringBuilds: true,
	  },
	  typescript:{
		ignoreDuringBuilds: true,
	  },
	webpack(config) {
		config.plugins.push(plugin)
		return config
	},
}
