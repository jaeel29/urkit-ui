<template>
  <component
    :is="componentTag"
    :href="isLink ? href : undefined"
    :to="isNuxtLink ? to : undefined"
    :disabled="isDisabled"
    :type="buttonType"
    :class="buttonClasses"
    :aria-label="ariaLabel"
    :aria-disabled="isDisabled"
    :aria-busy="loading"
    @click="handleClick"
  >
    <!-- Loading State -->
    <span v-if="loading && !loadingLabel" class="form-button__loading" aria-hidden="true">
      <Icon name="icons:loader-icon" size="20" class="form-button__loading-icon" alt="" />
    </span>

    <!-- Left Icon -->
    <span
      v-if="icon && iconPosition === 'left' && !loading"
      class="form-button__icon form-button__icon--left"
      aria-hidden="true"
    >
      <Icon :name="iconName" size="20" alt="" />
    </span>

    <!-- Loading with Label -->
    <div v-if="loading && loadingLabel" class="form-button__loading-wrapper">
      <span class="form-button__loading" aria-hidden="true">
        <Icon name="icons:loader-icon" size="16" class="form-button__loading-icon" alt="" />
      </span>
      <span class="form-button__label">{{ loadingLabel }}</span>
    </div>

    <!-- Button Label -->
    <span v-if="label && !loading" class="form-button__label">
      {{ label }}
    </span>

    <!-- Default Slot -->
    <slot v-if="!label && !loading" />

    <!-- Right Icon -->
    <span
      v-if="icon && iconPosition === 'right' && !loading"
      class="form-button__icon form-button__icon--right"
      aria-hidden="true"
    >
      <Icon :name="iconName" size="20" alt="" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import Icon from './Icon.vue'

/**
 * Button variant types
 */
type ButtonVariant = 'primary' | 'error' | 'success' | 'neutral'

/**
 * Button size types
 */
type ButtonSize = 'sm' | 'md' | 'lg' | 'xlg'

/**
 * Icon position types
 */
type IconPosition = 'left' | 'right'

/**
 * Icon collection types
 */
type IconCollection = 'custom' | 'currencies' | 'icons'

/**
 * Button mode types
 */
type ButtonMode = 'filled' | 'stroke' | 'lighter' | 'ghost'

/**
 * Button radius types
 */
type ButtonRadiusType = 'none' | 'soft' | 'medium' | 'pill'

/**
 * Button component props interface
 */
interface ButtonProps {
  /** Button style variant */
  variant?: ButtonVariant
  /** Navigation target (for NuxtLink) */
  to?: string | RouteLocationRaw
  /** Button size */
  size?: ButtonSize
  /** Icon name */
  icon?: string
  /** Icon position relative to label */
  iconPosition?: IconPosition
  /** Icon collection namespace */
  iconCollection?: IconCollection
  /** Button label text */
  label?: string
  /** Loading state label */
  loadingLabel?: string
  /** Whether button has rounded corners */
  rounded?: boolean
  /** Whether button is in loading state */
  loading?: boolean
  /** External link href (renders as anchor) */
  href?: string | null
  /** Whether button is disabled */
  disabled?: boolean
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Button mode */
  mode?: ButtonMode
  /** Radius type with size-aware values */
  radiusType?: ButtonRadiusType
}

// ============================================================================
// COMPONENT SETUP
// ============================================================================

/**
 * Component props with defaults
 */
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'left',
  iconCollection: 'icons',
  rounded: false,
  loading: false,
  disabled: false,
  type: 'button',
  mode: 'filled',
  radiusType: 'soft',
})

/**
 * Component events
 */
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

/**
 * Capture additional attributes
 */
const attrs = useAttrs()

// ============================================================================
// COMPUTED PROPERTIES
// ============================================================================

/**
 * Determine component tag based on props
 */
const componentTag = computed((): string => {
  if (props.href) return 'a'
  if (props.to) return 'NuxtLink'
  return 'button'
})

/**
 * Check if component should render as link
 */
const isLink = computed((): boolean => {
  return Boolean(props.href)
})

