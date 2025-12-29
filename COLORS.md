# Color Customization Guide

Complete guide for customizing Urkit's color system to match your brand.

---

## 🎨 Default Color Scheme

Urkit uses a purple-based color scheme by default with comprehensive color scales.

### Primary Colors (Purple)
- **50-900 scale**: From lightest (`#f2f0ff`) to darkest (`#342e6b`)
- Used for: Primary buttons, links, active states, brand elements

### Neutral Colors
- **1-12 scale**: From lightest (`#fdfdfd`) to darkest (`#19172c`)
- Used for: Text, backgrounds, borders, shadows

### Supporting Colors
- **Success**: Green (`#2ebd85`)
- **Error**: Red (`#f6465d`)
- **Warning**: Orange (`#ffa913`)
- **Info**: Blue (`#1994ff`)

---

## 🔧 Customization Methods

### Method 1: Module Configuration (Recommended)

Override colors directly in your `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      // Override primary colors (your brand color)
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',   // Main brand color
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e'
      },

      // Override neutral colors (grays)
      neutral: {
        1: '#fafafa',
        2: '#f5f5f5',
        3: '#f0f0f0',
        4: '#e5e5e5',
        5: '#d4d4d4',
        6: '#a3a3a3',
        7: '#737373',
        8: '#525252',
        9: '#404040',
        10: '#262626',
        11: '#1c1c1c',
        12: '#171717'
      }
    }
  }
})
```

**Benefits:**
- ✅ Simple and straightforward
- ✅ TypeScript autocomplete
- ✅ Only override what you need
- ✅ Applied automatically

---

### Method 2: Global CSS Override

Create a custom CSS file in your project:

```css
/* assets/css/custom-colors.css */
:root {
  /* Override primary colors */
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-500: #0ea5e9;  /* Main brand color */
  --primary-600: #0284c7;
  --primary-700: #0369a1;

  /* Override neutral colors */
  --neutral-1: #fafafa;
  --neutral-5: #d4d4d4;
  --neutral-12: #171717;
}
```

Then import in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  css: [
    '~/assets/css/custom-colors.css'
  ]
})
```

**Benefits:**
- ✅ Full CSS control
- ✅ Easy to organize
- ✅ Can add custom properties
- ✅ Works with existing workflows

---

### Method 3: Replace Colors File (Advanced)

For complete control, replace the entire colors.css:

1. Copy the original colors.css from `node_modules/urkit/src/runtime/assets/css/colors.css`
2. Modify all colors to match your brand
3. Import your custom file AFTER urkit module

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  css: [
    '~/assets/css/my-complete-colors.css'  // Overrides module's colors.css
  ]
})
```

**Benefits:**
- ✅ Complete control
- ✅ Can modify supporting colors (success, error, etc.)
- ✅ Add custom color variables

---

## 📋 Color Scale Reference

### Primary Colors
```css
--primary-50   /* Lightest - hover states, backgrounds */
--primary-100
--primary-200
--primary-300
--primary-400
--primary-500  /* Main brand color - buttons, links */
--primary-600  /* Hover states */
--primary-700  /* Active states */
--primary-800
--primary-900  /* Darkest - text on light backgrounds */
```

### Neutral Colors
```css
--neutral-1    /* Lightest - white backgrounds */
--neutral-2    /* Light gray backgrounds */
--neutral-3    /* Subtle borders */
--neutral-4
--neutral-5    /* Borders */
--neutral-6    /* Disabled text */
--neutral-7    /* Secondary text */
--neutral-8    /* Primary text */
--neutral-9
--neutral-10
--neutral-11
--neutral-12   /* Darkest - headings, emphasis */
```

---

## 🎯 Common Customization Examples

### Example 1: Blue Brand

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      primary: {
        500: '#3b82f6',  // Blue-500
        600: '#2563eb',  // Blue-600
        700: '#1d4ed8'   // Blue-700
      }
    }
  }
})
```

### Example 2: Green Eco Theme

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',   // Green-500
        600: '#16a34a',
        700: '#15803d'
      }
    }
  }
})
```

