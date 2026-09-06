/**
 * Guesses whether a wheel event came from a physical mouse wheel or a
 * trackpad/touchpad gesture. Kept completely separate from section-navigation
 * logic — this file only answers "what produced this event?", never "what
 * should happen because of it?".
 *
 * There is no browser API that reports this directly (a trackpad can report
 * `pointer: fine`, same as a mouse), so this is a heuristic based on the
 * shape of the event stream, matching how a real mouse and a trackpad behave
 * differently in practice:
 *
 *  - A mouse wheel "notch" fires as an isolated event (or a couple of
 *    coalesced ones) with a fairly large, whole-number delta, separated from
 *    the next notch by a real pause.
 *  - A trackpad gesture fires many events in a fast, continuous stream with
 *    small, often fractional deltas (macOS in particular reports sub-pixel
 *    deltas during inertial scrolling).
 *
 * This is a best-effort guess, not a certainty — see the "uncertain" case,
 * which callers should treat as "not a mouse" and fall back to normal
 * scrolling, per the project's requirement to default to free scrolling
 * whenever the input type can't be identified confidently.
 */

const TRACKPAD_MAX_DELTA = 30; // px — smaller than this reads as a fine trackpad step
const TRACKPAD_MAX_GAP_MS = 40; // a repeat this fast is a continuous gesture, not a fresh notch
const MOUSE_MIN_DELTA = 30; // px — a real wheel notch is rarely smaller than this in practice

/**
 * Creates a classifier with its own small rolling state (time of the last
 * event). One instance should be reused across an entire wheel listener's
 * lifetime — each call's result depends on how long it's been since the
 * previous event.
 */
export function createWheelGestureClassifier() {
  let lastEventTime = -Infinity;

  return function classify(event) {
    const now = performance.now();
    const gapMs = now - lastEventTime;
    lastEventTime = now;

    const absDelta = Math.abs(event.deltaY);

    // Line/page-mode deltas (deltaMode 1 or 2) are a legacy signal a handful
    // of browsers still use for real mouse wheels; pixel mode (0) is the
    // modern default for both mice and trackpads and needs the heuristic below.
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE || event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      return "mouse";
    }

    if (absDelta === 0) return "uncertain";
    if (!Number.isInteger(event.deltaY)) return "trackpad";
    if (absDelta < TRACKPAD_MAX_DELTA) return "trackpad";
    if (gapMs < TRACKPAD_MAX_GAP_MS) return "trackpad";
    if (absDelta >= MOUSE_MIN_DELTA) return "mouse";

    return "uncertain";
  };
}
