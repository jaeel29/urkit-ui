<template>
  <div
    :class="[
      'alert',
      `alert--${variant}`,
      `alert--${size}`,
      `alert--${status}`,
      wrapperClassName,
      { 'alert--has-description': description || $slots.description },
    ]"
  >
    <div class="alert__main">
      <div class="alert__content">
        <div class="alert__icon">
          <UrIcon :name="iconName" :size="iconSize" />
        </div>
        <div class="alert__text">
          <div class="alert__title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div v-if="description || $slots.description" class="alert__description">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
      <div class="alert__actions">
        <div
          v-if="(showLearnMore || showUpgrade || $slots.actions) && !(description || $slots.description)"
          class="alert__ctas"
        >
          <slot name="actions">
            <button v-if="showLearnMore" class="alert__learn-more">Learn More</button>
            <span v-if="showLearnMore && showUpgrade" class="alert__separator">·</span>
            <button v-if="showUpgrade" class="alert__upgrade">Upgrade</button>
          </slot>
        </div>
        <button v-if="dismissable" class="alert__close" @click="$emit('dismiss')">
          <UrIcon name="icons:close" :size="16" />
        </button>
      </div>
    </div>
    <div
      v-if="(showLearnMore || showUpgrade || $slots.actions) && (description || $slots.description)"
      class="alert__footer"
    >
      <div class="alert__links">
        <slot name="footer-actions">
          <button v-if="showLearnMore" class="alert__learn-more">Learn More</button>
          <span v-if="showLearnMore && showUpgrade" class="alert__separator">·</span>
          <button v-if="showUpgrade" class="alert__upgrade">Upgrade</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Alert component for displaying important messages and notifications
 * @component UrAlert
 */
interface Props {
  /** Alert visual style */
  variant?: 'filled' | 'light' | 'lighter' | 'stroke'
  /** Alert size */
  size?: 'xsmall' | 'small' | 'large'
  /** Alert status type */
  status?: 'error' | 'warning' | 'success' | 'information' | 'feature'
  /** Additional CSS classes for wrapper */
  wrapperClassName?: string
  /** Alert title text */
  title?: string
  /** Alert description text */
  description?: string
  /** Show "Learn More" action button */
  showLearnMore?: boolean
  /** Show "Upgrade" action button */
  showUpgrade?: boolean
  /** Enable dismiss button */
  dismissable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'small',
  status: 'information',
  wrapperClassName: '',
  title: 'Insert your alert title here!',
  description: '',
  showLearnMore: false,
  showUpgrade: true,
  dismissable: true,
})

/** Emits dismiss event when close button is clicked */
const emit = defineEmits<{
  /** Fired when alert is dismissed */
  dismiss: []
}>()

/** Computed icon name based on status */
const iconName = computed(() => {
  switch (props.status) {
    case 'error':
      return 'icons:alert-error'
    case 'warning':
      return 'icons:alert-warning'
    case 'success':
      return 'icons:alert-success'
    case 'information':
      return 'icons:alert-info'
    case 'feature':
      return 'icons:alert-feature'
    default:
      return 'icons:alert-info'
  }
})

/** Computed icon size based on alert size */
const iconSize = computed(() => {
  switch (props.size) {
    case 'xsmall':
      return 16
    case 'small':
      return 20
    case 'large':
      return 24
    default:
      return 16
  }
})
</script>

<style scoped>
.alert {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 400px;
  letter-spacing: -0.015px;
}

/* When no description, use horizontal layout */
.alert:not(.alert--has-description) {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.alert:not(.alert--has-description) .alert__main {
  flex: 1;
  align-items: center;
}

.alert:not(.alert--has-description) .alert__actions {
  margin-top: 0;
  align-items: center;
}

.alert__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.alert__content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
}

.alert__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.alert__description {
  font-weight: 350;
  line-height: 1.5;
}

.alert__title {
  font-weight: 500;
}

.alert__actions {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 2px;
}

