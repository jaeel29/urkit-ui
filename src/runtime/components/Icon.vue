<template>
  <ClientOnly>
    <!-- SVG Mode: Renders the full SVG with size override -->
    <div v-if="iconContent" :class="iconClass" v-html="processedSvgContent" />

    <!-- Empty placeholder when no icon content -->
    <span v-else :style="{ width: iconStyle.width, height: iconStyle.height, display: 'inline-block' }"></span>

    <template #fallback>
      <!-- SSR placeholder - matches client placeholder exactly -->
      <span :style="{ width: iconStyle.width, height: iconStyle.height, display: 'inline-block' }"></span>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useIcon } from '../composables/useIcon'

interface Props {
  name: string
  size?: string | number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
})

const { loadIcon, getFallbackIcon, getViewBox } = useIcon()

// Reactive icon content
const iconContent = ref<string>('')

// Load icon on mount and when name changes
onMounted(async () => {
  await loadIconContent()
})

watch(
  () => props.name,
  async () => {
    await loadIconContent()
  }
)

const loadIconContent = async () => {
  try {
    iconContent.value = await loadIcon(props.name)
  } catch (error) {
    console.warn('Failed to load icon:', error)
    iconContent.value = getFallbackIcon()
  }
}

const iconClass = computed(() => {
  const classes = ['icon']
  if (props.class) {
    classes.push(props.class)
  }
  return classes.join(' ')
})

const iconStyle = computed(() => {
  const size =
    typeof props.size === 'number'
      ? `${props.size}px`
      : typeof props.size === 'string' && !props.size.includes('px')
        ? `${props.size}px`
        : props.size
  return {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

// Process SVG content with proper sizing for SVG mode
const processedSvgContent = computed(() => {
  if (!iconContent.value) return ''

  const size =
    typeof props.size === 'number'
      ? `${props.size}px`
      : typeof props.size === 'string' && !props.size.includes('px')
        ? `${props.size}px`
        : props.size
  const [namespace, iconName] = props.name.split(':')
  const viewBox = getViewBox(namespace, iconName)

  // Create a complete SVG with the inner content and proper sizing
  // Default to fill="none" for outlined icons
  return `<svg width="${size}" height="${size}" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${iconContent.value}</svg>`
})
</script>

<style scoped>
.icon {
  color: inherit;
  display: inline-block;
  line-height: 0; /* Prevents extra spacing around SVG */
}

.icon :deep(svg) {
  display: block;
  /* SVG controls its own sizing via width/height attributes */
}
</style>
