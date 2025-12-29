# Component Migration Checklist

Quick checklist for migrating components from urkit-design to urkit-ui package.

## 🎯 Quick Start (Copy & Paste to Claude)

```
Migrate [COMPONENT_NAME] from urkit-design to urkit package.

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[COMPONENT_NAME].vue
TARGET: src/runtime/components/[COMPONENT_NAME].vue

Follow MIGRATION-CHECKLIST.md in this repo.
```

---

## ✅ Pre-Migration Checklist

### 1. Analyze Component
- [ ] Read source component in urkit-design
- [ ] Identify external dependencies
- [ ] Check for composables used
- [ ] List required assets (icons, images)
- [ ] Check for CSS dependencies
- [ ] Identify TypeScript types needed

### 2. Check Package Dependencies
- [ ] Verify all npm packages are in package.json
- [ ] Add missing dependencies: `pnpm add <package>`
- [ ] Decide if peer dependency or regular dependency

---

## 🔄 Migration Steps

### Step 1: Copy Component
```bash
# From urkit-ui directory
cp /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[NAME].vue \
   src/runtime/components/[NAME].vue
```

- [ ] Component copied to src/runtime/components/
- [ ] File naming follows conventions (PascalCase)

### Step 2: Clean Component Code
- [ ] Remove showcase-specific imports
- [ ] Remove demo/navigation logic
- [ ] Remove development-only code
- [ ] Keep only production-ready code
- [ ] Ensure component is self-contained

### Step 3: Add Types & Documentation
- [ ] Add TypeScript types for props
- [ ] Add JSDoc comments
- [ ] Document all props with descriptions
- [ ] Document events
- [ ] Document slots (if any)

**Example**:
```vue
<script setup lang="ts">
/**
 * Button component with multiple variants
 * @component
 */
interface Props {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Disable button interaction */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})
</script>
```

- [ ] Props have TypeScript types
- [ ] Props have JSDoc comments
- [ ] Default values are set

### Step 4: Handle Styles
- [ ] Check if component has scoped styles
- [ ] Extract global styles to CSS file
- [ ] Create: `src/runtime/assets/css/components/[name].css` (if needed)
- [ ] Import in main CSS file
- [ ] Use CSS custom properties where possible

### Step 5: Handle Dependencies

#### If component uses composables:
- [ ] Copy composable to: `src/runtime/composables/`
- [ ] Ensure composable is reusable
- [ ] Add TypeScript types

#### If component uses utilities:
- [ ] Copy utility to: `src/runtime/utils/` (create if needed)
- [ ] Ensure utility is pure function
- [ ] Add TypeScript types

#### If component uses types:
- [ ] Copy types to: `src/runtime/types/` (create if needed)
- [ ] Export types properly

---

## 🧪 Testing

### Step 6: Create Test Page
```bash
# Create playground test page
touch playground/pages/test-[component-name].vue
```

**Test Page Template**:
```vue
<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold">[ComponentName] Test</h1>

    <section>
      <h2 class="text-xl mb-4">Default</h2>
      <UComponentName />
    </section>

    <section>
      <h2 class="text-xl mb-4">Variants</h2>
      <!-- Test all variants -->
    </section>

    <section>
      <h2 class="text-xl mb-4">Sizes</h2>
      <!-- Test all sizes -->
    </section>

    <section>
      <h2 class="text-xl mb-4">States</h2>
      <!-- Test all states -->
    </section>
  </div>
</template>
```

- [ ] Test page created
- [ ] Tests all variants
- [ ] Tests all props
- [ ] Tests all states

### Step 7: Test in Playground
```bash
# Start playground
pnpm dev
```

Visit: `http://localhost:3003/test-[component-name]`

- [ ] Component renders without errors
- [ ] All variants work correctly
- [ ] All props work as expected
- [ ] Styles load correctly
- [ ] No console errors
- [ ] Responsive behavior works
- [ ] Accessibility (keyboard navigation, screen readers)

### Step 8: TypeScript Check
```bash
pnpm test:types
```

- [ ] No TypeScript errors
- [ ] Types are properly exported

---

## 📦 Building

### Step 9: Build Package
```bash
# Clean build
rm -rf dist/

# Build
pnpm prepack
```

- [ ] Build succeeds without errors
- [ ] Component in dist/runtime/components/
- [ ] Types generated in dist/
- [ ] Check dist/ size is reasonable

### Step 10: Verify Build Output
```bash
# Check what's in dist
ls -lh dist/
ls -lh dist/runtime/components/
```

- [ ] Component file in dist/
- [ ] Component types (.d.ts) generated
- [ ] CSS included (if applicable)
- [ ] Assets included (if applicable)

---

## 📝 Documentation

### Step 11: Update Documentation
- [ ] Add component to README.md components list
- [ ] Add usage example to USAGE.md
- [ ] Document component props, events, slots
- [ ] Add code examples
- [ ] Note any special requirements

