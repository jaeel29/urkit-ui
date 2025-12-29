# Urkit UI

A modern, accessible UI component library for Nuxt 4 with custom CSS architecture (no Tailwind).

[![npm version](https://img.shields.io/npm/v/urkit-ui.svg)](https://www.npmjs.com/package/urkit-ui)
[![npm downloads](https://img.shields.io/npm/dm/urkit-ui.svg)](https://www.npmjs.com/package/urkit-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Custom CSS Architecture** - Beautiful components without Tailwind dependency
- 🚀 **Nuxt 4 Ready** - Built specifically for Nuxt 4
- ♿ **Accessible** - WCAG compliant components
- 🎭 **Customizable** - Flexible theming and icon system
- 📦 **Zero Config** - Works out of the box with sensible defaults
- 🔧 **TypeScript** - Full TypeScript support
- 🎯 **Auto-Import** - Components automatically available in your app

## 📦 Available Components

Currently available components in v0.1.5:

| Component | Description | Status |
|-----------|-------------|--------|
| **UrButton** | Full-featured button with variants, sizes, loading states, and icons | ✅ Stable |
| **UrInput** | Comprehensive input component with validation, password toggle, icons, and select | ✅ Stable |
| **UrIcon** | Flexible icon system with namespace support | ✅ Stable |
| **UrAlert** | Alert component for messages and notifications with multiple variants and statuses | ✅ Stable |
| **UrBadge** | Badge component for labels and status indicators with colors and variants | ✅ Stable |

### Coming Soon

- ✨ **UrCard** - Card container component
- ✨ **UrModal** - Modal/dialog component
- ✨ **UrToast** - Toast notification system
- ✨ **UrCheckbox** - Checkbox input component
- ✨ **UrRadio** - Radio button component
- ✨ **UrSelect** - Dropdown select component
- ✨ **UrTextarea** - Multi-line text input
- And more...

## 🚀 Quick Start

### Installation

```bash
# Using pnpm (recommended)
pnpm add urkit-ui

# Using npm
npm install urkit-ui

# Using yarn
yarn add urkit-ui
```

### Setup

Add `urkit-ui` to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit-ui']
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

### Alert

Alert component for displaying important messages and notifications.

```vue
<UrAlert
  status="success"
  title="Success!"
  description="Your changes have been saved."
  :dismissable="true"
  @dismiss="handleDismiss"
/>
```

**Variants**: `filled`, `light`, `lighter`, `stroke`
**Sizes**: `xsmall`, `small`, `large`
**Statuses**: `error`, `warning`, `success`, `information`, `feature`

**Features**:
- Multiple variants and sizes
- 5 status types with unique icons
- Optional description and action buttons
- Dismissable with close button
- Slots for custom content

### Badge

Badge component for labels and status indicators.

```vue
<UrBadge
  variant="filled"
  size="medium"
  color="blue"
>
  New
</UrBadge>
```

**Variants**: `filled`, `light`, `lighter`, `stroke`
**Sizes**: `small`, `medium`, `large`
**Colors**: `gray`, `blue`, `orange`, `red`, `green`, `yellow`, `purple`, `sky`, `pink`, `teal`

## 🎨 Icon System

Urkit includes a flexible icon system with namespace support and automatic caching.

**📘 [Complete Icon Documentation](./ICONS.md)** - Usage, custom icons, and advanced configuration

### Included Icons

The module includes essential icons to get you started:

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
  modules: ['urkit-ui'],

  urkitUi: {
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

Customize Urkit UI in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit-ui'],

  urkitUi: {
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

Urkit UI uses a purple theme by default. Easily customize to match your brand:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit-ui'],

  urkitUi: {
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
- **[Icon System Guide](./ICONS.md)** - Icon usage, custom icons, and namespaces
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

- 📦 [NPM Package](https://www.npmjs.com/package/urkit-ui)
- 🐛 [Report Issues](https://github.com/jaeel29/urkit-ui/issues)
- 💬 [Discussions](https://github.com/jaeel29/urkit-ui/discussions)
- 📖 [Documentation](https://github.com/jaeel29/urkit-ui#readme)

---

---

## 👨‍💻 Development

This section is for contributors developing the Urkit UI module itself.

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
