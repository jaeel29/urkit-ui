import { defineNuxtModule, createResolver, addComponentsDir, addTemplate } from '@nuxt/kit'

// Helper function to generate CSS custom properties from color options
function generateCustomColorCSS(colors: ModuleOptions['colors']): string {
  if (!colors) return ''

  const cssVars: string[] = []

  // Primary colors
  if (colors.primary) {
    Object.entries(colors.primary).forEach(([shade, value]) => {
      cssVars.push(`  --primary-${shade}: ${value};`)
    })
  }

  // Neutral colors
  if (colors.neutral) {
    Object.entries(colors.neutral).forEach(([shade, value]) => {
      cssVars.push(`  --neutral-${shade}: ${value};`)
    })
  }

  if (cssVars.length === 0) return ''

  return `:root {\n${cssVars.join('\n')}\n}`
}

export interface ModuleOptions {
  /**
   * Custom icon base path
   * @default '/assets/icons'
   */
  iconPath?: string

  /**
   * Custom icon namespaces and their paths
   * @example { icons: '/custom/icons', logos: '/custom/logos' }
   */
  iconNamespaces?: Record<string, string>

  /**
   * Component prefix
   * @default 'Ur'
   */
  prefix?: string

  /**
   * Custom color overrides
   * Override default purple theme with your brand colors
   * @example
   * {
   *   primary: {
   *     50: '#f0f9ff',
   *     100: '#e0f2fe',
   *     500: '#0ea5e9',
   *     600: '#0284c7',
   *     700: '#0369a1'
   *   },
   *   neutral: {
   *     1: '#fafafa',
   *     5: '#737373',
   *     12: '#171717'
   *   }
   * }
   */
  colors?: {
    primary?: Partial<Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>>
    neutral?: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, string>>
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'urkit',
    configKey: 'urkit',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  defaults: {
    iconPath: '/assets/icons',
    iconNamespaces: {
      icons: '/assets/icons',
      logos: '/assets/logos',
    },
    prefix: 'Ur'
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Inject CSS files
    // Order matters: colors first, then component-specific styles, then global
    nuxt.options.css.push(resolver.resolve('./runtime/assets/css/colors.css'))
    nuxt.options.css.push(resolver.resolve('./runtime/assets/css/buttons.css'))
    nuxt.options.css.push(resolver.resolve('./runtime/assets/css/form-fields.css'))
    nuxt.options.css.push(resolver.resolve('./runtime/assets/css/global.css'))

    // Inject custom colors if provided
    if (options.colors) {
      const customColors = generateCustomColorCSS(options.colors)
      if (customColors) {
        // Create a virtual CSS file with custom colors
        const customColorsFile = addTemplate({
          filename: 'urkit-custom-colors.css',
          getContents: () => customColors,
          write: true
        })
        // Inject the custom colors CSS file
        nuxt.options.css.push(customColorsFile.dst)
      }
    }

    // Add module's public assets (icons, logos) to be served
    // This makes assets from src/runtime/public/ available in the user's app
    nuxt.options.nitro = nuxt.options.nitro || {}
    nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
    nuxt.options.nitro.publicAssets.push({
      dir: resolver.resolve('./runtime/public'),
      maxAge: 60 * 60 * 24 * 365 // 1 year cache for icons
    })

    // Make icon configuration available at runtime
    nuxt.options.runtimeConfig.public.urkit = {
      iconNamespaces: options.iconNamespaces
    }

    // Register components with configurable prefix
    await addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false
    })
  }
})
