<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  modelValue: string;
  placeholder?: string;
  label?: string;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'common.form.comment',
  rows: 4,
});

const emit = defineEmits(['update:modelValue', 'validation']);

const inputValue = ref(props.modelValue);
const isFocused = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const errorStr = ref('');

const hasValue = computed(() => props.modelValue.length > 0);
const showTooltip = ref(false);

// Validate comment field
const validateComment = (value) => {
  // Trim whitespace and check if empty after trimming
  const trimmedValue = value.trim();
  if (!trimmedValue) return t('common.error.commentRequired');

  // Check maximum length (reasonable limit for comment)
  if (trimmedValue.length > 500) return t('common.error.commentTooLong');

  return true;
};

const validateInput = () => {
  const result = validateComment(inputValue.value);
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

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value;
};

const handleClickOutside = (event) => {
  if (showTooltip.value && !event.target.closest('.input-info')) {
    showTooltip.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(inputValue, (value) => {
  emit('update:modelValue', value.trim());
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
        <span>{{ $t(label) }}</span>
      </label>

      <div class="input-container">
        <textarea
          ref="textareaRef"
          v-model="inputValue"
          :rows="rows"
          class="input-field textarea-field"
          :class="{
            'is-focused': isFocused,
            'has-error': errorStr,
          }"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <div class="input-info">
          <!-- Info Icon -->
          <button
            type="button"
            class="info-icon"
            @click="toggleTooltip"
            :class="{ 'is-active': showTooltip }"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M12 16v-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M12 8h.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <!-- Tooltip -->
          <div v-if="showTooltip" class="tooltip">
            <span v-html="$t('common.form.commentTooltip')" />
          </div>
        </div>
      </div>
    </div>
    <span v-if="errorStr" class="error-message">{{ errorStr }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;

  .input-label {
    position: absolute;
    left: em(8);
    top: em(40);
    transform: translateY(-50%);
    transition: all 0.2s ease;
    pointer-events: none;
    padding: 0 em(4);
    color: $color-grey-500;
    z-index: 1;

    @include media-breakpoint-down(sm) {
      top: em(32);
    }

    html[dir='rtl'] & {
      left: auto;
      right: em(8);
    }

    &.is-active {
      left: em(14);
      top: 0;
      transform: translateY(-50%) scale(0.67);
      transform-origin: left 50%;
      color: $color-black;
      background: white;

      html[dir='rtl'] & {
        left: auto;
        right: em(14);
      }
    }

    span {
      font-size: em(18);
      font-weight: $font-weight-regular;
    }
  }

  .input-container {
    position: relative;
    display: flex;
    align-items: flex-start;

    .textarea-field {
      line-height: 1.4;
      color: $color-black;
      font-size: em(18);
      font-weight: $font-weight-regular;
      transition: all 0.2s ease;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }

      &::placeholder {
        color: $color-grey-500;
        opacity: 1; // Firefox fix
      }

      &::-webkit-input-placeholder {
        color: $color-grey-500;
      }

      &::-moz-placeholder {
        color: $color-grey-500;
        opacity: 1;
      }

      &:-ms-input-placeholder {
        color: $color-grey-500;
      }
    }

    .input-info {
      position: absolute;
      top: em(12);
      right: em(16);
      z-index: 2;

      @include media-breakpoint-down(sm) {
        top: em(8);
        right: em(12);
      }

      html[dir='rtl'] & {
        right: auto;
        left: em(16);

        @include media-breakpoint-down(sm) {
          left: em(12);
        }
      }

      .info-icon {
        width: em(20);
        height: em(20);
        margin-left: auto;
        cursor: pointer;
        transition: all 0.2s ease;
        color: $color-grey-700;
        background-color: $color-white;
        border-radius: 50%;
        z-index: 5;

        @include media-breakpoint-down(sm) {
          width: em(16);
          height: em(16);
        }

        html[dir='rtl'] & {
          margin-left: 0;
          margin-right: auto;
        }

        &:hover {
          opacity: 0.6;
        }

        &.is-active {
          color: $color-red-700;
        }

        svg {
          width: 100%;
          height: 100%;
        }
      }

      .tooltip {
        position: relative;
        z-index: 10;
        background: white;
        border: em(1) solid $color-grey-300;
        border-radius: em(8);
        box-shadow: 0 em(4) em(12) rgba(0, 0, 0, 0.15);
        padding: em(16);
        animation: fadeIn 0.3s ease-in-out;
        margin-top: em(8);
        margin-right: em(-18);

        @include media-breakpoint-down(sm) {
          margin-top: em(4);
          margin-right: em(-16);
          z-index: 1000;
        }

        html[dir='rtl'] & {
          margin-right: 0;
          margin-left: em(-18);

          @include media-breakpoint-down(sm) {
            margin-left: em(-16);
          }
        }

        span {
          color: $color-grey-600;
          font-size: em(12);
          font-weight: $font-weight-regular;
          line-height: 1.4;
        }

        &::before {
          content: '';
          position: absolute;
          top: em(-6);
          right: em(20);
          width: 0;
          height: 0;
          border-left: em(6) solid transparent;
          border-right: em(6) solid transparent;
          border-bottom: em(6) solid white;

          @include media-breakpoint-down(sm) {
            display: none;
          }

          html[dir='rtl'] & {
            right: auto;
            left: em(20);
          }
        }

        &::after {
          content: '';
          position: absolute;
          top: em(-7);
          right: em(20);
          width: 0;
          height: 0;
          border-left: em(6) solid transparent;
          border-right: em(6) solid transparent;
          border-bottom: em(6) solid $color-grey-300;

          @include media-breakpoint-down(sm) {
            display: none;
          }

          html[dir='rtl'] & {
            right: auto;
            left: em(20);
          }
        }
      }
    }
  }
}

.input-wrapper .is-focused {
  border-color: #3b82f6;
}

.input-wrapper .has-error {
  border-color: $color-red-700 !important;
}

.error-message {
  color: $color-red-700;
  font-size: em(14);

  @include media-breakpoint-down(sm) {
    font-size: em(14);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(em(-10));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
