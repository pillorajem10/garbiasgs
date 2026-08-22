import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Keyboard and focus behaviour every `role="dialog"` overlay on the site owes
 * its users: focus moves into the dialog on open, Tab cycles inside it,
 * Escape closes it, and focus returns to whatever opened it.
 *
 * The trap is not optional decoration. `aria-modal` only tells assistive tech
 * that the rest of the page is inert; it does not stop Tab from walking into
 * the page behind, which strands a keyboard user on controls they cannot see.
 *
 * Returns a ref to attach to the dialog element. That element needs
 * `tabIndex={-1}` so it can receive the initial programmatic focus.
 */
export function useDialogFocus(onClose) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;

    dialog?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialog?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return dialogRef;
}