/**
 * Check if component should render as NuxtLink
 */
const isNuxtLink = computed((): boolean => {
  return Boolean(props.to)
})

/**
 * Check if button is disabled
 */
const isDisabled = computed((): boolean => {
  return props.disabled || props.loading
})

/**
 * Get button type attribute
 */
const buttonType = computed((): string | undefined => {
  return componentTag.value === 'button' ? props.type : undefined
})

/**
 * Generate icon name with collection prefix
 */
const iconName = computed((): string => {
  if (!props.icon) return ''
  return `${props.iconCollection}:${props.icon}`
})

/**
 * Generate ARIA label
 */
const ariaLabel = computed((): string => {
  if (props.loading && props.loadingLabel) {
    return `Loading: ${props.loadingLabel}`
  }
  if (props.loading) {
    return 'Loading'
  }
  return props.label || ''
})

/**
 * Generate button CSS classes
 */
const buttonClasses = computed((): string[] => {
  const classes = [
    'form-button',
    `form-button--${props.variant}`,
    `form-button--${props.size}`,
    `form-button--mode-${props.mode}`,
  ]

  // Add radius type class
  if (props.radiusType) {
    classes.push(`form-button--radius-${props.radiusType}`)
  }

  if (props.loading) {
    classes.push('form-button--loading')
  }

  if (props.disabled) {
    classes.push('form-button--disabled')
  }

  if (props.rounded) {
    classes.push('form-button--rounded')
  }

  if (isLink.value) {
    classes.push('form-button--link')
  }

  // Include any additional classes from parent
  if (attrs.class) {
    if (Array.isArray(attrs.class)) {
      classes.push(...attrs.class)
    } else {
      classes.push(attrs.class as string)
    }
  }

  return classes
})

// ============================================================================
// METHODS
// ============================================================================

/**
 * Handle button click events
 */
const handleClick = (event: MouseEvent): void => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<style scoped>
.form-button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border-radius: var(--border-radius-2, 8px);

  /* Typography */
  font-family: 'InterFull', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

  /* Appearance */
  border: none;
  background: none;
  cursor: pointer;

  /* Interaction */
  transition: all 0.2s ease;
  user-select: none;

  /* Accessibility */
  outline: none;
}

.form-button:focus-visible {
  outline: 1px solid var(--primary-500);
  /* outline-offset: 2px; */
}

/* =================================
   BUTTON CONTENT ELEMENTS
   ================================= */

.form-button__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.form-button__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.form-button__loading-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-button__loading-icon {
  animation: buttonSpinner 1s linear infinite;
}

@keyframes buttonSpinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* =================================
   SIZE VARIANTS
   ================================= */

.form-button--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
  gap: 6px;
}

.form-button--md {
  height: 36px;
  padding: 0 14px;
  font-size: 13px;
  gap: 6px;
}

.form-button--lg {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  gap: 8px;
}

.form-button--xlg {
  height: 44px;
  padding: 0 18px;
  font-size: 15px;
  gap: 8px;
}

/* =================================
   VARIANT STYLES
   ================================= */

/* PRIMARY VARIANT */
.form-button--primary.form-button--mode-filled {
  background: var(--primary-600);
  color: var(--white);
  border: none;
}
.form-button--primary.form-button--mode-filled:hover:not(:disabled) {
  background: var(--primary-700);
}
.form-button--primary.form-button--mode-filled:active:not(:disabled) {
  background: var(--primary-800);
}
.form-button--primary.form-button--mode-stroke {
  background: transparent;
  color: var(--primary-600);
  border: 1px solid var(--primary-600);
}
.form-button--primary.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--primary-700);
  border-color: var(--primary-700);
  background: var(--primary-50);
}
.form-button--primary.form-button--mode-stroke:active:not(:disabled) {
  color: var(--primary-800);
  border-color: var(--primary-800);
  background: var(--primary-100);
}
.form-button--primary.form-button--mode-lighter {
  background: var(--primary-50);
  color: var(--primary-600);
  border: none;
}
.form-button--primary.form-button--mode-lighter:hover:not(:disabled) {
  background: var(--primary-200);
  color: var(--primary-700);
}
.form-button--primary.form-button--mode-lighter:active:not(:disabled) {
  background: var(--primary-300);
  color: var(--primary-800);
}
.form-button--primary.form-button--mode-ghost {
  background: none;
  color: var(--primary-600);
  border: none;
}
.form-button--primary.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--primary-700);
  background: var(--primary-50);
}
.form-button--primary.form-button--mode-ghost:active:not(:disabled) {
  color: var(--primary-800);
  background: var(--primary-100);
}

