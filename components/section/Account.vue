<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

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
  <section class="section-account">
    <div class="container">
      <div class="content">
        <CPicture src="/images/account/main.jpg" class="picture" />
        <UiGradientText class="heading" gradient="white">
          <span class="heading-text" v-html="$t('accountSection.title')" />
          <span class="square-dot" />
        </UiGradientText>
        <UiWheel class="wheel" wheelType="passive" />
        <ClientOnly>
          <div class="time-duration">
            <div class="time">
              <div class="number" :class="{ 'number-changed': isChanged[0] }">
                {{
                  durationArray[0].value < 10
                    ? `0${durationArray[0].value}`
                    : durationArray[0].value
                }}
              </div>
              <p class="unit">{{ $t('common.hours') }}</p>
            </div>
            <div class="colon">
              <span> : </span>
            </div>
            <div class="time">
              <div class="number" :class="{ 'number-changed': isChanged[1] }">
                {{
                  durationArray[1].value < 10
                    ? `0${durationArray[1].value}`
                    : durationArray[1].value
                }}
              </div>
              <p class="unit">{{ $t('common.mins') }}</p>
            </div>
            <div class="colon">
              <span> : </span>
            </div>
            <div class="time">
              <div class="number" :class="{ 'number-changed': isChanged[2] }">
                {{
                  durationArray[2].value < 10
                    ? `0${durationArray[2].value}`
                    : durationArray[2].value
                }}
              </div>
              <p class="unit">{{ $t('common.secs') }}</p>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-account {
  margin-bottom: em(160);

  @include media-breakpoint-down(sm) {
    margin-bottom: em(64);
  }

  .content {
    position: relative;
    padding-block: em(84);
    display: flex;
    align-items: center;
    justify-content: center;

    .picture {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;

      html[dir='rtl'] & {
        transform: scaleX(-1);
      }
    }

    .heading {
      position: absolute;
      top: 50%;
      left: em(54);
      width: em(372);
      transform: translateY(-50%);
      padding-bottom: em(10);

      html[dir='rtl'] & {
        left: auto;
        right: em(54);
      }

      .heading-text {
        font-size: em(96);
        font-weight: $font-weight-semi-bold;
        line-height: 1;
      }

      .square-dot {
        width: em(50);
        height: em(50);
        margin-left: em(8);

        html[dir='rtl'] & {
          margin-left: 0;
          margin-right: em(8);
        }
      }
    }

    .time-duration {
      position: absolute;
      top: 50%;
      right: em(42);
      transform: translateY(-50%);
      color: $color-white;
      display: flex;
      flex-direction: row;
      align-items: start;
      gap: em(8);

      @include media-breakpoint-down(sm) {
        width: fit-content;
        margin-inline: auto;
        gap: em(4);
        margin-top: em(12);
        margin-bottom: 0;
      }

      html[dir='rtl'] & {
        right: auto;
        left: em(42);
        flex-direction: row-reverse;
      }

      .time {
        display: flex;
        flex-direction: column;

        .number-changed {
          color: #ff3366;
          transition: color 0.5s ease;
        }

        .number {
          transition: color 0.5s ease;
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
  }
}
</style>
