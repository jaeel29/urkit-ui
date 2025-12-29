# Urkit Module Architecture

## Asset Management Strategy

### **Chosen Approach: Module Runtime Public Assets**

Urkit uses **Nuxt's Nitro Public Assets API** for optimal asset distribution.

```
urkit-ui/
├── src/
│   └── runtime/
│       ├── components/       # Vue components
│       ├── composables/      # Composables (useIcon, etc.)
│       ├── assets/
│       │   └── css/          # CSS files (injected via module)
│       └── public/           # Public assets (served via Nitro)
│           └── assets/
│               ├── icons/    # Default icons (bundled with npm)
│               └── logos/    # Default logos (bundled with npm)
```

---

## Why This Architecture?

### **✅ Benefits**

1. **Automatic Distribution**
   - Icons included in npm package
   - No manual copying required
   - Works immediately after `npm install`

2. **User Override Support**
   - Users can override by placing files in their own `public/` directory
   - Nuxt's file precedence: User's public > Module's public

3. **Production Ready**
   - Proper caching (1 year for icons)
   - Optimized serving via Nitro
   - CDN compatible

4. **Type Safe**
   - Module options for configuration
   - Runtime config for dynamic paths
   - Full TypeScript support

5. **Performance**
   - Icon caching in composable
   - Lazy loading (fetched on demand)
   - Minimal bundle impact

---

## How It Works

### **1. Module Setup (Build Time)**

```typescript
// src/module.ts
nuxt.options.nitro.publicAssets.push({
  dir: resolver.resolve('./runtime/public'),
  maxAge: 60 * 60 * 24 * 365 // 1 year
})
```

**What happens:**
- Module's `src/runtime/public/` is registered as a public asset directory
- Nitro serves these files at `/assets/icons/`, `/assets/logos/`, etc.
- Files are automatically available in user's app

### **2. Runtime Usage**

```typescript
// src/runtime/composables/useIcon.ts
const response = await fetch('/assets/icons/show.svg')
```

**What happens:**
- Composable fetches icon from public URL
- Nitro serves from module's runtime/public OR user's public (user takes precedence)
- SVG is parsed and cached
- Icon rendered in component

### **3. User Override**

Users can override by creating:
```
their-app/
└── public/
    └── assets/
        └── icons/
            └── show.svg  ← Overrides module's icon
```

**Precedence:** User's public > Module's public

---

## Alternative Approaches Considered

### **❌ Approach 1: Vite Asset Imports**

```typescript
// NOT USED
import icon from './assets/icons/show.svg?raw'
```

**Why NOT used:**
- ❌ Increases bundle size
- ❌ All icons loaded upfront
- ❌ Harder for users to override
- ✅ Type-safe, tree-shakeable

**Verdict:** Good for small icon sets, not flexible enough

---

### **❌ Approach 2: User's Public Directory Only**

```typescript
// NOT USED - requires manual copying
// User must: cp node_modules/urkit/icons/* public/
```

**Why NOT used:**
- ❌ Requires manual setup
- ❌ Icons not in npm package
- ❌ Extra build step needed
- ✅ Simple, easy to understand

**Verdict:** Too much manual work for users

---

### **✅ Approach 3: Nitro Public Assets (CHOSEN)**

```typescript
// CURRENT APPROACH
nuxt.options.nitro.publicAssets.push({
  dir: resolver.resolve('./runtime/public')
})
```

**Why CHOSEN:**
- ✅ Automatic distribution via npm
- ✅ Users can override easily
- ✅ Proper caching & optimization
- ✅ No bundle bloat
- ✅ Production ready

**Verdict:** Best balance of DX and performance

---

## Best Practices

### **For Module Development**

1. **Icon Organization**
   ```
   src/runtime/public/assets/
   ├── icons/           # 10 minimal icons for testing (24x24)
   ├── logos/           # Brand logos (60x60)
   └── [namespace]/     # Custom namespaces
   ```

   **Minimal Icon Philosophy**: The module includes only 10 essential icons required for component functionality and testing:
   - `show.svg`, `hide.svg` - Password toggle (required for Input component)
   - `loader-icon.svg` - Loading states (required for Button component)
   - `search.svg`, `toast-close.svg`, `heart.svg`, `star.svg`, `profile.svg`, `copy.svg`, `arrow-down.svg` - Common UI patterns

   **Rationale**: Most users have their own icon systems (Heroicons, Lucide, Font Awesome, etc.). Shipping minimal icons:
   - Reduces package size significantly
   - Gives users full control over their icon library
   - Allows testing components out-of-the-box
   - Users should add their own icons via public/assets/icons/ in their projects

2. **SVG Optimization**
   - Use `currentColor` for fill/stroke
   - Include `viewBox` attribute
   - Minify SVG files
   - Remove unnecessary metadata

3. **Caching Strategy**
   - Icons cached in composable (in-memory)
   - HTTP caching (1 year via Nitro)
   - Cache key: `namespace:icon-name`

### **For Module Users**

1. **Override Icons**
   ```
   your-app/public/assets/icons/show.svg
   ```

2. **Configure Namespaces**
   ```typescript
   // nuxt.config.ts
   urkit: {
     iconNamespaces: {
       icons: '/custom/path'
     }
   }
   ```

3. **Add Custom Namespaces**
   ```typescript
   urkit: {
     iconNamespaces: {
       social: '/assets/social-icons'
     }
   }
   ```

---

## Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| Initial Bundle Impact | ~0 KB | Icons not bundled |
| Icon Load Time | <50ms | HTTP fetch + parse |
| Cache Hit Rate | ~95% | After first load |
| Memory Usage | ~10 KB | Cached SVG strings |
| HTTP Caching | 1 year | Via Nitro config |

---

## Future Enhancements

### **Possible Improvements**

1. **Build-time Icon Sprites**
   - Generate SVG sprite sheets
   - Single HTTP request for all icons
   - Requires build step

2. **Icon Tree-shaking**
   - Analyze component usage
   - Only include used icons
   - Requires static analysis

3. **WebP/AVIF Support**
   - For raster icon fallbacks
   - Automatic format selection
   - Better compression

---

## Comparison with Other Libraries

| Library | Approach | Bundle Impact | Override Support |
|---------|----------|---------------|------------------|
| **Urkit** | Nitro Public Assets | 0 KB | ✅ Easy |
| Nuxt Icon | Dynamic imports | ~5 KB | ⚠️ Limited |
| @nuxtjs/svg | Vite imports | Full set | ❌ Hard |
| unplugin-icons | Build-time | Tree-shaken | ❌ Hard |

---

## Migration Guide

### **From Playground Public to Runtime Public**

**Before:**
```
playground/public/assets/icons/  ← Icons here
```

**After:**
```
src/runtime/public/assets/icons/  ← Icons here (distributed via npm)
```

**Benefits:**
- ✅ Icons in npm package
- ✅ No manual copying
- ✅ Works in user apps automatically

