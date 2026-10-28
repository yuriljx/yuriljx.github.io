"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { keyNumbers, localize, profile, type Locale } from "../content";
import { tokenizeHeroLine } from "../page-navigation";
import LiveFigure from "./LiveFigure";
import { ArrowDown, ChevronSide, GithubMark, Mail, OrcidMark, ScholarMark } from "./icons";
import { prefersReducedMotion, tx } from "./hooks";

const ui = {
  eyebrow: localize("PLANT BREEDING × NON-DESTRUCTIVE PHENOTYPING", "植物育种 × 无损表型", "植物育種 × 非破壊表現型評価"),
  title: {
    en: ["Evaluating breeding materials", "earlier and more objectively."],
    zh: ["让育种材料", "更早、更客观地被评价。"],
    ja: ["育種材料を、", "より早く、より客観的に評価する。"],
  } satisfies Record<Locale, [string, string]>,
  lede: localize(
    "I develop non-destructive phenotyping — image analysis, time-series modelling and chemical profiling — from polyploid fruit quality to the regeneration potential of rice anther-culture callus, and release the methods as open, reproducible software.",
    "我以图像分析、时间序列建模与化学成分分析发展无损表型技术，研究对象从多倍体果实品质延伸到水稻花药培养愈伤组织的再生潜力，并以开放、可复现的软件发布方法。",
    "画像解析・時系列モデリング・化学成分分析による非破壊表現型評価を、倍数体果実の品質からイネ葯培養カルスの再分化能まで展開し、手法はオープンで再現可能なソフトウェアとして公開しています。",
  ),
  research: localize("Explore research", "浏览研究", "研究を見る"),
  publications: localize("Publications", "论文", "論文"),
  links: localize("Profiles", "学术档案", "プロフィール"),
  galleryPrev: localize("Previous image", "上一张", "前の画像"),
  galleryNext: localize("Next image", "下一张", "次の画像"),
  galleryPick: localize("Show image", "显示图片", "画像を表示"),
};

const galleries = [
  {
    key: "lab",
    label: localize("Laboratory and culture images", "实验与培养图片", "実験・培養の画像"),
    slides: [
      { src: "/research/anther-culture.webp", code: "RICE / ANTHER CULTURE", alt: localize("Rice anther-culture material with a scale reference", "带尺度参照的水稻花药培养材料", "スケール参照を含むイネ葯培養材料"), caption: localize("Rice anther-culture material", "水稻花药培养材料", "イネ葯培養材料") },
      { src: "/research/microspore-fluorescence.webp", code: "MICROSCOPY / FLUORESCENCE", alt: localize("Fluorescence micrograph of isolated rice microspores", "分离水稻小孢子的荧光显微图", "単離イネ小胞子の蛍光顕微鏡像"), caption: localize("Isolated microspores", "分离的小孢子", "単離した小胞子") },
      { src: "/software/callustrack/annotation-workspace.webp", code: "ANNOTATION / TRACKING", alt: localize("CallusTrack workspace with persistent labels on calli (synthetic illustration)", "CallusTrack 中持续标记的愈伤组织（合成示意）", "カルスを継続標識したCallusTrack画面（合成図）"), caption: localize("Persistent callus labels across frames", "跨帧持续追踪的愈伤组织", "フレームをまたぐカルスの継続追跡"), position: "50% 48%" },
    ],
  },
  {
    key: "field",
    label: localize("Field and greenhouse images", "田间与温室图片", "圃場・温室の画像"),
    slides: [
      { src: "/research/grape-field.webp", code: "GRAPE / FIELD", alt: localize("Grape berries photographed with a field scale reference", "带尺度参照拍摄的田间葡萄果粒", "スケール参照と撮影した圃場ブドウ果粒"), caption: localize("Grape berries with a scale reference", "带尺度参照的葡萄果粒", "スケール参照付きのブドウ果粒") },
      { src: "/research/haskap-field.webp", code: "HASKAP / FIELD", alt: localize("Haskap fruit phenotype observed in the field", "田间观测的蓝靛果表型", "圃場で観測したハスカップ果実形質"), caption: localize("Haskap fruit in the field", "田间蓝靛果", "圃場のハスカップ果実") },
      { src: "/research/rice-greenhouse.webp", code: "RICE / GREENHOUSE", alt: localize("Rice plants under greenhouse culture", "温室培养的水稻植株", "温室栽培のイネ"), caption: localize("Rice donor plants", "水稻供体植株", "イネ供試植物"), position: "center 38%" },
    ],
  },
] as const;

