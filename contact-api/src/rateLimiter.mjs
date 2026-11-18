const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

export function createRateLimiter({ maxRequests, windowMs }) {
  const requestTimesByClient = new Map();

  function recentRequestTimes(clientId, now) {
    const recent = (requestTimesByClient.get(clientId) ?? []).filter(
      (time) => now - time < windowMs
    );
    requestTimesByClient.set(clientId, recent);
    return recent;
  }

  function isLimited(clientId) {
    return recentRequestTimes(clientId, Date.now()).length >= maxRequests;
  }

  function record(clientId) {
    const now = Date.now();
    recentRequestTimes(clientId, now).push(now);
  }

  setInterval(() => {
    const now = Date.now();
    requestTimesByClient.forEach((_, clientId) => {
      if (recentRequestTimes(clientId, now).length === 0) {
        requestTimesByClient.delete(clientId);
      }
    });
  }, CLEANUP_INTERVAL_MS).unref();

  return { isLimited, record };
}
