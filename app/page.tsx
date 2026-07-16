"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  type Locale,
  type LocalizedText,
  localize,
  presentations,
  profile,
  publications,
  researchFocus,
  researchProjects,
  softwareProjects,
} from "./content";
import { startVisitorAnalytics } from "./visitor-analytics";

const tx = (value: LocalizedText | string, locale: Locale) =>
  typeof value === "string" ? value : value[locale];

const ui = {
  skip: localize("Skip to main content", "跳到主要内容", "メインコンテンツへ移動"),
  menu: localize("Menu", "目录", "メニュー"),
  close: localize("Close", "关闭", "閉じる"),
  navigationLabel: localize("Primary navigation", "主要导航", "メインナビゲーション"),
  navigation: [
    [localize("Publications", "论文", "論文"), "#publications"],
    [localize("Software", "软件", "ソフトウェア"), "#software"],
    [localize("Presentations", "学会发表", "学会発表"), "#presentations"],
    [localize("Projects", "项目", "研究テーマ"), "#projects"],
    [localize("Contact", "联系", "連絡先"), "#contact"],
  ] as const,
  heroTitle: {
    en: ["Aligning field observations", "with experimental records and computational evidence."],
    zh: ["让田间观测、实验记录", "与计算证据相互校准。"],
    ja: ["圃場観測と実験記録を、", "計算的エビデンスと結ぶ。"],
  } satisfies Record<Locale, [string, string]>,
  heroLede: localize(
    "Integrating crop phenotyping, breeding and quality science with purpose-built research software to connect field imagery, experimental workflows and traceable computational evidence.",
    "融合作物表型、育种与品质科学和专用研究软件开发，连接田间影像、实验流程与可追溯的计算证据。",
    "作物表現型・育種・品質科学と専用研究ソフトウェア開発を統合し、圃場画像、実験ワークフロー、追跡可能な計算エビデンスを結び付けています。",
  ),
  publicationCta: localize("View publications", "查看论文发表", "論文を見る"),
  softwareCta: localize("Explore research software", "浏览研究软件", "研究ソフトウェアを見る"),
  focus: localize("Research focus", "研究方向", "研究領域"),
  sections: {
    publications: localize("Publications", "论文发表", "論文発表"),
    software: localize("Research software & computational frameworks", "研究软件与计算框架", "研究ソフトウェアと計算フレームワーク"),
    presentations: localize("Society presentations", "学会发表", "学会発表"),
    projects: localize("Research threads", "研究项目脉络", "研究テーマ"),
  },
  scholar: localize("View full record on Google Scholar", "在 Google Scholar 查看完整记录", "Google Scholarで全記録を見る"),
  code: localize("View public code", "查看公开代码", "公開コードを見る"),
  figurePicker: localize("Figure selector", "图片选择", "図の選択"),
  showFigure: localize("Show figure", "显示图", "図を表示"),
  previousFigure: localize("Previous visual", "上一张图片", "前の画像"),
  nextFigure: localize("Next visual", "下一张图片", "次の画像"),
  heroGalleries: [
    {
      className: "hero-main",
      autoAdvance: true,
      label: localize("Field and laboratory research visuals", "田间与实验研究图片", "圃場・実験研究画像"),
      slides: [
        {
          src: "/research/anther-culture.webp",
          code: "LAB / CULTURE",
          alt: localize("Rice anther-culture material with a scale reference", "带尺度参照的水稻花药培养实验材料", "スケール参照を含むイネ葯培養実験材料"),
          caption: localize("Rice anther-culture material", "水稻花药培养材料", "イネ葯培養材料"),
        },
        {
          src: "/research/haskap-field.webp",
          code: "FIELD / PHENOTYPE",
          alt: localize("Haskap fruit phenotype observed in the field", "田间观测的蓝靛果表型", "圃場で観測したハスカップ果実形質"),
          caption: localize("Haskap fruit phenotype in the field", "田间蓝靛果表型", "圃場のハスカップ果実形質"),
        },
        {
          src: "/research/microspore.webp",
          code: "MICROSCOPY",
          alt: localize("Microspore microscopy with a scale reference", "带尺度参照的小孢子显微图像", "スケール参照を含む小胞子顕微鏡像"),
          caption: localize("Microspore morphology and scale", "小孢子形态与尺度", "小胞子の形態とスケール"),
        },
      ],
    },
    {
      className: "hero-genome",
      autoAdvance: false,
      label: localize("Rice genome software interface visuals", "水稻基因组软件界面图片", "イネゲノムソフトウェア画面"),
      slides: [
        {
          src: "/software/genome/overview.png",
          code: "SOFTWARE",
          alt: localize("Public rice genome resource finder interface", "水稻公共基因组资源检索界面", "公開イネゲノム資源検索画面"),
          caption: localize("Public genome resource discovery", "公共基因组资源筛选", "公開ゲノム資源の探索"),
          imageClassName: "crop-genome",
        },
        {
          src: "/software/genome/options.png",
          code: "RESOURCE / SEARCH",
          alt: localize("Search options in the rice genome resource finder", "水稻基因组资源检索工具的搜索选项", "イネゲノム資源検索ツールの検索条件"),
          caption: localize("Structured resource search options", "结构化资源搜索选项", "構造化された資源検索条件"),
          imageClassName: "crop-genome",
        },
      ],
    },
    {
      className: "hero-grape",
      autoAdvance: false,
      label: localize("Grape phenotyping visuals", "葡萄表型分析图片", "ブドウ表現型解析画像"),
      slides: [
        {
          src: "/software/grape/detection-results.webp",
          code: "FIELD / AI",
          alt: localize("Detected grape berries in a field image", "田间图像中被识别的葡萄果粒", "圃場画像で検出されたブドウ果粒"),
          caption: localize("Berry detection across field time series", "田间时序果粒检测", "圃場時系列の果粒検出"),
          imageClassName: "crop-grape-detection",
        },
        {
          src: "/software/grape/early-stage.webp",
          code: "FIELD / EARLY",
          alt: localize("Early-stage grape berries photographed with a scale card", "带尺度卡拍摄的早期葡萄果粒", "スケールカードと撮影した初期ブドウ果粒"),
          caption: localize("Early-stage field observation", "早期田间观测", "初期の圃場観測"),
        },
        {
          src: "/software/grape/mature-stage.webp",
          code: "FIELD / MATURE",
          alt: localize("Mature grape berries photographed with a scale card", "带尺度卡拍摄的成熟葡萄果粒", "スケールカードと撮影した成熟ブドウ果粒"),
          caption: localize("Mature-stage field observation", "成熟期田间观测", "成熟期の圃場観測"),
        },
      ],
    },
  ],
  contact: localize(
    "Research collaboration, academic exchange and software methods.",
    "研究合作、学术交流与软件方法讨论。",
    "共同研究、学術交流、研究ソフトウェアの方法論。",
  ),
  backToTop: localize("Back to top", "返回顶部", "トップへ戻る"),
  showEarlierPresentations: localize("Show earlier presentations", "查看历年发表", "過去の発表を見る"),
  hideEarlierPresentations: localize("Hide earlier presentations", "折叠历年发表", "過去の発表を閉じる"),
};

