import { useGlobalStore } from '@/stores/global';

function smoothScrollTo(
  element,
  baseSpeedPxPerSec = 1000,
  minDurationMs = 800,
) {
  return new Promise((resolve, reject) => {
    if (!element) {
      reject(new Error('Element not found'));
      return;
    }

    const startPos = window.pageYOffset;
    const targetPos = element.getBoundingClientRect().top;
    const distance = Math.abs(targetPos);

    // Dynamic duration: Longer distances use speed, shorter use minDuration
    let durationMs = Math.max(
      (distance / baseSpeedPxPerSec) * 1000, // Speed-based time
      minDurationMs, // Minimum time (e.g., 800ms)
    );

    if (distance === 0) {
      durationMs = 0;
    }

    // Easing function (smooth acceleration/deceleration)
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeInOutQuad(progress); // Apply smoothing
      window.scrollTo(0, startPos + targetPos * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        resolve(true);
      }
    }

    requestAnimationFrame(animateScroll);
  });
}

export function useScroll() {
  const store = useGlobalStore();

  const scrollToWheel = async () => {
    const wheel = document.getElementById('hero_wheel');
    // wheel.scrollIntoView({ behavior: 'smooth' });
    await smoothScrollTo(wheel, 4000, 500);

    setTimeout(() => {
      store.setIsSpinning(true);
    }, 100);
  };

  const scrollToElement = (elementId, options = { behavior: 'smooth' }) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView(options);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    scrollToWheel,
    scrollToElement,
    scrollToTop,
  };
}
