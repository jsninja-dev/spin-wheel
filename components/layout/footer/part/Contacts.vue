<script setup>
import links from '@/constants/links';

const socials = [
  {
    title: 'facebook',
    iconName: 'facebook',
    link: links.FACEBOOK,
  },
  {
    title: 'x',
    iconName: 'x',
    link: links.X,
  },
  {
    title: 'linked-in',
    iconName: 'linked-in',
    link: links.LINKEDIN,
  },
  {
    title: 'instagram',
    iconName: 'instagram',
    link: links.INSTAGRAM,
  },
  {
    title: 'telegram',
    iconName: 'telegram',
    link: links.TELEGRAM,
  },
  {
    title: 'youtube',
    iconName: 'youtube',
    link: links.YOUTUBE,
  },
];
</script>

<template>
  <section class="layout-footer-contacts">
    <div class="wrapper">
      <div class="logo">
        <img src="/images/logo.svg" :alt="$t('alt.logo2')" class="icon" />

        <div class="copyright">
          <span>
            {{ $t('footer.contacts.copyright') }}
          </span>
        </div>
      </div>

      <div class="socials-wrapper">
        <div class="socials-text">
          <span>
            {{ $t('footer.contacts.findUs') }}
          </span>
        </div>

        <div class="socials">
          <a
            v-for="(social, index) in socials"
            :key="index"
            :href="social.link"
            target="_blank"
            class="social"
          >
            <CPicture
              :src="`/images/socials/${social.iconName}.svg`"
              :alt="social.title"
              loading="lazy"
              :class="`icon--${social.iconName}`"
            />
          </a>
        </div>
      </div>

      <div class="hidden-desktop divider"></div>

      <div class="address-wrapper">
        <div class="address">
          <span>
            {{ $t('footer.contacts.address') }}
          </span>
        </div>

        <UiButton
          :to="links.CONTACT_US"
          target="_blank"
          theme="red-outline"
          custom-size
          class="button"
        >
          <span>
            {{ $t('footer.contacts.contactUs') }}
          </span>
        </UiButton>
      </div>
    </div>

    <div class="hidden-mobile divider"></div>

    <div class="select-lang">
      <UiSelectLang />
    </div>
  </section>
</template>

<style scoped lang="scss">
.layout-footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: em(30);
  overflow: visible;

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    @include media-breakpoint-down(sm) {
      order: 2;
    }

    .logo {
      margin-right: em(70);

      html[dir='rtl'] & {
        margin-right: 0;
        margin-left: em(70);
      }

      @include media-breakpoint-down(sm) {
        margin-right: 0;
      }

      .icon {
        width: em(310);
        height: em(31);

        @include media-breakpoint-down(sm) {
          width: em(300);
          height: em(30);
        }
      }

      .copyright {
        margin-top: em(33);
        color: $color-grey-400;

        @include media-breakpoint-down(sm) {
          margin-top: em(10);
        }

        span {
          font-size: em(16);

          @include media-breakpoint-down(sm) {
            font-size: em(14);
          }
        }
      }
    }

    .socials-wrapper {
      display: flex;
      padding-top: em(6);
      margin-right: auto;

      html[dir='rtl'] & {
        margin-right: 0;
        margin-left: auto;
      }

      @include media-breakpoint-down(sm) {
        flex-direction: column;
        width: 100%;
        padding-top: em(35);
      }

      .socials-text {
        margin-right: em(6);

        @include media-breakpoint-down(sm) {
          margin-right: 0;
        }

        span {
          font-size: em(16);
        }
      }

      .socials {
        display: flex;
        transform: translateY(em(-9));

        @include media-breakpoint-down(sm) {
          margin-top: em(10);
          transform: translate(em(-17), em(-9));

          html[dir='rtl'] & {
            transform: translate(em(17), em(-9));
          }
        }

        .social {
          padding: em(10);
          transition: opacity ease-out $time-normal;

          @include media-breakpoint-down(sm) {
            padding: em(10) em(19);
          }

          @include hover {
            opacity: 0.75;
          }

          .icon {
            &--instagram {
              width: em(16);
              height: em(16);
              transform: translateY(em(1));

              @include media-breakpoint-down(sm) {
                width: em(20);
                height: em(20);
                transform: translateY(em(2));
              }
            }

            &--linked-in {
              width: em(18);
              height: em(16);

              @include media-breakpoint-down(sm) {
                width: em(21);
                height: em(20);
              }
            }

            &--facebook {
              width: em(9);
              height: em(16);

              @include media-breakpoint-down(sm) {
                width: em(11);
                height: em(20);
              }
            }

            &--x {
              width: em(16);
              height: em(15);

              @include media-breakpoint-down(sm) {
                width: em(25);
                height: em(22);
              }
            }

            &--telegram {
              width: em(17);
              height: em(15);
              transform: translateY(em(2));

              @include media-breakpoint-down(sm) {
                width: em(24);
                height: em(23);
                transform: translateY(em(1));
              }
            }

            &--youtube {
              width: em(19);
              height: em(13);
              transform: translateY(em(3));

              @include media-breakpoint-down(sm) {
                width: em(29);
                height: em(20);
              }
            }
          }
        }
      }
    }

    .address-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-top: em(15);

      @include media-breakpoint-down(sm) {
        width: 100%;
      }

      .address {
        margin-bottom: em(19);

        @include media-breakpoint-down(sm) {
          margin-bottom: em(24);
        }

        span {
          font-size: em(16);
          font-weight: $font-weight-regular;

          @include media-breakpoint-down(sm) {
            font-size: em(16);
          }
        }
      }

      .button {
        min-width: em(119);
        padding-inline: em(10);
        height: em(39);
        border-radius: em(3);

        @include media-breakpoint-down(sm) {
          width: 100%;
          height: em(62);
        }

        span {
          font-size: em(16);
          font-weight: $font-weight-regular;
          line-height: 1.1875;

          @include media-breakpoint-down(sm) {
            font-size: em(18);
            font-weight: $font-weight-medium;
          }
        }
      }
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    margin-top: em(20);
    background-color: $color-grey-200;

    @include media-breakpoint-down(sm) {
      margin: em(12) 0 em(16);
    }
  }

  .select-lang {
    display: flex;
    justify-content: flex-end;
    margin-top: em(24);

    @include media-breakpoint-down(sm) {
      margin-top: 0;
      margin-bottom: em(24);
      order: 1;
    }
  }
}
</style>
