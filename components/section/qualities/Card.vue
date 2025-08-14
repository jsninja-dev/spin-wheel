<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  gradient: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="qualities-card" :class="`qualities-card--${id}`">
    <CPicture
      src="/images/qualities/icons/gradient-horizontal.png"
      alt=""
      class="gradient"
      :class="`gradient--${id}`"
    />
    <div class="content">
      <div class="id">
        <span v-html="id" />
      </div>
      <div class="title">
        <span v-html="$t(title)" />
      </div>
      <div class="text">
        <span v-html="$t(text)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qualities-card {
  position: relative;
  overflow: hidden;

  &--1 {
    background: linear-gradient(215deg, #000 50.26%, #608ceb 126.18%);
  }

  &--2 {
    background: linear-gradient(104deg, #000 31.22%, #608ceb 158.98%);
  }

  &--3 {
    background: linear-gradient(145deg, #000 50.26%, #608ceb 126.18%);
  }

  .gradient {
    position: absolute;
    width: 100%;
    height: em(152);

    &--1 {
      left: 0;
      bottom: 0;
    }

    &--2 {
      bottom: 0;
      left: 100%;
      transform: rotate(-90deg) translateY(-100%);
      transform-origin: em(76) em(76);
    }

    &--3 {
      bottom: 0;
      left: 0;
      transform: scaleX(-1);
    }
  }

  .content {
    color: $color-white;
    position: relative;
    width: 100%;
    height: 100%;
    padding: em(24) em(30);
    z-index: 1;

    @include media-breakpoint-down(sm) {
      padding: em(20) em(20);
    }

    .id {
      margin-bottom: em(48);
      span {
        color: $color-red-700;
        font-size: em(36);
        font-weight: $font-weight-semi-bold;
        line-height: 123.358%; /* 44.409px */

        @include media-breakpoint-down(sm) {
          font-size: em(48);
        }
      }
    }

    .title {
      span {
        color: $color-white;
        font-size: em(18);
        font-weight: $font-weight-semi-bold;
        line-height: 123.358%; /* 22.205px */

        @include media-breakpoint-down(sm) {
          font-size: em(16);
        }
      }
    }

    .text {
      span {
        font-size: em(18);
        font-weight: $font-weight-light;
        line-height: 123.358%; /* 22.205px */

        @include media-breakpoint-down(sm) {
          font-size: em(16);
        }
      }
    }
  }
}
</style>
