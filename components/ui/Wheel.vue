<script setup>
import { ref, watch } from 'vue';
import { prizes } from '@/configs/prizes';

const { scrollToWheel } = useScroll();
const { canSpin, decreaseSpinCount } = useSpinCount();

const isFormOpen = ref(false);
const isErrorOpen = ref(false);
const isOwn = ref(false);
const prize = ref(null);
const panel = ref(null);
const store = useGlobalStore();
const isSpinning = computed(() => store.getIsSpinning);

let animation;
let previousEndDegree = 0;

watch(isSpinning, async (newVal) => {
  if (!newVal) return;
  if (props.wheelType === 'active') {
    await spinWheel(); // Wait for the animation to finish
  }
});

const props = defineProps({
  wheelType: {
    type: String,
    default: 'active',
    validator(value) {
      const wheelTypes = ['active', 'passive'];

      return wheelTypes.includes(value);
    },
  },
});

async function spinWheel() {
  // Check if user can still spin
  if (!canSpin.value) {
    isErrorOpen.value = true;
    return;
  }

  // Decrease spin count
  decreaseSpinCount();

  const posRandom = Math.random();
  let degRandom = 0;

  for (let i = 0; i < prizes.length; i++) {
    if (
      posRandom <
      prizes.slice(0, i + 1).reduce((acc, curr) => acc + curr.possibility, 0)
    ) {
      degRandom = prizes[i].pos;
      prize.value = prizes[i];
      break;
    }
  }

  const randomAdditionalDegrees = degRandom + 1800;
  const newEndDegree = previousEndDegree + randomAdditionalDegrees;

  animation = panel.value.animate(
    [
      { transform: `rotate(${previousEndDegree}deg)` },
      { transform: `rotate(${newEndDegree}deg)` },
    ],
    {
      duration: 4000,
      direction: 'normal',
      easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
      fill: 'forwards',
      iterations: 1,
    },
  );

  // Return a Promise that resolves when the animation finishes
  return new Promise((resolve) => {
    animation.onfinish = () => {
      previousEndDegree = 0;

      setTimeout(() => {
        isFormOpen.value = true;
        store.setIsSpinning(false);
      }, 800);
      resolve();
    };
  });
}

function handleSpin() {
  if (props.wheelType === 'active') {
    isOwn.value = true;
    store.setIsSpinning(true);
  } else {
    scrollToWheel();
  }
}
</script>

<template>
  <div>
    <div class="ui-wheel">
      <div ref="panel" class="panel">
        <CPicture
          :src="'/images/wheel/wheel.png'"
          alt="wheel"
          class="panel-img"
        />
        <ul class="items">
          <li class="item">
            <span class="item-1" v-html="$t('common.wheel.prizes[0]')" />
          </li>
          <li class="item">
            <span class="item-1" v-html="$t('common.wheel.prizes[1]')" />
          </li>
          <li class="item">
            <span class="item-2" v-html="$t('common.wheel.prizes[2]')" />
          </li>
          <li class="item">
            <span class="item-3" v-html="$t('common.wheel.prizes[3]')" />
          </li>
          <li class="item">
            <span class="item-4" v-html="$t('common.wheel.prizes[4]')" />
          </li>
          <li class="item">
            <span class="item-3" v-html="$t('common.wheel.prizes[5]')" />
          </li>
          <li class="item">
            <span class="item-5" v-html="$t('common.wheel.prizes[6]')" />
          </li>
          <li class="item">
            <span class="item-3" v-html="$t('common.wheel.prizes[7]')" />
          </li>
        </ul>
      </div>
      <CPicture :src="'/images/wheel/ring.svg'" alt="wheel" class="ring" />
      <div
        class="spin-btn"
        :class="{ 'is-spinning': isSpinning }"
        id="spin_btn"
        @click="handleSpin"
      >
        <img src="/images/wheel/btn.png" alt="wheel" class="spin-img" />
        <span class="spin-text" v-html="$t('common.wheel.spin')" />
      </div>
    </div>
    <UiForm v-if="isFormOpen" :prize="prize" @close="isFormOpen = false" />
    <UiFormError v-if="isErrorOpen" @close="isErrorOpen = false" />
  </div>
