# Icon System Documentation

urkit-ui includes a flexible icon system that supports both built-in and custom icons.

## Quick Start

```vue
<template>
  <UrIcon name="icons:search-icon" :size="24" />
</template>
```

## Built-in Icons

The package includes essential icons that are ready to use. All icons use `currentColor` for dynamic theming.

### Alert Icons
- `icons:alert-error` - Error alert icon (filled)
- `icons:alert-warning` - Warning alert icon (filled)
- `icons:alert-success` - Success alert icon (filled)
- `icons:alert-info` - Information alert icon (filled)
- `icons:alert-feature` - Feature announcement icon (filled)

### UI Icons
- `icons:close` - Close/dismiss icon (16×16, outlined)
- `icons:search` - Search icon (24×24, outlined)
- `icons:show` - Show/visibility icon (24×24, outlined)
- `icons:hide` - Hide/visibility off icon (24×24, outlined)

## Icon Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Icon name in format `namespace:icon-name` |
| `size` | `string \| number` | `24` | Icon size in pixels |
| `class` | `string` | - | Additional CSS classes |

### Usage Examples

```vue
<!-- Basic usage -->
<UrIcon name="icons:search-icon" />

<!-- Custom size -->
<UrIcon name="icons:close" :size="20" />

<!-- With custom class -->
<UrIcon name="icons:user-icon" :size="32" class="text-blue-500" />
```

## Adding Custom Icons

### 1. Add Icon Files

Place your SVG icons in your project's public directory:

```
my-project/
├── public/
│   └── assets/
│       └── icons/
│           ├── my-icon.svg
│           └── another-icon.svg
```

### 2. Use Your Icons

```vue
<UrIcon name="icons:my-icon" :size="24" />
<UrIcon name="icons:another-icon" :size="20" />
```

## Icon File Requirements

Your SVG icons should follow these guidelines:

### ✅ Good Icon Format

```xml
<!-- Use currentColor for dynamic coloring -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <path d="M12 2C6.48..." />
</svg>
```

or for stroke icons:

```xml
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2..." stroke="currentColor" stroke-width="2" />
</svg>
```

### ❌ Avoid

- Hard-coded colors: `fill="#000000"` or `stroke="#333"`
- Inline styles or classes
- Width/height attributes (viewBox is preferred)
- Multiple root elements

## Custom Namespaces

Configure custom icon namespaces in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit-ui'],
  urkit: {
    iconNamespaces: {
      icons: '/assets/icons',      // Default UI icons
      logos: '/assets/logos',       // Company/brand logos
      flags: '/assets/flags',       // Country flags
      custom: '/my-custom-path',   // Your custom namespace
    }
  }
})
```

### Using Custom Namespaces

```vue
<!-- Use logo from logos namespace -->
<UrIcon name="logos:company-logo" :size="48" />

<!-- Use flag from flags namespace -->
<UrIcon name="flags:us" :size="24" />

<!-- Use custom icon -->
<UrIcon name="custom:special-icon" :size="32" />
```

## Icon Directory Structure

Recommended directory structure for large icon sets:

```
public/
└── assets/
    ├── icons/           # UI icons (buttons, forms, etc.)
    │   ├── search.svg
    │   ├── close.svg
    │   └── menu.svg
    ├── logos/           # Brand/company logos
    │   ├── company-logo.svg
    │   └── partner-logo.svg
    └── flags/           # Country flags
        ├── us.svg
        └── uk.svg
```

## Styling Icons

Icons inherit color from their parent element:

```vue
<template>
  <div class="text-blue-500">
    <!-- Icon will be blue -->
    <UrIcon name="icons:search-icon" :size="24" />
  </div>

  <button style="color: red;">
    <!-- Icon will be red -->
    <UrIcon name="icons:close" :size="20" />
  </button>
</template>
```

## Advanced: Icon Loading System

The icon system uses client-side SVG loading with automatic caching:

1. Icons are fetched once and cached
2. SVG content is extracted and wrapped with proper sizing
3. ViewBox is preserved for proper scaling
4. Failed loads show empty placeholder (no broken image)

## Troubleshooting

### Icons not showing?

1. **Check the icon path**: Icons should be in `public/assets/icons/`
2. **Verify the icon name**: Use format `namespace:icon-name`
3. **Check SVG format**: Ensure SVG uses `currentColor`
4. **Clear cache**: Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+F5)

### Icons showing as empty boxes?

- Ensure SVG uses `currentColor` instead of hard-coded colors
- Check browser console for 404 errors
- Verify the icon file exists at the correct path

### Icons wrong size?

- The `size` prop controls both width and height
- Icons maintain aspect ratio via viewBox
- Use CSS for additional styling if needed

## Examples

### Search Input with Icon

```vue
<template>
  <div class="search-wrapper">
    <UrIcon name="icons:search-icon" :size="20" class="search-icon" />
    <input type="search" placeholder="Search..." />
  </div>
</template>

<style scoped>
.search-wrapper {
  position: relative;
  color: #666;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

input {
  padding-left: 40px;
}
</style>
```

### Button with Icon

```vue
<template>
  <button class="btn">
    <UrIcon name="icons:close" :size="16" />
    <span>Close</span>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

### Icon Color Variations

```vue
<template>
  <div class="icon-examples">
    <UrIcon name="icons:alert-error" :size="24" class="text-red-500" />
    <UrIcon name="icons:alert-success" :size="24" class="text-green-500" />
    <UrIcon name="icons:alert-warning" :size="24" class="text-orange-500" />
  </div>
</template>
```
