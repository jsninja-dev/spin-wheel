<script setup>
import { trades } from '@/configs/trades';
import links from '@/constants/links';

const { scrollToWheel } = useScroll();
</script>

<template>
  <section class="section-trades">
    <div class="container">
      <UiGradientText class="heading">
        <span class="heading-text" v-html="$t('tradesSection.title')" />
        <span class="square-dot" />
      </UiGradientText>

      <div class="subtitle">
        <span v-html="$t('tradesSection.text')" />
      </div>

      <div class="cards">
        <SectionTradesCard
          v-for="(item, key) in trades"
          :key="key"
          v-bind="item"
          class="card"
        />
      </div>

      <div class="button-wrapper">
        <UiButton
          theme="red"
          class="button"
          :text="$t('common.btnStart')"
          @click="scrollToWheel"
        />
        <a :href="links.TNC" target="_blank" class="link">
          <span>
            {{ $t('common.TNC') }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-trades {
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    padding-bottom: em(16);
    margin-bottom: em(64);
  }

  .heading {
    max-width: 100%;
    padding-bottom: em(32);

    @include media-breakpoint-down(sm) {
      max-width: em(320);
      padding-bottom: em(20);
    }

    .heading-text {
      font-size: em(90);
      font-weight: $font-weight-semi-bold;
      line-height: 1; /* 67.2px */

      @include media-breakpoint-down(sm) {
        font-size: em(32);
      }
    }

    .square-dot {
      width: em(46);
      height: em(46);
      margin-left: em(12);

      @include media-breakpoint-down(sm) {
        width: em(16);
        height: em(16);
        margin-left: em(6);
      }

      html[dir='rtl'] & {
        margin-left: 0;
        margin-right: em(12);

        @include media-breakpoint-down(sm) {
          margin-right: em(6);
        }
      }
    }
  }

  .subtitle {
    margin-bottom: em(64);

    @include media-breakpoint-down(sm) {
      margin-bottom: em(28);
    }

    span {
      color: $color-black-999;
      font-size: em(40);
      font-weight: $font-weight-semi-bold;
      line-height: 1;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }
  }

  .button-wrapper {
    margin-top: em(60);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: em(8);

    @include media-breakpoint-down(sm) {
      margin-top: em(30);
      display: flex;
    }

    .button {
      flex-shrink: 0;
    }

    .link {
      span {
        color: #313131;
        font-size: em(14);
        font-weight: $font-weight-regular;
      }
    }
  }

  .cards {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: em(30) em(30);
    height: auto;

    @include media-breakpoint-down(sm) {
      gap: em(19) em(15);
    }

    .card {
      width: em(513);
      height: 100%;
      min-height: em(513);

      @include media-breakpoint-down(sm) {
        min-height: em(255);
        width: em(158);
      }
    }
  }
}
</style>
