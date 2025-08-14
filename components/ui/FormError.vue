<script setup>
import { onMounted, onUnmounted } from 'vue';
import breakpoints from '@/configs/breakpoints';

const emit = defineEmits(['close']);

const closeForm = () => {
  emit('close');
};

const handleBackdropClick = (event) => {
  if (event.target.classList.contains('ui-form-container')) {
    closeForm();
  }
};

onMounted(() => {
  document.body.style.overflow = 'hidden';

  if (window.innerWidth > breakpoints.sm) {
    document.body.style.paddingRight = '15px';
  }
});

onUnmounted(() => {
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('padding-right');
});
</script>

<template>
  <Transition name="form-fade" appear>
    <div class="ui-form-container" @click="handleBackdropClick">
      <Transition name="form-slide" appear>
        <div class="form">
          <div class="icon">
            <span class="left-cross" />
            <span class="right-cross" />
          </div>
          <div class="content">
            <div class="title">
              <span>{{ $t('common.spinError.title') }}</span>
            </div>
            <div class="text">
              <span>{{ $t('common.spinError.text') }}</span>
            </div>
          </div>
          <div class="footer">
            <UiButton class="btn clam-btn" theme="red" @click="closeForm">
              <span>{{ $t('common.spinError.button') }}</span>
            </UiButton>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
/* Transition animations */
.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.3s ease;
}

.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
}

.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.95);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px) scale(0.95);
}

.ui-form-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: hidden;

  .form {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: em(640);
    padding: em(40) em(60);
    background-color: $color-white;

    @include media-breakpoint-down(sm) {
      width: calc(100% - em(40));
      padding: em(20) em(32);
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    .icon {
      color: $color-red-700;
      width: em(102);
      height: em(102);
      border-radius: 50%;
      border: em(4) solid $color-red-700;
      margin-inline: auto;
      cursor: default;
      position: relative;

      @include media-breakpoint-down(sm) {
        width: em(64);
        height: em(64);
        border-width: em(4);
      }

      .left-cross {
        position: absolute;
        top: calc(50% - em(3));
        left: 20%;
        width: 60%;
        height: em(6);
        background-color: $color-red-700;
        transform: rotate(45deg);
      }

      .right-cross {
        position: absolute;
        top: calc(50% - em(3));
        left: 20%;
        width: 60%;
        height: em(6);
        background-color: $color-red-700;
        transform: rotate(-45deg);
      }
    }

    .content {
      margin-top: em(32);

      @include media-breakpoint-down(sm) {
        margin-top: em(16);
      }

      .title {
        text-align: center;
        padding-bottom: em(8);

        span {
          display: block;
          color: $color-black-800;
          font-size: em(48);
          font-weight: $font-weight-semi-bold;
          line-height: 100%; /* 24px */

          @include media-breakpoint-down(sm) {
            font-size: em(24);
          }
        }
      }

      .text {
        margin-top: em(24);
        text-align: center;
        padding-bottom: em(8);

        @include media-breakpoint-down(sm) {
          margin-top: em(12);
        }

        span {
          color: $color-grey-700;
          display: block;
          font-size: em(24);
          font-weight: $font-weight-semi-bold;
          line-height: 100%; /* 24px */

          @include media-breakpoint-down(sm) {
            font-size: em(16);
          }
        }
      }
    }

    .footer {
      margin-top: em(32);
      display: flex;
      justify-content: center;
      gap: em(8);

      @include media-breakpoint-down(sm) {
        margin-top: em(16);
      }

      .btn {
        width: em(189);
        height: em(69);
        border-radius: em(3);

        @include media-breakpoint-down(sm) {
          width: em(160);
          height: em(48);
        }

        span {
          font-size: em(22);
          font-weight: $font-weight-medium;

          @include media-breakpoint-down(sm) {
            font-size: em(16);
          }
        }
      }
    }
  }
}
</style>
