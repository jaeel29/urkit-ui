# Publishing Urkit to npm

Complete guide for publishing your Urkit package to npm and using it in projects.

---

## 📋 Pre-Publishing Checklist

### 1. Update Package Information

Edit `package.json` and replace placeholder values:

```json
{
  "name": "urkit",  // or "@yourorg/urkit" for scoped package
  "version": "0.1.0",
  "description": "Your custom description",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/urkit.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/urkit/issues"
  },
  "homepage": "https://github.com/yourusername/urkit#readme"
}
```

### 2. Choose Package Visibility

**Public Package** (recommended for open source):
- Name: `urkit`
- Anyone can install
- Free on npm

**Scoped Package** (organization or personal):
- Name: `@yourorg/urkit` or `@yourusername/urkit`
- Can be private (requires paid npm account) or public (free)
- Better namespace control

### 3. Verify Build Configuration

Ensure your `package.json` includes runtime assets:

```json
{
  "files": [
    "dist",
    "src/runtime/public"  // ← Icons and assets
  ]
}
```

---

## 🚀 Publishing to npm

### Step 1: Create npm Account

If you don't have an npm account:

1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email

### Step 2: Login to npm CLI

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- One-time password (if 2FA enabled)

Verify login:
```bash
npm whoami
```

### Step 3: Build the Module

```bash
cd urkit-ui

# Build the module
pnpm run prepack
```

This creates the `dist/` folder with:
- `module.mjs` (ESM format)
- `module.cjs` (CommonJS format)
- `types.d.ts` (TypeScript declarations)

### Step 4: Verify Package Contents

Preview what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included. Verify:
- ✅ `dist/` folder
- ✅ `src/runtime/public/` folder (icons and assets)
- ✅ `README.md`
- ✅ `package.json`

### Step 5: Publish

**For first-time publishing:**

```bash
npm publish
```

**For scoped packages (public):**

```bash
npm publish --access public
```

**For scoped packages (private - requires paid account):**

```bash
npm publish --access restricted
```

### Step 6: Verify Publication

1. Check your package page: `https://www.npmjs.com/package/urkit`
2. Verify README displays correctly
3. Check that version shows properly

---

## 🔄 Publishing Updates

### Version Management

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.0 → 0.1.1): Bug fixes
  ```bash
  npm version patch
  ```

- **Minor** (0.1.0 → 0.2.0): New features, backwards compatible
  ```bash
  npm version minor
  ```

- **Major** (0.1.0 → 1.0.0): Breaking changes
  ```bash
  npm version major
  ```

This automatically:
1. Updates version in `package.json`
2. Creates a git tag
3. Commits the change

### Publishing Updates

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Build
pnpm run prepack

# 3. Publish
npm publish

# 4. Push to git (including tags)
git push --follow-tags
```

---

## 📦 Using Your Published Package

### Step 1: Install in Your Project

```bash
# Navigate to your Nuxt 4 project
cd your-nuxt-app

# Install urkit
pnpm add urkit
# or
npm install urkit
# or
yarn add urkit
```

### Step 2: Configure Nuxt

Edit `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'urkit'
  ]
})
```

### Step 3: Use Components

Components are auto-imported:

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

### Step 4: Customize (Optional)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['urkit'],

  urkit: {
    // Custom component prefix
    prefix: 'Ur',

    // Custom icon paths
    iconNamespaces: {
      icons: '/assets/icons',
      logos: '/assets/logos',
      custom: '/my-icons'
    }
  }
})
```

---

## 🔧 Troubleshooting

### Package Not Found After Publishing

**Issue**: `npm ERR! 404 Not Found - GET https://registry.npmjs.org/urkit`

**Solutions**:
1. Wait 5-10 minutes for npm registry to propagate
2. Clear npm cache: `npm cache clean --force`
3. Try installing with full registry URL:
   ```bash
   npm install urkit --registry=https://registry.npmjs.org/
   ```

