<template>
  <div
    class="field-wrapper"
    :class="{ 'has-error': hasError, 'is-disabled': disabled }"
  >
    <!-- Label -->
    <label v-if="label" class="field-label" :for="inputId">
      {{ label }}
    </label>

    <!-- Input Container -->
    <div class="field-container" :class="inputContainerClasses">
      <!-- Left Icon -->
      <div
        v-if="icon && iconPosition === 'left'"
        class="field-icon field-icon--left"
        aria-hidden="true"
      >
        <Icon :name="iconName" :size="iconSize" mode="svg" />
      </div>

      <!-- Left Affix (outside input) -->
      <span
        v-if="affix && affixPosition === 'left'"
        class="field-affix field-affix--left"
      >
        {{ affix }}
      </span>

      <!-- Inline Left Affix (inside input) -->
      <span
        v-if="inlineAffix && inlineAffixPosition === 'left'"
        class="field-inline-affix field-inline-affix--left"
      >
        {{ inlineAffix }}
      </span>

      <!-- Input Field -->
      <input
        :id="inputId"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :value="modelValue"
        :class="inputClasses"
        :aria-describedby="ariaDescribedBy"
        :aria-invalid="hasError"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <!-- Inline Right Affix (inside input) -->
      <span
        v-if="inlineAffix && inlineAffixPosition === 'right'"
        class="field-inline-affix field-inline-affix--right"
      >
        {{ inlineAffix }}
      </span>

      <!-- Right Icon / Password Toggle -->
      <span
        v-if="showRightIcon"
        class="field-icon field-icon--right"
        aria-hidden="true"
      >
        <Icon
          v-if="password && !customRightIcon"
          :name="passwordVisible ? 'icons:hide' : 'icons:show'"
          :size="iconSize"
          class="password-toggle"
          @click="togglePasswordVisibility"
          alt=""
        />
        <Icon
          v-else-if="icon && iconPosition === 'right'"
          :name="iconName"
          :size="iconSize"
        />
      </span>

      <!-- Right Affix (outside input) -->
      <span
        v-if="affix && affixPosition === 'right'"
        class="field-affix field-affix--right"
      >
        {{ affix }}
      </span>

      <!-- Select Dropdown -->
      <div v-if="withSelect" class="field-select-container">
        <button
          type="button"
          class="field-select-trigger"
          :class="{ 'field-select-trigger--open': selectOpen }"
          @click="toggleSelect"
        >
          <div class="field-select-value">
            <img
              v-if="selectedOptionData?.flag"
              :src="selectedOptionData.flag"
              :alt="selectedOptionData.label"
              class="select-option-flag"
            />
            <Icon
              v-else-if="selectedOptionData?.icon"
              :name="selectedOptionData.icon"
              size="16"
              class="select-option-icon"
            />
            <span>{{ selectedOptionData?.label || selectPlaceholder }}</span>
          </div>
          <Icon
            name="icons:arrow-down"
            size="14"
            mode="svg"
            class="field-select-chevron"
          />
        </button>

        <div v-if="selectOpen" class="field-select-dropdown">
          <div
            v-for="option in selectOptions"
            :key="option.value"
            class="field-select-option"
            :class="{
              'field-select-option--selected': option.value === selectedOption,
            }"
            @click="selectOption(option)"
          >
            <img
              v-if="option.flag"
              :src="option.flag"
              :alt="option.label"
              class="select-option-flag"
            />
            <Icon
              v-else-if="option.icon"
              :name="option.icon"
              size="16"
              class="select-option-icon"
            />
            <span>{{ option.label }}</span>
            <!-- <Icon v-if="option.value === selectedOption" name="heroicons:check" size="16" class="select-option-check" /> -->
          </div>
        </div>
      </div>

      <!-- Button -->
      <Button
        v-if="withButton"
        :label="buttonLabel"
        :variant="buttonVariant"
        :size="buttonSize"
        :disabled="buttonDisabled"
        :loading="buttonLoading"
        :radiusType="props.radiusType"
        class="field-button"
        @click="handleButtonClick"
      />
    </div>

    <!-- Hint -->
    <p v-if="hint && !hasError" class="field-hint">
      {{ hint }}
    </p>

    <!-- Password Requirements -->
    <div
      v-if="password && showPasswordRequirements"
      class="password-requirements"
    >
      <!-- Progress Indicators -->
      <div class="password-progress">
        <div class="progress-bar" :class="getProgressBarColor(0)"></div>
        <div class="progress-bar" :class="getProgressBarColor(1)"></div>
        <div class="progress-bar" :class="getProgressBarColor(2)"></div>
      </div>
      <p class="requirements-title">Must contain at least;</p>
      <div class="requirements-list">
        <div
          class="requirement-item"
          :class="{ 'requirement-met': hasUppercase }"
        >
          <Icon
            :name="hasUppercase ? 'icons:show' : 'icons:hide'"
            size="16"
            :class="
              hasUppercase
                ? 'requirement-icon--success'
                : 'requirement-icon--error'
            "
          />
          <span>At least 1 uppercase</span>
        </div>
        <div class="requirement-item" :class="{ 'requirement-met': hasNumber }">
          <Icon
            :name="hasNumber ? 'icons:show' : 'icons:hide'"
            size="16"
            :class="
              hasNumber
                ? 'requirement-icon--success'
                : 'requirement-icon--error'
            "
          />
          <span>At least 1 number</span>
        </div>
        <div
          class="requirement-item"
          :class="{ 'requirement-met': hasMinLength }"
        >
          <Icon
            :name="hasMinLength ? 'icons:show' : 'icons:show'"
            size="16"
            :class="hasMinLength ? 'icons:show' : 'icons:hide'"
          />
          <span>At least 8 characters</span>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="hasError" class="field-errors">
      <p v-for="error in errorMessages" :key="error" class="field-error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, useId } from "vue";
