<template>
  <span :class="badgeClasses" class="badge">
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * Badge component for labels and status indicators
 * @component UrBadge
 */
interface BadgeProps {
  /** Badge visual style */
  variant?: 'filled' | 'light' | 'lighter' | 'stroke'
  /** Badge size */
  size?: 'small' | 'medium' | 'large'
  /** Badge color scheme */
  color?: 'gray' | 'blue' | 'orange' | 'red' | 'green' | 'yellow' | 'purple' | 'sky' | 'pink' | 'teal'
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'filled',
  size: 'small',
  color: 'gray',
})

const badgeClasses = computed(() => {
  const baseClasses = 'badge'
  const variantClass = `badge--${props.variant}`
  const sizeClass = `badge--${props.size}`
  const colorClass = `badge--${props.color}`

  return [baseClasses, variantClass, sizeClass, colorClass]
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  border-radius: 999px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.2s ease;
  letter-spacing: 0.025em;
  letter-spacing: -0.015px;
  text-transform: uppercase;
  border: 1px solid transparent;
}

/* Size variants */
.badge--small {
  padding: 2px 6px;
  font-size: 10px;
}

.badge--medium {
  padding: 4px 10px;
  font-size: 11px;
}

.badge--large {
  padding: 6px 14px;
  font-size: 12px;
}

/* Variant styles for Gray */
.badge--filled.badge--gray {
  background: #7b7b7b;
  color: white;
}

.badge--light.badge--gray {
  background: #f3f4f6;
  color: var(--neutral-7);
}

.badge--lighter.badge--gray {
  background: #f9fafb;
  color: #6b7280;
}

.badge--stroke.badge--gray {
  background: transparent;
  color: #6b7280;
  border-color: #d1d5db;
}

/* Variant styles for Blue */
.badge--filled.badge--blue {
  background: #335cff;
  color: white;
}

.badge--light.badge--blue {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge--lighter.badge--blue {
  background: #eff6ff;
  color: #1e40af;
}

.badge--stroke.badge--blue {
  background: transparent;
  color: #3b82f6;
  border-color: #93c5fd;
}

/* Variant styles for Orange */
.badge--filled.badge--orange {
  background: #fa731a;
  color: white;
}

.badge--light.badge--orange {
  background: #fff2e4;
  color: #ea580c;
}

.badge--lighter.badge--orange {
  background: #fff7ed;
  color: #c2410c;
}

.badge--stroke.badge--orange {
  background: transparent;
  color: #f97316;
  border-color: #fdba74;
}

/* Variant styles for Red */
.badge--filled.badge--red {
  background: #fb3748;
  color: white;
}

.badge--light.badge--red {
  background: #fecaca;
  color: #dc2626;
}

.badge--lighter.badge--red {
  background: #fef2f2;
  color: #b91c1c;
}

.badge--stroke.badge--red {
  background: transparent;
  color: #ef4444;
  border-color: #fca5a5;
}

/* Variant styles for Green */
.badge--filled.badge--green {
  background: #21c16b;
  color: white;
}

.badge--light.badge--green {
  background: #bbf7d0;
  color: #16a34a;
}

.badge--lighter.badge--green {
  background: #f0fdf4;
  color: #15803d;
}

.badge--stroke.badge--green {
  background: transparent;
  color: #22c55e;
  border-color: #86efac;
}

/* Variant styles for Yellow */
.badge--filled.badge--yellow {
  background: #f6b51e;
  color: white;
}

.badge--light.badge--yellow {
  background: #fef3c7;
  color: #d97706;
}

.badge--lighter.badge--yellow {
  background: #fffbeb;
  color: #b45309;
}

.badge--stroke.badge--yellow {
  background: transparent;
  color: #eab308;
  border-color: #fde047;
}

/* Variant styles for Purple */
.badge--filled.badge--purple {
  background: #7d52f4;
  color: white;
}

.badge--light.badge--purple {
  background: #e9d5ff;
  color: #9333ea;
}

.badge--lighter.badge--purple {
  background: #faf5ff;
  color: #7c3aed;
}

.badge--stroke.badge--purple {
  background: transparent;
  color: #a855f7;
  border-color: #c084fc;
}

/* Variant styles for Sky */
.badge--filled.badge--sky {
  background: #47c2ff;
  color: white;
}

.badge--light.badge--sky {
  background: #bae6fd;
  color: #0284c7;
}

.badge--lighter.badge--sky {
  background: #f0f9ff;
  color: #0369a1;
}

.badge--stroke.badge--sky {
  background: transparent;
  color: #0ea5e9;
  border-color: #7dd3fc;
}

/* Variant styles for Pink */
.badge--filled.badge--pink {
  background: #fb4ba3;
  color: white;
}

.badge--light.badge--pink {
  background: #fbcfe8;
  color: #db2777;
}

.badge--lighter.badge--pink {
  background: #fdf2f8;
  color: #be185d;
}

.badge--stroke.badge--pink {
  background: transparent;
  color: #ec4899;
  border-color: #f9a8d4;
}

/* Variant styles for Teal */
.badge--filled.badge--teal {
  background: #24d3ba;
  color: white;
}

.badge--light.badge--teal {
  background: #99f6e4;
  color: #0d9488;
}

.badge--lighter.badge--teal {
  background: #f0fdfa;
  color: #0f766e;
}

.badge--stroke.badge--teal {
  background: transparent;
  color: #14b8a6;
  border-color: #5eead4;
}

/* Hover effects */
.badge:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
