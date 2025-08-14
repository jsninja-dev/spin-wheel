<script setup>
import { heroTips } from '@/configs/heroTips';
import links from '@/constants/links';

const { scrollToWheel } = useScroll();
</script>

<template>
  <section id="hero_wheel" class="section-hero">
    <div class="container">
      <div class="content">
        <div class="main">
          <img
            src="/images/logo.svg"
            alt="SquaredFinancial Logo"
            class="logo"
          />
          <UiGradientText mobile-gradient="white" class="heading">
            <span class="heading-text" v-html="$t('heroSection.title')" />
            <span class="square-dot dot" />
          </UiGradientText>
          <div class="subtitle">
            <span v-html="$t('heroSection.subtitle')" />
          </div>
          <div class="button-container hidden-mobile">
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
              <span v-html="$t('heroSection.trust')" />
            </div>
            <div class="trust-stars">
              <CPicture
                src="/images/common/trust.png"
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
          <div class="event">
            <div class="caption hidden-mobile">
              <span v-html="$t('heroSection.caption')" />
            </div>
            <ul class="list">
              <li class="item" v-for="(tip, idx) in heroTips" :key="idx">
                <CPicture :src="tip.icon" alt="" loading="lazy" class="icon" />
                <span v-html="$t(tip.text)" />
              </li>
            </ul>
          </div>
          <UiWheel class="wheel" wheelType="active" />
        </div>
      </div>

      <CPicture
        src="/images/hero/main.jpg"
        loading="eager"
        class="background"
        :sources="{
          sm: '/images/hero/main-sm.jpg',
        }"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-hero {
  overflow: visible;
  padding-top: em(60);
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    overflow: hidden;
    padding: em(12) 0 0;
    margin-bottom: em(64);
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;

    .main {
      width: em(600);
      margin-bottom: em(80);

      @include media-breakpoint-down(sm) {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
      }

      .logo {
        width: em(406);
        height: em(40);

        @include media-breakpoint-down(sm) {
          order: 1;
          width: em(262);
          height: em(30);
        }
      }

      .heading {
        margin-top: em(96);
        padding-bottom: em(6);

        @include media-breakpoint-down(sm) {
          order: 2;
          margin-top: em(40);
          padding-bottom: 0;
        }

        .heading-text {
          line-height: 1;
          font-size: em(84);
          font-weight: $font-weight-semi-bold;

          @include media-breakpoint-down(sm) {
            font-size: em(32);
            font-weight: $font-weight-semi-bold;
            line-height: 1.15;
          }
        }

        .dot {
          width: em(46);
          height: em(46);
          flex-shrink: 0;
          margin-left: em(10);

          @include media-breakpoint-down(sm) {
            width: em(16);
            height: em(16);
            margin-left: em(5);
            margin-bottom: 0;
          }

          html[lang='ar'] & {
            margin-left: 0;
            margin-right: em(10);

            @include media-breakpoint-down(sm) {
              margin-right: em(5);
            }
          }
        }
      }

      .subtitle {
        margin-top: em(48);

        @include media-breakpoint-down(sm) {
          order: 3;
          margin-top: em(12);
        }

        span {
          color: $color-black;
          font-size: em(36);
          font-weight: $font-weight-semi-bold;
          line-height: 115%;

          @include media-breakpoint-down(sm) {
            color: $color-white;
            font-size: em(16);
            font-weight: $font-weight-medium;
            line-height: 1.09;
          }
        }
      }

      .button-container {
        display: inline-flex;
        flex-direction: column;
        gap: em(4);
        margin-top: em(24);
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
            color: $color-black;
            font-size: em(14);
            font-weight: $font-weight-regular;
            line-height: 115%;
          }
        }
      }

      .trust {
        width: 100%;
        border-top: em(2) solid #a9a9a9;
        margin-top: em(36);
        padding-top: em(40);
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        gap: em(20);

        @include media-breakpoint-down(sm) {
          order: 6;
          width: 100%;
          border: none;
          padding-top: 0;
          margin-top: 0;
          flex-direction: column;
          align-items: center;
          gap: em(12);
        }

        .trust-text {
          text-align: right;
          margin-bottom: em(13);

          @include media-breakpoint-down(sm) {
            margin-bottom: 0;
          }

          span {
            display: block;
            color: #040714;
            font-size: em(20);
            font-weight: $font-weight-regular;

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
          gap: em(8);

          @include media-breakpoint-down(sm) {
            flex-direction: row;
            gap: em(16);
          }

          .trustpilot {
            width: em(123);
            height: auto;
            margin-left: auto;

            @include media-breakpoint-down(sm) {
              width: em(102);
              height: em(27);
            }
          }

          .stars {
            width: em(217);
            height: auto;

            @include media-breakpoint-down(sm) {
              width: em(141);
              height: em(28);
            }
          }
        }
      }

      .event {
        position: absolute;
        top: em(140);
        left: em(800);
        width: em(283);
        display: flex;
        flex-direction: column;
        color: $color-white;

        @include media-breakpoint-down(sm) {
          order: 5;
          position: relative;
          top: 0;
          left: 0;
          width: auto;
          margin-top: em(20);
          margin-bottom: em(56);
        }

        html[dir='rtl'] & {
          left: auto;
          right: em(744);

          @include media-breakpoint-down(sm) {
            left: auto;
            right: 0;
          }
        }

        .caption {
          span {
            font-size: em(32);
            font-weight: $font-weight-semi-bold;
            line-height: 1.096;

            @include media-breakpoint-down(sm) {
              font-size: em(16);
              font-weight: $font-weight-semi-bold;
              line-height: 1.096;
            }
          }
        }

        .list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: em(45);
          margin-top: em(64);
          width: em(105);

          @include media-breakpoint-down(sm) {
            flex-direction: row;
            justify-content: space-between;
            gap: em(24);
            width: 100%;
            padding: 0;
            margin-top: 0;
          }

          .item {
            color: $color-white;
            display: flex;
            flex-direction: column;
            gap: em(20);

            @include media-breakpoint-down(sm) {
              position: relative;
              flex-shrink: 0;
              gap: em(10);
              width: em(80);
              align-items: center;
            }

            .icon {
              width: em(35);
              height: em(35);

              @include media-breakpoint-down(sm) {
                width: em(24);
                height: em(24);
              }
            }

            span {
              font-size: em(24);
              font-weight: $font-weight-medium;
              line-height: 112.5%;

              @include media-breakpoint-down(sm) {
                font-size: em(14);
                font-weight: $font-weight-regular;
                text-align: center;
              }
            }
          }
        }
      }

      .wheel {
        position: absolute;
        top: em(100);
        right: 0;

        @include media-breakpoint-down(sm) {
          margin-top: em(18);
          position: relative;
          top: 0;
          right: 0;
          order: 4;
          margin-inline: auto;
        }
      }
    }
  }

  .background {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: em(1060);
    height: em(950);

    @include media-breakpoint-down(sm) {
      margin-top: em(52);
      height: calc(100% - em(137));
      width: 100%;
      left: 0;
    }
  }
}
</style>
