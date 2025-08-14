<script setup>
// Spin count management
const { initializeSpinCount } = useSpinCount();

onMounted(() => {
  initializeSpinCount();
});
</script>

<template>
  <div class="pages-home">
    <SectionHero class="pages-home__hero" />

    <SectionQualities class="pages-home__qualities" />

    <SectionPrize class="pages-home__prize" />

    <SectionMerit class="pages-home__merit" />

    <SectionAccount class="pages-home__account hidden-mobile" />

    <SectionSpec class="pages-home__spec" />

    <SectionTrades class="pages-home__trades" />
  </div>
</template>

<style scoped lang="scss"></style>
