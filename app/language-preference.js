const LANGUAGE_STORAGE_KEY = "jixiao-site-language-v1";
const SUPPORTED_LOCALES = new Set(["en", "zh", "ja"]);

function isSupportedLocale(value) {
  return typeof value === "string" && SUPPORTED_LOCALES.has(value);
}

function readSavedLocale(storage) {
  try {
    const value = (storage ?? globalThis.localStorage)?.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLocale(value) ? value : null;
  } catch {
    return null;
  }
}

function saveLocale(locale, storage) {
  if (!isSupportedLocale(locale)) return;
  try {
    (storage ?? globalThis.localStorage)?.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // The selected language still applies for this page when storage is unavailable.
  }
}

function resolveLocale(search, storage) {
  const linked = new URLSearchParams(search).get("lang");
  return isSupportedLocale(linked) ? linked : readSavedLocale(storage) ?? "en";
}

export {
  LANGUAGE_STORAGE_KEY,
  isSupportedLocale,
  readSavedLocale,
  resolveLocale,
  saveLocale,
};
