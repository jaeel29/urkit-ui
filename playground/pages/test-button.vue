<template>
  <div class="test-page">
    <div class="header">
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      <h1>Button Component Test Page</h1>
    </div>

    <!-- All Variants -->
    <section>
      <h2>All Variants (primary, medium size)</h2>
      <div class="buttons-grid">
        <UrButton label="Filled" variant="primary" mode="filled" />
        <UrButton label="Stroke" variant="primary" mode="stroke" />
        <UrButton label="Lighter" variant="primary" mode="lighter" />
        <UrButton label="Ghost" variant="primary" mode="ghost" />
      </div>
    </section>

    <!-- All Variants (Error) -->
    <section>
      <h2>All Variants (error, medium size)</h2>
      <div class="buttons-grid">
        <UrButton label="Filled" variant="error" mode="filled" />
        <UrButton label="Stroke" variant="error" mode="stroke" />
        <UrButton label="Lighter" variant="error" mode="lighter" />
        <UrButton label="Ghost" variant="error" mode="ghost" />
      </div>
    </section>

    <!-- All Color Variants -->
    <section>
      <h2>All Color Variants (filled mode, medium size)</h2>
      <div class="buttons-grid">
        <UrButton label="Primary" variant="primary" />
        <UrButton label="Error" variant="error" />
        <UrButton label="Success" variant="success" />
        <UrButton label="Neutral" variant="neutral" />
      </div>
    </section>

    <!-- All Sizes -->
    <section>
      <h2>All Sizes (primary, filled)</h2>
      <div class="buttons-grid">
        <UrButton label="Small (sm)" size="sm" />
        <UrButton label="Medium (md)" size="md" />
        <UrButton label="Large (lg)" size="lg" />
        <UrButton label="Extra Large (xlg)" size="xlg" />
      </div>
    </section>

    <!-- Radius Types -->
    <section>
      <h2>Radius Types (primary, filled, medium)</h2>
      <div class="buttons-grid">
        <UrButton label="Default Radius" variant="primary" />
        <UrButton label="Pill Radius" variant="primary" radiusType="pill" />
        <UrButton label="Rounded" variant="primary" :rounded="true" />
      </div>
    </section>

    <!-- Button States -->
    <section>
      <h2>Button States (primary, filled, medium)</h2>
      <div class="buttons-grid">
        <UrButton label="Normal" variant="primary" />
        <UrButton label="Loading" variant="primary" :loading="true" />
        <UrButton label="Disabled" variant="primary" :disabled="true" />
      </div>
    </section>

    <!-- With Icons -->
    <section>
      <h2>With Icons (if supported)</h2>
      <div class="buttons-grid">
        <UrButton label="Button with Icon" variant="primary" />
        <UrButton label="Loading with Icon" variant="success" :loading="true" />
      </div>
    </section>

    <!-- Interactive Examples -->
    <section>
      <h2>Interactive Examples</h2>
      <div class="buttons-grid">
        <UrButton
          label="Click Me"
          variant="primary"
          @click="handleClick('Primary button')"
        />
        <UrButton
          label="Success Action"
          variant="success"
          @click="handleClick('Success button')"
        />
        <UrButton
          label="Delete"
          variant="error"
          @click="handleClick('Delete button')"
        />
      </div>
      <p v-if="lastClicked" class="feedback">Last clicked: {{ lastClicked }}</p>
    </section>

    <!-- Variant × Color Matrix -->
    <section>
      <h2>Mode × Variant Matrix (medium size)</h2>
      <div class="matrix">
        <div v-for="mode in modes" :key="mode" class="matrix-row">
          <h3>{{ mode }}</h3>
          <div class="buttons-grid">
            <UrButton
              v-for="variant in variants"
              :key="variant"
              :mode="mode"
              :variant="variant"
              :label="variant"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Real-world Use Cases -->
    <section>
      <h2>Real-world Use Cases</h2>

      <div class="use-case">
        <h3>Form Actions</h3>
        <div class="buttons-grid">
          <UrButton label="Cancel" variant="neutral" mode="stroke" />
          <UrButton label="Save Draft" variant="neutral" />
          <UrButton label="Submit" variant="primary" />
        </div>
      </div>

      <div class="use-case">
        <h3>Danger Zone</h3>
        <div class="buttons-grid">
          <UrButton label="Delete Account" variant="error" mode="stroke" />
          <UrButton label="Confirm Delete" variant="error" />
        </div>
      </div>

      <div class="use-case">
        <h3>Call to Action</h3>
        <div class="buttons-grid">
          <UrButton label="Get Started" variant="primary" size="lg" radiusType="pill" />
          <UrButton label="Learn More" variant="neutral" size="lg" mode="stroke" />
        </div>
      </div>

      <div class="use-case">
        <h3>Loading States</h3>
        <div class="buttons-grid">
          <UrButton label="Saving..." variant="primary" :loading="true" />
          <UrButton label="Processing..." variant="success" :loading="true" />
          <UrButton label="Deleting..." variant="error" :loading="true" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lastClicked = ref('')

const handleClick = (buttonName: string) => {
  lastClicked.value = buttonName
  console.log(`${buttonName} clicked`)
}

// Matrix data
const modes = ['filled', 'stroke', 'lighter', 'ghost']
const variants = ['primary', 'error', 'success', 'neutral']
</script>

<style scoped>
.test-page {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  margin-bottom: 40px;
}

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

h1 {
  font-size: 32px;
  color: #1a1a1a;
}

section {
  margin-bottom: 60px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e5e5;
}

h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #555;
  text-transform: capitalize;
}

.buttons-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.matrix-row {
  margin-bottom: 30px;
}

.use-case {
  margin-bottom: 30px;
}

.feedback {
  margin-top: 20px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  color: #0c4a6e;
  font-weight: 500;
}

@media (max-width: 768px) {
  .test-page {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
