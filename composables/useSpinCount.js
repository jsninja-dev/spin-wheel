import { ref, computed } from 'vue';

const SPIN_COUNT_KEY = 'spin_count';
const DEFAULT_SPIN_COUNT = 3;

// Cookie utility functions
const setCookie = (name, value) => {
  if (process.client) {
    const expires = new Date();
    // Set expiration to tomorrow at midnight (00:00:00)
    expires.setDate(expires.getDate() + 1);
    expires.setHours(0, 0, 0, 0);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
};

const getCookie = (name) => {
  if (process.client) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  return null;
};

// const deleteCookie = (name) => {
//   if (process.client) {
//     document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
//   }
// };

// Create a single shared reactive state
const globalSpinCount = ref(DEFAULT_SPIN_COUNT);

export const useSpinCount = () => {
  // Initialize spin count from cookies or set default
  const initializeSpinCount = () => {
    if (process.client) {
      const stored = getCookie(SPIN_COUNT_KEY);
      if (stored === null) {
        // First time user, set default count
        setCookie(SPIN_COUNT_KEY, DEFAULT_SPIN_COUNT.toString());
        globalSpinCount.value = DEFAULT_SPIN_COUNT;
      } else {
        // Load existing count
        globalSpinCount.value = parseInt(stored, 10);
      }
    }
  };

  // Get current spin count
  const getSpinCount = () => {
    if (process.client) {
      const stored = getCookie(SPIN_COUNT_KEY);
      return stored ? parseInt(stored, 10) : DEFAULT_SPIN_COUNT;
    }
    return DEFAULT_SPIN_COUNT;
  };

  // Decrease spin count by 1
  const decreaseSpinCount = () => {
    if (process.client) {
      const current = getSpinCount();
      if (current > 0) {
        const newCount = current - 1;
        setCookie(SPIN_COUNT_KEY, newCount.toString());
        globalSpinCount.value = newCount;
        return newCount;
      }
      return 0;
    }
    return 0;
  };

  // Reset spin count (useful for daily reset)
  const resetSpinCount = () => {
    if (process.client) {
      setCookie(SPIN_COUNT_KEY, DEFAULT_SPIN_COUNT.toString());
      globalSpinCount.value = DEFAULT_SPIN_COUNT;
    }
  };

  // Refresh spin count from cookies (useful for sync)
  const refreshSpinCount = () => {
    if (process.client) {
      const stored = getCookie(SPIN_COUNT_KEY);
      if (stored !== null) {
        globalSpinCount.value = parseInt(stored, 10);
      }
    }
  };

  // Check if user can spin
  const canSpin = computed(() => globalSpinCount.value > 0);

  return {
    spinCount: computed(() => globalSpinCount.value),
    initializeSpinCount,
    getSpinCount,
    decreaseSpinCount,
    resetSpinCount,
    refreshSpinCount,
    canSpin,
  };
};
