# Urkit - Usage Guide

Complete guide for installing and using Urkit in your Nuxt 4 projects.

---

## 📦 Installation

### Step 1: Install the Package

```bash
# Using pnpm (recommended)
pnpm add urkit

# Using npm
npm install urkit

# Using yarn
yarn add urkit
```

---

## ⚙️ Configuration

### Step 2: Add to Nuxt Config

Edit your `nuxt.config.ts` and add Urkit to the modules array:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'urkit'
  ]
})
```

### Optional: Customize Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'urkit'
  ],

  urkit: {
    // Customize component prefix (default: 'Ur')
    prefix: 'Ur',

    // Customize icon namespaces and their paths
    iconNamespaces: {
      icons: '/assets/icons',      // Default UI icons
      logos: '/assets/logos',      // Default logos
      custom: '/custom/icons'      // Add your own namespace
    }
  }
})
```

---

## 🎨 Using Components

### Button Component

Urkit automatically registers components with the `Ur` prefix (or your custom prefix).

```vue
<template>
  <div>
    <!-- Basic button -->
    <UrButton>Click Me</UrButton>

    <!-- Primary button -->
    <UrButton variant="primary">Save</UrButton>

    <!-- With icon -->
    <UrButton
      variant="primary"
      icon="icons:plus"
    >
      Add Item
    </UrButton>

    <!-- Loading state -->
    <UrButton
      variant="primary"
      :loading="isLoading"
    >
      Submit
    </UrButton>

    <!-- Different sizes -->
    <UrButton size="sm">Small</UrButton>
    <UrButton size="md">Medium</UrButton>
    <UrButton size="lg">Large</UrButton>
    <UrButton size="xlg">Extra Large</UrButton>

    <!-- Different modes -->
    <UrButton variant="primary" mode="filled">Filled</UrButton>
    <UrButton variant="primary" mode="stroke">Stroke</UrButton>
    <UrButton variant="primary" mode="lighter">Lighter</UrButton>
    <UrButton variant="primary" mode="ghost">Ghost</UrButton>

    <!-- Error, Success, Neutral variants -->
    <UrButton variant="error">Delete</UrButton>
    <UrButton variant="success">Confirm</UrButton>
    <UrButton variant="neutral">Cancel</UrButton>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false)
</script>
```

#### Button Props

| Prop | Type | Default | Options |
|------|------|---------|---------|
| variant | string | 'neutral' | 'primary', 'error', 'success', 'neutral' |
| mode | string | 'filled' | 'filled', 'stroke', 'lighter', 'ghost' |
| size | string | 'md' | 'sm', 'md', 'lg', 'xlg' |
| icon | string | - | Icon name (e.g., 'icons:plus') |
| loading | boolean | false | true/false |
| disabled | boolean | false | true/false |

### Input Component

```vue
<template>
  <div>
    <!-- Basic text input -->
    <UrInput
      v-model="email"
      label="Email"
      placeholder="Enter your email"
    />

    <!-- Password input with toggle -->
    <UrInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter password"
    />

    <!-- With icon -->
    <UrInput
      v-model="search"
      icon="icons:search"
      placeholder="Search..."
    />

    <!-- With affix -->
    <UrInput
      v-model="amount"
      type="number"
      label="Amount"
      affix="$"
      affix-position="prefix"
    />

    <!-- With button -->
    <UrInput
      v-model="coupon"
      label="Coupon Code"
      button-text="Apply"
      @button-click="applyCoupon"
    />

    <!-- Select dropdown -->
    <UrInput
      v-model="country"
      label="Country"
      :select-list="countries"
      select-label-key="name"
      select-value-key="code"
    />

    <!-- Password with requirements -->
    <UrInput
      v-model="newPassword"
      type="password"
      label="New Password"
      :password-requirements="{
        minLength: 8,
        uppercase: true,
        lowercase: true,
        number: true,
        specialChar: true
      }"
    />

    <!-- Disabled state -->
    <UrInput
      v-model="readonly"
      label="Read Only"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const search = ref('')
const amount = ref(0)
const coupon = ref('')
const country = ref('')
const newPassword = ref('')
const readonly = ref('Cannot edit')

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' }
]

const applyCoupon = () => {
  console.log('Applying coupon:', coupon.value)
}
</script>
```

#### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string/number | - | v-model binding |
| type | string | 'text' | Input type ('text', 'password', 'email', 'number', etc.) |
| label | string | - | Input label |
| placeholder | string | - | Placeholder text |
| icon | string | - | Icon name (e.g., 'icons:search') |
| affix | string | - | Prefix or suffix text |
| affixPosition | string | 'suffix' | 'prefix' or 'suffix' |
| buttonText | string | - | Show button with text |
| selectList | array | - | Array of options for select dropdown |
| selectLabelKey | string | - | Key for option label |
| selectValueKey | string | - | Key for option value |
| passwordRequirements | object | - | Password validation rules |
| disabled | boolean | false | Disable input |

---

## 🎨 Icon System

### Included Icons

Urkit includes **10 essential icons** for testing and basic functionality:

| Icon | Name | Purpose |
|------|------|---------|
| 👁️ | `icons:show` | Password toggle (show) - **Required for Input** |
| 🙈 | `icons:hide` | Password toggle (hide) - **Required for Input** |
| ⏳ | `icons:loader-icon` | Loading states - **Required for Button** |
| 🔍 | `icons:search` | Search functionality |
| ❌ | `icons:toast-close` | Close/dismiss actions |
| ❤️ | `icons:heart` | Like/favorite |
| ⭐ | `icons:star` | Rating/favorites |
| 👤 | `icons:profile` | User/account |
| 📋 | `icons:copy` | Copy action |
| ⬇️ | `icons:arrow-down` | Dropdowns/navigation |

