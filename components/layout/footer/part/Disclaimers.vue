<script setup>
import { disclaimers } from '@/configs/disclaimers';

const { $tp } = useNuxtApp();
</script>

<template>
  <section class="layout-footer-disclaimers">
    <div
      v-for="(disclaimer, index) in disclaimers"
      :key="index"
      class="disclaimer"
      :class="`disclaimer--${disclaimer.alias}`"
    >
      <div class="title">
        <span>
          {{ $t(disclaimer.title) }}
        </span>
      </div>

      <div class="text">
        <span>
          {{ $tp($t(disclaimer.text)) }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.layout-footer-disclaimers {
  padding-top: em(36);
  display: flex;
  justify-content: space-between;

  @include media-breakpoint-down(sm) {
    padding-top: em(12);
    flex-direction: column;
  }

  .disclaimer {
    &:not(:last-child) {
      @include media-breakpoint-down(sm) {
        margin-bottom: em(29);
      }
    }

    &--risk-warning {
      width: em(356);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    &--disclaimers {
      width: em(540);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    &--legal {
      width: em(591);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
    .title {
      margin-bottom: em(20);

      @include media-breakpoint-down(sm) {
        margin-bottom: em(18);
      }

      span {
        font-size: em(16);
        font-weight: $font-weight-regular;

        @include media-breakpoint-down(sm) {
          font-size: em(14);
        }
      }
    }

    .text {
      span {
        color: $color-grey-400;
        font-size: em(16);

        @include media-breakpoint-down(sm) {
          font-size: em(14);
        }
      }
    }
  }
}
</style>
