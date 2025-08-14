<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import debounce from 'lodash/debounce';
import { useAuth } from '@/composables/useAuth';

const { checkUser } = useAuth();

///////////////////////////////////////////////////////////////
// Email check
const EmailStatus = {
  UNDEFINED: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

const emailStatus = ref(EmailStatus.UNDEFINED);

// Create debounced email check function outside of watch
const debouncedEmailCheck = debounce(async (emailToCheck) => {
  try {
    if (!validateEmail()) {
      return;
    }
    emailStatus.value = EmailStatus.LOADING;
    const response = await checkUser({ email: emailToCheck });
    emailStatus.value = response ? EmailStatus.SUCCESS : EmailStatus.ERROR;
    emit('validation', response);
  } catch (error) {
    if (!validateEmail()) {
      return;
    }
    emailStatus.value = EmailStatus.ERROR;
    emit('validation', false);
  }
}, 500);

/////////////////////////////////////////////////////////////////

const { t } = useI18n();

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'validation']);

const inputValue = ref(props.modelValue);
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const errorStr = ref('');

const hasValue = computed(() => props.modelValue.length > 0);

const statusIcon = computed(() => {
  switch (emailStatus.value) {
    case 1: // LOADING
      return '/images/form/loading.svg';
    case 2: // SUCCESS
      return '/images/form/success.svg';
    case 3: // ERROR
      return '/images/form/error.svg';
    default:
      return '';
  }
});

const statusErrorMessage = computed(() => {
  if (emailStatus.value === 3) {
    return t('common.error.emailRegistered');
  }
  return '';
});

watch(statusErrorMessage, (newValue) => {
  if (newValue) {
    errorStr.value = newValue;
  }
});

const showStatusIcon = computed(
  () => emailStatus.value !== undefined && emailStatus.value !== 0,
);

const validateEmail = () => {
  const value = inputValue.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    errorStr.value = t('common.error.emailRequired');
    emailStatus.value = EmailStatus.UNDEFINED;
    return false;
  }
  if (!emailRegex.test(value)) {
    errorStr.value = t('common.error.emailInvalid');
    emailStatus.value = EmailStatus.UNDEFINED;
    return false;
  }
  return true;
};

const validateInput = () => {
  emit('validation', false);
  const result = validateEmail();
  if (result) {
    errorStr.value = '';
    debouncedEmailCheck(inputValue.value);
  }
};

const handleFocus = () => {
  isFocused.value = true;
  if (emailStatus.value === EmailStatus.UNDEFINED) {
    errorStr.value = '';
  }
};

const handleBlur = () => {
  isFocused.value = false;
  validateEmail();
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
        <span>{{ $t('common.form.email') }}</span>
      </label>

      <div class="input-container">
        <input
          ref="inputRef"
          v-model="inputValue"
          type="email"
          class="input-field input-field__font"
          :class="{
            'is-focused': isFocused,
            'has-error': errorStr,
          }"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <CPicture
          v-if="showStatusIcon"
          :src="statusIcon"
          class="status-icon"
          alt="status"
        />
      </div>
    </div>
    <span v-if="errorStr" class="error-message">{{ errorStr }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.status-icon {
  position: absolute;
  right: em(13);
  width: em(20);
  height: em(20);
  pointer-events: none;

  html[dir='rtl'] & {
    right: auto;
    left: em(13);
  }
}

.input-field {
  width: 100%;
  transition: all 0.2s ease;
  background: transparent;

  &__font {
    color: $color-black;
    font-size: em(18);
    font-weight: $font-weight-regular;

    @include media-breakpoint-down(sm) {
      font-size: em(16);
    }
  }
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

  span {
    font-size: em(18);
    font-weight: $font-weight-regular;
  }
}

.input-label.is-active {
  top: 0;
  left: em(4);
  transform: translateY(-50%) scale(0.67);
  color: $color-black;

  html[dir='rtl'] & {
    left: auto;
    right: em(4);
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
