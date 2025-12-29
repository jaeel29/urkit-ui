<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
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