function HeroTitle({ lines, locale }: { lines: [string, string]; locale: Locale }) {
  return (
    <h1 id="hero-title" lang={locale === "zh" ? "zh-CN" : locale} aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => {
        const { tokens, usesWordSpacing }: { tokens: string[]; usesWordSpacing: boolean } = tokenizeHeroLine(line);
        const lineStart = lines.slice(0, lineIndex).reduce((total, item) => total + item.length + 1, 0);
        return (
          <span className="hero-title-line" aria-hidden="true" key={`${locale}-${lineIndex}`}>
            {tokens.map((word, wordIndex) => {
              const wordStart = lineStart + tokens.slice(0, wordIndex).reduce(
                (total, item) => total + item.length + (usesWordSpacing ? 1 : 0),
                0,
              );
              return (
                <span
                  className={["hero-title-word", usesWordSpacing ? "" : "hero-title-glyph"].filter(Boolean).join(" ")}
                  data-last-word={wordIndex === tokens.length - 1 ? "true" : undefined}
                  style={{ "--char-index": wordStart } as CSSProperties}
                  key={wordIndex}
                >{word}</span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      let start: number | null = null;
      const step = (time: number) => {
        start ??= time;
        const progress = Math.min(1, (time - start) / 1000);
        node.textContent = String(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = window.requestAnimationFrame(step);
      };
      node.textContent = "0";
      frame = window.requestAnimationFrame(step);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

function HeroGallery({ gallery, locale }: { gallery: (typeof galleries)[number]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = gallery.slides.length;

  useEffect(() => {
    if (paused || total < 2 || prefersReducedMotion()) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % total), gallery.key === "lab" ? 6200 : 7100);
    return () => window.clearTimeout(timer);
  }, [active, paused, total, gallery.key]);

  const move = (step: number) => setActive((current) => (current + step + total) % total);

  return (
    <div
      className={`hero-gallery gallery-${gallery.key}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={tx(gallery.label, locale)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {gallery.slides.map((slide, index) => (
        <figure key={slide.src} className={active === index ? "active" : ""} aria-hidden={active !== index}>
          <img
            src={slide.src}
            alt={tx(slide.alt, locale)}
            style={{ objectPosition: "position" in slide ? slide.position : undefined }}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <figcaption>
            <span className="hero-figure-code">{slide.code}</span>
            <span className="hero-caption-text">{tx(slide.caption, locale)}</span>
          </figcaption>
        </figure>
      ))}
      <div className="hero-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label={`${tx(ui.galleryPrev, locale)}: ${tx(gallery.label, locale)}`}><ChevronSide direction="previous" /></button>
        <button type="button" onClick={() => move(1)} aria-label={`${tx(ui.galleryNext, locale)}: ${tx(gallery.label, locale)}`}><ChevronSide direction="next" /></button>
      </div>
      <div className="hero-gallery-dots">
        {gallery.slides.map((slide, index) => (
          <button
            type="button"
            key={`${slide.src}-dot`}
            className={active === index ? "active" : ""}
            aria-label={`${tx(ui.galleryPick, locale)} ${index + 1}: ${tx(slide.caption, locale)}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero({ locale }: { locale: Locale }) {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), prefersReducedMotion() ? 0 : 1700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={`hero ${introComplete ? "intro-complete" : ""}`} aria-labelledby="hero-title">
      <div className="hero-intro">
        <p className="eyebrow">{tx(ui.eyebrow, locale)}</p>
        <HeroTitle lines={ui.title[locale]} locale={locale} />
        <p className="hero-lede">{tx(ui.lede, locale)}</p>
        <p className="identity-line">
          <strong>{tx(profile.nativeName, locale)}</strong>
          <span>{tx(profile.roleDetail, locale)}</span>
          <span>{tx(profile.affiliation, locale)}</span>
        </p>
        <div className="hero-actions">
          <a className="hero-action-link primary" href="#research">{tx(ui.research, locale)} <ArrowDown /></a>
          <a className="hero-action-link" href="#publications">{tx(ui.publications, locale)} <ArrowDown /></a>
          <div className="profile-links" aria-label={tx(ui.links, locale)}>
            <a href={`mailto:${profile.email}`} title={profile.email} aria-label={`Email ${profile.email}`}><Mail /></a>
            <a href={profile.orcidUrl} target="_blank" rel="noreferrer" title={`ORCID ${profile.orcid}`} aria-label="ORCID"><OrcidMark /></a>
            <a href={profile.scholarUrl} target="_blank" rel="noreferrer" title="Google Scholar" aria-label="Google Scholar"><ScholarMark /></a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><GithubMark /></a>
          </div>
        </div>
        <dl className="hero-stats">
          {keyNumbers.map((stat) => (
            <div key={stat.label.en}>
              <dd><Counter value={stat.value} /></dd>
              <dt>{tx(stat.label, locale)}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-visual">
        <LiveFigure locale={locale} />
        {galleries.map((gallery) => <HeroGallery gallery={gallery} locale={locale} key={gallery.key} />)}
      </div>
    </section>
  );
}
