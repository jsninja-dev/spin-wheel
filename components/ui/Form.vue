<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import links from '@/constants/links';
import breakpoints from '@/configs/breakpoints';

const { getUrlWithUtm, hasUtmParameters } = useUtm();

const props = defineProps({
  prize: {
    type: Object,
    required: true,
  },
});

// Spin count management
const { spinCount, refreshSpinCount } = useSpinCount();

const link = computed(() => {
  if (props.prize.name === '100bonus') {
    return getUrlWithUtm(links.BONUS_100);
  }

  if (props.prize.name === '25bonus') {
    return getUrlWithUtm(links.BONUS_25);
  }

  if (props.prize.name === 'session') {
    return getUrlWithUtm(links.SESSION);
  }

  return '#';
});

const emit = defineEmits(['close']);

const closeForm = () => {
  emit('close');
};

const handleBackdropClick = (event) => {
  // if (event.target.classList.contains('ui-form-container') && spinCount > 0) {
  if (event.target.classList.contains('ui-form-container')) {
    closeForm();
  }
};

// Prevent body scroll when form is open
onMounted(() => {
  document.body.style.overflow = 'hidden';

  if (window.innerWidth > breakpoints.sm) {
    document.body.style.paddingRight = '15px';
  }
  // Refresh spin count to ensure we have the latest value
  refreshSpinCount();
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
          <UiGradientText class="header">
            <span class="header-text">
              {{ $t('common.form.header') }}
            </span>
            <div class="square-dot" />
          </UiGradientText>
          <div class="content">
            <div class="title">
              <span>{{ $t('common.form.text') }}</span>
              <span>{{ $t(prize.title) }}</span>
            </div>
          </div>
          <div class="footer">
            <UiButton
              class="btn clam-btn"
              theme="red"
              :to="link"
              :target="link ? '_blank' : '_self'"
              @click="closeForm"
            >
              <span>{{ $t('common.form.claimBtn') }}</span>
            </UiButton>
            <UiButton
              class="btn spin-btn"
              theme="red-outline"
              @click="closeForm"
              :disabled="spinCount === 0"
            >
              <span class="main-text">{{ $t('common.form.spinBtn') }}</span>
              <span class="sub-text"
                >({{ spinCount }} {{ $t('common.form.spinLeft') }})</span
              >
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
    width: em(512);
    padding: em(40) em(60);
    background-color: $color-white;

    @include media-breakpoint-down(sm) {
      width: calc(100% - em(40));
      padding: em(20) em(32);
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    .header {
      text-align: center;
      padding-bottom: em(8);

      .header-text {
        font-size: em(32);
        font-weight: $font-weight-semi-bold;
        line-height: 100%; /* 32px */

        @include media-breakpoint-down(sm) {
          font-size: em(24);
        }
      }

      .square-dot {
        width: em(16);
        height: em(16);
        margin-left: em(4);

        @include media-breakpoint-down(sm) {
          width: em(12);
          height: em(12);
          margin-left: em(2);
        }
      }
    }

    .content {
      margin-top: em(44);

      @include media-breakpoint-down(sm) {
        margin-top: em(16);
      }

      .title {
        text-align: center;
        background: linear-gradient(273deg, #608ceb 6.46%, #040714 95.55%);
        color: transparent;
        background-clip: text;
        background-size: cover;
        padding-top: em(8);
        padding-bottom: em(8);

        span {
          display: block;
          font-size: em(40);
          font-weight: $font-weight-semi-bold;
          line-height: 100%; /* 24px */

          @include media-breakpoint-down(sm) {
            font-size: em(28);
          }
        }
      }
    }

    .footer {
      margin-top: em(52);
      display: flex;
      justify-content: space-between;
      gap: em(8);

      @include media-breakpoint-down(sm) {
        margin-top: em(24);
      }

      .btn {
        width: em(189);
        height: em(69);
        flex-direction: column;
        border-radius: em(3);

        @include media-breakpoint-down(sm) {
          width: em(160);
          height: em(48);
        }
      }

      .clam-btn {
        span {
          font-size: em(22);
          font-weight: $font-weight-medium;

          @include media-breakpoint-down(sm) {
            font-size: em(16);
          }
        }
      }

      .spin-btn {
        .main-text {
          display: block;
          font-size: em(22);
          font-weight: $font-weight-medium;
          line-height: 130%; /* 22px */

          @include media-breakpoint-down(sm) {
            font-size: em(16);
          }
        }

        .sub-text {
          display: block;
          font-size: em(16);
          font-weight: $font-weight-medium;
          line-height: 130%; /* 22px */

          @include media-breakpoint-down(sm) {
            font-size: em(12);
          }
        }
      }
    }
  }
}
</style>