.alert__ctas {
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert__footer {
  margin-top: 12px;
}

.alert__links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert__separator {
  color: inherit;
  opacity: 0.6;
  font-weight: 400;
}

.alert__upgrade {
  background: none;
  border: none;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  font-size: inherit;
  transition: opacity 0.2s ease;
}

.alert__upgrade:hover {
  opacity: 0.8;
}

.alert__learn-more {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-weight: 400;
  font-size: inherit;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.alert__learn-more:hover {
  opacity: 1;
}

.alert__close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: all 0.2s ease;
}

.alert__close:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Size variants */
.alert--xsmall {
  padding: 8px;
  font-size: 12px;
  border-radius: 8px;
  font-weight: 400;
}

.alert--xsmall .alert__main {
  align-items: center;
}

.alert--xsmall .alert__content {
  align-items: center;
}

.alert--xsmall .alert__icon {
  margin-top: 0;
}

.alert--xsmall .alert__actions {
  margin-top: 0;
}

.alert--small {
  padding: 8px;
  font-size: 14px;
  border-radius: 10px;
}

.alert--small .alert__main {
  align-items: center;
}

.alert--small .alert__content {
  align-items: center;
}

.alert--small .alert__icon {
  margin-top: 0;
}

.alert--small .alert__actions {
  margin-top: 0;
}

.alert--large {
  padding: 16px;
  font-size: 16px;
  border-radius: 12px;
}

.alert--large .alert__description {
  font-size: 15px;
  margin-top: 2px;
}

/* Adjust footer padding for different sizes */
.alert--xsmall .alert__footer {
  padding-left: 24px; /* Icon size (16px) + gap (8px) = 24px */
}

.alert--small .alert__footer {
  padding-left: 28px; /* Icon size (20px) + gap (8px) = 28px */
}

.alert--large .alert__footer {
  padding-left: 32px; /* Icon size (24px) + gap (8px) = 32px */
}

/* Status variants for filled */
.alert--filled.alert--error {
  background-color: var(--alert-error-bg);
  color: white;
}

.alert--filled.alert--warning {
  background-color: var(--alert-warning-bg);
  color: white;
}

.alert--filled.alert--success {
  background-color: var(--alert-success-bg);
  color: white;
}

.alert--filled.alert--information {
  background-color: var(--alert-info-bg);
  color: white;
}

.alert--filled.alert--feature {
  background-color: var(--alert-feature-bg);
  color: white;
}

/* Status variants for light */
.alert--light.alert--error {
  background-color: var(--alert-error-light);
  color: var(--neutral-10);
}

.alert--light.alert--warning {
  background-color: var(--alert-warning-light);
  color: var(--neutral-10);
}

.alert--light.alert--success {
  background-color: var(--alert-success-light);
  color: var(--neutral-10);
}

.alert--light.alert--information {
  background-color: var(--alert-info-light);
  color: var(--neutral-10);
}

.alert--light.alert--feature {
  background-color: var(--alert-feature-light);
  color: var(--neutral-10);
}

/* Status variants for lighter */
.alert--lighter.alert--error {
  background-color: var(--alert-error-lighter);
  color: var(--neutral-10);
}

.alert--lighter.alert--warning {
  background-color: var(--alert-warning-lighter);
  color: var(--neutral-10);
}

.alert--lighter.alert--success {
  background-color: var(--alert-success-lighter);
  color: var(--neutral-10);
}

.alert--lighter.alert--information {
  background-color: var(--alert-info-lighter);
  color: var(--neutral-10);
}

.alert--lighter.alert--feature {
  background-color: var(--alert-feature-lighter);
  color: var(--neutral-10);
}

.alert--stroke {
  box-shadow:
    0 4px 8px rgba(41, 41, 41, 0.06),
    0 2px 4px rgba(41, 41, 41, 0.04),
    0 1px 2px rgba(41, 41, 41, 0.04),
    0 0 0 1px rgba(41, 41, 41, 0.04),
    inset 0 -0.5px 0.5px rgba(41, 41, 41, 0.08);
}

/* Status variants for stroke */
.alert--stroke.alert--error {
  background-color: transparent;
  color: var(--neutral-10);
}

.alert--stroke.alert--warning {
  background-color: transparent;
  color: var(--neutral-10);
}

.alert--stroke.alert--success {
  background-color: transparent;
  color: var(--neutral-10);
}

.alert--stroke.alert--information {
  background-color: transparent;
  color: var(--neutral-10);
}

.alert--stroke.alert--feature {
  background-color: transparent;
  color: var(--neutral-10);
}

/* Icon colors for filled variants */
.alert--filled.alert--error .alert__icon {
  color: white;
}

.alert--filled.alert--warning .alert__icon {
  color: white;
}

.alert--filled.alert--success .alert__icon {
  color: white;
}

.alert--filled.alert--information .alert__icon {
  color: white;
}

.alert--filled.alert--feature .alert__icon {
  color: white;
}

/* Icon colors for light variants */
.alert--light.alert--error .alert__icon {
  color: var(--alert-error-bg);
}

.alert--light.alert--warning .alert__icon {
  color: var(--alert-warning-bg);
}

.alert--light.alert--success .alert__icon {
  color: var(--alert-success-bg);
}

.alert--light.alert--information .alert__icon {
  color: var(--alert-info-bg);
}

.alert--light.alert--feature .alert__icon {
  color: var(--alert-feature-bg);
}

/* Icon colors for lighter variants */
.alert--lighter.alert--error .alert__icon {
  color: var(--alert-error-bg);
}

.alert--lighter.alert--warning .alert__icon {
  color: var(--alert-warning-bg);
}

.alert--lighter.alert--success .alert__icon {
  color: var(--alert-success-bg);
}

.alert--lighter.alert--information .alert__icon {
  color: var(--alert-info-bg);
}

.alert--lighter.alert--feature .alert__icon {
  color: var(--alert-feature-bg);
}

/* Icon colors for stroke variants */
.alert--stroke.alert--error .alert__icon {
  color: var(--alert-error-bg);
}

.alert--stroke.alert--warning .alert__icon {
  color: var(--alert-warning-bg);
}

.alert--stroke.alert--success .alert__icon {
  color: var(--alert-success-bg);
}

.alert--stroke.alert--information .alert__icon {
  color: var(--alert-info-bg);
}

.alert--stroke.alert--feature .alert__icon {
  color: var(--alert-feature-bg);
}

/* Hover states for close button per variant */
.alert--filled .alert__close:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.alert--light .alert__close:hover,
.alert--lighter .alert__close:hover,
.alert--stroke .alert__close:hover {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  transition: all 0.2s ease;
}
</style>