/* ERROR VARIANT */
.form-button--error.form-button--mode-filled {
  background: var(--error);
  color: var(--white);
  border: none;
}
.form-button--error.form-button--mode-filled:hover:not(:disabled) {
  background: var(--error-dark);
}
.form-button--error.form-button--mode-filled:active:not(:disabled) {
  background: var(--error-contrast);
}
.form-button--error.form-button--mode-stroke {
  background: transparent;
  color: var(--error);
  border: 1px solid var(--error);
}
.form-button--error.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--error-dark);
  border-color: var(--error-dark);
  background: var(--error-light);
}
.form-button--error.form-button--mode-stroke:active:not(:disabled) {
  color: var(--error-contrast);
  border-color: var(--error-contrast);
  background: var(--error-light);
}
.form-button--error.form-button--mode-lighter {
  background: var(--error-light);
  color: var(--error);
  border: none;
}
.form-button--error.form-button--mode-lighter:hover:not(:disabled) {
  background: #ffd6d6;
  color: var(--error-dark);
}
.form-button--error.form-button--mode-lighter:active:not(:disabled) {
  background: #ffebeb;
  color: var(--error-contrast);
}
.form-button--error.form-button--mode-ghost {
  background: none;
  color: var(--error);
  border: none;
}
.form-button--error.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--error-dark);
  background: var(--error-light);
}
.form-button--error.form-button--mode-ghost:active:not(:disabled) {
  color: var(--error-contrast);
  background: #ffebeb;
}

/* SUCCESS VARIANT */
.form-button--success.form-button--mode-filled {
  background: var(--success);
  color: var(--white);
  border: none;
}
.form-button--success.form-button--mode-filled:hover:not(:disabled) {
  background: var(--success-dark);
}
.form-button--success.form-button--mode-filled:active:not(:disabled) {
  background: var(--success-contrast);
}
.form-button--success.form-button--mode-stroke {
  background: transparent;
  color: var(--success);
  border: 1px solid var(--success);
}
.form-button--success.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--success-dark);
  border-color: var(--success-dark);
  background: var(--success-light);
}
.form-button--success.form-button--mode-stroke:active:not(:disabled) {
  color: var(--success-contrast);
  border-color: var(--success-contrast);
  background: var(--success-light);
}
.form-button--success.form-button--mode-lighter {
  background: var(--success-light);
  color: var(--success);
  border: none;
}
.form-button--success.form-button--mode-lighter:hover:not(:disabled) {
  background: #d2fbe7;
  color: var(--success-dark);
}
.form-button--success.form-button--mode-lighter:active:not(:disabled) {
  background: #eafcf3;
  color: var(--success-contrast);
}
.form-button--success.form-button--mode-ghost {
  background: none;
  color: var(--success);
  border: none;
}
.form-button--success.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--success-dark);
  background: var(--success-light);
}
.form-button--success.form-button--mode-ghost:active:not(:disabled) {
  color: var(--success-contrast);
  background: #eafcf3;
}

