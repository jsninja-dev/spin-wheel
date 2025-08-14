<script setup>
import breakpoints from '@/configs/breakpoints';
import { specs } from '@/configs/spec';

function onBreakpointChange(swiper) {
  swiper.setProgress(0, 0);
}
</script>

<template>
  <section class="section-spec">
    <div class="exp">
      <span class="number">
        {{ specs[0].number }}
      </span>
      <span class="text" v-html="$t(specs[0].text)" />
    </div>
    <div class="container">
      <UiGradientText class="heading">
        <span class="heading-text">
          {{ $t('specSection.title') }}
        </span>
        <span class="square-dot" />
      </UiGradientText>
      <div class="content">
        <div class="content-left">
          <div class="card card-1">
            <div>
              <span class="text" v-html="$t(specs[1].text1[0])" />
              <span class="number">
                {{ specs[1].number[0] }}
              </span>
              <span class="text" v-html="$t(specs[1].text1[1])" />
            </div>
            <div>
              <span class="text" v-html="$t(specs[1].text2)" />
              <span class="number">
                {{ specs[1].number[1] }}
              </span>
            </div>
          </div>
          <div class="card card-2">
            <span class="number">
              {{ specs[2].number }}
            </span>
            <span class="text" v-html="$t(specs[2].text)" />
          </div>
        </div>
        <div class="content-right">
          <div class="card card-3 items-right">
            <div>
              <span class="number img">
                {{ specs[3].number }}
                <CPicture
                  src="/images/spec/star.svg"
                  alt=""
                  loading="lazy"
                  class="img star"
                />
              </span>
              <span class="text" v-html="$t(specs[3].text)" />
            </div>
          </div>
          <div class="card card-4">
            <div>
              <span class="number">
                {{ specs[4].number[0] }}
              </span>
              <span class="text" v-html="$t(specs[4].text[0])" />
            </div>
            <div class="items-right">
              <span class="number">
                {{ specs[4].number[1] }}
              </span>
              <span class="text" v-html="$t(specs[4].text[1])" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-spec {
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(64);
  }

  .number {
    display: block;
    font-size: em(96);
    font-weight: $font-weight-semi-bold;
    line-height: 90%;

    @include media-breakpoint-down(sm) {
      font-size: em(36);
    }
  }

  .text {
    display: block;
    font-size: em(24);
    font-weight: $font-weight-light;
    line-height: 180%;

    @include media-breakpoint-down(sm) {
      font-size: em(14);
    }

    &:deep(strong) {
      font-weight: $font-weight-semi-bold;
    }

    html[lang='es'] & {
      line-height: 100%;
    }
  }

  .exp {
    position: absolute;
    top: 0;
    left: em(725);
    width: em(661);
    height: em(576);
    background: $color-grey-100;
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: em(68) em(55);

    html[dir='rtl'] & {
      left: auto;
      right: em(725);

      @include media-breakpoint-down(sm) {
        left: auto;
        right: em(64);
      }
    }

    @include media-breakpoint-down(sm) {
      top: em(32);
      left: em(64);
      width: em(295);
      height: em(165);
      padding: em(23) em(23);
    }
  }

  .container {
    @include media-breakpoint-down(sm) {
      padding: 0;
    }

    .heading {
      max-width: em(1200);
      margin-top: em(96);
      padding-bottom: em(73);

      @include media-breakpoint-down(sm) {
        margin-left: em(20);
        margin-top: em(8);
        max-width: em(240);
        margin-bottom: em(32);

        html[dir='rtl'] & {
          margin-left: auto;
          margin-right: em(20);
        }
      }

      .heading-text {
        font-size: em(96);
        font-weight: $font-weight-semi-bold;
        line-height: 1; /* 67.2px */

        @include media-breakpoint-down(sm) {
          font-size: em(32);
          line-height: 1.15;
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
      }
    }

    .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: em(97);

      @include media-breakpoint-down(sm) {
        gap: 0;
      }

      .content-left {
        flex-grow: 1;
        padding-top: em(29);
      }

      .content-right {
        width: em(764);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @include media-breakpoint-down(sm) {
          width: em(188);
          gap: em(20);
          justify-content: flex-start;
        }
      }

      .items-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        @include media-breakpoint-down(sm) {
          align-items: flex-start;
        }
      }

      .card {
        padding: em(48) em(56);
        color: $color-black-999;

        @include media-breakpoint-down(sm) {
          padding: em(20) em(22);
        }

        .img {
          display: flex;
          align-items: flex-start;
          gap: 0;

          &.star {
            width: em(4);
            height: auto;

            @include media-breakpoint-down(sm) {
              width: em(8);
              padding-left: em(1);
              padding-top: em(1);
            }
          }
        }

        &.card-1 {
          width: em(536);
          height: em(422);
          background: linear-gradient(322deg, #ff9494 13.96%, #c5cbd5 73.89%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          @include media-breakpoint-down(sm) {
            width: em(187);
            height: em(213);
            justify-content: flex-start;
            gap: em(12);
          }
        }

        &.card-2 {
          border: em(1) solid $color-black-999;
          width: em(437);
          height: em(302);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-left: auto;
          margin-top: em(-36);

          @include media-breakpoint-down(sm) {
            width: em(184);
            height: em(140);
            margin-left: em(-9);
            margin-top: em(-24);
          }

          html[dir='rtl'] & {
            margin-left: 0;
            margin-right: auto;

            @include media-breakpoint-down(sm) {
              margin-left: auto;
              margin-right: em(-9);
            }
          }

          html[lang='es'] & {
            @include media-breakpoint-down(sm) {
              margin-top: em(-16);
            }
          }
        }

        &.card-3 {
          @include media-breakpoint-down(sm) {
            padding-left: em(22);
            order: 2;
          }
        }

        &.card-4 {
          width: 100%;
          height: em(470);
          background: $color-red-700;
          color: $color-white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          @include media-breakpoint-down(sm) {
            height: em(242);
            order: 1;
            gap: em(32);
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>
