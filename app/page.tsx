"use client";

import { useCallback, useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { localize, profile, type Locale } from "./content";
import { resolveLocale, saveLocale } from "./language-preference";
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

const readBrowserLocale = () => resolveLocale(window.location.search) as Locale;
const readServerLocale = (): Locale => "en";
const subscribeToPreferences = (notify: () => void) => {
  window.addEventListener("storage", notify);
  return () => window.removeEventListener("storage", notify);
};

export default function Home() {
  const preferredLocale = useSyncExternalStore(subscribeToPreferences, readBrowserLocale, readServerLocale);
  const [selectedLocale, setSelectedLocale] = useState<Locale | null>(null);
  const locale = selectedLocale ?? preferredLocale;
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

  useLayoutEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  const changeLocale = useCallback((next: Locale) => {
    setSelectedLocale(next);
    saveLocale(next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      // URL sharing is a convenience only.
    }
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
    }, { rootMargin: "0px 0px 40px 0px", threshold: 0.06 });
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
      <main id="main-content" lang={htmlLang(locale)}>
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
