import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  LANGUAGE_STORAGE_KEY,
  isSupportedLocale,
  readSavedLocale,
  resolveLocale,
  saveLocale,
} from "../app/language-preference.js";
import {
  REDUCED_MOTION_QUERY,
  scrollPageToTop,
  tokenizeHeroLine,
} from "../app/page-navigation.js";

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

test("resolves the first language synchronously from a link, saved choice or English", () => {
  const japanese = memoryStorage("ja");
  assert.equal(resolveLocale("?lang=zh", japanese), "zh");
  assert.equal(resolveLocale("?lang=en", japanese), "en");
  assert.equal(resolveLocale("?lang=fr", japanese), "ja");
  assert.equal(resolveLocale("", japanese), "ja");
  assert.equal(resolveLocale("", memoryStorage("fr")), "en");
  assert.equal(resolveLocale("", memoryStorage()), "en");
  const unavailable = { getItem() { throw new Error("Storage is disabled"); } };
  assert.equal(resolveLocale("", unavailable), "en");
  assert.equal(resolveLocale("?lang=ja", unavailable), "ja");
});

test("renders one globe dropdown with theme and menu controls grouped on the right", async () => {
  const [headerSource, pageSource, styles] = await Promise.all([
    readFile(new URL("../app/_components/Header.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(headerSource, /<Globe \/>/);
  assert.match(headerSource, /aria-controls="language-options"/);
  assert.match(headerSource, /className="theme-toggle"/);
  assert.match(headerSource, /className="menu-toggle"/);
  assert.match(headerSource, /className="scroll-progress"/);
  assert.match(pageSource, /jixiao-theme/);
  assert.doesNotMatch(headerSource, /className="language-switch"/);
  assert.match(styles, /@media \(max-width: 980px\)[\s\S]*?\.menu-toggle \{ display: inline-flex;/);
});

test("keeps CJK closing punctuation with the preceding title phrase", () => {
  const japanese = tokenizeHeroLine("計算的エビデンスと結ぶ。");
  assert.equal(japanese.usesWordSpacing, false);
  assert.equal(japanese.tokens.at(-1), "結ぶ。");

  const english = tokenizeHeroLine("Aligning field observations");
  assert.equal(english.usesWordSpacing, true);
  assert.deepEqual(english.tokens, ["Aligning", "field", "observations"]);
});

test("keeps the hero figure full-width above two gallery tiles on phones", async () => {
  const [figureSource, styles] = await Promise.all([
    readFile(new URL("../app/_components/LiveFigure.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(figureSource, /role="tablist"/);
  assert.match(figureSource, /useReducedMotion\(\)/);
  assert.match(figureSource, /Schematic illustration/);
  assert.match(styles, /\.hero-stats \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.live-figure \{ grid-column: 1 \/ 3; grid-row: 1; \}/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.gallery-lab \{ grid-column: 1; grid-row: 2; aspect-ratio: 1; \}/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.gallery-field \{ grid-column: 2; grid-row: 2; aspect-ratio: 1; \}/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test("scrolls explicitly to the page origin and respects reduced motion", () => {
  const calls = [];
  const smoothView = {
    matchMedia(query) {
      assert.equal(query, REDUCED_MOTION_QUERY);
      return { matches: false };
    },
    scrollTo(options) {
      calls.push(options);
    },
  };

  scrollPageToTop(smoothView);
  assert.deepEqual(calls[0], { top: 0, left: 0, behavior: "smooth" });

  const reducedCalls = [];
  scrollPageToTop({
    matchMedia() {
      return { matches: true };
    },
    scrollTo(options) {
      reducedCalls.push(options);
    },
  });
  assert.equal(reducedCalls[0].behavior, "auto");
});
