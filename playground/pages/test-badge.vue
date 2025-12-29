<template>
  <div class="p-8 space-y-12 max-w-6xl mx-auto">
    <div>
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      <h1 class="text-4xl font-bold mb-2">UrBadge Test Page</h1>
      <p class="text-gray-600">Testing all Badge variants, sizes, and colors</p>
    </div>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Sizes</h2>
      <div class="flex items-center gap-4">
        <UrBadge size="small" color="blue">Small</UrBadge>
        <UrBadge size="medium" color="blue">Medium</UrBadge>
        <UrBadge size="large" color="blue">Large</UrBadge>
      </div>
    </section>

    <!-- Variants - Gray -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Variants - Gray</h2>
      <div class="flex items-center gap-4">
        <UrBadge variant="filled" color="gray">Filled</UrBadge>
        <UrBadge variant="light" color="gray">Light</UrBadge>
        <UrBadge variant="lighter" color="gray">Lighter</UrBadge>
        <UrBadge variant="stroke" color="gray">Stroke</UrBadge>
      </div>
    </section>

    <!-- All Colors - Filled -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">All Colors - Filled Variant</h2>
      <div class="flex flex-wrap gap-3">
        <UrBadge variant="filled" color="gray">Gray</UrBadge>
        <UrBadge variant="filled" color="blue">Blue</UrBadge>
        <UrBadge variant="filled" color="orange">Orange</UrBadge>
        <UrBadge variant="filled" color="red">Red</UrBadge>
        <UrBadge variant="filled" color="green">Green</UrBadge>
        <UrBadge variant="filled" color="yellow">Yellow</UrBadge>
        <UrBadge variant="filled" color="purple">Purple</UrBadge>
        <UrBadge variant="filled" color="sky">Sky</UrBadge>
        <UrBadge variant="filled" color="pink">Pink</UrBadge>
        <UrBadge variant="filled" color="teal">Teal</UrBadge>
      </div>
    </section>

    <!-- All Colors - Light -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">All Colors - Light Variant</h2>
      <div class="flex flex-wrap gap-3">
        <UrBadge variant="light" color="gray">Gray</UrBadge>
        <UrBadge variant="light" color="blue">Blue</UrBadge>
        <UrBadge variant="light" color="orange">Orange</UrBadge>
        <UrBadge variant="light" color="red">Red</UrBadge>
        <UrBadge variant="light" color="green">Green</UrBadge>
        <UrBadge variant="light" color="yellow">Yellow</UrBadge>
        <UrBadge variant="light" color="purple">Purple</UrBadge>
        <UrBadge variant="light" color="sky">Sky</UrBadge>
        <UrBadge variant="light" color="pink">Pink</UrBadge>
        <UrBadge variant="light" color="teal">Teal</UrBadge>
      </div>
    </section>

    <!-- All Colors - Lighter -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">All Colors - Lighter Variant</h2>
      <div class="flex flex-wrap gap-3">
        <UrBadge variant="lighter" color="gray">Gray</UrBadge>
        <UrBadge variant="lighter" color="blue">Blue</UrBadge>
        <UrBadge variant="lighter" color="orange">Orange</UrBadge>
        <UrBadge variant="lighter" color="red">Red</UrBadge>
        <UrBadge variant="lighter" color="green">Green</UrBadge>
        <UrBadge variant="lighter" color="yellow">Yellow</UrBadge>
        <UrBadge variant="lighter" color="purple">Purple</UrBadge>
        <UrBadge variant="lighter" color="sky">Sky</UrBadge>
        <UrBadge variant="lighter" color="pink">Pink</UrBadge>
        <UrBadge variant="lighter" color="teal">Teal</UrBadge>
      </div>
    </section>

    <!-- All Colors - Stroke -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">All Colors - Stroke Variant</h2>
      <div class="flex flex-wrap gap-3">
        <UrBadge variant="stroke" color="gray">Gray</UrBadge>
        <UrBadge variant="stroke" color="blue">Blue</UrBadge>
        <UrBadge variant="stroke" color="orange">Orange</UrBadge>
        <UrBadge variant="stroke" color="red">Red</UrBadge>
        <UrBadge variant="stroke" color="green">Green</UrBadge>
        <UrBadge variant="stroke" color="yellow">Yellow</UrBadge>
        <UrBadge variant="stroke" color="purple">Purple</UrBadge>
        <UrBadge variant="stroke" color="sky">Sky</UrBadge>
        <UrBadge variant="stroke" color="pink">Pink</UrBadge>
        <UrBadge variant="stroke" color="teal">Teal</UrBadge>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Common Use Cases</h2>

      <div class="space-y-3">
        <div>
          <h3 class="font-semibold mb-2">Status Indicators:</h3>
          <div class="flex gap-2">
            <UrBadge color="green" size="small">Active</UrBadge>
            <UrBadge color="yellow" size="small">Pending</UrBadge>
            <UrBadge color="red" size="small">Error</UrBadge>
            <UrBadge color="gray" size="small">Inactive</UrBadge>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Categories:</h3>
          <div class="flex gap-2">
            <UrBadge variant="light" color="blue" size="medium">Technology</UrBadge>
            <UrBadge variant="light" color="purple" size="medium">Design</UrBadge>
            <UrBadge variant="light" color="orange" size="medium">Business</UrBadge>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Counts:</h3>
          <div class="flex items-center gap-3">
            <span>Notifications <UrBadge color="red" size="small">12</UrBadge></span>
            <span>Messages <UrBadge color="blue" size="small">5</UrBadge></span>
            <span>Tasks <UrBadge color="green" size="small">3</UrBadge></span>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Tags:</h3>
          <div class="flex flex-wrap gap-2">
            <UrBadge variant="stroke" color="gray" size="small">Vue.js</UrBadge>
            <UrBadge variant="stroke" color="gray" size="small">Nuxt</UrBadge>
            <UrBadge variant="stroke" color="gray" size="small">TypeScript</UrBadge>
            <UrBadge variant="stroke" color="gray" size="small">Tailwind</UrBadge>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  color: #335cff;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #2347d9;
}

.space-y-12 > * + * {
  margin-top: 3rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style>
