# Component Migration Guide

This guide explains how to migrate components from `urkit-design` (showcase app) to `urkit-ui` (npm package).

## 📁 Directory Structure

```
/Users/jabernuitee/Desktop/Jaber/Dev/urkit/
├── urkit-design/          # Private design system showcase (Nuxt app)
│   └── app/
│       └── components/
│           └── ui/        # Components for showcase only
└── urkit-ui/              # Public npm package
    └── src/
        └── runtime/
            ├── components/    # Exported components
            ├── composables/   # Exported composables
            ├── assets/        # CSS/styles
            └── public/        # Public assets
```

## 🎯 Philosophy

- **urkit-design**: Private repo for showcasing the design system, documentation, and examples
- **urkit-ui**: Public npm package containing reusable, production-ready components

## 🔄 Migration Workflow

### Step 1: Identify Component to Migrate

In `urkit-design/app/components/ui/`, identify which component you want to add to the package.

**Example**: Migrating the `Alert` component from urkit-design

### Step 2: Review Component Dependencies

Check what the component needs:
- External dependencies (packages)
- Composables
- CSS/styles
- Assets (icons, images)
- TypeScript types

```bash
# From urkit-design directory
cd app/components/ui
# Review the component file
cat Alert.vue
```

### Step 3: Prepare Component for Package

**Current location** (urkit-design):
```
urkit-design/app/components/ui/Alert.vue
```

**Target location** (urkit-ui):
```
urkit-ui/src/runtime/components/Alert.vue
```

**Things to check before copying**:
1. Remove any urkit-design-specific code (navigation, showcase logic)
2. Ensure component is self-contained and reusable
3. Add proper TypeScript types
4. Add JSDoc comments for props
5. Ensure proper CSS scoping

### Step 4: Copy Component to Package

```bash
# From urkit directory
cd urkit-ui

# Copy component
cp ../urkit-design/app/components/ui/Alert.vue src/runtime/components/Alert.vue
```

### Step 5: Add Required Dependencies

If the component needs specific dependencies:

```bash
cd urkit-ui

# Add as dependency (will be installed with package)
pnpm add <package-name>

# OR add as peer dependency (user must install)
# Edit package.json manually to add to peerDependencies
```

### Step 6: Export Component

Components in `src/runtime/components/` are auto-imported by Nuxt, but verify in [src/module.ts](src/module.ts):

```typescript
// src/module.ts should have:
addComponentsDir({
  path: resolve('./runtime/components'),
  pathPrefix: false,
  prefix: 'U',
  global: true
})
```

### Step 7: Add Component Styles

If component has custom CSS:

```bash
# Add styles to
urkit-ui/src/runtime/assets/css/components/alert.css
```

And import in main CSS file:
```css
/* src/runtime/assets/css/main.css */
@import './components/alert.css';
```

### Step 8: Test in Playground

```bash
cd urkit-ui

# Build the module in stub mode (for development)
pnpm dev:prepare

# Start playground
pnpm dev
```

Create test page in `playground/pages/`:
```vue
<!-- playground/pages/alert-test.vue -->
<template>
  <div>
    <h1>Alert Component Test</h1>
    <UAlert type="success" message="Test alert" />
  </div>
</template>
```

### Step 9: Build and Verify

```bash
cd urkit-ui

# Build the package
pnpm prepack

# Check dist folder
ls -la dist/
```

Verify these files are created:
- `dist/module.mjs` - ES module
- `dist/module.cjs` - CommonJS module
- `dist/types.d.ts` - TypeScript types

### Step 10: Test in urkit-design (Optional)

Test the component in your showcase app:

```bash
cd ../urkit-design

# Link local package (for testing)
pnpm add file:../urkit-ui
```

Then use it in urkit-design:
```vue
<template>
  <UAlert type="success" message="Testing from package!" />
</template>
```

### Step 11: Update Package Version

```bash
cd urkit-ui

# Update version (patch/minor/major)
npm version patch

# This updates package.json version
```

### Step 12: Commit Changes

```bash
cd urkit-ui

git add .
git commit -m "feat: add Alert component"
```

## 📦 Package vs Showcase Components

### Components for Package (urkit-ui)

✅ **Should be in package**:
- Reusable UI components (Button, Input, Alert, etc.)
- Core composables (useTheme, useIcon, etc.)
- Utility functions used by multiple components
- Shared CSS/styles

### Components for Showcase Only (urkit-design)

❌ **Should NOT be in package**:
- Page-specific components (Sidebar, Header specific to showcase)
- Documentation components (CodeBlock, ComponentPreview)
- Showcase-specific logic (theme switcher UI for docs)
- Navigation components specific to the design system site

## 🔍 Example: Full Migration

Let's migrate the **Tooltip** component:

```bash
# 1. Check current component in urkit-design
cd urkit-design/app/components/ui
cat Tooltip.vue

# 2. Copy to package
cd ../../../urkit-ui
cp ../urkit-design/app/components/ui/Tooltip.vue src/runtime/components/Tooltip.vue

# 3. Test in playground
pnpm dev:prepare
pnpm dev

# 4. Build package
pnpm prepack

# 5. Commit
git add .
git commit -m "feat: add Tooltip component"

# 6. Update version
npm version patch
```

## 📝 Component Checklist

Before migrating a component, ensure:

- [ ] Component is reusable and not showcase-specific
- [ ] All dependencies are declared in package.json
- [ ] TypeScript types are properly defined
- [ ] Props have JSDoc comments
- [ ] Component works in playground
- [ ] CSS is scoped or properly namespaced
- [ ] No hard-coded paths or showcase-specific logic
- [ ] Accessibility attributes are present
- [ ] Component follows package naming conventions (U prefix)

## 🚀 Publishing Workflow

After migrating and testing components:

```bash
cd urkit-ui

# 1. Lint
pnpm lint

# 2. Build
pnpm prepack

# 3. Test
pnpm test

# 4. Publish to npm
npm publish

# 5. Push to GitHub
git push origin main --follow-tags
```

## 🔗 Keeping Them in Sync

### After Publishing New Components

In **urkit-design**, update to use the package:

```bash
cd urkit-design

# Update to latest package version
pnpm update urkit
```

### During Development

Use local linking to test package changes in showcase:

```bash
# In urkit-ui (watch mode)
pnpm dev:prepare

# In urkit-design
pnpm add file:../urkit-ui

# Make changes in urkit-ui, see them in urkit-design
```

## 📚 Additional Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Package architecture
- [PUBLISHING.md](./PUBLISHING.md) - Publishing guidelines
- [USAGE.md](./USAGE.md) - Usage documentation
