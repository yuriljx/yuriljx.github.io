"use client";

import { useCallback, useEffect, useState } from "react";
import { localize, profile, type Locale } from "./content";
import { detectDefaultLocale, isSupportedLocale, readSavedLocale, saveLocale } from "./language-preference";
import { scrollPageToTop } from "./page-navigation";
import { startVisitorAnalytics } from "./visitor-analytics";
import Background from "./_components/Background";
import Contact from "./_components/Contact";
import Header, { type Theme } from "./_components/Header";
import Hero from "./_components/Hero";
import { LightboxProvider } from "./_components/Lightbox";
import Publications from "./_components/Publications";
import Research, { Latest } from "./_components/Research";
import Software from "./_components/Software";
import Teaching from "./_components/Teaching";
import { ArrowUp } from "./_components/icons";
import { tx } from "./_components/hooks";

const ui = {
  skip: localize("Skip to main content", "跳到主要内容", "メインコンテンツへ移動"),
  backToTop: localize("Back to top", "返回顶部", "トップへ戻る"),
};

const htmlLang = (locale: Locale) => (locale === "zh" ? "zh-CN" : locale);

function readQueryLocale(): Locale | null {
  try {
    const value = new URLSearchParams(window.location.search).get("lang");
    return isSupportedLocale(value) ? (value as Locale) : null;
  } catch {
    return null;
  }
}

export default function Home() {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [switching, setSwitching] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  useEffect(() => startVisitorAnalytics(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("jixiao-theme", theme);
    } catch {
      // The visual preference still applies for this page view.
    }
  }, [theme]);

  // Initial language: ?lang= link > saved choice > location-aware default.
  useEffect(() => {
    let cancelled = false;
    const explicit = readQueryLocale() ?? (readSavedLocale() as Locale | null);
    const initial: Promise<Locale> = explicit ? Promise.resolve(explicit) : (detectDefaultLocale() as Promise<Locale>);
    void initial.then((next) => {
      if (cancelled) return;
      if (explicit || !readSavedLocale()) setLocaleState(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  const changeLocale = useCallback((next: Locale) => {
    saveLocale(next);
    try {
      const url = new URL(window.location.href);
      if (next === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url);
    } catch {
      // URL sharing is a convenience only.
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLocaleState(next);
      return;
    }
    setSwitching(true);
    window.setTimeout(() => {
      setLocaleState(next);
      window.requestAnimationFrame(() => setSwitching(false));
    }, 160);
  }, []);

  useEffect(() => {
    const update = () => setShowBackToTop(window.scrollY > Math.max(480, window.innerHeight * 0.8));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Reveal-on-scroll for any element marked data-reveal (re-run when content changes language).
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("reveal-ready");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6%", threshold: 0.06 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [locale]);

  return (
    <LightboxProvider locale={locale}>
      <a className="skip-link" href="#main-content">{tx(ui.skip, locale)}</a>
      <Header
        locale={locale}
        onLocale={changeLocale}
        theme={theme}
        onTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />
      <main id="main-content" className={switching ? "locale-switching" : ""} lang={htmlLang(locale)}>
        <Hero locale={locale} />
        <Latest locale={locale} />
        <Research locale={locale} />
        <Publications locale={locale} />
        <Software locale={locale} />
        <Teaching locale={locale} />
        <Background locale={locale} />
        <Contact locale={locale} />
      </main>
      <button
        type="button"
        className={`floating-back-to-top ${showBackToTop ? "visible" : ""}`}
        aria-label={tx(ui.backToTop, locale)}
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={() => scrollPageToTop(window)}
      >
        <span>{tx(ui.backToTop, locale)}</span><ArrowUp />
      </button>
      <footer>
        <span>© 2026 {profile.englishName}</span>
        <span>{tx(profile.updated, locale)}</span>
      </footer>
    </LightboxProvider>
  );
}
