<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { scrollToWheel } = useScroll();
const currentTime = ref(45 * 60); // 45 minutes in seconds
const isChanged = ref([false, false, false]);
let timer = null;

const durationArray = computed(() => {
  const totalSeconds = currentTime.value;
  
  if (totalSeconds <= 0) {
    // Timer has reached 0, stop the countdown
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    
    return [
      {
        label: 'Hours',
        value: 0,
      },
      {
        label: 'Minutes',
        value: 0,
      },
      {
        label: 'Seconds',
        value: 0,
      },
    ];
  }

  const newValues = [
    Math.floor(totalSeconds / 3600),
    Math.floor((totalSeconds % 3600) / 60),
    totalSeconds % 60,
  ];

  // Check for changes and set timeouts
  newValues.forEach((value, index) => {
    if (value !== durationArray.value?.[index]?.value) {
      isChanged.value[index] = true;
      setTimeout(() => {
        isChanged.value[index] = false;
      }, 500);
    }
  });

  return [
    {
      label: 'Hours',
      value: newValues[0],
    },
    {
      label: 'Minutes',
      value: newValues[1],
    },
    {
      label: 'Seconds',
      value: newValues[2],
    },
  ];
});

onMounted(() => {
  // Start countdown timer - decrease every second
  timer = setInterval(() => {
    if (currentTime.value > 0) {
      currentTime.value--;
    } else {
      // Timer reached 0, clear the interval
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <section class="section-merit">
    <div class="container">
      <div class="cards">
        <div class="card">
          <div class="header">
            <UiGradientText class="heading">
              <span
                class="heading-text"
                v-html="$t('meritSection.cards.0.title')"
              />
              <span class="square-dot" />
            </UiGradientText>
          </div>
          <div class="divider hidden-mobile" />
          <div class="content">
            <div class="text">
              <span v-html="$t('meritSection.cards.0.text')" />
            </div>
            <ClientOnly>
              <div class="time-duration">
                <div class="time">
                  <UiGradientText class="number">
                    {{
                      durationArray[0].value < 10
                        ? `0${durationArray[0].value}`
                        : durationArray[0].value
                    }}
                  </UiGradientText>
                  <p class="unit">{{ $t('common.hours') }}</p>
                </div>
                <UiGradientText class="colon">
                  <span> : </span>
                </UiGradientText>
                <div class="time">
                  <UiGradientText class="number">
                    {{
                      durationArray[1].value < 10
                        ? `0${durationArray[1].value}`
                        : durationArray[1].value
                    }}
                  </UiGradientText>
                  <p class="unit">{{ $t('common.mins') }}</p>
                </div>
                <UiGradientText class="colon">
                  <span> : </span>
                </UiGradientText>
                <div class="time">
                  <UiGradientText class="number">
                    {{
                      durationArray[2].value < 10
                        ? `0${durationArray[2].value}`
                        : durationArray[2].value
                    }}
                  </UiGradientText>
                  <p class="unit">{{ $t('common.secs') }}</p>
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
        <div class="divider hidden-desktop" />
        <div class="card">
          <div class="header">
            <UiGradientText class="heading">
              <span
                class="heading-text"
                v-html="$t('meritSection.cards.1.title')"
              />
              <span class="square-dot" />
            </UiGradientText>
          </div>
          <div class="divider hidden-mobile" />
          <div class="content">
            <div class="text">
              <span v-html="$t('meritSection.cards.1.text')" />
            </div>
            <UiGradientText class="subtitle">
              <span v-html="$t('meritSection.cards.1.subtitle')" />
            </UiGradientText>
            <div class="button-wrapper">
              <UiButton
                theme="red"
                class="button"
                :text="$t('common.btnSpin')"
                @click="scrollToWheel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-merit {
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(64);
  }

  .cards {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: em(20);

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      gap: 0;
    }

    .divider {
      width: 100%;
      height: em(4);
      background: linear-gradient(270deg, #c30044 20.55%, #13151d 100%);
    }

    .card {
      width: em(785);
      border: em(1) solid $color-black-999;

      @include media-breakpoint-down(sm) {
        width: 100%;
        border-bottom: none;
      }

      &:last-child {
        background-image: url('/images/merit/dot.svg');
        background-repeat: repeat;
        background-position: em(4) 0;
        background-size: em(20);

        @include media-breakpoint-down(sm) {
          border-top: none;
          border-bottom: em(1) solid $color-black-999;
          background-size: em(12);
        }
      }

      .header {
        height: em(265);
        padding: em(32) em(36) em(32);

        @include media-breakpoint-down(sm) {
          height: auto;
          padding: em(24) em(60) 0;
        }

        .heading {
          padding-bottom: em(10);
          @include media-breakpoint-down(sm) {
            text-align: center;
          }

          .heading-text {
            font-size: em(96);
            font-weight: $font-weight-semi-bold;
            line-height: 100%;

            @include media-breakpoint-down(sm) {
              font-size: em(32);
              line-height: 1.15;
            }
          }

          .square-dot {
            width: em(50);
            height: em(50);
            margin-left: em(8);

            @include media-breakpoint-down(sm) {
              width: em(16);
              height: em(16);
              margin-left: em(4);
            }
          }
        }
      }

      .content {
        padding: em(60) em(40) em(36);

        @include media-breakpoint-down(sm) {
          padding: em(10) em(20) em(24) em(20);
          text-align: center;
        }

        .text {
          @include media-breakpoint-down(sm) {
            text-align: center;
          }

          span {
            color: $color-black-999;
            font-size: em(24);
            font-weight: $font-weight-medium;
            line-height: 100%;

            @include media-breakpoint-down(sm) {
              font-size: em(16);
              font-weight: $font-weight-regular;
            }
          }
        }

        .time-duration {
          color: $color-black;
          display: flex;
          flex-direction: row;
          align-items: start;
          gap: em(8);
          margin-top: em(24);
          margin-bottom: em(80);

          @include media-breakpoint-down(sm) {
            width: fit-content;
            margin-inline: auto;
            gap: em(4);
            margin-top: em(12);
            margin-bottom: 0;
          }

          html[dir='rtl'] & {
            margin-left: auto;
            display: inline-flex;
            flex-direction: row-reverse;

            @include media-breakpoint-down(sm) {
              margin-inline: auto;
            }
          }

          .time {
            display: flex;
            flex-direction: column;

            .number {
              font-variant-numeric: lining-nums tabular-nums;
              font-feature-settings: 'case' on;
              font-size: em(90);
              font-weight: $font-weight-semi-bold;

              @include media-breakpoint-down(sm) {
                font-size: em(48);
                line-height: 1.2;
              }
            }

            .unit {
              text-align: center;
              font-variant-numeric: lining-nums tabular-nums;
              font-size: em(16);
              font-weight: $font-weight-medium;
              line-height: 1.4;

              @include media-breakpoint-down(sm) {
                font-size: em(14);
                line-height: 1;
              }
            }
          }

          .colon {
            padding-top: em(32);

            @include media-breakpoint-down(sm) {
              padding-top: em(4);
            }

            span {
              font-variant-numeric: lining-nums tabular-nums;
              font-feature-settings: 'case' on;
              font-size: em(32);
              font-weight: $font-weight-semi-bold;
              line-height: 1.4;

              @include media-breakpoint-down(sm) {
                font-size: em(32);
              }
            }
          }
        }

        .subtitle {
          margin-top: em(48);

          @include media-breakpoint-down(sm) {
            margin-top: em(20);
            width: em(270);
            margin-inline: auto;
            text-align: center;
          }

          span {
            font-size: em(32);
            font-weight: $font-weight-semi-bold;
            line-height: 100%;

            @include media-breakpoint-down(sm) {
              font-size: em(24);
            }
          }
        }

        .button-wrapper {
          margin-top: em(54);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: em(8);

          @include media-breakpoint-down(sm) {
            margin-top: em(30);
          }

          .button {
            flex-shrink: 0;
          }
        }
      }
    }
  }
}
</style>
