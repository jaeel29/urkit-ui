# Claude Code Prompt Templates for Urkit Package

Ready-to-use prompts for common tasks when working with the urkit package.

## 📦 Component Migration Prompts

### Basic Component Migration

```
Migrate the [ComponentName] component from urkit-design to this package:

1. SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[ComponentName].vue

2. TASKS:
   - Read the source component
   - Remove any showcase-specific code (navigation, demo logic, etc.)
   - Copy to: src/runtime/components/[ComponentName].vue
   - Ensure component is production-ready and self-contained
   - Add TypeScript types if missing
   - Add JSDoc comments for props

3. CSS:
   - Extract component styles if needed
   - Add to: src/runtime/assets/css/components/[component-name].css
   - Import in main CSS if needed

4. TESTING:
   - Create test page in playground/pages/test-[component-name].vue
   - Test all variants and props
   - Verify in playground at http://localhost:3003

5. BUILD:
   - Run: pnpm prepack
   - Verify component is in dist/

6. COMMIT:
   - git add .
   - git commit -m "feat: add [ComponentName] component"

Show me what changes you'll make before implementing.
```

### Migrating Component with Dependencies

```
Migrate [ComponentName] from urkit-design with its dependencies:

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[ComponentName].vue

1. ANALYZE:
   - Find all dependencies (composables, utilities, types)
   - Check for external package dependencies
   - Identify required CSS/assets

2. MIGRATE:
   - Component: src/runtime/components/[ComponentName].vue
   - Composables: src/runtime/composables/ (if needed)
   - Types: src/runtime/types/ (if needed)
   - CSS: src/runtime/assets/css/

3. UPDATE package.json:
   - Add any new dependencies
   - Add to peerDependencies if user should install

4. TEST & BUILD:
   - Test in playground
   - Run pnpm prepack
   - Verify all dependencies resolved

5. DOCUMENT:
   - Update component documentation
   - Note any breaking changes or requirements

Show dependency tree first, then implement.
```

### Batch Component Migration

```
Migrate multiple related components from urkit-design:

COMPONENTS TO MIGRATE:
- [Component1]
- [Component2]
- [Component3]

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/

For each component:
1. Analyze dependencies and shared code
2. Identify common utilities/composables
3. Migrate in logical order (dependencies first)
4. Create unified test page
5. Single commit: "feat: add [ComponentGroup] components"

Show migration plan with order and dependencies first.
```

## 🔧 Package Maintenance Prompts

### Update Package After Changes

```
I've made changes to components/composables. Help me prepare for release:

1. VERIFY:
   - Check all TypeScript types are correct
   - Run: pnpm test:types
   - Ensure no linting errors: pnpm lint

2. TEST:
   - Test all components in playground
   - Verify no console errors
   - Check responsive behavior

3. BUILD:
   - Clean build: rm -rf dist/
   - Build: pnpm prepack
   - Verify dist/ contents

4. VERSION:
   - Determine version bump (patch/minor/major)
   - Update package.json version
   - Update CHANGELOG if exists

5. COMMIT:
   - Stage changes: git add .
   - Commit with conventional commit message
   - Tag release

Show me what version bump is appropriate and why.
```

### Fix Build Issues

```
The package build is failing. Help me debug and fix:

1. Show current error from: pnpm prepack
2. Analyze the issue
3. Check common problems:
   - Missing dependencies
   - TypeScript errors
   - Import path issues
   - CSS/asset loading

4. Fix the issue
5. Verify build succeeds
6. Test in playground

Explain the root cause and solution.
```

### Update Documentation

```
Update package documentation for recent changes:

CHANGES MADE:
- [List recent component additions/changes]

UPDATE:
1. README.md - Add new components to list
2. USAGE.md - Add usage examples for new components
3. ARCHITECTURE.md - Update if structure changed
4. Package version in package.json

Ensure docs are clear and have code examples.
```

## 🚀 Publishing Prompts

### Prepare Release

```
Prepare package for npm release:

1. PRE-RELEASE CHECKS:
   - All tests pass
   - Build succeeds (pnpm prepack)
   - No TypeScript errors
   - No linting errors
   - Playground works

2. VERSION BUMP:
   - Determine appropriate version (patch/minor/major)
   - Run: npm version [patch|minor|major]
   - Update CHANGELOG

3. BUILD:
   - Clean: rm -rf dist/
   - Build: pnpm prepack
   - Verify dist/ size and contents

4. GIT:
   - Commit all changes
   - Tag release
   - Push to GitHub with tags

5. NPM:
   - Show publish command
   - Verify package.json is correct

Walk me through each step with verification.
```

### Publish to NPM

```
I'm ready to publish to npm. Guide me through:

1. Verify I'm logged in: npm whoami
2. Check package.json is correct
3. Verify dist/ is built
4. Dry run: npm publish --dry-run
5. Actual publish: npm publish
6. Verify on: https://www.npmjs.com/package/urkit
7. Test installation: npm install urkit@latest

Show me each command and wait for confirmation.
```

### Rollback/Fix Bad Release

```
I need to fix a bad release:

ISSUE: [Describe the problem]

CURRENT VERSION: [version]

Help me:
1. Determine if I should unpublish or publish fix
2. If fix: Create hotfix branch, fix issue, test
3. Bump patch version
4. Publish fixed version
5. Update GitHub with fix

Show me the safest approach.
```

## 🧪 Testing Prompts

### Create Component Tests

```
Create comprehensive tests for [ComponentName]:

1. TEST FILE:
   - Create: test/[ComponentName].test.ts
   - Use vitest

2. TEST CASES:
   - Props validation
   - Slot rendering
   - Event emissions
   - Accessibility
   - Edge cases

3. COVERAGE:
   - Aim for >80% coverage
   - Test all public API

Show me test structure first, then implement.
```

