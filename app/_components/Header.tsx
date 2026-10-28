"use client";

import { useEffect, useRef, useState } from "react";
import { localize, profile, type Locale } from "../content";
import { Globe, ThemeIcon } from "./icons";
import { tx, useScrollSpy } from "./hooks";

export type Theme = "light" | "dark";

export const navigation = [
  { id: "research", label: localize("Research", "研究", "研究") },
  { id: "publications", label: localize("Publications", "论文", "論文") },
  { id: "software", label: localize("Software", "软件", "ソフトウェア") },
  { id: "teaching", label: localize("Talks & teaching", "报告与教学", "発表・教育") },
  { id: "background", label: localize("Background", "经历", "経歴") },
  { id: "contact", label: localize("Contact", "联系", "連絡先") },
] as const;

const navIds = navigation.map((item) => item.id);

const ui = {
  menu: localize("Menu", "目录", "メニュー"),
  close: localize("Close", "关闭", "閉じる"),
  navigationLabel: localize("Primary navigation", "主要导航", "メインナビゲーション"),
  languageLabel: localize("Select language", "选择语言", "言語を選択"),
  darkTheme: localize("Switch to dark theme", "切换为深色主题", "ダークテーマに切り替え"),
  lightTheme: localize("Switch to light theme", "切换为浅色主题", "ライトテーマに切り替え"),
  tagline: localize("PLANT BREEDING · PHENOTYPING", "植物育种 · 表型", "植物育種・表現型"),
};

const languageNames: Array<[Locale, string, string]> = [["en", "English", "EN"], ["zh", "中文", "ZH"], ["ja", "日本語", "JA"]];

export default function Header({
  locale,
  onLocale,
  theme,
  onTheme,
}: {
  locale: Locale;
  onLocale: (locale: Locale) => void;
  theme: Theme;
  onTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);
  const active = useScrollSpy(navIds);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 8);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!languageOpen && !menuOpen) return;
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (languageOpen && !languageMenuRef.current?.contains(event.target as Node)) setLanguageOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (languageOpen) languageTriggerRef.current?.focus();
      setLanguageOpen(false);
      setMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress, { passive: true });
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [languageOpen, menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`} id="top">
      <div className="nav-shell">
        <a className="wordmark" href="#top" aria-label={`${profile.englishName} — ${tx(profile.role, locale)}`}>
          <span className="wordmark-mark" aria-hidden="true" />
          <span className="wordmark-copy">
            <strong>{profile.englishName}</strong>
            <small>{tx(ui.tagline, locale)}</small>
          </span>
        </a>
        <nav id="site-navigation" className={menuOpen ? "open" : ""} aria-label={tx(ui.navigationLabel, locale)}>
          {navigation.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {tx(item.label, locale)}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div className={`language-menu ${languageOpen ? "open" : ""}`} ref={languageMenuRef}>
            <button
              className="language-trigger"
              type="button"
              ref={languageTriggerRef}
              aria-expanded={languageOpen}
              aria-controls="language-options"
              aria-label={tx(ui.languageLabel, locale)}
              title={tx(ui.languageLabel, locale)}
              onClick={() => {
                setMenuOpen(false);
                setLanguageOpen((open) => !open);
              }}
            >
              <Globe />
              <span className="language-code" aria-hidden="true">{locale.toUpperCase()}</span>
            </button>
            <div id="language-options" className="language-options" aria-label={tx(ui.languageLabel, locale)}>
              {languageNames.map(([code, name, short]) => (
                <button
                  key={code}
                  type="button"
                  lang={code === "zh" ? "zh-CN" : code}
                  className={locale === code ? "active" : ""}
                  aria-pressed={locale === code}
                  onClick={() => {
                    onLocale(code);
                    setLanguageOpen(false);
                  }}
                >
                  <span>{name}</span>
                  <small>{short}</small>
                </button>
              ))}
            </div>
          </div>
          <button
            className="theme-toggle"
            type="button"
            suppressHydrationWarning
            aria-label={tx(theme === "dark" ? ui.lightTheme : ui.darkTheme, locale)}
            title={tx(theme === "dark" ? ui.lightTheme : ui.darkTheme, locale)}
            aria-pressed={theme === "dark"}
            onClick={onTheme}
          >
            <ThemeIcon />
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => {
              setLanguageOpen(false);
              setMenuOpen((open) => !open);
            }}
          >
            <span>{menuOpen ? tx(ui.close, locale) : tx(ui.menu, locale)}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
