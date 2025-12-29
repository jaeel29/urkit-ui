<template>
  <div class="test-page">
    <div class="header">
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      <h1>Alert Component Test Page</h1>
    </div>

    <!-- Basic Alerts - All Statuses -->
    <section>
      <h2>All Statuses (filled variant, small size)</h2>
      <div class="alerts-grid">
        <UrAlert
          status="error"
          title="Error Alert"
          description="This is an error alert message."
        />
        <UrAlert
          status="warning"
          title="Warning Alert"
          description="This is a warning alert message."
        />
        <UrAlert
          status="success"
          title="Success Alert"
          description="This is a success alert message."
        />
        <UrAlert
          status="information"
          title="Information Alert"
          description="This is an information alert message."
        />
        <UrAlert
          status="feature"
          title="Feature Alert"
          description="This is a feature announcement alert."
        />
      </div>
    </section>

    <!-- All Variants -->
    <section>
      <h2>All Variants (success status, small size)</h2>
      <div class="alerts-grid">
        <UrAlert
          variant="filled"
          status="success"
          title="Filled Variant"
          description="This is a filled variant alert."
        />
        <UrAlert
          variant="light"
          status="success"
          title="Light Variant"
          description="This is a light variant alert."
        />
        <UrAlert
          variant="lighter"
          status="success"
          title="Lighter Variant"
          description="This is a lighter variant alert."
        />
        <UrAlert
          variant="stroke"
          status="success"
          title="Stroke Variant"
          description="This is a stroke variant alert."
        />
      </div>
    </section>

    <!-- All Sizes -->
    <section>
      <h2>All Sizes (information status, filled variant)</h2>
      <div class="alerts-grid">
        <UrAlert
          size="xsmall"
          status="information"
          title="Extra Small Alert"
          description="This is an extra small alert with description."
        />
        <UrAlert
          size="small"
          status="information"
          title="Small Alert"
          description="This is a small alert with description."
        />
        <UrAlert
          size="large"
          status="information"
          title="Large Alert"
          description="This is a large alert with description."
        />
      </div>
    </section>

    <!-- Without Description -->
    <section>
      <h2>Without Description (compact layout)</h2>
      <div class="alerts-grid">
        <UrAlert
          status="error"
          title="Error without description"
        />
        <UrAlert
          status="warning"
          title="Warning without description"
        />
        <UrAlert
          status="success"
          title="Success without description"
        />
      </div>
    </section>

    <!-- With Actions (no description) -->
    <section>
      <h2>With Actions (no description)</h2>
      <div class="alerts-grid">
        <UrAlert
          status="warning"
          title="Free tier limitation"
          :show-learn-more="true"
          :show-upgrade="true"
        />
        <UrAlert
          status="feature"
          title="New feature available"
          :show-learn-more="true"
          :show-upgrade="false"
        />
      </div>
    </section>

    <!-- With Actions (with description) -->
    <section>
      <h2>With Actions (with description - footer layout)</h2>
      <div class="alerts-grid">
        <UrAlert
          status="warning"
          title="Storage Limit Reached"
          description="You've used 95% of your storage quota. Upgrade to continue uploading files."
          :show-learn-more="true"
          :show-upgrade="true"
        />
        <UrAlert
          status="feature"
          title="Introducing Dark Mode"
          description="Experience a new look with our dark mode feature. Try it now in settings."
          :show-learn-more="true"
          :show-upgrade="false"
        />
      </div>
    </section>

    <!-- Dismissable Alerts -->
    <section>
      <h2>Dismissable Alerts</h2>
      <div class="alerts-grid">
        <UrAlert
          v-if="showAlert1"
          status="success"
          title="Dismissable Success"
          description="Click the X to dismiss this alert."
          :dismissable="true"
          @dismiss="showAlert1 = false"
        />
        <UrAlert
          v-if="showAlert2"
          status="information"
          title="Dismissable Info"
          :dismissable="true"
          @dismiss="showAlert2 = false"
        />
        <button v-if="!showAlert1 || !showAlert2" @click="resetAlerts" class="reset-btn">
          Reset Dismissed Alerts
        </button>
      </div>
    </section>

    <!-- Custom Slots -->
    <section>
      <h2>Custom Slots</h2>
      <div class="alerts-grid">
        <UrAlert status="warning" variant="light">
          <template #title>
            <strong>Custom Title Slot</strong>
          </template>
          <template #description>
            <em>Custom description with HTML content</em>
          </template>
        </UrAlert>

        <UrAlert
          status="feature"
          variant="lighter"
          title="Custom Actions"
          description="This alert has custom action buttons."
        >
          <template #footer-actions>
            <button @click="handleCustomAction" class="custom-action">
              Custom Action
            </button>
          </template>
        </UrAlert>
      </div>
    </section>

    <!-- Real-world Examples -->
    <section>
      <h2>Real-world Use Cases</h2>
      <div class="alerts-grid">
        <!-- Form Validation Error -->
        <UrAlert
          status="error"
          size="small"
          variant="light"
          title="Form Validation Failed"
          description="Please fix the following errors: Email format is invalid, Password must be at least 8 characters."
          :dismissable="true"
          @dismiss="() => {}"
        />

        <!-- API Success -->
        <UrAlert
          status="success"
          size="small"
          variant="filled"
          title="Changes Saved"
          description="Your profile has been updated successfully."
          :dismissable="true"
          @dismiss="() => {}"
        />

        <!-- System Maintenance -->
        <UrAlert
          status="warning"
          size="large"
          variant="stroke"
          title="Scheduled Maintenance"
          description="The system will be unavailable on Saturday, 2:00 AM - 4:00 AM UTC for scheduled maintenance."
          :show-learn-more="true"
          :show-upgrade="false"
        />

        <!-- Feature Announcement -->
        <UrAlert
          status="feature"
          size="large"
          variant="lighter"
          title="New Dashboard Available"
          description="We've redesigned the dashboard with improved analytics and customization options."
          :show-learn-more="true"
          :show-upgrade="false"
        />

        <!-- Account Upgrade Prompt -->
        <UrAlert
          status="information"
          size="small"
          variant="light"
          title="Unlock Premium Features"
          description="Upgrade to Pro for unlimited storage, advanced analytics, and priority support."
          :show-learn-more="true"
          :show-upgrade="true"
        />
      </div>
    </section>

    <!-- All Combinations Matrix -->
    <section>
      <h2>Variant × Status Matrix (small size, no description)</h2>
      <div class="matrix">
        <div v-for="variant in variants" :key="variant" class="matrix-row">
          <h3>{{ variant }}</h3>
          <div class="alerts-grid">
            <UrAlert
              v-for="status in statuses"
              :key="status"
              :variant="variant"
              :status="status"
              :title="`${status} - ${variant}`"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Dismissable alerts state
const showAlert1 = ref(true)
const showAlert2 = ref(true)

const resetAlerts = () => {
  showAlert1.value = true
  showAlert2.value = true
}

const handleCustomAction = () => {
  alert('Custom action clicked!')
}

// Matrix data
const variants = ['filled', 'light', 'lighter', 'stroke'] as const
const statuses = ['error', 'warning', 'success', 'information', 'feature'] as const
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

.alerts-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

.matrix-row {
  margin-bottom: 30px;
}

.reset-btn,
.custom-action {
  padding: 10px 20px;
  background: #335cff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.reset-btn:hover,
.custom-action:hover {
  background: #2347d9;
}

.custom-action {
  background: #7d52f4;
}

.custom-action:hover {
  background: #6941d9;
}

@media (min-width: 768px) {
  .alerts-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1024px) {
  .alerts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
