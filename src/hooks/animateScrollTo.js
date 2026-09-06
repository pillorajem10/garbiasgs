/**
 * Tweens the page's vertical scroll position with `requestAnimationFrame`,
 * rather than relying on native `scrollIntoView({ behavior: "smooth" })`.
 * Native smooth scroll gives no reliable "it's done" callback and no control
 * over duration — both of which the section-scroll lock/cooldown needs.
 *
 * Returns a cancel function. Callers that might unmount or navigate away
 * mid-animation must call it to stop the rAF loop.
 */
export function animateScrollTo(targetY, { duration = 650, onDone } = {}) {
  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1 || duration <= 0) {
    window.scrollTo(0, targetY);
    onDone?.();
    return () => {};
  }

  const startTime = performance.now();
  let rafId;

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

  const step = (now) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + delta * easeInOutCubic(t));

    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  };

  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId);
}