/* WHITE VARIANT */
.form-button--white.form-button--mode-filled {
  background: var(--white);
  color: var(--neutral-12);
  border: 1px solid var(--neutral-4);
}
.form-button--white.form-button--mode-filled:hover:not(:disabled) {
  background: var(--neutral-2);
}
.form-button--white.form-button--mode-filled:active:not(:disabled) {
  background: var(--neutral-3);
}
.form-button--white.form-button--mode-stroke {
  background: transparent;
  color: var(--neutral-12);
  border: 1px solid var(--neutral-4);
}
.form-button--white.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--neutral-12);
  border-color: var(--neutral-6);
  background: var(--neutral-1);
}
.form-button--white.form-button--mode-stroke:active:not(:disabled) {
  color: var(--neutral-12);
  border-color: var(--neutral-7);
  background: var(--neutral-2);
}
.form-button--white.form-button--mode-lighter {
  background: var(--neutral-3);
  color: var(--neutral-12);
  border: none;
}
.form-button--white.form-button--mode-lighter:hover:not(:disabled) {
  background: var(--neutral-2);
  color: var(--neutral-12);
}
.form-button--white.form-button--mode-lighter:active:not(:disabled) {
  background: var(--neutral-1);
  color: var(--neutral-12);
}
.form-button--white.form-button--mode-ghost {
  background: none;
  color: var(--neutral-12);
  border: none;
}
.form-button--white.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--neutral-12);
  background: var(--neutral-2);
}
.form-button--white.form-button--mode-ghost:active:not(:disabled) {
  color: var(--neutral-12);
  background: var(--neutral-3);
}

/* NEUTRAL VARIANT */
.form-button--neutral.form-button--mode-filled {
  background: var(--neutral-12);
  color: var(--white);
  border: none;
}
.form-button--neutral.form-button--mode-filled:hover:not(:disabled) {
  background: var(--neutral-11);
}
.form-button--neutral.form-button--mode-filled:active:not(:disabled) {
  background: var(--neutral-10);
}
.form-button--neutral.form-button--mode-stroke {
  background: transparent;
  color: var(--neutral-12);
  border: 1px solid var(--neutral-4);
}
.form-button--neutral.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--neutral-12);
  border-color: var(--neutral-6);
  background: var(--neutral-3);
}
.form-button--neutral.form-button--mode-stroke:active:not(:disabled) {
  color: var(--neutral-12);
  border-color: var(--neutral-7);
  background: var(--neutral-4);
}
.form-button--neutral.form-button--mode-lighter {
  background: var(--neutral-3);
  color: var(--neutral-12);
  border: none;
}
.form-button--neutral.form-button--mode-lighter:hover:not(:disabled) {
  background: var(--neutral-2);
  color: var(--neutral-12);
}
.form-button--neutral.form-button--mode-lighter:active:not(:disabled) {
  background: var(--neutral-1);
  color: var(--neutral-12);
}
.form-button--neutral.form-button--mode-ghost {
  background: none;
  color: var(--neutral-12);
  border: none;
}
.form-button--neutral.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--neutral-12);
  background: var(--neutral-2);
}
.form-button--neutral.form-button--mode-ghost:active:not(:disabled) {
  color: var(--neutral-12);
  background: var(--neutral-3);
}

/* =================================
   STATE STYLES
   ================================= */

/* Loading State */
.form-button--loading {
  cursor: not-allowed;
  pointer-events: none;
}

.form-button--loading.form-button--primary,
.form-button--loading.form-button--outline,
.form-button--loading.form-button--white,
.form-button--loading.form-button--error,
.form-button--loading.form-button--success,
.form-button--loading.form-button--neutral {
  /* No box-shadow */
}

/* Disabled State */
.form-button--disabled,
.form-button:disabled {
  background-color: var(--neutral-9) !important;
  color: var(--neutral-6) !important;
  border-color: var(--neutral-10) !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
  box-shadow: none !important;
  transform: none !important;
}

/* =================================
   MODIFIER STYLES
   ================================= */

/* Rounded Variant */
.form-button--rounded {
  border-radius: 9999px;
}

/* Link Variant */
.form-button--link {
  display: inline-flex;
}

/* =================================
   RESPONSIVE DESIGN
   ================================= */

@media screen and (max-width: 768px) {
  .form-button {
    min-height: 44px; /* Touch-friendly minimum */
  }

  .form-button--sm {
    height: 36px;
  }

  .form-button--md {
    height: 40px;
  }
}

