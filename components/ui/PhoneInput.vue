<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { countries } from 'countries-list';
import { useIpGeolocation } from '@/composables/useIpGeolocation';
import debounce from 'lodash/debounce';
import { useAuth } from '@/composables/useAuth';

const { checkUser } = useAuth();

///////////////////////////////////////////////////////////////
// Phone check
const PhoneStatus = {
  UNDEFINED: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

const phoneStatus = ref(PhoneStatus.UNDEFINED);

// Create debounced email check function outside of watch
const debouncedPhoneCheck = debounce(async (phoneToCheck) => {
  try {
    const fullPhoneNumber = selectedOption.value.phoneCode + phoneToCheck;
    phoneStatus.value = PhoneStatus.LOADING;
    const response = await checkUser({ phone: fullPhoneNumber });
    if (!validatePhoneNumber()) {
      return;
    }
    phoneStatus.value = response ? PhoneStatus.SUCCESS : PhoneStatus.ERROR;
    if (!response) {
      errorStr.value = t('common.error.phoneRegistered');
    }
    emit('validation', response);
  } catch (error) {
    if (!validatePhoneNumber()) {
      return;
    }
    phoneStatus.value = PhoneStatus.ERROR;
    errorStr.value = t('common.error.phoneRegistered');
    emit('validation', false);
  }
}, 500);

const statusIcon = computed(() => {
  switch (phoneStatus.value) {
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

const showStatusIcon = computed(
  () => phoneStatus.value !== undefined && phoneStatus.value !== 0,
);

/////////////////////////////////////////////////////////////////

const { t } = useI18n();
const { getCountry } = useIpGeolocation();

const emit = defineEmits(['update:modelValue', 'validation']);

const isOpen = ref(false);
const searchQuery = ref('');
const phoneNumber = ref('');
const isFocused = ref(false);
const errorStr = ref('');
const isInitialMount = ref(true);
const selectedOption = ref({
  value: 'AD',
  label: 'Andorra',
  flag: `https://flagicons.lipis.dev/flags/4x3/ad.svg`,
  phoneCode: '+376',
});

// Transform countries data into our format
const countryOptions = computed(() => {
  return Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`,
    phoneCode: '+' + country.phone[0],
  }));
});

// Filter countries based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) return countryOptions.value;
  const query = searchQuery.value.toLowerCase();
  return countryOptions.value.filter((option) =>
    option.label.toLowerCase().includes(query),
  );
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    searchQuery.value = '';
  }
};

const handleOptionClick = (option, event) => {
  event.stopPropagation();
  isOpen.value = false;
  selectedOption.value = option;
  searchQuery.value = '';
  phoneNumber.value = '';
  emit('update:modelValue', selectedOption.value.phoneCode);
  validate();
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.country')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

const validatePhoneNumber = () => {
  // Remove any non-digit characters except '+'
  const cleanedNumber = phoneNumber.value.toString();

  if (cleanedNumber.length === 0) {
    errorStr.value = t('common.error.phoneRequired');
    phoneStatus.value = PhoneStatus.UNDEFINED;
    emit('validation', false);
    return false;
  }
  // Check if number has at least 8 digits after the country code
  if (cleanedNumber.length < 8) {
    errorStr.value = t('common.error.phoneInvalid');
    phoneStatus.value = PhoneStatus.UNDEFINED;
    emit('validation', false);
    return false;
  }
  return true;
};

// Validate phone number format
const validate = () => {
  emit('validation', false);
  const result = validatePhoneNumber();
  if (result) {
    errorStr.value = '';
    debouncedPhoneCheck(phoneNumber.value);
  }
};

// Watch for changes in phoneNumber to update selected country and validate
watch(phoneNumber, (newValue) => {
  if (!newValue) {
    return;
  }

  // Extract the phone code from the input
  const phoneStr = newValue.toString().replace(/[^0-9]/g, '');

  // Skip country update during initial mount
  emit('update:modelValue', selectedOption.value.phoneCode + phoneStr);

  if (isInitialMount.value) {
    isInitialMount.value = false;
    return;
  }

  // Validate the phone number
  validate();
});

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);

  const countryCode = await getCountry();
  if (countryCode) {
    const userCountry = countryOptions.value.find(
      (option) => option.value === countryCode,
    );
    if (userCountry) {
      selectedOption.value = userCountry;
      phoneNumber.value = '';
      emit('update:modelValue', userCountry.phoneCode);
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleFocus = () => {
  isFocused.value = true;
  if (phoneStatus.value === PhoneStatus.UNDEFINED) {
    errorStr.value = '';
  }
};

const handleBlur = () => {
  isFocused.value = false;
  validatePhoneNumber();
};
</script>

<template>
  <div>
    <div
      class="input-field phone-select"
      :class="{
        'phone-select--focused': isFocused || isOpen,
        'phone-select--error': errorStr,
      }"
    >
      <div class="title">
        <span>
          {{ $t('common.form.phone') }}
        </span>
      </div>
      <div class="country">
        <div
          class="header"
          :class="{ 'header--hover': isOpen }"
          @click="toggleDropdown"
        >
          <img :src="selectedOption.flag" alt="Flag" class="flag" />
          <span class="label">
            {{ selectedOption.phoneCode }}
          </span>
          <span>
            <svg
              class="arrow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="#D30044" stroke-width="2" d="M18 9l-6 6-6-6" />
            </svg>
          </span>
        </div>
        <div v-if="isOpen" class="options">
          <div class="list">
            <div
              v-for="option in filteredOptions"
              :key="option.value"
              class="option"
              @click="handleOptionClick(option, $event)"
            >
              <img :src="option.flag" alt="Flag" class="flag" loading="lazy" />
              <span class="label">
                {{ option.label }} {{ option.phoneCode }}
              </span>
            </div>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('common.form.searchCountry')"
            class="search-input"
          />
        </div>
      </div>
      <div class="input-wrapper">
        <input
          type="number"
          class="input"
          v-model="phoneNumber"
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
    <span v-if="errorStr" class="error-message">
      {{ errorStr }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.phone-select {
  background: $color-white;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: em(13);
  flex-direction: row;

  &--focused {
    border-color: #3b82f6;
  }

  &--error {
    border-color: $color-red-700;
  }

  @include media-breakpoint-down(sm) {
  }

  .title {
    position: absolute;
    background: $color-white;
    padding-inline: em(2);
    top: 0;
    left: em(12);
    transform: translateY(-50%) scale(1);

    html[dir='rtl'] & {
      left: auto;
      right: em(12);
    }

    span {
      color: $color-black;
      font-weight: $font-weight-regular;
      font-size: em(12);
      line-height: 1;
    }
  }

  .country {
    flex-shrink: 0;

    .header {
      display: flex;
      align-items: center;
      gap: 0;

      @include media-breakpoint-down(sm) {
        justify-content: end;
      }

      .arrow {
        width: em(24);
        height: em(24);

        @include media-breakpoint-down(sm) {
          width: em(20);
          height: em(20);
        }
      }

      &--hover {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-color: #3b82f6;
      }

      &--hover .arrow {
        transform: rotate(180deg);
      }
    }

    .options {
      position: absolute;
      left: em(-1);
      bottom: em(48);
      width: calc(100% + em(2));
      background: $color-white;
      z-index: 15;
      border: em(1) solid #3b82f6;
      border-bottom-left-radius: em(3);
      border-bottom-right-radius: em(3);

      .list {
        max-height: em(280);
        overflow-y: auto;

        @include media-breakpoint-down(sm) {
          max-height: em(200);
        }

        .option {
          padding: em(12) em(13);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: em(5);

          &:hover {
            background: #f3f4f6;
          }
        }
      }

      .search-input {
        width: 100%;
        padding: em(12) em(13) em(12) em(13);
        border-top: em(1) solid #d3d3d3;
        outline: none;

        &:focus {
          border-color: #3b82f6;
        }
      }
    }
  }

  .input-wrapper {
    flex-grow: 1;
    position: relative;

    .input {
      width: 100%;
    }

    .status-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: em(20);
      height: em(20);
      pointer-events: none;

      html[dir='rtl'] & {
        right: auto;
        left: em(13);
      }
    }
  }

  .flag {
    width: auto;
    height: em(20);
    border-radius: 20%;
    margin-right: em(13);

    html[dir='rtl'] & {
      margin-right: 0;
      margin-left: em(13);
    }
  }

  .label {
    color: $color-black-900;
    font-weight: $font-weight-regular;
    font-size: em(18);
    line-height: 1;
    flex-grow: 1;
    @include media-breakpoint-down(sm) {
      font-size: em(16);
    }
  }
}

.error-message {
  color: $color-red-700;
  font-size: em(14);
}
</style>