**Usage:**

```vue
<template>
  <div>
    <!-- Use included icons -->
    <UrIcon name="icons:search" />
    <UrIcon name="icons:heart" />
    <UrIcon name="icons:profile" />
  </div>
</template>
```

**💡 Important**: These icons are minimal for testing. For production, add your own icons using the methods below.

### Adding Custom Icons

#### Method 1: Override Built-in Icons

Place your SVG files in your project's `public/assets/icons/` directory:

```
your-app/
└── public/
    └── assets/
        └── icons/
            └── custom-icon.svg  ← Overrides module's icon
```

Nuxt's file precedence means your files take priority over Urkit's bundled icons.

#### Method 2: Custom Icon Namespace

Configure a custom namespace in `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    iconNamespaces: {
      icons: '/assets/icons',        // Default
      logos: '/assets/logos',        // Default
      social: '/custom/social-icons' // Custom namespace
    }
  }
})
```

Then place your icons:

```
your-app/
└── public/
    └── custom/
        └── social-icons/
            ├── facebook.svg
            ├── twitter.svg
            └── linkedin.svg
```

Use them:

```vue
<template>
  <UrIcon name="social:facebook" />
  <UrIcon name="social:twitter" />
</template>
```

#### Method 3: Component-Level Icons

Pass custom icon paths directly to components:

```vue
<template>
  <UrButton icon="custom:my-icon">
    Custom Icon Button
  </UrButton>
</template>
```

### SVG Icon Best Practices

For optimal icon rendering, ensure your SVGs:

1. **Use `currentColor`** for fill/stroke:
   ```xml
   <svg viewBox="0 0 24 24">
     <path fill="currentColor" d="..." />
   </svg>
   ```

2. **Include `viewBox` attribute**:
   ```xml
   <svg viewBox="0 0 24 24">
   ```

3. **Are optimized/minified** - Remove unnecessary metadata

---

## 🎨 Color Customization

Urkit uses a purple-based color scheme by default. You can easily customize it to match your brand.

### Quick Start: Change Brand Color

Override the primary color in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      primary: {
        500: '#0ea5e9',  // Your brand color (blue)
        600: '#0284c7',  // Hover state
        700: '#0369a1'   // Active state
      }
    }
  }
})
```

### Complete Color Override

Customize both primary and neutral colors:

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      // Brand colors
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        500: '#0ea5e9',  // Main brand color
        600: '#0284c7',
        700: '#0369a1',
        900: '#0c4a6e'
      },

      // Neutral/gray colors
      neutral: {
        1: '#fafafa',
        5: '#d4d4d4',
        7: '#737373',
        12: '#171717'
      }
    }
  }
})
```

### CSS Override Method

Alternatively, override via CSS:

```css
/* assets/css/custom-colors.css */
:root {
  --primary-500: #0ea5e9;
  --primary-600: #0284c7;
  --primary-700: #0369a1;
}
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],
  css: ['~/assets/css/custom-colors.css']
})
```

### Color Scale Reference

**Primary Colors** (50-900): Your brand color
- `--primary-500`: Main brand color
- `--primary-600`: Hover states
- `--primary-700`: Active states

**Neutral Colors** (1-12): Grays for text and backgrounds
- `--neutral-1`: Lightest backgrounds
- `--neutral-7`: Secondary text
- `--neutral-12`: Darkest text

**📖 Complete Guide**: See [COLORS.md](./COLORS.md) for detailed color customization, examples, and accessibility tips.

---

## 📱 Responsive Design

All Urkit components are mobile-first and fully responsive. They automatically adapt to different screen sizes.

---

## ♿ Accessibility

Urkit components follow accessibility best practices:

- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader friendly

---

## 🔧 TypeScript Support

Urkit is fully typed and provides TypeScript support out of the box. Component props are automatically typed when using TypeScript in your Nuxt project.

---

## 📚 Examples

### Login Form

```vue
<template>
  <form @submit.prevent="handleLogin">
    <UrInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      icon="icons:email"
      required
    />

    <UrInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      required
    />

    <UrButton
      type="submit"
      variant="primary"
      :loading="isLoading"
      size="lg"
    >
      Sign In
    </UrButton>
  </form>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  try {
    // Your login logic
    await login(email.value, password.value)
  } finally {
    isLoading.value = false
  }
}
</script>
```

### Search Bar

```vue
<template>
  <UrInput
    v-model="searchQuery"
    placeholder="Search products..."
    icon="icons:search"
    button-text="Search"
    @button-click="performSearch"
    @keyup.enter="performSearch"
  />
</template>

<script setup lang="ts">
const searchQuery = ref('')

const performSearch = () => {
  console.log('Searching for:', searchQuery.value)
  // Your search logic
}
</script>
```

---

## 🐛 Troubleshooting

### Icons Not Showing

1. **Check icon path**: Ensure icons exist in `public/assets/icons/`
2. **Check namespace**: Use correct format `namespace:icon-name`
3. **Check SVG format**: Ensure SVGs have proper `viewBox` attribute
4. **Clear cache**: Try clearing `.nuxt` cache and rebuilding

### Styles Not Applied

1. **Check module registration**: Ensure 'urkit' is in modules array
2. **Clear cache**: Delete `.nuxt` folder and restart dev server
3. **Check CSS conflicts**: Ensure no conflicting global styles

### TypeScript Errors

1. **Regenerate types**: Run `pnpm dev:prepare` or `nuxt prepare`
2. **Check Nuxt version**: Ensure using Nuxt 4.0.0 or later

---

## 📝 License

MIT

---

## 🔗 Links

- [GitHub Repository](#)
- [Documentation](#)
- [Report Issues](#)