const latestPresentationYear = Math.max(...presentations.map(({ year }) => Number(year)));
const recentPresentationYearFloor = latestPresentationYear - 4;
const recentPresentations = presentations.filter(({ year }) => Number(year) >= recentPresentationYearFloor);

type SoftwareProject = (typeof softwareProjects)[number];
type SoftwareVisual = SoftwareProject["visuals"][number];

function DownArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v10M4 8l4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UpArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 14V4M4 8l4-4 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DisclosureArrow({ open }: { open: boolean }) {
  return (
    <svg className={open ? "open" : ""} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({ id, title }: {
  id: string;
  title: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function HeroTitle({ lines, locale }: { lines: [string, string]; locale: Locale }) {
  return (
    <h1 id="hero-title" lang={locale === "zh" ? "zh-CN" : locale} aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => {
        const usesWordSpacing = line.includes(" ");
        const words = usesWordSpacing ? line.split(" ") : Array.from(line);
        const lineStart = lines.slice(0, lineIndex).reduce((total, item) => total + item.length + 1, 0);
        return (
          <span className="hero-title-line" aria-hidden="true" key={lineIndex}>
            {words.map((word, wordIndex) => {
              const wordStart = lineStart + words.slice(0, wordIndex).reduce(
                (total, item) => total + item.length + (usesWordSpacing ? 1 : 0),
                0,
              );
              return (
                <span
                  className={`hero-title-word ${usesWordSpacing ? "" : "hero-title-glyph"}`}
                  data-last-word={wordIndex === words.length - 1 ? "true" : undefined}
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

type HeroGalleryData = (typeof ui.heroGalleries)[number];

function CarouselArrow({ direction }: { direction: "previous" | "next" }) {
  const previous = direction === "previous";
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d={previous ? "M11.5 3.5 6 9l5.5 5.5" : "M6.5 3.5 12 9l-5.5 5.5"} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroGallery({ gallery, locale }: { gallery: HeroGalleryData; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = gallery.slides.length;

  useEffect(() => {
    if (!gallery.autoAdvance || paused || total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % total), 6500);
    return () => window.clearTimeout(timer);
  }, [active, gallery.autoAdvance, paused, total]);

  const move = (step: number) => setActive((current) => (current + step + total) % total);

  return (
    <div
      className={`hero-gallery ${gallery.className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={tx(gallery.label, locale)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-gallery-track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {gallery.slides.map((slide, index) => (
          <figure key={slide.src} aria-hidden={active !== index}>
            <img className={slide.imageClassName ?? ""} src={slide.src} alt={tx(slide.alt, locale)} />
            <figcaption>
              <span className="hero-figure-code">{slide.code}</span>
              <span className="hero-caption-text">{tx(slide.caption, locale)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="hero-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label={`${tx(ui.previousFigure, locale)}: ${tx(gallery.label, locale)}`}>
          <CarouselArrow direction="previous" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label={`${tx(ui.nextFigure, locale)}: ${tx(gallery.label, locale)}`}>
          <CarouselArrow direction="next" />
        </button>
      </div>
    </div>
  );
}

function ScientificPanel({ panel }: { panel: string }) {
  if (panel === "audit-workbook") {
    return (
      <div className="scientific-panel audit-panel" aria-label="Genome resource audit workbook structure">
        <div className="panel-topline"><span>OUTPUT / AUDIT WORKBOOK</span><strong>STRUCTURE PREVIEW</strong></div>
        <div className="audit-flow">
          <span><b>01</b>ALIASES</span><i>→</i><span><b>02</b>CONNECTORS</span><i>→</i>
          <span><b>03</b>IDENTITY GATE</span><i>→</i><span><b>04</b>WORKBOOK</span>
        </div>
        <div className="workbook-tabs" aria-hidden="true">
          <span className="active">Summary</span><span>All_Candidates</span><span>Input_QC</span><span>Audit_Log</span>
        </div>
        <div className="workbook-grid" aria-hidden="true">
          <div className="workbook-head"><span>CULTIVAR</span><span>ACCESSION</span><span>IDENTITY</span><span>DECISION</span></div>
          <div><span>Input row</span><span>Source ID</span><span className="ok">supported</span><span>promote</span></div>
          <div><span>Alias hit</span><span>Source ID</span><span className="warn">review</span><span>retain</span></div>
          <div><span>Broad hit</span><span>Source ID</span><span className="warn">noisy</span><span>flag</span></div>
        </div>
      </div>
    );
  }

  if (panel === "stride-inventory") {
    return (
      <div className="scientific-panel stride-panel" aria-label="STRIDE-DH public matrix inventory">
        <div className="panel-topline"><span>STRIDE-DH / DATA INVENTORY</span><strong>STRUCTURALLY VERIFIED</strong></div>
        <div className="dataset-comparison">
          <article>
            <span>SUN ET AL. 2023</span><strong>224</strong><small>labelled DH samples</small>
            <div className="matrix-bars"><i style={{ width: "100%" }} /><i style={{ width: "68%" }} /></div>
            <dl><div><dt>SNP calls</dt><dd>6,659</dd></div><div><dt>Bin map</dt><dd>470</dd></div></dl>
          </article>
          <article>
            <span>NGUYEN ET AL. 2016</span><strong>196</strong><small>non-heterozygous source rows</small>
            <div className="matrix-bars alt"><i style={{ width: "87%" }} /><i style={{ width: "22%" }} /></div>
            <dl><div><dt>Markers</dt><dd>37</dd></div><div><dt>Article-rule rows</dt><dd>178</dd></div></dl>
          </article>
        </div>
      </div>
    );
  }

  if (panel === "stride-dependence") {
    return (
      <div className="scientific-panel stride-panel" aria-label="STRIDE-DH sample dependence audit">
        <div className="panel-topline"><span>SUN 2023 / DEPENDENCE AUDIT</span><strong>INTERPRET WITH CAUTION</strong></div>
        <div className="dependence-visual" aria-hidden="true">
          <div className="node-field">
            {Array.from({ length: 22 }).map((_, index) => <i className={index % 5 === 0 ? "linked" : ""} key={index} />)}
            <span className="edge edge-a" /><span className="edge edge-b" /><span className="edge edge-c" />
          </div>
          <dl>
            <div><dt>labelled samples</dt><dd>224</dd></div>
            <div><dt>zero-conflict edges</dt><dd>78</dd></div>
            <div><dt>path components</dt><dd>174</dd></div>
            <div><dt>within-component violations</dt><dd>6</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  return (
    <div className="scientific-panel stride-panel smoke-panel" aria-label="STRIDE-DH synthetic fixture smoke test">
      <div className="panel-topline"><span>QC SMOKE / SYNTHETIC FIXTURE</span><strong>NO RESEARCH DATA</strong></div>
      <div className="code-window">
        <span><b>fixture</b> bundled_non_publishable_matrix_smoke_v1</span>
        <span><b>pair</b> fixture_A ↔ fixture_B</span>
        <span><b>comparable_markers</b> 3 / required 3</span>
        <span><b>mismatches</b> 0</span>
        <span><b>BH adjusted</b> [0.03, 0.06, 0.50]</span>
        <strong>PASS — deterministic QC primitives exercised</strong>
      </div>
    </div>
  );
}

function SoftwareMedia({ visual, locale }: { visual: SoftwareVisual; locale: Locale }) {
  if (visual.kind === "panel") return <ScientificPanel panel={visual.panel} />;
  const aspect = "aspect" in visual ? visual.aspect : "1.65";
  const mask = "mask" in visual ? visual.mask : undefined;
  const crop = "crop" in visual ? visual.crop : undefined;
  const position = "position" in visual ? visual.position : "center";

  return (
    <div
      className={["software-image-wrap", mask && `mask-${mask}`, crop && `crop-${crop}`].filter(Boolean).join(" ")}
      style={{ aspectRatio: aspect }}
    >
      <img src={visual.src} alt={tx(visual.alt, locale)} style={{ objectPosition: position }} loading="lazy" />
    </div>
  );
}

function SoftwareCase({ project, locale }: { project: SoftwareProject; locale: Locale }) {
  const [active, setActive] = useState(0);
  const visual = project.visuals[active];

  return (
    <article className="software-case" id={`software-${project.slug}`} data-reveal>
      <div className="software-copy">
        <span className="software-status">{project.status}</span>
        <h3>{project.title}</h3>
        <h4>{tx(project.subtitle, locale)}</h4>
        <p>{tx(project.description, locale)}</p>
        <div className="tag-row">{project.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
        {project.link && <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">{tx(ui.code, locale)} ↗</a>}
      </div>
      <figure className="software-media">
        <SoftwareMedia visual={visual} locale={locale} />
        <div className="media-selector" aria-label={`${project.title} ${tx(ui.figurePicker, locale)}`}>
          {project.visuals.map((item, itemIndex) => (
            <button
              type="button"
              key={`${project.slug}-${itemIndex}`}
              className={active === itemIndex ? "active" : ""}
              onClick={() => setActive(itemIndex)}
              aria-pressed={active === itemIndex}
              aria-label={`${tx(ui.showFigure, locale)} ${itemIndex + 1}: ${tx(item.caption, locale)}`}
            >
              <span>{String(itemIndex + 1).padStart(2, "0")}</span>
              <small>{tx(item.caption, locale)}</small>
            </button>
          ))}
        </div>
      </figure>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [showAllPresentations, setShowAllPresentations] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const languageNames: Array<[Locale, string]> = [["en", "English"], ["zh", "中文"], ["ja", "日本語"]];
  const visiblePresentations = showAllPresentations ? presentations : recentPresentations;
  const earlierPresentationCount = presentations.length - recentPresentations.length;

  useEffect(() => startVisitorAnalytics(), []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : "en";
  }, [locale]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setIntroComplete(true), reducedMotion ? 0 : 1650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateBackToTop = () => setShowBackToTop(window.scrollY > Math.max(360, window.innerHeight * 0.5));
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);
    return () => {
      window.removeEventListener("scroll", updateBackToTop);
      window.removeEventListener("resize", updateBackToTop);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("reveal-ready");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">{tx(ui.skip, locale)}</a>
      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="wordmark" href="#top" aria-label="Jixiao Li">
            <span className="wordmark-mark" aria-hidden="true">JL</span>
            <span>
              <span className="wordmark-name-line"><strong>{profile.englishName}</strong><em>{tx(profile.role, locale)}</em></span>
              <small>PLANT SCIENCE · RESEARCH SOFTWARE</small>
            </span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          ><span>{menuOpen ? tx(ui.close, locale) : tx(ui.menu, locale)}</span><i aria-hidden="true" /></button>
          <nav id="site-navigation" className={menuOpen ? "open" : ""} aria-label={tx(ui.navigationLabel, locale)}>
            {ui.navigation.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{tx(label, locale)}</a>)}
          </nav>
          <div className="language-switch" role="group" aria-label="Language">
            {languageNames.map(([code, label]) => (
              <button key={code} type="button" className={locale === code ? "active" : ""} aria-pressed={locale === code} onClick={() => setLocale(code)}>{label}</button>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className={`hero ${introComplete ? "intro-complete" : ""}`} aria-labelledby="hero-title">
          <div className="hero-intro">
            <p className="eyebrow">PLANT SCIENCE × COMPUTATIONAL METHODS</p>
            <HeroTitle lines={ui.heroTitle[locale]} locale={locale} />
            <p className="hero-lede">{tx(ui.heroLede, locale)}</p>
            <div className="identity-lines">
              <span>{tx(profile.affiliation, locale)}</span>
            </div>
          </div>

          <div className="hero-evidence" aria-label="Research visuals">
            {ui.heroGalleries.map((gallery) => <HeroGallery gallery={gallery} locale={locale} key={gallery.className} />)}
          </div>

          <div className="hero-actions">
            <a className="hero-action-link" href="#publications">{tx(ui.publicationCta, locale)} <DownArrow /></a>
            <a className="hero-action-link" href="#software">{tx(ui.softwareCta, locale)} <DownArrow /></a>
          </div>
        </section>

        <section className="focus-rail" aria-label={tx(ui.focus, locale)} data-reveal>
          <div className="rail-label"><span>RESEARCH FOCUS</span></div>
          {researchFocus.map((focus) => (
            <article key={focus.code}>
              <h2>{tx(focus.title, locale)}</h2><p>{tx(focus.description, locale)}</p>
            </article>
          ))}
        </section>

        <section className="section-block" id="publications" aria-labelledby="publications-title">
          <SectionHeading id="publications-title" title={tx(ui.sections.publications, locale)} />
          <div className="publication-list" data-reveal>
            {publications.map((publication) => (
              <article className="publication-item" key={publication.title}>
                <div className="paper-thumb"><img src={publication.thumb} alt={tx(publication.thumbAlt, locale)} loading="lazy" /></div>
                <div className="paper-copy">
                  <span className="topic-label">{publication.label}</span>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <div className="paper-venue-line"><strong>{publication.venue}</strong><a href={publication.doi} target="_blank" rel="noreferrer">DOI ↗</a></div>
                </div>
                <time className="paper-year" dateTime={publication.year}>{publication.year}</time>
              </article>
            ))}
          </div>
          <a className="section-link" href={profile.scholarUrl} target="_blank" rel="noreferrer" data-reveal>{tx(ui.scholar, locale)} ↗</a>
        </section>

        <section className="section-block software-section" id="software" aria-labelledby="software-title">
          <SectionHeading id="software-title" title={tx(ui.sections.software, locale)} />
          <div className="software-list">
            {softwareProjects.map((project) => <SoftwareCase project={project} locale={locale} key={project.slug} />)}
          </div>
        </section>

        <section className="section-block" id="presentations" aria-labelledby="presentations-title">
          <SectionHeading id="presentations-title" title={tx(ui.sections.presentations, locale)} />
          <div className="talk-list" id="presentation-list" data-reveal>
            {visiblePresentations.map((presentation, index) => (
              <article key={`${presentation.year}-${index}`}>
                <time className="talk-year" dateTime={presentation.year}>{presentation.year}</time>
                <div><small>{tx(presentation.format, locale)}</small><h3>{tx(presentation.title, locale)}</h3><p>{tx(presentation.event, locale)}</p></div>
              </article>
            ))}
          </div>
          {earlierPresentationCount > 0 && (
            <button
              className="presentation-toggle"
              type="button"
              aria-expanded={showAllPresentations}
              aria-controls="presentation-list"
              onClick={() => setShowAllPresentations((open) => !open)}
            >
              <span>{tx(showAllPresentations ? ui.hideEarlierPresentations : ui.showEarlierPresentations, locale)}</span>
              {!showAllPresentations && <small>{earlierPresentationCount}</small>}
              <DisclosureArrow open={showAllPresentations} />
            </button>
          )}
        </section>

        <section className="section-block" id="projects" aria-labelledby="projects-title">
          <SectionHeading id="projects-title" title={tx(ui.sections.projects, locale)} />
          <div className="project-list" data-reveal>
            {researchProjects.map((project) => (
              <article key={project.code}>
                <div><h3>{tx(project.title, locale)}</h3><p>{tx(project.description, locale)}</p>
                  <div className="tag-row">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
          <div><p className="eyebrow">CONTACT / ACADEMIC EXCHANGE</p><h2 id="contact-title">{tx(ui.contact, locale)}</h2></div>
          <address>
            <span>{tx(profile.affiliation, locale)}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          </address>
        </section>
      </main>

      <a
        className={`floating-back-to-top ${showBackToTop ? "visible" : ""}`}
        href="#top"
        aria-label={tx(ui.backToTop, locale)}
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <span>{tx(ui.backToTop, locale)}</span><UpArrow />
      </a>
      <footer><span>© 2026 {profile.englishName}</span></footer>
    </>
  );
}
