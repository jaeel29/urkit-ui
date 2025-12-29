<template>
  <div class="playground">
    <h1 class="heading">Urkit Component Library - MVP Test</h1>

    <!-- Component Navigation -->
    <nav class="component-nav">
      <h2>Component Test Pages</h2>
      <div class="nav-links">
        <NuxtLink to="/test-button" class="nav-link">
          <span class="nav-icon">🔘</span>
          Button Component
        </NuxtLink>
        <NuxtLink to="/test-input" class="nav-link">
          <span class="nav-icon">📝</span>
          Input Component
        </NuxtLink>
        <NuxtLink to="/test-alert" class="nav-link">
          <span class="nav-icon">🔔</span>
          Alert Component
        </NuxtLink>
        <NuxtLink to="/test-badge" class="nav-link">
          <span class="nav-icon">🏷️</span>
          Badge Component
        </NuxtLink>
      </div>
    </nav>
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

/* Component Navigation Styles */
.component-nav {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.component-nav h2 {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  text-align: center;
}

.nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.nav-link:hover {
  transform: translateY(-2px);
  background: white;
  border: 1px solid #c1c1c1;
}

.nav-icon {
  font-size: 1.5rem;
}

/* Section Styles */
.section {
  margin-bottom: 2rem;
}

.section h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.section-divider {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid #e0e0e0;
}

.component-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.component-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.values {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}

.values p {
  margin: 0.5rem 0;
}
</style>
