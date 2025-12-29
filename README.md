# Urkit

A modern, accessible UI component library for Nuxt 4 with custom CSS architecture (no Tailwind).

## ✨ Features

- 🎨 **Custom CSS Architecture** - Beautiful components without Tailwind dependency
- 🚀 **Nuxt 4 Ready** - Built specifically for Nuxt 4
- ♿ **Accessible** - WCAG compliant components
- 🎭 **Customizable** - Flexible theming and icon system
- 📦 **Zero Config** - Works out of the box with sensible defaults
- 🔧 **TypeScript** - Full TypeScript support
- 🎯 **Auto-Import** - Components automatically available in your app

## 📦 Quick Start

### Installation

```bash
# Using pnpm
pnpm add urkit

# Using npm
npm install urkit

# Using yarn
yarn add urkit
```

### Setup

Add `urkit` to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit']
})
```

That's it! Components are now auto-imported with the `Ur` prefix.

### Usage

```vue
<template>
  <div>
    <UrButton variant="primary">Click Me</UrButton>

    <UrInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
    />
  </div>
</template>

<script setup lang="ts">
const email = ref('')
</script>
```

## 📚 Components

### Button

Full-featured button component with multiple variants, sizes, and states.

```vue
<UrButton
  variant="primary"
  mode="filled"
  size="md"
  icon="icons:plus"
  :loading="false"
>
  Click Me
</UrButton>
```

**Variants**: `primary`, `error`, `success`, `neutral`
**Modes**: `filled`, `stroke`, `lighter`, `ghost`
**Sizes**: `sm`, `md`, `lg`, `xlg`

### Input

Comprehensive input component with validation, icons, and advanced features.

```vue
<UrInput
  v-model="value"
  type="text"
  label="Label"
  placeholder="Placeholder"
  icon="icons:search"
/>
```

**Features**:
- Text, password, email, number inputs
- Password toggle with requirements validation
- Icons and affixes (prefix/suffix)
- Button integration
- Select dropdown
- Disabled and error states

## 🎨 Icon System

Urkit includes a flexible icon system with namespaces.

### Included Icons (for testing)

The module includes 10 essential icons to get you started:

| Icon | Name | Usage |
|------|------|-------|
| 👁️ | `icons:show` | Password toggle (show) |
| 🙈 | `icons:hide` | Password toggle (hide) |
| ⏳ | `icons:loader-icon` | Loading states |
| 🔍 | `icons:search` | Search functionality |
| ❌ | `icons:toast-close` | Close/dismiss actions |
| ❤️ | `icons:heart` | Like/favorite |
| ⭐ | `icons:star` | Rating/favorites |
| 👤 | `icons:profile` | User/account |
| 📋 | `icons:copy` | Copy action |
| ⬇️ | `icons:arrow-down` | Dropdowns/navigation |

```vue
<!-- Use included icons -->
<UrIcon name="icons:search" />
<UrIcon name="icons:heart" />
```

**💡 For production**: Add your own icons! The included icons are minimal for testing purposes.

### Custom Icons

#### Method 1: Override Built-in Icons

Place SVG files in your project's `public/assets/icons/` directory:

```
your-app/
└── public/
    └── assets/
        └── icons/
            └── custom-icon.svg  ← Overrides module's icon
```

#### Method 2: Add Custom Namespace

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    iconNamespaces: {
      icons: '/assets/icons',      // Default
      logos: '/assets/logos',      // Default
      custom: '/custom/icons'      // Your custom namespace
    }
  }
})
```

Then use: `<UrIcon name="custom:my-icon" />`

## ⚙️ Configuration

Customize Urkit in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    // Customize component prefix (default: 'Ur')
    prefix: 'Ur',

    // Customize brand colors
    colors: {
      primary: {
        500: '#0ea5e9',  // Your brand color
        600: '#0284c7',
        700: '#0369a1'
      }
    },

    // Customize icon namespaces
    iconNamespaces: {
      icons: '/assets/icons',
      logos: '/assets/logos',
      social: '/custom/social-icons'
    }
  }
})
```

## 🎨 Color Customization

Urkit uses a purple theme by default. Easily customize to match your brand:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',  // Main brand color
        600: '#0284c7',  // Hover
        700: '#0369a1'   // Active
      },
      neutral: {
        1: '#fafafa',
        7: '#737373',
        12: '#171717'
      }
    }
  }
})
```

**See [COLORS.md](./COLORS.md) for complete customization guide, examples, and color scales.**

## 📖 Documentation

- **[Complete Usage Guide](./USAGE.md)** - Detailed component documentation and examples
- **[Color Customization](./COLORS.md)** - Brand color customization guide
- **[Architecture](./ARCHITECTURE.md)** - Technical architecture and asset management

## 🔧 Requirements

- Nuxt 4.0.0 or later
- Node.js 18 or later

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Support

- [Report Issues](https://github.com/yourusername/urkit/issues)
- [Discussions](https://github.com/yourusername/urkit/discussions)

---

## Development

This section is for contributors developing the Urkit module itself.

### Setup

```bash
# Install dependencies
pnpm install

# Prepare module
pnpm run dev:prepare

# Start playground
pnpm run dev
```

### Building

```bash
# Build the module
pnpm run prepack
```

### Project Structure

```
urkit-ui/
├── src/
│   ├── module.ts                 # Module configuration
│   └── runtime/
│       ├── assets/css/           # CSS files
│       ├── components/           # Vue components
│       ├── composables/          # Composables
│       └── public/              # Public assets (icons, logos)
├── playground/                   # Testing playground
├── USAGE.md                     # Usage documentation
└── ARCHITECTURE.md              # Architecture documentation
```
