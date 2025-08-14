<script setup>
import { computed } from 'vue';

const { tm, rt } = useI18n();

function getTextArray(text) {
  return tm(text).map(rt);
}

const titleArray = computed(() => {
  return tm('tradesSection.cardTitles').map(rt);
});

defineProps({
  id: {
    type: Number,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="trades-card" :class="`trades-card--${id}`">
    <CPicture
      :src="card"
      alt=""
      loading="lazy"
      class="picture"
      :class="`picture--${id}`"
    />
    <div class="content">
      <div
        v-for="(item, index) in getTextArray(text)"
        :key="index"
        class="item"
      >
        <div class="title">
          <span v-html="titleArray[index]" />
        </div>
        <div class="text">
          <span v-html="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.trades-card {
  position: relative;
  overflow: hidden;
  color: $color-black-999;

  &--1 {
    color: $color-white;
    background: $color-black-999;
  }

  &--2 {
    background: $color-grey-100;
  }

  &--3 {
    background: linear-gradient(152deg, #c5cbd5 18.41%, #ff9494 82.75%);

    @include media-breakpoint-down(sm) {
      color: $color-white;
    }
  }

  &--4 {
    background: $color-white;
    border: em(1) solid $color-grey-400;
  }

  &--5 {
    color: $color-white;
    background: $color-red-700;
  }

  &--6 {
    background: linear-gradient(136deg, #ededed 22.21%, #608ceb 113.96%);

    @include media-breakpoint-down(sm) {
      background: linear-gradient(163deg, #C5CBD5 0%, #608CEB 134.77%);
      color: $color-white;
    }
  }

  .picture {
    position: absolute;
    bottom: 0;
    right: 0;

    @include media-breakpoint-down(sm) {
      transform: scale(0.37);
      transform-origin: bottom right;
    }

    html[dir='rtl'] & {
      right: auto;
      left: 0;
      transform: scaleX(-1);

      @include media-breakpoint-down(sm) {
        transform: scaleX(-0.37) scaleY(0.37) translate(-100%, 0%);
        transform-origin: bottom left;
      }
    }

    &--1 {
      width: em(414);
      height: em(357);
    }

    &--2 {
      width: em(339);
      height: em(396);
    }

    &--3 {
      width: em(495);
      height: em(246);
    }

    &--4 {
      width: em(513);
      height: em(229);
    }

    &--5 {
      width: em(262);
      height: em(348);
    }

    &--6 {
      width: em(300);
      height: em(320);
    }
  }

  .content {
    position: relative;
    padding: em(60) em(30);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: em(48);
    z-index: 2;

    @include media-breakpoint-down(sm) {
      padding: em(10) em(10);
      gap: em(16);
    }
  }

  .title {
    margin-bottom: em(8);

    @include media-breakpoint-down(sm) {
      margin-bottom: 0;
    }

    span {
      font-size: em(24);
      font-weight: $font-weight-light;

      @include media-breakpoint-down(sm) {
        font-size: em(16);
      }
    }
  }

  .text {
    span {
      display: block;
      font-size: em(50);
      font-weight: $font-weight-semi-bold;
      line-height: 100%;

      @include media-breakpoint-down(sm) {
        font-size: em(25);
      }
    }
  }
}
</style>
