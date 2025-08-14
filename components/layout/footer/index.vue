<script setup></script>

<template>
  <footer class="layout-footer">
    <div class="container">
      <div class="content">
        <LayoutFooterPartAwards class="awarded" />

        <LayoutFooterPartContacts class="contacts" />

        <LayoutFooterPartDisclaimers class="disclaimers" />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.layout-footer {
  position: relative;
  overflow: hidden;
  margin-bottom: em(51);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(40);
  }
}
</style>
