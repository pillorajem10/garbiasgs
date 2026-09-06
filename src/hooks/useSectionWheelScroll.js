import { useEffect } from "react";
import { createWheelGestureClassifier } from "./wheelGestureClassifier";
import { animateScrollTo } from "./animateScrollTo";

const SECTION_SELECTOR = "[data-snap-section]";
const NAV_SELECTOR = 'nav[aria-label="Primary"]';
const BOUNDARY_EPSILON_PX = 4;
const TRANSITION_DURATION_MS = 650;
const COOLDOWN_AFTER_TRANSITION_MS = 150;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on phones/tablets/anything whose primary pointer isn't a fine mouse-like device. */
function isTouchLikeDevice() {
  return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1;
}

/**
 * The fixed navbar overlays the top of the viewport, so "aligned with the
 * viewport" means aligned just below it, not at y = 0. Measuring the real
 * navbar element (rather than trusting a --nav-height constant) keeps this
 * correct under browser zoom and any future navbar height change.
 */
function getNavClearance() {
  const nav = document.querySelector(NAV_SELECTOR);
  return nav ? nav.getBoundingClientRect().bottom : 0;
}

/** The scrollY at which `section`'s top edge sits exactly below the navbar. */
function getAlignedScrollTop(section, navClearance) {
  return window.scrollY + section.getBoundingClientRect().top - navClearance;
}

/** The snap section whose vertical span currently contains the viewport's center. */
function findCurrentSectionIndex(sections) {
  const referenceY = window.scrollY + window.innerHeight / 2;
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = rect.bottom + window.scrollY;
    if (referenceY >= top && referenceY < bottom) return i;
  }
  // Above the first section or below the last (can happen mid-transition, or
  // in the small gap past the last section's bottom) — clamp to the nearer end.
  return referenceY < 0 ? 0 : sections.length - 1;
}

/**
 * Walks up from `startEl` looking for an ancestor that both scrolls
 * vertically and still has room to move in `deltaY`'s direction — a modal,
 * dropdown, table, textarea, or any other nested scrollable region. If one
 * is found, the wheel event belongs to it, not to section navigation.
 */