### Test Package Installation

```
Test this package as if a user is installing it:

1. Create test directory outside this repo
2. Initialize new Nuxt project
3. Install this package locally: npm install file:../urkit-ui
4. Configure in nuxt.config.ts
5. Test importing and using components
6. Verify CSS loads correctly
7. Check for any errors or warnings

Report any issues found.
```

## 🔍 Debugging Prompts

### Debug Component Issue

```
Debug issue with [ComponentName]:

PROBLEM: [Describe the issue]

STEPS:
1. Check component code in src/runtime/components/
2. Verify imports and dependencies
3. Check CSS in src/runtime/assets/css/
4. Test in playground with different props
5. Check browser console for errors
6. Verify TypeScript types

Explain the issue and provide fix.
```

### Debug Build Issue

```
Package build is failing. Debug and fix:

ERROR: [Paste error message]

INVESTIGATE:
1. Check build.config.ts
2. Verify all imports resolve
3. Check TypeScript configuration
4. Verify dependencies in package.json
5. Check for circular dependencies

Explain root cause and solution.
```

## 📝 Documentation Prompts

### Document New Component

```
Create comprehensive documentation for [ComponentName]:

1. USAGE.md:
   - Import example
   - Basic usage
   - Props table
   - Events table
   - Slots table
   - Examples (multiple variants)

2. README.md:
   - Add to component list
   - Brief description

3. JSDoc:
   - Add to component file
   - Document all props/events/slots

Use clear examples and TypeScript types.
```

### Create Migration Notes

```
Create migration notes for users upgrading from v[old] to v[new]:

BREAKING CHANGES:
- [List breaking changes]

NEW FEATURES:
- [List new features]

Create MIGRATION.md with:
1. Breaking changes and how to fix
2. New features and how to use
3. Deprecation warnings
4. Code examples for migrations

Clear, actionable guidance.
```

## 🎨 Style/CSS Prompts

### Extract Component Styles

```
Extract and organize styles for [ComponentName]:

1. CURRENT:
   - Review component's <style> section
   - Identify global vs scoped styles

2. EXTRACT:
   - Create: src/runtime/assets/css/components/[component-name].css
   - Use CSS custom properties where appropriate
   - Follow existing naming conventions

3. IMPORT:
   - Add to main CSS file
   - Verify in module.ts

4. TEST:
   - Rebuild package
   - Test in playground
   - Verify no style regressions

Show CSS structure first.
```

### Update Theme System

```
Update CSS custom properties and theme system:

CHANGES NEEDED:
- [Describe theme changes]

UPDATE:
1. src/runtime/assets/css/variables.css
2. Update component CSS to use new variables
3. Test light/dark themes
4. Update documentation

Ensure backward compatibility where possible.
```

## 🔄 Workflow Prompts

### Daily Development Workflow

```
Set up my daily development workflow:

1. Update dependencies if needed
2. Start playground: pnpm dev
3. Watch for changes
4. Lint on save
5. Show me what's new in urkit-design that could be migrated

Help me work efficiently.
```

### Review Before Commit

```
Review my changes before committing:

1. Show all modified files
2. Check for:
   - Console.logs or debug code
   - TODO comments
   - TypeScript errors
   - Linting issues
   - Missing documentation

3. Verify build works
4. Suggest commit message

Be thorough.
```

## 📊 Analysis Prompts

### Analyze Package Size

```
Analyze package size and optimization opportunities:

1. Check dist/ size breakdown
2. Identify large dependencies
3. Check for:
   - Unused dependencies
   - Duplicate code
   - Optimization opportunities
   - Tree-shaking issues

4. Suggest improvements

Show detailed analysis with size comparisons.
```

### Compare with urkit-design

```
Compare components between urkit-design and this package:

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/

ANALYSIS:
1. List all components in urkit-design
2. List all components in this package
3. Show what's missing in package
4. Suggest migration priorities
5. Identify deprecated components

Create migration roadmap.
```

## 🛠️ Utility Prompts

### Clean and Reset

```
Clean and reset the package for fresh start:

1. Remove build artifacts (dist/, .nuxt/)
2. Clean node_modules
3. Reinstall dependencies: pnpm install
4. Rebuild: pnpm dev:prepare
5. Test: pnpm dev

Verify everything works after reset.
```

### Update All Dependencies

```
Update package dependencies safely:

1. Check outdated: pnpm outdated
2. Identify breaking changes in updates
3. Update devDependencies first
4. Update dependencies
5. Test build and playground
6. Update package.json
7. Test thoroughly

Show what will be updated and potential issues.
```

---

## 💡 Tips for Best Results

### Be Specific
- Mention exact component names
- Include file paths
- Describe expected behavior
- Show error messages

### Ask for Plans First
Add: "Show me what you'll do first before implementing"

### Request Verification
Add: "Verify it works and show me the results"

### Include Context
Mention related changes or requirements

### Test Thoroughly
Always ask Claude to test in playground after changes

---

## 🎯 Quick Reference

**Migrate Component**: Copy prompt from "Basic Component Migration" section
**Fix Build**: Use "Fix Build Issues" prompt
**Publish**: Use "Prepare Release" then "Publish to NPM" prompts
**Test Package**: Use "Test Package Installation" prompt
**Debug Issue**: Use relevant debugging prompt with error details

---

## 📚 Related Documentation

- [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) - Detailed migration process
- [TESTING-GUIDE.md](./TESTING-GUIDE.md) - Testing procedures
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Package architecture
- [PUBLISHING.md](./PUBLISHING.md) - Publishing guidelines
