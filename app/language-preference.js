const LANGUAGE_ENDPOINT = "https://jixiao-visitor-analytics.yuriljx.workers.dev/locale";
const LANGUAGE_STORAGE_KEY = "jixiao-site-language-v1";
const SUPPORTED_LOCALES = new Set(["en", "zh", "ja"]);

let detectedLocalePromise;

function isSupportedLocale(value) {
  return typeof value === "string" && SUPPORTED_LOCALES.has(value);
}

function readSavedLocale(storage = globalThis.localStorage) {
  try {
    const value = storage?.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLocale(value) ? value : null;
  } catch {
    return null;
  }
}

function saveLocale(locale, storage = globalThis.localStorage) {
  if (!isSupportedLocale(locale)) return;
  try {
    storage?.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // The selected language still applies for this page when storage is unavailable.
  }
}

async function requestDetectedLocale(fetchImpl = globalThis.fetch, timeoutMs = 1800) {
  if (typeof fetchImpl !== "function") return "en";

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(LANGUAGE_ENDPOINT, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      referrerPolicy: "no-referrer",
      signal: controller.signal,
    });
    if (!response.ok) return "en";
    const payload = await response.json();
    return isSupportedLocale(payload?.locale) ? payload.locale : "en";
  } catch {
    return "en";
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

function detectDefaultLocale() {
  detectedLocalePromise ??= requestDetectedLocale();
  return detectedLocalePromise;
}

export {
  LANGUAGE_ENDPOINT,
  LANGUAGE_STORAGE_KEY,
  detectDefaultLocale,
  isSupportedLocale,
  readSavedLocale,
  requestDetectedLocale,
  saveLocale,
};
