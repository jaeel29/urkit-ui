# Testing Guide for urkit-ui Package

This guide walks you through testing the urkit-ui package before pushing to GitHub.

## 📋 Pre-Push Testing Checklist

### 1. Install Dependencies

```bash
cd /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-ui

# Install all dependencies
pnpm install
```

### 2. Build the Package

```bash
# Build in development/stub mode (faster, for testing)
pnpm dev:prepare

# OR build production version
pnpm prepack
```

**Expected output**:
```
✓ Built dist/module.mjs
✓ Built dist/module.cjs
✓ Built dist/types.d.ts
```

### 3. Verify Build Output

```bash
# Check dist directory
ls -la dist/

# Should see:
# - module.mjs
# - module.cjs
# - types.d.ts
# - runtime/ (with components, assets, etc.)
```

### 4. Test in Playground

The playground is a Nuxt app that uses your package locally.

```bash
# Start playground development server
pnpm dev
```

**Expected**: Playground should start at `http://localhost:3000`

### 5. Check Existing Components

Open playground in browser and verify existing components work:

**Current components in package**:
- Button (`<UButton>`)
- Input (`<UInput>`)
- Icon (`<UIcon>`)

### 6. Create Test Pages

Create test pages for each component in `playground/pages/`:

```bash
# Create test page for Button
cat > playground/pages/test-button.vue << 'EOF'
<template>
  <div class="p-8">
    <h1 class="text-2xl mb-4">Button Test</h1>

    <div class="space-y-4">
      <UButton>Default Button</UButton>
      <UButton variant="primary">Primary Button</UButton>
      <UButton variant="secondary">Secondary Button</UButton>
      <UButton disabled>Disabled Button</UButton>
    </div>
  </div>
</template>
EOF
```

Visit: `http://localhost:3000/test-button`

### 7. Verify TypeScript Types

```bash
# Check TypeScript compilation
pnpm test:types
```

**Expected**: No type errors

### 8. Run Linting

```bash
# Run ESLint
pnpm lint
```

**Expected**: No linting errors (or fix any issues found)

### 9. Run Tests (if configured)

```bash
# Run test suite
pnpm test
```

### 10. Test Package Build

```bash
# Clean build
rm -rf dist/

# Full production build
pnpm prepack

# Verify no errors
echo $?  # Should output 0
```

## 🔍 Detailed Component Testing

### Test Button Component

```vue
<template>
  <div>
    <!-- Test all variants -->
    <UButton variant="primary">Primary</UButton>
    <UButton variant="secondary">Secondary</UButton>
    <UButton variant="outline">Outline</UButton>

    <!-- Test sizes -->
    <UButton size="sm">Small</UButton>
    <UButton size="md">Medium</UButton>
    <UButton size="lg">Large</UButton>

    <!-- Test states -->
    <UButton disabled>Disabled</UButton>
    <UButton loading>Loading</UButton>

    <!-- Test with icons -->
    <UButton>
      <UIcon name="plus" />
      With Icon
    </UButton>
  </div>
</template>
```

### Test Input Component

```vue
<template>
  <div>
    <!-- Test basic input -->
    <UInput v-model="text" placeholder="Enter text" />

    <!-- Test with label -->
    <UInput v-model="email" label="Email" type="email" />

    <!-- Test with error -->
    <UInput v-model="password" label="Password" type="password" error="Password required" />

    <!-- Test disabled -->
    <UInput disabled placeholder="Disabled" />
  </div>
</template>

<script setup>
const text = ref('')
const email = ref('')
const password = ref('')
</script>
```

### Test Icon Component

```vue
<template>
  <div>
    <!-- Test different icons -->
    <UIcon name="home" />
    <UIcon name="user" />
    <UIcon name="settings" />

    <!-- Test sizes -->
    <UIcon name="star" size="sm" />
    <UIcon name="star" size="md" />
    <UIcon name="star" size="lg" />
  </div>
</template>
```

## 🔗 Test Local Installation

Test the package as if a user installed it:

### Option 1: Link in urkit-design

```bash
cd /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design

# Add local package
pnpm add file:../urkit-ui

# Start dev server
pnpm dev
```

Then use components in urkit-design:
```vue
<template>
  <div>
    <UButton>From Package!</UButton>
  </div>
</template>
```

### Option 2: Create Test Project

```bash
# Create new test project
cd /Users/jabernuitee/Desktop/Jaber/Dev/
npx nuxi@latest init test-urkit

cd test-urkit

# Install local package
pnpm add file:../urkit/urkit-ui

# Add to nuxt.config.ts
echo "export default defineNuxtConfig({
  modules: ['urkit']
})" > nuxt.config.ts

# Test
pnpm dev
```

## 🐛 Common Issues & Solutions

### Issue: Module not found

**Solution**:
```bash
cd urkit-ui
pnpm dev:prepare  # Rebuild
cd ../urkit-design
rm -rf node_modules/.cache  # Clear cache
pnpm dev
```

### Issue: Components not auto-imported

**Check**: `src/module.ts` has correct component registration:
```typescript
addComponentsDir({
  path: resolve('./runtime/components'),
  pathPrefix: false,
  prefix: 'U',
  global: true
})
```

### Issue: TypeScript errors

**Solution**:
```bash
cd urkit-ui
pnpm dev:prepare
pnpm test:types
```

### Issue: CSS not loading

**Check**:
1. CSS is in `src/runtime/assets/css/`
2. CSS is imported in `src/module.ts`
3. Build includes CSS in dist

## ✅ Final Verification Checklist

Before pushing to GitHub, verify:

- [ ] `pnpm install` works without errors
- [ ] `pnpm dev:prepare` builds successfully
- [ ] `pnpm prepack` creates dist folder
- [ ] `pnpm dev` starts playground
- [ ] All existing components render in playground
- [ ] TypeScript types are generated
- [ ] No linting errors (`pnpm lint`)
- [ ] No TypeScript errors (`pnpm test:types`)
- [ ] Package.json has correct repository URL
- [ ] README.md is up to date
- [ ] MIGRATION-GUIDE.md is present

## 🚀 Ready to Push?

If all tests pass:

```bash
cd /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-ui

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Independent urkit-ui package"

# Create GitHub repo first, then:
git remote add origin git@github.com:jaeel29/urkit.git
git branch -M main
git push -u origin main
```

## 📦 Publishing to npm (After GitHub Push)

```bash
# Login to npm (first time)
npm login

# Publish
npm publish

# Success! Package is now at: https://www.npmjs.com/package/urkit
```

## 🔄 Continuous Testing Workflow

For ongoing development:

1. Make changes in `urkit-ui/src/`
2. Run `pnpm dev` in urkit-ui (watches for changes)
3. Test in playground
4. Link to urkit-design for integration testing
5. Build and verify
6. Commit and push
