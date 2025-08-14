<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { countries } from 'countries-list';
import { useIpGeolocation } from '@/composables/useIpGeolocation';

const { getCountry } = useIpGeolocation();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const selectedOption = ref({
  value: 'AD',
  label: 'Andorra',
  flag: `https://flagicons.lipis.dev/flags/4x3/ad.svg`,
});

// Transform countries data into our format
const countryOptions = computed(() => {
  return Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`,
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
  emit('update:modelValue', option.value);
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.ui-country-select')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);

  const countryCode = await getCountry();
  if (countryCode) {
    selectedOption.value = countryOptions.value.find(
      (option) => option.value === countryCode,
    );
    emit('update:modelValue', selectedOption.value.value);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="ui-country-select">
    <div class="title">
      <span>
        {{ $t('common.form.country') }}
      </span>
    </div>
    <div
      class="input-field header"
      :class="{ 'header--hover': isOpen }"
      @click="toggleDropdown"
    >
      <img :src="selectedOption.flag" alt="Flag" class="flag" />
      <span class="label">{{ selectedOption.label }}</span>
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
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('common.form.searchCountry')"
        class="input-field search-input"
        @click.stop
      />
      <div class="list">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="option"
          @click="handleOptionClick(option, $event)"
        >
          <img :src="option.flag" alt="Flag" class="flag" loading="lazy" />
          <span class="label">
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-country-select {
  background: $color-white;
  position: relative;
  cursor: pointer;

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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: em(5);

    @include media-breakpoint-down(sm) {
      justify-content: end;
      gap: 0;
    }

    &--hover {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-color: #3b82f6;
    }

    &--hover .arrow {
      transform: rotate(180deg);
    }

    .arrow {
      width: em(24);
      height: em(24);

      @include media-breakpoint-down(sm) {
        width: em(20);
        height: em(20);
      }
    }
  }

  .options {
    position: absolute;
    width: 100%;
    background: $color-white;
    z-index: 15;
    border: em(1) solid #3b82f6;
    border-top: none;
    border-bottom-left-radius: em(3);
    border-bottom-right-radius: em(3);

    .search-input {
      width: 100%;
      border-radius: 0;
      border-bottom: em(1) solid #d3d3d3;
      font-size: em(14);

      &:focus {
        border-color: #3b82f6;
      }
    }

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
</style>
