<script setup>
import { qualities } from '@/configs/qualities';
import breakpoints from '@/configs/breakpoints';
import links from '@/constants/links';

const { scrollToWheel } = useScroll();

function onBreakpointChange(swiper) {
  swiper.setProgress(0, 0);
}
</script>

<template>
  <section class="section-qualities">
    <div class="container">
      <div class="content">
        <div class="gradient" />
        <CPicture src="/images/qualities/main.png" class="main" />
        <div class="heading">
          <span class="heading-text" v-html="$t('qualitiesSection.title')" />
          <span class="square-dot" />
        </div>
        <div class="subtitle">
          <span v-html="$t('qualitiesSection.subtitle')" />
        </div>
        <Swiper
          slides-per-view="auto"
          :breakpoints="{
            [breakpoints.sm]: {
              allowTouchMove: false,
            },
          }"
          class="swiper"
          @breakpoint="onBreakpointChange"
        >
          <SwiperSlide
            v-for="(item, key) in qualities"
            :key="key"
            class="slide"
          >
            <SectionQualitiesCard v-bind="item" class="card" />
          </SwiperSlide>
        </Swiper>
        <div class="footer">
          <div class="button-container">
            <UiButton
              theme="red"
              class="button"
              :text="$t('common.btnSpin')"
              @click="scrollToWheel"
            />
            <a :href="links.TNC" class="tnc-link" target="_blank">
              <span v-html="$t('common.TNC')" />
            </a>
          </div>
          <div class="trust">
            <div class="trust-text">
              <span v-html="$t('qualitiesSection.trust')" />
            </div>
            <div class="trust-stars">
              <CPicture
                src="/images/common/trust-light.png"
                alt=""
                loading="lazy"
                class="trustpilot"
              />
              <CPicture
                src="/images/common/stars.png"
                alt=""
                loading="lazy"
                class="stars"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-qualities {
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(64);
  }

  .content {
    z-index: 1;
    display: flex;
    flex-direction: column;
    margin-top: em(120);
    width: em(800);
    margin-left: auto;

    @include media-breakpoint-down(sm) {
      margin-top: em(32);
      width: 100%;
    }

    .main {
      position: absolute;
      top: 0;
      left: 0;
      width: em(861);
      height: em(792);

      @include media-breakpoint-down(sm) {
        order: 3;
        position: relative;
        width: em(521);
        height: em(480);
        margin-left: em(-144);
        margin-bottom: em(30);
      }
    }

    .gradient {
      position: absolute;
      top: em(51);
      right: 0;
      width: calc(100% - em(160));
      height: 100%;
      background: linear-gradient(115deg, #040714 40.7%, #c30044 96.08%);
      z-index: -1;

      @include media-breakpoint-down(sm) {
        width: 100%;
        top: 0;
      }

      html[dir='rtl'] & {
        right: auto;
        left: 0;
        transform: scaleX(-1);

        @include media-breakpoint-down(sm) {
          right: 0;
          left: auto;
          transform: scaleX(1);
        }
      }
    }

    .heading {
      margin-bottom: em(64);

      @include media-breakpoint-down(sm) {
        order: 1;
        margin-bottom: em(28);
        text-align: center;
      }

      .heading-text {
        font-size: em(96);
        color: $color-white;
        font-weight: $font-weight-semi-bold;
        line-height: 1; /* 67.2px */

        @include media-breakpoint-down(sm) {
          font-size: em(32);
          line-height: 1.1;
        }
      }

      .square-dot {
        width: em(50);
        height: em(50);
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
      margin-bottom: em(48);

      @include media-breakpoint-down(sm) {
        order: 2;
        width: 100%;
        text-align: center;
        margin-bottom: em(20);
      }

      span {
        color: $color-white;
        font-size: em(24);
        font-weight: $font-weight-regular;
        line-height: 1;

        @include media-breakpoint-down(sm) {
          font-size: em(16);
          font-weight: $font-weight-light;
        }
      }
    }

    .swiper {
      width: 100%;

      @include media-breakpoint-down(sm) {
        order: 4;
        width: auto;
        padding: 0 em(20);
        margin: 0 em(-20);
      }

      :deep(.swiper-wrapper) {
        height: auto;
      }

      .slide {
        width: em(256);
        height: auto;

        @include media-breakpoint-down(sm) {
          width: em(220);
        }

        &:not(:last-child) {
          margin-right: em(16);

          html[dir='rtl'] & {
            margin-left: em(16);
            margin-right: 0;
          }
        }

        .card {
          width: 100%;
          height: 100%;
          min-height: em(223);

          @include media-breakpoint-down(sm) {
            min-height: em(170);
          }
        }
      }
    }

    .footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: em(16);
      margin-top: em(80);
      margin-bottom: em(56);

      @include media-breakpoint-down(sm) {
        order: 5;
        flex-direction: column;
        margin-top: em(30);
        margin-bottom: em(40);
        gap: em(24);
      }

      .button-container {
        display: inline-flex;
        flex-direction: column;
        gap: em(4);
        align-items: center;

        @include media-breakpoint-down(sm) {
          width: 100%;
        }

        .button {
          @include media-breakpoint-down(sm) {
            width: 100%;
          }
        }

        .tnc-link {
          text-align: center;

          span {
            color: $color-white;
            font-size: em(14);
            font-weight: $font-weight-regular;
            line-height: 115%;
          }
        }
      }

      .trust {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: em(10);

        @include media-breakpoint-down(sm) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .trust-text {
          text-align: right;
          width: em(112);

          @include media-breakpoint-down(sm) {
            width: auto;
          }

          span {
            color: $color-white;
            font-size: em(16);
            font-weight: $font-weight-regular;
            line-height: 125%;

            @include media-breakpoint-down(sm) {
              font-size: em(14);
            }

            &:deep(strong) {
              font-weight: $font-weight-bold;
            }
          }
        }

        .trust-stars {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: em(4);
          margin-bottom: em(4);

          @include media-breakpoint-down(sm) {
            flex-direction: row;
            gap: em(30);
          }

          .trustpilot {
            width: em(112);
            height: auto;
            margin-left: auto;

            @include media-breakpoint-down(sm) {
              width: em(104);
              margin-left: 0;
            }
          }

          .stars {
            width: em(175);
            height: auto;

            @include media-breakpoint-down(sm) {
              width: em(141);
            }
          }
        }
      }
    }
  }
}
</style>
