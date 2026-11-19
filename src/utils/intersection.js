const sharedObservers = new Map();

function getSharedObserver({ rootMargin, threshold }) {
  const key = `${rootMargin}|${threshold}`;
  if (sharedObservers.has(key)) return sharedObservers.get(key);

  const listeners = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => listeners.get(entry.target)?.(entry.isIntersecting));
    },
    { rootMargin, threshold }
  );

  const sharedObserver = { observer, listeners };
  sharedObservers.set(key, sharedObserver);
  return sharedObserver;
}

export function observeIntersection(element, { rootMargin = "0px", threshold = 0 }, onChange) {
  if (typeof IntersectionObserver === "undefined") {
    onChange(true);
    return () => {};
  }

  const { observer, listeners } = getSharedObserver({ rootMargin, threshold });
  listeners.set(element, onChange);
  observer.observe(element);

  return () => {
    listeners.delete(element);
    observer.unobserve(element);
  };
}
