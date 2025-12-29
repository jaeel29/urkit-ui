# Quick Migration Template

Ultra-simple copy-paste template for migrating components.

## 🚀 Copy This Prompt to Claude Code

Replace `[COMPONENT]` with your component name (e.g., Alert, Tooltip, Dropdown)

---

### Standard Component Migration

```
Migrate [COMPONENT] component from urkit-design to this package:

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[COMPONENT].vue

STEPS:
1. Read source component and analyze dependencies
2. Remove showcase/demo code, keep only production code
3. Copy to: src/runtime/components/[COMPONENT].vue
4. Add TypeScript types and JSDoc comments for props
5. Extract CSS to: src/runtime/assets/css/components/[lowercase-name].css (if needed)
6. Create test page: playground/pages/test-[lowercase-name].vue
7. Test all variants in playground at localhost:3003
8. Build: pnpm prepack
9. Commit: git commit -m "feat: add [COMPONENT] component"

Follow checklist in MIGRATION-CHECKLIST.md. Show me plan first.
```

---

### Component with Complex Dependencies

```
Migrate [COMPONENT] with dependencies from urkit-design:

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[COMPONENT].vue

ANALYZE FIRST:
- Component dependencies (composables, utils, types)
- External packages needed
- CSS/asset requirements

THEN:
- Migrate dependencies to appropriate src/runtime/ folders
- Update package.json if new dependencies needed
- Migrate component
- Create comprehensive test page
- Test thoroughly in playground
- Build and verify

Show full dependency tree and migration plan first.
```

---

### Multiple Related Components

```
Migrate these related components from urkit-design:

COMPONENTS:
- [Component1]
- [Component2]
- [Component3]

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/

Steps:
1. Analyze shared dependencies
2. Migrate shared code first
3. Migrate components in dependency order
4. Create unified test page testing all together
5. Build and verify
6. Single commit: "feat: add [ComponentGroup] components"

Show migration order and shared dependencies first.
```

---

## 📝 Example: Migrating Alert Component

```
Migrate Alert component from urkit-design to this package:

SOURCE: /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/Alert.vue

STEPS:
1. Read source component and analyze dependencies
2. Remove showcase/demo code, keep only production code
3. Copy to: src/runtime/components/Alert.vue
4. Add TypeScript types and JSDoc comments for props
5. Extract CSS to: src/runtime/assets/css/components/alert.css (if needed)
6. Create test page: playground/pages/test-alert.vue
7. Test all variants in playground at localhost:3003
8. Build: pnpm prepack
9. Commit: git commit -m "feat: add Alert component"

Follow checklist in MIGRATION-CHECKLIST.md. Show me plan first.
```

---

## ⚡ Even Simpler (One-Liner)

```
Migrate [COMPONENT] from /Users/jabernuitee/Desktop/Jaber/Dev/urkit/urkit-design/app/components/ui/[COMPONENT].vue to src/runtime/components/, test in playground, build with pnpm prepack. Follow MIGRATION-CHECKLIST.md.
```

---

## 🎯 After Migration Testing

```
Test the [COMPONENT] component I just migrated:

1. Start playground if not running: pnpm dev
2. Open: http://localhost:3003/test-[component-name]
3. Test all props and variants
4. Check browser console for errors
5. Verify styles load correctly
6. Test responsive behavior
7. Check accessibility (keyboard nav, screen readers)
8. Build package: pnpm prepack
9. Verify component in dist/

Report any issues found.
```

---

## 📦 Build & Publish After Migration

```
I've migrated [COMPONENT]. Prepare for release:

1. Type check: pnpm test:types
2. Build: pnpm prepack
3. Verify dist/ contents
4. Update README.md with new component
5. Update USAGE.md with examples
6. Decide version bump (patch/minor/major)
7. Commit: git commit -m "feat: add [COMPONENT] component"
8. Bump: npm version [patch|minor|major]

Show me what changed and suggest version bump.
```

---

## 🔍 Debug Migration Issues

```
I'm having issues migrating [COMPONENT]:

ERROR: [paste error or describe issue]

Debug and fix:
1. Check source component structure
2. Verify all imports resolve
3. Check for missing dependencies
4. Verify file paths are correct
5. Check TypeScript types
6. Test in playground

Explain issue and provide solution.
```

---

## 📚 Component Categories & Common Patterns

### Form Components
```
Migrate [FORM_COMPONENT] (Input/Select/Checkbox/Radio):

Ensure it includes:
- v-model support
- Validation states (error, success, warning)
- Disabled state
- Label and placeholder
- Helper/error text
- ARIA labels and accessibility
- Focus/hover/active states
```

### Interactive Components
```
Migrate [INTERACTIVE_COMPONENT] (Button/Link/Tab):

Ensure it includes:
- All interaction states (hover, focus, active, disabled)
- Loading state (if applicable)
- Keyboard navigation
- ARIA attributes
- Variants and sizes
```

### Layout Components
```
Migrate [LAYOUT_COMPONENT] (Card/Container/Grid):

Ensure it includes:
- Responsive behavior
- Flexible spacing/sizing
- Slot support
- Works with varied content
```

### Display Components
```
Migrate [DISPLAY_COMPONENT] (Avatar/Badge/Icon):

Ensure it includes:
- Size variants
- Color/style variants
- Handles missing data
- Alt text (if images)
- Accessibility
```

---

## 💡 Pro Tips

1. **Always ask Claude to show plan first**: Add "Show me plan first" to prompt
2. **Reference checklists**: Mention MIGRATION-CHECKLIST.md for thoroughness
3. **Test immediately**: Always test in playground after migration
4. **Commit often**: Commit after each successful component migration
5. **Document as you go**: Update README.md and USAGE.md right away

---

## 📋 Quick Checklist

After using any prompt above, verify:

- [ ] Component migrated to src/runtime/components/
- [ ] TypeScript types added
- [ ] Test page created in playground/pages/
- [ ] Tested in playground (localhost:3003)
- [ ] No console errors
- [ ] Build succeeds: pnpm prepack
- [ ] Component in dist/
- [ ] Documentation updated (README.md, USAGE.md)
- [ ] Committed to git

---

## 🔗 Full Documentation

For detailed guides, see:
- [CLAUDE-PROMPTS.md](./CLAUDE-PROMPTS.md) - Comprehensive prompt library
- [MIGRATION-CHECKLIST.md](./MIGRATION-CHECKLIST.md) - Detailed checklist
- [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) - Full migration guide