**README.md** - Add to components list:
```markdown
- **[ComponentName]** - Brief description
```

**USAGE.md** - Add usage section:
```markdown
## [ComponentName]

Description of component.

### Import
\`\`\`vue
<template>
  <UComponentName />
</template>
\`\`\`

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Button variant |

### Examples
\`\`\`vue
<UComponentName variant="primary" />
\`\`\`
```

---

## 🔍 Quality Checks

### Step 12: Final Checks
- [ ] Component is self-contained
- [ ] No hardcoded paths or URLs
- [ ] No console.logs or debug code
- [ ] No TODO comments (or documented in issues)
- [ ] Follows package naming conventions (U prefix)
- [ ] Follows existing code style
- [ ] Accessibility attributes present (aria-labels, etc.)
- [ ] Works in light and dark themes (if applicable)

---

## 💾 Version Control

### Step 13: Commit Changes
```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add [ComponentName] component

- Migrated from urkit-design
- Added TypeScript types
- Added playground test page
- Updated documentation"
```

- [ ] Changes committed
- [ ] Commit message follows convention
- [ ] Commit includes all related files

### Step 14: Version Bump (Optional)
```bash
# Patch: Bug fixes
npm version patch

# Minor: New feature (backward compatible)
npm version minor

# Major: Breaking changes
npm version major
```

- [ ] Version bumped appropriately
- [ ] Git tag created

---

## 🚀 Publishing (When Ready)

### Step 15: Pre-Publish Checklist
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No TypeScript errors: `pnpm test:types`
- [ ] No linting errors: `pnpm lint` (if configured)
- [ ] Documentation updated
- [ ] CHANGELOG updated (if exists)
- [ ] Committed and pushed to GitHub

### Step 16: Publish to npm
```bash
# Dry run first
npm publish --dry-run

# Actual publish
npm publish

# Verify
npm info urkit
```

- [ ] Published to npm
- [ ] Verified on npmjs.com
- [ ] Tested installation: `npm install urkit@latest`

---

## 📊 Migration Summary Template

After migration, document what was done:

```markdown
## [ComponentName] Migration Summary

**Date**: [YYYY-MM-DD]
**Migrated From**: urkit-design v[version]
**Package Version**: v[version]

### Changes Made:
- Migrated [ComponentName] component
- Added TypeScript types
- Extracted CSS to components/[name].css
- Created playground test page

### Dependencies Added:
- [List any new dependencies]

### Breaking Changes:
- [List any breaking changes, or "None"]

### Testing:
- ✅ Component renders correctly
- ✅ All variants tested
- ✅ TypeScript types valid
- ✅ Build succeeds
- ✅ Playground verified

### Files Changed:
- src/runtime/components/[ComponentName].vue
- src/runtime/assets/css/components/[name].css (if applicable)
- playground/pages/test-[name].vue
- README.md
- USAGE.md
```

---

## 🎯 Component-Specific Checklists

### For Form Components (Input, Select, etc.)
- [ ] Supports v-model
- [ ] Validation states (error, success, warning)
- [ ] Disabled state
- [ ] Label and placeholder
- [ ] Helper text
- [ ] Accessibility (labels, aria-describedby)

### For Interactive Components (Button, Link, etc.)
- [ ] Focus states
- [ ] Hover states
- [ ] Active states
- [ ] Disabled states
- [ ] Loading states (if applicable)
- [ ] Keyboard navigation

### For Layout Components (Card, Container, etc.)
- [ ] Responsive behavior
- [ ] Flexible/configurable sizing
- [ ] Proper spacing
- [ ] Works with different content

### For Display Components (Avatar, Badge, etc.)
- [ ] Different sizes
- [ ] Different variants/colors
- [ ] Handles missing data gracefully
- [ ] Accessible alt text (if images)

---

## 🔄 Batch Migration Tips

When migrating multiple components:

1. **Order matters**: Migrate dependencies first
2. **Group related**: Migrate related components together
3. **Test incrementally**: Test after each component
4. **Single commit**: Consider single commit for related components
5. **Document together**: Update docs for all components at once

---

## 📚 Quick Links

- [CLAUDE-PROMPTS.md](./CLAUDE-PROMPTS.md) - Ready-to-use Claude prompts
- [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) - Detailed migration guide
- [TESTING-GUIDE.md](./TESTING-GUIDE.md) - Testing procedures
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Package structure
- [PUBLISHING.md](./PUBLISHING.md) - Publishing guide

---

## ⚡ Quick Commands Reference

```bash
# Start playground
pnpm dev

# Build package
pnpm prepack

# Type check
pnpm test:types

# Lint
pnpm lint

# Clean build
rm -rf dist/ && pnpm prepack

# Version bump
npm version [patch|minor|major]

# Publish
npm publish
```
