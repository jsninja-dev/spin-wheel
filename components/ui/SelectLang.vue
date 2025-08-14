<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import languages from '@/configs/languages.js';

const { locale, setLocale } = useI18n();

const isOpen = ref(false);
const selectedLang = ref(languages.find((lang) => lang.value === locale.value));

const emit = defineEmits(['change']);

const handleChange = async () => {
  const langCode = selectedLang.value.value;
  await setLocale(langCode);
  const html = document.querySelector('html');
  html?.setAttribute('lang', langCode);
  html?.setAttribute('dir', langCode === 'ar' ? 'rtl' : 'ltr');
  emit('change');
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleOptionClick = async (lang, event) => {
  event.stopPropagation();
  isOpen.value = false;
  selectedLang.value = lang;
  await handleChange();
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.lang-bar')) {
    isOpen.value = false;
  }
};

const filteredLanguages = computed(() => {
  return languages.filter((lang) => lang.value !== locale.value);
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="lang-bar">
    <div
      class="header"
      :class="{ 'header--hover': isOpen }"
      @click="toggleDropdown"
    >
      <img
        :src="selectedLang.avatar.src"
        :alt="selectedLang.avatar.alt"
        class="flag"
      />
      <span class="label">
        {{ selectedLang.label }}
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
      <div
        v-for="lang in filteredLanguages"
        :key="lang.value"
        class="option"
        @click="handleOptionClick(lang, $event)"
      >
        <img
          v-if="lang.avatar"
          :src="lang.avatar.src"
          :alt="lang.avatar.alt"
          class="flag"
        />
        <span class="label">
          {{ lang.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lang-bar {
  position: relative;
  display: inline-block;

  .flag {
    width: em(22);
    height: em(22);
    aspect-ratio: 1/1;
    border-radius: 20%;
  }

  .label {
    font-size: em(16);
    font-weight: $font-weight-regular;
  }

  .header {
    flex-shrink: 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: em(16);
    border: em(1) solid $color-red-700;
    border-radius: em(3);
    padding: em(6) em(12);

    @include media-breakpoint-down(sm) {
      justify-content: start;
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
    background: $color-white;
    position: absolute;
    bottom: em(39);
    width: 100%;
    z-index: 2;
    border: em(1) solid $color-red-700;
    border-bottom: none;
    border-top-left-radius: em(3);
    border-top-right-radius: em(3);
    height: em(240);
    overflow-y: auto;

    @include media-breakpoint-down(sm) {
      border: em(1) solid $color-red-700;
      border-top: none;
      border-bottom-left-radius: em(3);
      border-bottom-right-radius: em(3);
      bottom: auto;
      top: em(36);
    }

    .option {
      padding: em(12) em(12);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: em(16);

      &:hover {
        background: $color-red-700;
        color: $color-white;
      }
    }
  }
}

.header--hover .arrow {
  transform: rotate(180deg);
}
</style>
