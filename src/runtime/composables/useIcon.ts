// Icon loading composable for Urkit
const iconCache = new Map<string, string>()

// Default icon namespaces
const DEFAULT_NAMESPACES = {
  icons: '/assets/icons',
  logos: '/assets/logos',
  'wl-pbo': '/assets/wl-pbo'
}

export const useIcon = () => {
  // Get icon namespaces from runtime config if available, otherwise use defaults
  const getIconNamespaces = () => {
    // Try to access runtime config if available
    if (typeof window !== 'undefined' && (window as any).__NUXT__?.config?.public?.urkit?.iconNamespaces) {
      return (window as any).__NUXT__.config.public.urkit.iconNamespaces
    }
    return DEFAULT_NAMESPACES
  }

  const loadIcon = async (name: string): Promise<string> => {
    // Check cache first
    if (iconCache.has(name)) {
      return iconCache.get(name)!
    }

    const [namespace, iconName] = name.split(':')
    const namespaces = getIconNamespaces()

    // Get the path for this namespace
    const namespacePath = namespaces[namespace]

    if (!namespacePath) {
      console.warn(`Icon namespace "${namespace}" not configured`)
      return getFallbackIcon()
    }

    const fullPath = `${namespacePath}/${iconName}.svg`

    try {
      // Fetch the SVG file
      const response = await fetch(fullPath)
      if (!response.ok) {
        console.warn(`Icon "${name}" not found at path: ${fullPath}`)
        return getFallbackIcon()
      }

      const svgContent = await response.text()

      // Extract the inner content and viewBox from the SVG
      const svgMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s)
      const innerContent = svgMatch ? svgMatch[1].trim() : svgContent

      // Extract viewBox from the original SVG
      const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/)
      const originalViewBox = viewBoxMatch ? viewBoxMatch[1] : getDefaultViewBox(namespace)

      // Cache both content and viewBox
      iconCache.set(name, innerContent)
      iconCache.set(`${name}:viewBox`, originalViewBox)

      return innerContent
    } catch (error) {
      console.warn(`Failed to load icon "${name}":`, error)
      return getFallbackIcon()
    }
  }

  const getFallbackIcon = (): string => {
    return '' // Return empty string for fallback
  }

  const getDefaultViewBox = (namespace: string): string => {
    const viewBoxMap: Record<string, string> = {
      icons: '0 0 24 24',
      logos: '0 0 60 60',
      'wl-pbo': '0 0 24 24',
    }
    return viewBoxMap[namespace] || '0 0 24 24'
  }

  const getViewBox = (namespace: string, iconName?: string): string => {
    // If we have a specific icon name, try to get its cached viewBox
    if (iconName) {
      const fullName = `${namespace}:${iconName}`
      const cachedViewBox = iconCache.get(`${fullName}:viewBox`)
      if (cachedViewBox) {
        return cachedViewBox
      }
    }

    // Fall back to default viewBox for namespace
    return getDefaultViewBox(namespace)
  }

  return {
    loadIcon,
    getFallbackIcon,
    getViewBox,
  }
}
