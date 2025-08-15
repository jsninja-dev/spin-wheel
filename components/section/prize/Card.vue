<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="prize-card" :class="`prize-card__${id}`">
    <div class="content">
      <span v-html="text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prize-card {
  color: $color-black-999;

  &__0 {
    background: $color-black-999;
    color: $color-white;
  }
  &__1 {
    background: linear-gradient(127deg, #c5cbd5 13.85%, #0051ff 135.38%);

    @include media-breakpoint-down(sm) {
      color: $color-white;
    }

    html[dir='rtl'] & {
      background: linear-gradient(233deg, #c5cbd5 13.85%, #0051ff 135.38%);
    }
  }
  &__2 {
    background: $color-grey-100;
  }
  &__3 {
    background: $color-red-700;
    color: $color-white;
  }
  &__4 {
    border: em(1) solid $color-black-999;
    background: $color-white;
  }
  &__5 {
    background: $color-grey-100;
  }
  &__6 {
    background: $color-black-999;
    color: $color-white;
  }
  &__7 {
    background: linear-gradient(231deg, #c5cbd5 19.56%, #0051ff 150.29%);
    color: $color-white;

    html[dir='rtl'] & {
      background: linear-gradient(129deg, #c5cbd5 19.56%, #0051ff 150.29%);
    }
  }

  .content {
    padding: em(36) em(40) em(32);

    @include media-breakpoint-down(sm) {
      padding: em(16) em(20);
    }

    span {
      font-size: em(24);
      font-weight: $font-weight-regular;
      line-height: 1.25;

      &:deep(strong) {
        font-weight: $font-weight-bold;
        font-size: em(27);
      }

      @include media-breakpoint-down(sm) {
        font-size: em(16);

        &:deep(strong) {
          font-size: em(32);
          font-weight: $font-weight-semi-bold;
        }
      }
    }
  }
}
</style>