import Button from "./Button.vue";
import Icon from "./Icon.vue";

/**
 * Input size types
 */
type InputSize = "sm" | "md" | "lg";

/**
 * Icon position types
 */
type IconPosition = "left" | "right";

/**
 * Affix position types
 */
type AffixPosition = "left" | "right";

/**
 * Button variant types
 */
type ButtonVariant = "primary" | "error" | "success" | "neutral";

/**
 * Button size types
 */
type ButtonSize = "sm" | "md" | "lg" | "xlg";

/**
 * Select option interface
 */
interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  flag?: string;
}

/**
 * Input component props interface
 */
interface InputProps {
  /** Input value (v-model) */
  modelValue?: string | number;
  /** Input type */
  type?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input label */
  label?: string;
  /** Input size */
  size?: InputSize;
  /** Icon name */
  icon?: string;
  /** Icon position */
  iconPosition?: IconPosition;
  /** External affix text */
  affix?: string;
  /** Affix position */
  affixPosition?: AffixPosition;
  /** Inline affix text (inside input) */
  inlineAffix?: string;
  /** Inline affix position */
  inlineAffixPosition?: AffixPosition;
  /** Whether input is password type */
  password?: boolean;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is readonly */
  readonly?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Error messages */
  errors?: string | string[];
  /** Hint text */
  hint?: string;
  /** Whether to show button */
  withButton?: boolean;
  /** Button label */
  buttonLabel?: string;
  /** Button variant */
  buttonVariant?: ButtonVariant;
  /** Button size */
  buttonSize?: ButtonSize;
  /** Button disabled state */
  buttonDisabled?: boolean;
  /** Button loading state */
  buttonLoading?: boolean;
  /** Show password requirements validation */
  showPasswordRequirements?: boolean;
  /** Whether to show select dropdown */
  withSelect?: boolean;
  /** Select options */
  selectOptions?: SelectOption[];
  /** Selected option value */
  selectedOption?: string | number;
  /** Select placeholder */
  selectPlaceholder?: string;
  /** Radius type with standard values */
  radiusType?: "none" | "soft" | "medium" | "pill";
}

// ============================================================================
// COMPONENT SETUP
// ============================================================================

/**
 * Component props with defaults
 */
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  placeholder: "",
  size: "lg",
  iconPosition: "left",
  affixPosition: "left",
  inlineAffixPosition: "left",
  password: false,
  disabled: false,
  readonly: false,
  required: false,
  errors: () => [],
  buttonVariant: "primary",
  buttonSize: "md",
  buttonDisabled: false,
  buttonLoading: false,
  showPasswordRequirements: false,
  withSelect: false,
  selectOptions: () => [],
  selectPlaceholder: "Select...",
  radiusType: "soft",
});

/**
 * Component events
 */
const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  "button-click": [event: MouseEvent];
  "update:selectedOption": [value: string | number];
}>();

// ============================================================================
// REACTIVE STATE
// ============================================================================

const passwordVisible = ref(false);
const isFocused = ref(false);
const selectOpen = ref(false);
const inputId = useId();

// ============================================================================
// COMPUTED PROPERTIES
// ============================================================================

/**
 * Determine actual input type
 */
const inputType = computed((): string => {
  if (props.password) {
    return passwordVisible.value ? "text" : "password";
  }
  return props.type;
});

/**
 * Process error messages
 */