</template>

<style scoped lang="scss">
.ui-wheel {
  --_items: 8;
  all: unset;
  aspect-ratio: 1 / 1;
  container-type: inline-size;
  direction: ltr;
  display: grid;
  position: relative;
  width: 100%;
  width: em(600);
  height: auto;

  @include media-breakpoint-down(sm) {
    width: em(316);
  }

  & > * {
    position: absolute;
  }

  .ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .spin-btn {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: em(160);
    height: em(161);

    @include media-breakpoint-down(sm) {
      width: em(84);
      height: em(84);
    }

    .spin-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .spin-text {
      color: $color-white;
      text-align: center;
      font-size: em(32);
      font-weight: $font-weight-semi-bold;
      line-height: 1.0625;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }

    &.is-spinning {
      cursor: not-allowed;
    }
  }

  .panel {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .panel-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: em(564);
      height: em(564);

      @include media-breakpoint-down(sm) {
        width: em(300);
        height: em(300);
      }
    }

    .items {
      all: unset;
      clip-path: inset(0 0 0 0 round 50%);
      display: grid;
      inset: 0;
      place-content: center end;
      width: 100%;
      height: 100%;

      .item {
        color: $color-white;
        align-content: center;
        aspect-ratio: 1 / calc(2 * tan(180deg / var(--_items)));
        clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
        display: grid;
        grid-area: 1 / -1;
        padding-left: em(108);
        padding-right: em(32);
        margin-top: em(-12);
        rotate: calc(360deg / var(--_items) * calc(var(--_idx) - 1));
        transform-origin: center left;
        user-select: none;
        width: 50cqi;

        @include media-breakpoint-down(sm) {
          padding-left: em(56);
          padding-right: em(20);
          margin-top: em(-12);
        }

        .item-1 {
          font-size: em(14);
          font-weight: $font-weight-medium;
          line-height: 1;

          @include media-breakpoint-down(sm) {
            font-size: em(7);
          }

          &:deep(strong) {
            font-weight: $font-weight-bold;
            font-size: em(32);
          }
        }

        .item-2 {
          font-weight: $font-weight-bold;
          font-size: em(22);
          letter-spacing: -0.01em;
          line-height: 1.1;

          @include media-breakpoint-down(sm) {
            font-size: em(12);
          }
        }

        .item-3 {
          font-weight: $font-weight-bold;
          font-size: em(22);
          line-height: 1;

          @include media-breakpoint-down(sm) {
            font-size: em(12);
          }
        }

        .item-4 {
          font-weight: $font-weight-bold;
          font-size: em(19);
          line-height: 1.1;

          @include media-breakpoint-down(sm) {
            font-size: em(10);
          }
        }

        .item-5 {
          font-weight: $font-weight-bold;
          font-size: em(18);
          line-height: 1.15;

          @include media-breakpoint-down(sm) {
            font-size: em(9);
          }
        }

        &:nth-of-type(1) {
          --_idx: 1;
        }
        &:nth-of-type(2) {
          --_idx: 2;
        }
        &:nth-of-type(3) {
          --_idx: 3;
        }
        &:nth-of-type(4) {
          --_idx: 4;
        }
        &:nth-of-type(5) {
          --_idx: 5;
        }
        &:nth-of-type(6) {
          --_idx: 6;
        }
        &:nth-of-type(7) {
          --_idx: 7;
        }
        &:nth-of-type(8) {
          --_idx: 8;
        }
      }
    }
  }
}
</style>

<style>
.swal2-icon {
  font-size: 0.8em !important;
}

.swal2-title {
  font-size: 2em !important;
}
</style>
