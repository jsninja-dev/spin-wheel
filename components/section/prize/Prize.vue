<script setup>
import links from '@/constants/links';
import breakpoints from '@/configs/breakpoints';

const { scrollToWheel } = useScroll();
const { tm, rt } = useI18n();

const prizeCards = computed(() => {
  return tm('prizeSection.cards').map(rt);
});
</script>

<template>
  <section class="section-prize">
    <div class="container">
      <UiGradientText class="heading">
        <span class="heading-text" v-html="$t('prizeSection.title')" />
        <span class="square-dot" />
      </UiGradientText>

      <div class="subtitle">
        <span v-html="$t('prizeSection.subtitle')" />
      </div>

      <div class="cards">
        <div class="top-left hidden-mobile" />
        <div class="top-right hidden-mobile" />
        <CPicture
          src="/images/prize/gradient.png"
          alt=""
          loading="lazy"
          class="bottom-right"
        />
        <Swiper
          slides-per-view="auto"
          :breakpoints="{
            [breakpoints.sm]: {
              allowTouchMove: false,
            },
          }"
          class="swiper"
        >
          <SwiperSlide
            v-for="(item, key) in prizeCards"
            :key="key"
            class="slide"
          >
            <SectionPrizeCard :text="item" :id="key" class="card" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="button-wrapper">
        <UiButton
          theme="red"
          class="button"
          :text="$t('common.btnSpin')"
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
.section-prize {
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(64);
  }

  .heading {
    max-width: 100%;
    padding-bottom: em(48);

    @include media-breakpoint-down(sm) {
      padding-bottom: em(12);
    }

    .heading-text {
      font-size: em(96);
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
    margin-bottom: em(72);

    @include media-breakpoint-down(sm) {
      margin-bottom: em(24);
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

  .cards {
    position: relative;

    @include media-breakpoint-down(sm) {
      padding-block: em(30);
      margin-inline: em(-20);
      width: calc(100% + em(40));
    }

    .top-left {
      position: absolute;
      top: 0;
      left: em(-16);
      width: em(388);
      height: em(258);
      background: linear-gradient(193deg, #040714 29.99%, #287361 90.36%);
      transform: translateX(-100%);

      html[dir='rtl'] & {
        background: linear-gradient(320deg, #040714 40.02%, #287361 77.92%);
      }
    }

    .top-right {
      position: absolute;
      top: 0;
      right: em(-16);
      width: em(388);
      height: em(258);
      background: linear-gradient(40deg, #040714 40.02%, #287361 77.92%);
      transform: translateX(100%);

      html[dir='rtl'] & {
        background: linear-gradient(167deg, #040714 40.02%, #287361 77.92%);
      }
    }

    .bottom-right {
      position: absolute;
      bottom: 0;
      right: em(-160);
      width: em(548);
      height: em(256);

      @include media-breakpoint-down(sm) {
        right: 0;
        bottom: em(-65);
        width: em(355);
        height: em(175);
        transform: scaleX(-1);
      }

      html[dir='rtl'] & {
        right: auto;
        left: em(-160);
        transform: scaleX(-1);

        @include media-breakpoint-down(sm) {
          left: 0;
          transform: scaleX(1);
        }
      }
    }

    .swiper {
      width: 100%;
      position: static;

      @include media-breakpoint-down(sm) {
        overflow: visible;
        width: auto;
        padding-left: em(30);
        margin: 0 em(20);

        html[dir='rtl'] & {
          padding-left: 0;
          padding-right: em(30);
        }
      }

      :deep(.swiper-wrapper) {
        flex-wrap: wrap;
        gap: em(16) em(16);
        height: auto;

        @include media-breakpoint-down(sm) {
          flex-wrap: nowrap;
          gap: 0;
        }
      }

      &::before {
        content: '';
        position: absolute;
        top: em(-120);
        right: em(-160);
        width: em(906);
        height: calc(100% + em(272));
        background: linear-gradient(315deg, #ff9494 5.44%, #c5cbd5 55.61%);
        z-index: -1;

        @include media-breakpoint-down(sm) {
          width: em(355);
          top: 0;
          bottom: 0;
          right: 0;
          height: auto;
        }

        html[dir='rtl'] & {
          right: auto;
          left: em(-160);
          transform: scaleX(-1);

          @include media-breakpoint-down(sm) {
            left: 0;
          }
        }
      }

      .slide {
        width: em(388);
        height: auto;

        @include media-breakpoint-down(sm) {
          width: em(231);
        }

        &:not(:last-child) {
          @include media-breakpoint-down(sm) {
            margin-right: em(16);

            html[dir='rtl'] & {
              margin-right: 0;
              margin-left: em(16);
            }
          }
        }

        .card {
          width: 100%;
          height: 100%;
          min-height: em(256);

          @include media-breakpoint-down(sm) {
            min-height: em(175);
          }
        }
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
}
</style>
