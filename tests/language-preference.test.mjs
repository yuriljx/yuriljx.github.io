import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  LANGUAGE_ENDPOINT,
  LANGUAGE_STORAGE_KEY,
  isSupportedLocale,
  readSavedLocale,
  requestDetectedLocale,
  saveLocale,
} from "../app/language-preference.js";

function memoryStorage(initialValue = null) {
  let value = initialValue;
  return {
    getItem(key) {
      assert.equal(key, LANGUAGE_STORAGE_KEY);
      return value;
    },
    setItem(key, nextValue) {
      assert.equal(key, LANGUAGE_STORAGE_KEY);
      value = nextValue;
    },
  };
}

test("validates and persists only supported manual language choices", () => {
  assert.equal(isSupportedLocale("en"), true);
  assert.equal(isSupportedLocale("zh"), true);
  assert.equal(isSupportedLocale("ja"), true);
  assert.equal(isSupportedLocale("fr"), false);

  const storage = memoryStorage();
  saveLocale("ja", storage);
  assert.equal(readSavedLocale(storage), "ja");
  saveLocale("fr", storage);
  assert.equal(readSavedLocale(storage), "ja");
});

test("uses the Cloudflare locale endpoint and falls back safely to English", async () => {
  const requested = [];
  const japanese = await requestDetectedLocale(async (url, options) => {
    requested.push({ url, options });
    return Response.json({ locale: "ja" });
  });
  assert.equal(japanese, "ja");
  assert.equal(requested[0].url, LANGUAGE_ENDPOINT);
  assert.equal(requested[0].options.credentials, "omit");
  assert.equal(requested[0].options.referrerPolicy, "no-referrer");

  assert.equal(await requestDetectedLocale(async () => Response.json({ locale: "fr" })), "en");
  assert.equal(await requestDetectedLocale(async () => new Response(null, { status: 500 })), "en");
  assert.equal(await requestDetectedLocale(async () => { throw new Error("offline"); }), "en");
});

test("renders one globe dropdown and places it to the right of Menu on mobile", async () => {
  const [pageSource, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(pageSource, /function GlobeIcon\(\)/);
  assert.match(pageSource, /aria-controls="language-options"/);
  assert.doesNotMatch(pageSource, /className="language-switch"/);
  assert.match(styles, /\.menu-toggle \{ grid-column: 2; grid-row: 1;/);
  assert.match(styles, /\.language-menu \{ grid-column: 3; grid-row: 1;/);
});