### Module Not Loading in Nuxt

**Issue**: Components not auto-imported or module not recognized

**Solutions**:
1. Verify module is in `modules` array in `nuxt.config.ts`
2. Clear Nuxt cache:
   ```bash
   rm -rf .nuxt
   pnpm dev
   ```
3. Regenerate types:
   ```bash
   pnpm nuxt prepare
   ```

### Icons Not Loading

**Issue**: Icons show as broken or empty

**Solutions**:
1. Verify `src/runtime/public` is in `files` array in `package.json`
2. Check icons exist in `node_modules/urkit/src/runtime/public/assets/icons/`
3. Verify icon names use correct namespace format: `icons:icon-name`
4. Check browser console for 404 errors

### TypeScript Errors

**Issue**: TypeScript cannot find module types

**Solutions**:
1. Ensure module is built: `pnpm run prepack`
2. Check `dist/types.d.ts` exists in published package
3. Regenerate project types:
   ```bash
   pnpm nuxt prepare
   ```

---

## 📊 Package Registry Options

### npm (Default)
- **URL**: https://www.npmjs.com
- **Registry**: `https://registry.npmjs.org/`
- **Pros**: Largest package registry, free public packages
- **Cons**: Private packages require paid account

### GitHub Package Registry
- **URL**: https://github.com/features/packages
- **Registry**: `https://npm.pkg.github.com/`
- **Setup**:
  ```bash
  # Add to package.json
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@yourusername"
  }
  ```

### Private Registry
If your organization has a private npm registry:

```bash
# Set registry
npm config set registry https://your-registry.com/

# Login
npm login --registry=https://your-registry.com/

# Publish
npm publish
```

---

## 🎯 Best Practices

### Before Publishing

1. **Test Locally First**
   ```bash
   # In urkit-ui directory
   npm pack

   # This creates urkit-0.1.0.tgz
   # Install in test project
   cd ../test-project
   npm install ../urkit-ui/urkit-0.1.0.tgz
   ```

2. **Use .npmignore** (optional)
   Create `.npmignore` to exclude files:
   ```
   playground/
   .nuxt/
   node_modules/
   *.log
   .DS_Store
   ```

3. **Version Tags**
   ```bash
   # Publish beta version
   npm version 0.2.0-beta.0
   npm publish --tag beta

   # Users install: npm install urkit@beta
   ```

### After Publishing

1. **Monitor Downloads**
   - Check npm stats: https://www.npmjs.com/package/urkit
   - Use npm-stat: https://npm-stat.com/

2. **Set Up CI/CD** (optional)
   Automate publishing with GitHub Actions:
   ```yaml
   # .github/workflows/publish.yml
   name: Publish to npm
   on:
     release:
       types: [created]
   jobs:
     publish:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             registry-url: 'https://registry.npmjs.org'
         - run: pnpm install
         - run: pnpm run prepack
         - run: npm publish
           env:
             NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

3. **Create Changelog**
   Document changes for each version:
   ```markdown
   # Changelog

   ## [0.1.0] - 2024-01-15
   ### Added
   - Initial release
   - UrButton component
   - UrInput component
   - Icon system
   ```

---

## 📝 Quick Reference

### Publishing Workflow

```bash
# 1. Update version
npm version patch

# 2. Build
pnpm run prepack

# 3. Test (optional)
npm pack
# Install in test project to verify

# 4. Publish
npm publish

# 5. Push to git
git push --follow-tags
```

### Installation in Projects

```bash
# Install
pnpm add urkit

# Configure
echo "modules: ['urkit']" >> nuxt.config.ts

# Use
# Components auto-imported as <UrButton>, <UrInput>, etc.
```

---

## 🔗 Useful Links

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Creating Node.js Modules](https://docs.npmjs.com/creating-node-js-modules)
- [Nuxt Module Author Guide](https://nuxt.com/docs/guide/going-further/modules)
- [Package.json Fields](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