### Example 3: Dark Neutrals

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      neutral: {
        1: '#18181b',    // Darker backgrounds
        5: '#3f3f46',
        12: '#fafafa'    // Light text
      }
    }
  }
})
```

### Example 4: Minimal Override

Just override the main brand color:

```typescript
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    colors: {
      primary: {
        500: '#ff6b6b'  // Your brand red
      }
    }
  }
})
```

Urkit will use your red for the main color and keep other shades from default.

---

## 🔍 Finding the Right Colors

### Option 1: Use Tailwind Color Palette

Tailwind's color system works perfectly with Urkit:

```typescript
// Using Tailwind's Sky color
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    // ... etc
    500: '#0ea5e9',  // sky-500
  }
}
```

**Reference**: [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)

### Option 2: Generate Custom Scale

Use tools to generate color scales from your brand color:

- [UIColors](https://uicolors.app/create) - Generate complete palette
- [Colorbox](https://colorbox.io/) - Create accessible color systems
- [Palettte](https://palettte.app/) - Color scale generator

### Option 3: Use Brand Colors

If you have a design system:

```typescript
colors: {
  primary: {
    500: '#YOUR_BRAND_COLOR',  // Main
    600: '#DARKER_SHADE',      // Hover
    700: '#DARKEST_SHADE'      // Active
  }
}
```

---

## ♿ Accessibility Considerations

When customizing colors, ensure:

1. **Contrast Ratios**
   - Text on background: 4.5:1 minimum (WCAG AA)
   - Large text: 3:1 minimum
   - Interactive elements: 3:1 minimum

2. **Test Your Colors**
   ```typescript
   // Good contrast example
   primary: {
     500: '#0ea5e9',  // Main color
     700: '#0369a1'   // Dark enough for white text
   }
   ```

3. **Use Accessibility Tools**
   - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - [Accessible Colors](https://accessible-colors.com/)

---

## 🎨 Color Usage in Components

### Buttons
```vue
<!-- Uses --primary-500 (default) -->
<UrButton variant="primary">Primary</UrButton>

<!-- Uses --error (red) -->
<UrButton variant="error">Delete</UrButton>

<!-- Uses --success (green) -->
<UrButton variant="success">Confirm</UrButton>
```

### Inputs
```vue
<!-- Uses --neutral-* for borders -->
<UrInput label="Name" />

<!-- Uses --error for validation -->
<UrInput errors="Required" />
```

---

## 💡 Pro Tips

1. **Start with Primary 500**
   - This is your main brand color
   - Other shades can be generated from this

2. **Keep Neutrals Balanced**
   - Use subtle differences between shades
   - Ensure good contrast for text

3. **Test in Both Modes**
   - If you support dark mode, test colors in both
   - Neutral scales especially important

4. **Use Semantic Names**
   - Keep using `--primary-500` not `--blue-500`
   - Easier to rebrand later

5. **Don't Override Everything**
   - Only customize what's needed
   - Keep supporting colors (success, error) unless required

---

## 🐛 Troubleshooting

### Colors Not Applying

1. **Check CSS order**
   ```typescript
   // Custom colors should come AFTER urkit module
   css: [
     '~/assets/css/custom-colors.css'  // After urkit's CSS
   ]
   ```

2. **Clear Nuxt cache**
   ```bash
   rm -rf .nuxt
   pnpm dev
   ```

3. **Verify CSS variable names**
   - Use `--primary-500` not `--primary500`
   - Use `--neutral-1` not `--neutral1`

### Colors Look Wrong

1. **Check hex format**
   ```typescript
   // Correct
   primary: { 500: '#0ea5e9' }

   // Wrong
   primary: { 500: '0ea5e9' }  // Missing #
   ```

2. **Verify shade numbers**
   - Primary: 50, 100, 200...900 (not 1-9)
   - Neutral: 1, 2, 3...12 (not 50-900)

---

## 📚 Additional Resources

- [Color Theory Basics](https://www.interaction-design.org/literature/topics/color-theory)
- [Creating Accessible Color Systems](https://stripe.com/blog/accessible-color-systems)
- [Material Design Color System](https://m2.material.io/design/color/the-color-system.html)