function findScrollableAncestor(startEl, deltaY) {
  let node = startEl;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.nodeType !== 1) {
      node = node.parentElement;
      continue;
    }
    const style = getComputedStyle(node);
    const canScrollY =
      (style.overflowY === "auto" || style.overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight;

    if (canScrollY) {
      const atTop = node.scrollTop <= 0;
      const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return node;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * Section-by-section mouse-wheel navigation for desktop.
 *
 * One deliberate physical-mouse-wheel tick moves the page to the next or
 * previous element carrying `data-snap-section`, aligned to sit just below
 * the fixed navbar. Everything else — trackpad gestures, touch scrolling,
 * keyboard scrolling, scrolling inside a modal/dropdown/table, zoom, and any
 * case where the input type can't be told apart confidently — is left
 * completely alone and scrolls natively.
 *
 * Mount this once at the layout level (see RoutedMain in App.jsx), not per
 * page: it re-reads `[data-snap-section]` straight from the DOM on every
 * qualifying event rather than caching a list, so it needs no bookkeeping
 * about *which* sections exist after navigation.
 *
 * Takes the container *element* itself (not a ref object), kept in state by
 * a callback ref in the caller — not a plain `useRef`. `<main>` sits behind a
 * Suspense boundary for the lazy-loaded page chunk, so on a route's very
 * first render React shows only the fallback and `<main>` doesn't exist in
 * the DOM yet on the commit where this effect first runs; a `useRef` would
 * silently capture `null` at that moment and never revisit it, since neither
 * a ref object's identity nor anything else this effect depends on changes
 * once the real content mounts a moment later. A callback-ref-driven state
 * value doesn't have that problem: the state update on mount *is* the new
 * dependency value the effect needed to see. The same mechanism also covers
 * route changes, where `<main>` remounts as a genuinely new DOM node.
 *
 * Input detection lives in wheelGestureClassifier.js and is intentionally
 * separate from the navigation logic here — this file only decides "given a
 * confirmed mouse tick, where should the page go next?".
 */
export function useSectionWheelScroll(container) {
  useEffect(() => {
    if (!container) return undefined;
    if (typeof window.matchMedia !== "function") return undefined;

    const touchQuery = window.matchMedia("(pointer: coarse)");
    let disabledForDevice = isTouchLikeDevice();
    const onPointerCapabilityChange = () => {
      disabledForDevice = isTouchLikeDevice();
    };
    touchQuery.addEventListener("change", onPointerCapabilityChange);

    const classify = createWheelGestureClassifier();
    let isAnimating = false;
    let cancelCurrentAnimation = null;
    let cooldownTimer = null;

    const finishTransition = () => {
      cooldownTimer = window.setTimeout(() => {
        isAnimating = false;
      }, COOLDOWN_AFTER_TRANSITION_MS);
    };

    const goToSection = (targetSection) => {
      isAnimating = true;
      const navClearance = getNavClearance();
      cancelCurrentAnimation = animateScrollTo(getAlignedScrollTop(targetSection, navClearance), {
        duration: prefersReducedMotion() ? 0 : TRANSITION_DURATION_MS,
        onDone: finishTransition,
      });
    };

    const onWheel = (event) => {
      // Let browser zoom (Ctrl/Cmd + wheel) through untouched.
      if (event.ctrlKey || event.metaKey) return;

      if (disabledForDevice) return;

      // A modal or the mobile menu is open (both lock body scroll while
      // shown) — the page behind it must not move.
      if (document.body.style.overflow === "hidden") return;

      const scrollableAncestor = findScrollableAncestor(event.target, event.deltaY);
      if (scrollableAncestor) return;

      const gesture = classify(event);
      if (gesture !== "mouse") return;

      if (isAnimating) {
        // Swallow extra notches from the same deliberate action so they
        // don't fight the in-flight transition or queue up further jumps.
        event.preventDefault();
        return;
      }

      const sections = Array.from(container.querySelectorAll(SECTION_SELECTOR));
      if (sections.length < 2) return;

      const currentIndex = findCurrentSectionIndex(sections);
      const currentRect = sections[currentIndex].getBoundingClientRect();
      const goingDown = event.deltaY > 0;

      if (goingDown) {
        const atBottomOfSection = currentRect.bottom <= window.innerHeight + BOUNDARY_EPSILON_PX;
        if (!atBottomOfSection) return; // more of a tall section left to read natively
        const next = sections[currentIndex + 1];
        if (!next) return; // already on the last section
        event.preventDefault();
        goToSection(next);
      } else {
        const navClearance = getNavClearance();
        const atTopOfSection = currentRect.top >= navClearance - BOUNDARY_EPSILON_PX;
        if (!atTopOfSection) return;
        const previous = sections[currentIndex - 1];
        if (!previous) return; // already on the first section
        event.preventDefault();
        goToSection(previous);
      }
    };

    // Bringing a newly focused element's section into view is not driven by
    // a wheel event, so it reuses the same animation guard but not the
    // gesture classifier.
    const onFocusIn = (event) => {
      if (disabledForDevice || isAnimating) return;
      const section = event.target.closest(SECTION_SELECTOR);
      if (!section) return;

      const navClearance = getNavClearance();
      const rect = section.getBoundingClientRect();
      const fullyVisible =
        rect.top >= navClearance - BOUNDARY_EPSILON_PX && rect.bottom <= window.innerHeight + BOUNDARY_EPSILON_PX;
      if (fullyVisible) return;

      goToSection(section);
    };

    // { passive: false } is required — this handler must be able to call
    // preventDefault() for the small subset of events it decides to take
    // over. It exits without doing so for every other case above, which is
    // the large majority of events (trackpad, touch, nested scroll, etc.).
    window.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("focusin", onFocusIn);

    return () => {
      touchQuery.removeEventListener("change", onPointerCapabilityChange);
      window.removeEventListener("wheel", onWheel);
      container.removeEventListener("focusin", onFocusIn);
      if (cooldownTimer) window.clearTimeout(cooldownTimer);
      cancelCurrentAnimation?.();
    };
  }, [container]);
}

export default useSectionWheelScroll;
