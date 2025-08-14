export const useGlobalStore = defineStore('spinWheel', () => {
  const isSpinning = ref(false);
  function setIsSpinning(value) {
    isSpinning.value = value;
  }

  const getIsSpinning = computed(() => isSpinning.value);

  return { setIsSpinning, getIsSpinning };
});