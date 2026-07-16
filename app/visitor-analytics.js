const ANALYTICS_ENDPOINT = "https://jixiao-visitor-analytics.yuriljx.workers.dev/collect";

function viewportBucket(width) {
  if (width < 480) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1440) return "lg";
  return "xl";
}

function referrerOrigin(value) {
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

function startVisitorAnalytics() {
  if (navigator.doNotTrack === "1") return () => {};

  let timeoutId;
  let idleId;
  let stopped = false;

  const transmit = () => {
    if (stopped) return;
    const payload = {
      path: window.location.pathname,
      referrer: referrerOrigin(document.referrer),
      language: navigator.language,
      viewport: viewportBucket(window.innerWidth),
    };

    void fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      keepalive: true,
      referrerPolicy: "no-referrer",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  };

  const schedule = () => {
    if (stopped) return;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(transmit, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(transmit, 1200);
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    stopped = true;
    window.removeEventListener("load", schedule);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
  };
}

export { ANALYTICS_ENDPOINT, referrerOrigin, startVisitorAnalytics, viewportBucket };