const errorMessages = computed((): string[] => {
  if (!props.errors) return [];
  return Array.isArray(props.errors) ? props.errors : [props.errors];
});

/**
 * Check if input has errors
 */
const hasError = computed((): boolean => {
  return errorMessages.value.length > 0;
});

/**
 * Generate icon name with collection prefix
 */
const iconName = computed((): string => {
  if (!props.icon) return "";
  return props.icon.includes(":") ? props.icon : `icons:${props.icon}`;
});

/**
 * Get icon size based on input size
 */
const iconSize = computed((): string => {
  const sizeMap = {
    sm: "18",
    md: "18",
    lg: "18",
  };
  return sizeMap[props.size];
});

/**
 * Check if right icon should be shown
 */
const showRightIcon = computed((): boolean => {
  return Boolean(
    props.password || (props.icon && props.iconPosition === "right")
  );
});

/**
 * Check if custom right icon (not password toggle)
 */
const customRightIcon = computed((): boolean => {
  return Boolean(
    !props.password && props.icon && props.iconPosition === "right"
  );
});

/**
 * Generate input container classes
 */
const inputContainerClasses = computed(() => {
  return [
    "field-container--base",
    `field-container--${props.size}`,
    `field-container--radius-${props.radiusType}`,
    {
      "field-container--error": hasError.value,
      "field-container--disabled": props.disabled,
      "field-container--focused": isFocused.value,
      "field-container--with-left-icon":
        props.icon && props.iconPosition === "left",
      "field-container--with-right-icon": showRightIcon.value,
      "field-container--with-left-affix":
        props.affix && props.affixPosition === "left",
      "field-container--with-right-affix":
        props.affix && props.affixPosition === "right",
      "field-container--with-button": props.withButton,
    },
  ];
});

/**
 * Generate input field classes
 */
const inputClasses = computed(() => {
  return [
    "field-input",
    `field-input--${props.size}`,
    {
      "field-input--with-inline-left-affix":
        props.inlineAffix && props.inlineAffixPosition === "left",
      "field-input--with-inline-right-affix":
        props.inlineAffix && props.inlineAffixPosition === "right",
    },
  ];
});

/**
 * Generate ARIA describedby
 */
const ariaDescribedBy = computed((): string => {
  const ids = [];
  if (props.hint && !hasError.value) ids.push(`${inputId}-hint`);
  if (hasError.value) ids.push(`${inputId}-error`);
  return ids.join(" ");
});

/**
 * Check if password has uppercase letter
 */
const hasUppercase = computed((): boolean => {
  if (!props.password || !props.modelValue) return false;
  return /[A-Z]/.test(String(props.modelValue));
});

/**
 * Check if password has number
 */
const hasNumber = computed((): boolean => {
  if (!props.password || !props.modelValue) return false;
  return /[0-9]/.test(String(props.modelValue));
});

/**
 * Check if password meets minimum length
 */
const hasMinLength = computed((): boolean => {
  if (!props.password || !props.modelValue) return false;
  return String(props.modelValue).length >= 8;
});

/**
 * Count how many requirements are met
 */
const requirementsMet = computed((): number => {
  let count = 0;
  if (hasMinLength.value) count++;
  if (hasNumber.value) count++;
  if (hasUppercase.value) count++;
  return count;
});

/**
 * Get progress bar color based on requirements met
 */
const getProgressBarColor = (index: number): string => {
  if (index >= requirementsMet.value) return "progress-bar--inactive";

  switch (requirementsMet.value) {
    case 1:
      return "progress-bar--weak";
    case 2:
      return "progress-bar--medium";
    case 3:
      return "progress-bar--strong";
    default:
      return "progress-bar--inactive";
  }
};

/**
 * Get selected option data
 */
const selectedOptionData = computed(() => {
  return props.selectOptions?.find(
    (option) => option.value === props.selectedOption
  );
});

// ============================================================================
// METHODS
// ============================================================================

/**
 * Handle input events
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

/**
 * Handle focus events
 */
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit("focus", event);
};

/**
 * Handle blur events
 */
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit("blur", event);
};

/**
 * Handle keydown events
 */
const handleKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);
};

/**
 * Toggle password visibility
 */
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

/**
 * Handle button click
 */
const handleButtonClick = (event: MouseEvent) => {
  emit("button-click", event);
};

/**
 * Toggle select dropdown
 */
const toggleSelect = () => {
  selectOpen.value = !selectOpen.value;
};

/**
 * Select an option
 */
const selectOption = (option: SelectOption) => {
  emit("update:selectedOption", option.value);
  selectOpen.value = false;
};
</script>
