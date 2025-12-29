<template>
  <div class="playground">
    <h1 class="heading">Urkit Component Library - MVP Test</h1>

    <section class="section">
      <h2>Button Components</h2>

      <div class="component-row">
        <UrButton label="Primary Button" variant="primary" radiusType="pill" />
        <UrButton label="Error Button" variant="error" />
        <UrButton label="Success Button" variant="success" />
        <UrButton label="Neutral Button" variant="neutral" />
      </div>

      <div class="component-row">
        <UrButton label="Small" size="sm" />
        <UrButton label="Medium" size="md" />
        <UrButton label="Large" size="lg" />
        <UrButton label="Extra Large" size="xlg" />
      </div>

      <div class="component-row">
        <UrButton label="Filled" mode="filled" />
        <UrButton label="Stroke" mode="stroke" />
        <UrButton label="Lighter" mode="lighter" />
        <UrButton label="Ghost" mode="ghost" />
      </div>

      <div class="component-row">
        <UrButton label="Loading" :loading="true" />
        <UrButton label="Disabled" :disabled="true" />
        <UrButton label="Rounded" :rounded="true" />
      </div>
    </section>

    <hr class="section-divider" />

    <section class="section">
      <h2>Input Components</h2>

      <form @submit.prevent>
        <div class="component-column">
          <UrInput label="Username" placeholder="Enter your username" v-model="username" icon="icons:loader-icon" />

          <UrInput label="Email" type="email" placeholder="Enter your email" v-model="email" />

          <UrInput
            label="Password"
            :password="true"
            placeholder="Enter your password"
            v-model="password"
            :show-password-requirements="true"
          />

          <UrInput label="Disabled Input" :disabled="true" placeholder="This is disabled" />

          <UrInput label="Input with Error" placeholder="This has an error" errors="This field is required" />
        </div>

        <div class="component-column">
          <UrInput label="Small Input" size="sm" placeholder="Small size" icon="icons:loader-icon" />

          <UrInput label="Medium Input" size="md" placeholder="Medium size" />

          <UrInput label="Large Input" size="lg" placeholder="Large size" />
        </div>
      </form>
    </section>

    <hr class="section-divider" />

    <section class="section">
      <h2>Form Values (Two-way Binding Test)</h2>
      <div class="values">
        <p><strong>Username:</strong> {{ username || '(empty)' }}</p>
        <p><strong>Email:</strong> {{ email || '(empty)' }}</p>
        <p><strong>Password:</strong> {{ password || '(empty)' }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
</script>

<style scoped>
.playground {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--neutral-12);
}

.component-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.component-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 400px;
  margin-bottom: 24px;
}

.values {
  background: var(--neutral-1);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--neutral-4);
}

.values p {
  margin: 8px 0;
  color: var(--neutral-12);
}
</style>