.form-button--mode-filled {
  /* default, can be empty or same as current */
}
.form-button--mode-stroke {
  background: transparent;
  border: 1px solid var(--primary-600);
  color: var(--primary-600);
}
.form-button--mode-lighter {
  background: var(--primary-100);
  color: var(--primary-600);
  border: none;
}
.form-button--mode-ghost {
  background: none;
  color: var(--primary-600);
  border: none;
  box-shadow: none;
}

/* PRIMARY VARIANT */
.form-button--primary.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--primary-700);
  border-color: var(--primary-700);
  background: rgba(44, 98, 255, 0.06);
}
.form-button--primary.form-button--mode-stroke:active:not(:disabled) {
  color: var(--primary-800);
  border-color: var(--primary-800);
  background: rgba(44, 98, 255, 0.12);
}
.form-button--primary.form-button--mode-lighter:hover:not(:disabled) {
  background: var(--primary-200);
  color: var(--primary-700);
}
.form-button--primary.form-button--mode-lighter:active:not(:disabled) {
  background: var(--primary-300);
  color: var(--primary-800);
}
.form-button--primary.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--primary-700);
  background: rgba(44, 98, 255, 0.06);
}
.form-button--primary.form-button--mode-ghost:active:not(:disabled) {
  color: var(--primary-800);
  background: rgba(44, 98, 255, 0.12);
}

/* FILLED (default) */
.form-button--neutral.form-button--mode-filled {
  background: var(--neutral-12);
  color: var(--white);
  border: none;
}
.form-button--neutral.form-button--mode-filled:hover:not(:disabled) {
  background: var(--neutral-11);
}
.form-button--neutral.form-button--mode-filled:active:not(:disabled) {
  background: var(--neutral-10);
}

/* STROKE */
.form-button--neutral.form-button--mode-stroke {
  background: transparent;
  color: var(--neutral-12);
  border: 1px solid var(--neutral-4);
}
.form-button--neutral.form-button--mode-stroke:hover:not(:disabled) {
  color: var(--neutral-12);
  border-color: var(--neutral-4);
  background: var(--neutral-3);
}
.form-button--neutral.form-button--mode-stroke:active:not(:disabled) {
  color: var(--neutral-12);
  border-color: var(--neutral-7);
  background: var(--neutral-4);
}

/* LIGHTER */
.form-button--neutral.form-button--mode-lighter {
  background: var(--neutral-3);
  color: var(--neutral-12);
  border: none;
}
.form-button--neutral.form-button--mode-lighter:hover:not(:disabled) {
  background: var(--neutral-2);
  color: var(--neutral-12);
}
.form-button--neutral.form-button--mode-lighter:active:not(:disabled) {
  background: var(--neutral-1);
  color: var(--neutral-12);
}

/* GHOST */
.form-button--neutral.form-button--mode-ghost {
  background: none;
  color: var(--neutral-12);
  border: none;
}
.form-button--neutral.form-button--mode-ghost:hover:not(:disabled) {
  color: var(--neutral-12);
  background: var(--neutral-2);
}
.form-button--neutral.form-button--mode-ghost:active:not(:disabled) {
  color: var(--neutral-12);
  background: var(--neutral-3);
}

/* =================================
   RADIUS TYPE STYLES
   ================================= */

/* None radius */
.form-button--radius-none {
  border-radius: 0px;
}

/* Soft radius - size aware */
.form-button--radius-soft.form-button--sm,
.form-button--radius-soft.form-button--md {
  border-radius: 6px;
}

.form-button--radius-soft.form-button--lg,
.form-button--radius-soft.form-button--xlg {
  border-radius: 8px;
}

/* Medium radius - size aware */
.form-button--radius-medium.form-button--sm,
.form-button--radius-medium.form-button--md {
  border-radius: 8px;
}

.form-button--radius-medium.form-button--lg,
.form-button--radius-medium.form-button--xlg {
  border-radius: 10px;
}

/* Pill radius */
.form-button--radius-pill {
  border-radius: 999px;
}
</style>
