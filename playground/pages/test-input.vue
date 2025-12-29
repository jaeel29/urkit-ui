<template>
  <div class="test-page">
    <div class="header">
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      <h1>Input Component Test Page</h1>
    </div>

    <!-- All Sizes -->
    <section>
      <h2>All Sizes</h2>
      <div class="inputs-grid">
        <UrInput
          label="Small Input"
          size="sm"
          placeholder="Small size input"
          v-model="testValues.small"
          icon="icons:search"
        />
        <UrInput
          label="Medium Input"
          size="md"
          placeholder="Medium size input (default)"
          v-model="testValues.medium"
        />
        <UrInput
          label="Large Input"
          size="lg"
          placeholder="Large size input"
          v-model="testValues.large"
        />
      </div>
    </section>

    <!-- Input Types -->
    <section>
      <h2>Input Types</h2>
      <div class="inputs-grid">
        <UrInput
          label="Text Input"
          type="text"
          placeholder="Enter text"
          v-model="testValues.text"
        />
        <UrInput
          label="Email Input"
          type="email"
          placeholder="Enter email address"
          v-model="testValues.email"
        />
        <UrInput
          label="Number Input"
          type="number"
          placeholder="Enter number"
          v-model="testValues.number"
        />
        <UrInput
          label="URL Input"
          type="url"
          placeholder="Enter URL"
          v-model="testValues.url"
        />
        <UrInput
          label="Tel Input"
          type="tel"
          placeholder="Enter phone number"
          v-model="testValues.tel"
        />
      </div>
    </section>

    <!-- Password Input -->
    <section>
      <h2>Password Input</h2>
      <div class="inputs-grid">
        <UrInput
          label="Password (basic)"
          :password="true"
          placeholder="Enter password"
          v-model="testValues.password1"
        />
        <UrInput
          label="Password with Requirements"
          :password="true"
          :show-password-requirements="true"
          placeholder="Enter password"
          v-model="testValues.password2"
        />
      </div>
    </section>

    <!-- Input States -->
    <section>
      <h2>Input States</h2>
      <div class="inputs-grid">
        <UrInput
          label="Normal Input"
          placeholder="Normal state"
          v-model="testValues.normal"
        />
        <UrInput
          label="Disabled Input"
          :disabled="true"
          placeholder="This input is disabled"
          v-model="testValues.disabled"
        />
        <UrInput
          label="Input with Error"
          placeholder="This has an error"
          errors="This field is required"
          v-model="testValues.error"
        />
        <UrInput
          label="Input with Multiple Errors"
          placeholder="Multiple validation errors"
          :errors="[
            'Field is required',
            'Must be at least 8 characters',
            'Must contain a number',
          ]"
          v-model="testValues.multiError"
        />
      </div>
    </section>

    <!-- With Icons -->
    <section>
      <h2>With Icons (if supported)</h2>
      <div class="inputs-grid">
        <UrInput
          label="Search Input"
          placeholder="Search..."
          icon="icons:search"
          v-model="testValues.search"
        />
        <UrInput
          label="Email with Icon"
          type="email"
          placeholder="your@email.com"
          icon="icons:show"
          v-model="testValues.emailIcon"
        />
        <UrInput
          label="Username with Icon"
          placeholder="Enter username"
          icon="icons:hide"
          v-model="testValues.username"
        />
      </div>
    </section>

    <!-- With Helper Text -->
    <section>
      <h2>With Helper Text (if supported)</h2>
      <div class="inputs-grid">
        <UrInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          helper="We'll never share your email with anyone"
          v-model="testValues.helperEmail"
        />
        <UrInput
          label="Username"
          placeholder="Choose a username"
          helper="Must be 3-20 characters, alphanumeric only"
          v-model="testValues.helperUsername"
        />
      </div>
    </section>

    <!-- Real-world Use Cases -->
    <section>
      <h2>Real-world Use Cases</h2>

      <div class="use-case">
        <h3>Login Form</h3>
        <div class="inputs-grid">
          <UrInput
            label="Email or Username"
            placeholder="Enter your email or username"
            v-model="forms.login.username"
          />
          <UrInput
            label="Password"
            :password="true"
            placeholder="Enter your password"
            v-model="forms.login.password"
          />
        </div>
      </div>

      <div class="use-case">
        <h3>Registration Form</h3>
        <div class="inputs-grid">
          <UrInput
            label="Full Name"
            placeholder="John Doe"
            v-model="forms.register.name"
          />
          <UrInput
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            v-model="forms.register.email"
          />
          <UrInput
            label="Password"
            :password="true"
            :show-password-requirements="true"
            placeholder="Create a strong password"
            v-model="forms.register.password"
          />
          <UrInput
            label="Confirm Password"
            :password="true"
            placeholder="Re-enter your password"
            v-model="forms.register.confirmPassword"
          />
        </div>
      </div>

      <div class="use-case">
        <h3>Contact Form</h3>
        <div class="inputs-grid">
          <UrInput
            label="Name"
            placeholder="Your name"
            v-model="forms.contact.name"
          />
          <UrInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            v-model="forms.contact.email"
          />
          <UrInput
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            v-model="forms.contact.phone"
          />
          <UrInput
            label="Company"
            placeholder="Your company name (optional)"
            v-model="forms.contact.company"
          />
        </div>
      </div>

      <div class="use-case">
        <h3>Payment Information</h3>
        <div class="inputs-grid">
          <UrInput
            label="Cardholder Name"
            placeholder="Name on card"
            v-model="forms.payment.name"
          />
          <UrInput
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            v-model="forms.payment.cardNumber"
          />
          <div class="input-row">
            <UrInput
              label="Expiry Date"
              placeholder="MM/YY"
              v-model="forms.payment.expiry"
            />
            <UrInput
              label="CVV"
              type="password"
              placeholder="123"
              v-model="forms.payment.cvv"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Form Values Display -->
    <section>
      <h2>Current Input Values</h2>
      <div class="values-display">
        <div class="value-group">
          <h4>Test Values:</h4>
          <pre>{{ JSON.stringify(testValues, null, 2) }}</pre>
        </div>
        <div class="value-group">
          <h4>Login Form:</h4>
          <pre>{{ JSON.stringify(forms.login, null, 2) }}</pre>
        </div>
        <div class="value-group">
          <h4>Register Form:</h4>
          <pre>{{ JSON.stringify(forms.register, null, 2) }}</pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const testValues = reactive({
  small: "",
  medium: "",
  large: "",
  text: "",
  email: "",
  number: "",
  url: "",
  tel: "",
  password1: "",
  password2: "",
  normal: "",
  disabled: "Cannot edit",
  error: "",
  multiError: "",
  search: "",
  emailIcon: "",
  username: "",
  helperEmail: "",
  helperUsername: "",
});

const forms = reactive({
  login: {
    username: "",
    password: "",
  },
  register: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  contact: {
    name: "",
    email: "",
    phone: "",
    company: "",
  },
  payment: {
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  },
});
</script>

<style scoped>
.test-page {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
}

h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
  font-weight: 600;
}

.inputs-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

.input-row {
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
}

.use-case {
  margin-bottom: 40px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
}

.values-display {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.value-group {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.value-group pre {
  margin: 0;
  font-size: 12px;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (min-width: 768px) {
  .inputs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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

  .input-row {
    grid-template-columns: 1fr;
  }
}
</style>
