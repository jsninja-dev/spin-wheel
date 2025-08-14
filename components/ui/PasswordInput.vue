<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  modelValue: string;
  showPasswordToggle?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showPasswordToggle: true,
  placeholder: '',
});

const emit = defineEmits(['update:modelValue', 'validation']);

const inputValue = ref(props.modelValue);
const isFocused = ref(false);
const showPassword = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const errorStr = ref('');

const hasValue = computed(() => props.modelValue.length > 0);

// Password validation with comprehensive standards
const validatePassword = (value) => {
  if (!value) return t('common.error.passwordRequired');

  // Check minimum length (8 characters is standard)
  if (value.length < 8) return t('common.error.passwordTooShort');

  // Check maximum length (reasonable limit)
  if (value.length > 128) return t('common.error.passwordTooLong');

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(value)) return t('common.error.passwordNoUppercase');

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(value)) return t('common.error.passwordNoLowercase');

  // Check for at least one number
  if (!/\d/.test(value)) return t('common.error.passwordNoNumber');

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value))
    return t('common.error.passwordNoSpecialChar');

  return true;
};

const validateInput = () => {
  const result = validatePassword(inputValue.value);
  if (typeof result === 'string') {
    errorStr.value = result;
    emit('validation', false);
  } else {
    errorStr.value = '';
    emit('validation', true);
  }
};

const handleFocus = () => {
  isFocused.value = true;
  errorStr.value = '';
};

const handleBlur = () => {
  isFocused.value = false;
  validateInput();
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
  // Focus back to input after toggle
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
};

watch(inputValue, (value) => {
  emit('update:modelValue', value);
  validateInput();
});
</script>

<template>
  <div>
    <div class="input-wrapper">
      <label
        class="input-label"
        :class="{ 'is-active': isFocused || hasValue }"
      >
        <span class="input-label__font">{{ $t('common.form.password') }}</span>
      </label>

      <div class="password-input-container">
        <input
          ref="inputRef"
          :type="showPassword ? 'text' : 'password'"
          v-model="inputValue"
          class="input-field input-field__font"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          :class="{
            'is-focused': isFocused,
            'has-error': errorStr,
          }"
        />

        <button
          v-if="showPasswordToggle"
          type="button"
          class="password-toggle"
          @click="togglePasswordVisibility"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
        >
          <img
            v-if="showPassword"
            src="/images/form/eye-hide.svg"
            class="password-icon"
            alt="Show password"
          />
          <img
            v-else
            src="/images/form/eye-show.svg"
            class="password-icon"
            alt="Hide password"
          />
        </button>
      </div>
    </div>
    <span v-if="errorStr" class="error-message">{{ errorStr }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  transition: all 0.2s ease;
  padding-right: em(40);

  html[dir='rtl'] & {
    padding-right: em(14);
    padding-left: em(40);
  }

  &__font {
    color: $color-black;
    font-size: em(18);
    font-weight: $font-weight-regular;

    @include media-breakpoint-down(sm) {
      font-size: em(16);
    }
  }
}

.password-toggle {
  position: absolute;
  right: em(10);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: em(4);
  color: $color-grey-500;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: $color-black;
  }

  &:focus {
    outline: none;
    color: #3b82f6;
  }

  html[dir='rtl'] & {
    right: auto;
    left: em(10);
  }
}

.password-icon {
  width: em(20);
  height: em(20);
}

.input-wrapper .has-error {
  border-color: $color-red-700 !important;
}

.input-wrapper .is-focused {
  border-color: #3b82f6;
}

.input-label {
  position: absolute;
  left: em(13);
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  pointer-events: none;
  background: white;
  padding: 0 em(4);
  color: $color-grey-500;
  z-index: 1;

  html[dir='rtl'] & {
    left: auto;
    right: em(13);
  }

  &__font {
    font-size: em(18);
    font-weight: $font-weight-regular;
  }
}

.input-label.is-active {
  top: 0;
  left: 0;
  transform: translateY(-50%) scale(0.67);
  color: $color-black;

  html[dir='rtl'] & {
    left: auto;
    right: 0;
  }
}

.error-message {
  color: $color-red-700;
  font-size: em(14);

  @include media-breakpoint-down(sm) {
    font-size: em(14);
  }
}
</style>
