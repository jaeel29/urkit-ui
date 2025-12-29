# PNPM Publishing Workflow Guide

Complete guide for publishing and updating the urkit-ui package on npm using pnpm.

## Package Information

- **Package**: [urkit-ui](https://www.npmjs.com/package/urkit-ui)
- **Current Version**: 0.1.5
- **Registry**: npm public registry
- **Package Manager**: pnpm
- **GitHub**: [jaeel29/urkit-ui](https://github.com/jaeel29/urkit-ui)

## Prerequisites

### 1. NPM Authentication

Ensure you're logged in to npm:

```bash
pnpm whoami
```

If not logged in:

```bash
pnpm login
```

### 2. Verify Package Access

Check your access to the urkit-ui package:

```bash
pnpm owner ls urkit-ui
```

## Publishing Updates

### Quick Reference Commands

```bash
# Patch version (0.1.5 → 0.1.6) - Bug fixes
pnpm version patch && pnpm run release

# Minor version (0.1.5 → 0.2.0) - New features
pnpm version minor && pnpm run release

# Major version (0.1.5 → 1.0.0) - Breaking changes
pnpm version major && pnpm run release
```

### Detailed Workflow

#### 1. Pre-Publish Checklist

Before publishing, ensure:

- [ ] All changes are committed to git
- [ ] Tests pass: `pnpm test`
- [ ] Linting passes: `pnpm run lint`
- [ ] TypeScript types are valid: `pnpm run test:types`
- [ ] Build succeeds: `pnpm run prepack`
- [ ] Documentation is updated (README, CHANGELOG, etc.)

#### 2. Version Your Changes

Choose the appropriate version bump based on [Semantic Versioning](https://semver.org/):

**PATCH (0.1.5 → 0.1.6)** - Backward compatible bug fixes:
```bash
pnpm version patch
```
Examples: Bug fixes, documentation updates, dependency updates

**MINOR (0.1.5 → 0.2.0)** - New backward compatible features:
```bash
pnpm version minor
```
Examples: New components, new features, new composables

**MAJOR (0.1.5 → 1.0.0)** - Breaking changes:
```bash
pnpm version major
```
Examples: API changes, removed features, renamed components

The `pnpm version` command will:
- Update version in package.json
- Create a git commit with message "v{version}"
- Create a git tag "v{version}"

#### 3. Publish to NPM

Use the release script which handles everything:

```bash
pnpm run release
```

This script will:
1. Run linting (`pnpm run lint`)
2. Build the package (`pnpm run prepack`)
3. Publish to npm (`pnpm publish`)
4. Push commits and tags to GitHub (`git push --follow-tags`)

**OR** publish manually:

```bash
# Build the package
pnpm run prepack

# Publish to npm
pnpm publish

# Push to GitHub
git push --follow-tags
```

#### 4. Verify Publication

Check that your package updated on npm:

```bash
pnpm view urkit-ui version
```

Visit: [https://www.npmjs.com/package/urkit-ui](https://www.npmjs.com/package/urkit-ui)

## Important Notes

### Build Process

- **dist/ folder**: Excluded from git (in .gitignore)
- **prepack script**: Automatically builds dist/ before publishing
- **What gets published**: Only files listed in `package.json` "files" array:
  - `dist/` (built by prepack)
  - `src/runtime/public/` (static assets)

### Git Workflow Integration

The pnpm version command creates git commits and tags:

```bash
# After pnpm version patch
git log -1
# Shows: "v0.1.6"

git tag
# Shows: v0.1.6
```

Always push tags to GitHub:

```bash
git push --follow-tags
```

## Common Workflows

### Publishing a Bug Fix

```bash
# 1. Make your changes and commit
git add .
git commit -m "fix: correct button styling issue"

# 2. Version and publish
pnpm version patch
pnpm run release
```

### Publishing a New Feature

```bash
# 1. Make your changes and commit
git add .
git commit -m "feat: add new Card component"

# 2. Version and publish
pnpm version minor
pnpm run release
```

### Publishing a Breaking Change

```bash
# 1. Make your changes and commit
git add .
git commit -m "feat!: rename Button to UButton for consistency"

# 2. Update documentation about breaking changes

# 3. Version and publish
pnpm version major
pnpm run release
```

## Troubleshooting

### "You do not have permission to publish"

Ensure you're logged in as the package owner:

```bash
pnpm whoami
pnpm owner ls urkit-ui
```

### "Version already exists"

You tried to publish a version that already exists:

```bash
# Check current npm version
pnpm view urkit-ui version

# Update your package.json version to be higher
pnpm version patch
```

### Build Fails During Publish

The prepack script must succeed:

```bash
# Test the build manually
pnpm run prepack

# Check for TypeScript errors
pnpm run test:types

# Check for linting errors
pnpm run lint
```

### Tags Not Pushed to GitHub

```bash
# Push tags manually
git push --tags

# Or push current branch with tags
git push --follow-tags
```

## Best Practices

1. **Always test before publishing**: Run tests, linting, and build locally
2. **Use semantic versioning**: Follow semver guidelines strictly
3. **Update documentation**: Keep README and guides current
4. **Create GitHub releases**: After publishing, create a GitHub release with changelog
5. **Monitor downloads**: Check npm stats to track package usage
6. **Respond to issues**: Monitor GitHub issues and npm for user feedback

## PNPM Scripts Reference

```json
{
  "prepack": "nuxt-module-build build",        // Builds dist/ before pnpm publish
  "release": "pnpm run lint && pnpm run prepack && pnpm publish && git push --follow-tags",
  "lint": "eslint .",                          // Code quality check
  "test": "vitest run",                        // Run tests
  "test:types": "vue-tsc --noEmit"            // TypeScript validation
}
```

## Package.json Configuration

Key fields for npm publishing:

```json
{
  "name": "urkit-ui",
  "version": "0.1.5",
  "files": ["dist", "src/runtime/public"],     // What gets published
  "main": "./dist/module.cjs",                 // CJS entry point
  "types": "./dist/types.d.ts",                // TypeScript types
  "exports": {                                  // Modern module resolution
    ".": {
      "types": "./dist/types.d.ts",
      "import": "./dist/module.mjs",
      "require": "./dist/module.cjs"
    }
  }
}
```

## Release Checklist

Before each release:

- [ ] Code changes committed and tested
- [ ] Documentation updated
- [ ] Version bumped appropriately
- [ ] Tests passing
- [ ] Linting passing
- [ ] TypeScript types valid
- [ ] Build succeeds
- [ ] Logged in to npm
- [ ] Git remote configured
- [ ] Ready to publish

After publishing:

- [ ] Verify version on npm
- [ ] Test installation: `pnpm install urkit-ui@latest`
- [ ] Create GitHub release with changelog
- [ ] Announce update (if significant)
- [ ] Monitor for issues

## Support

- **NPM Package**: https://www.npmjs.com/package/urkit-ui
- **GitHub Issues**: https://github.com/jaeel29/urkit-ui/issues
- **Documentation**: See README.md
- **Package Manager**: pnpm
