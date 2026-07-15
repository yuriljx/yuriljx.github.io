"use client";

import { useEffect, useState } from "react";
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

const tx = (value: LocalizedText | string, locale: Locale) =>
  typeof value === "string" ? value : value[locale];

const ui = {
  skip: localize("Skip to main content", "跳到主要内容", "メインコンテンツへ移動"),
  menu: localize("Menu", "目录", "メニュー"),
  close: localize("Close", "关闭", "閉じる"),
  navigationLabel: localize("Primary navigation", "主要导航", "メインナビゲーション"),
  navigation: [
    [localize("Publications", "论文", "論文"), "#publications"],
    [localize("Presentations", "学会发表", "学会発表"), "#presentations"],
    [localize("Software", "软件", "ソフトウェア"), "#software"],
    [localize("Projects", "项目", "研究テーマ"), "#projects"],
    [localize("Contact", "联系", "連絡先"), "#contact"],
  ] as const,
  heroTitle: {
    en: ["Aligning field observations", "with experimental records and computational evidence."],
    zh: ["让田间观测、实验记录", "与计算证据相互校准。"],
    ja: ["圃場観測と実験記録を、", "計算的エビデンスと結ぶ。"],
  } satisfies Record<Locale, [string, string]>,
  heroLede: localize(
    "I study crop phenotypes, breeding and quality, while developing research software that connects images, experimental workflows and traceable evidence.",
    "研究聚焦作物表型、育种与品质分析，并将研究软件作为连接影像、实验流程和可追溯证据的基础设施。",
    "作物表現型、育種、品質分析を研究し、画像・実験ワークフロー・追跡可能なエビデンスをつなぐ研究ソフトウェアを開発しています。",
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
  heroFigures: [
    {
      src: "/research/anther-culture.webp",
      code: "LAB / 2026",
      alt: localize("Rice anther-culture material with a scale reference", "带尺度参照的水稻花药培养实验材料", "スケール参照を含むイネ葯培養実験材料"),
      caption: localize("Anther-culture material and scale reference", "花药培养实验材料与尺度参照", "葯培養材料とスケール参照"),
    },
    {
      src: "/software/genome/overview.png",
      code: "SOFTWARE",
      alt: localize("Public rice genome resource finder interface", "水稻公共基因组资源检索界面", "公開イネゲノム資源検索画面"),
      caption: localize("Public genome resource discovery", "公共基因组资源筛选", "公開ゲノム資源の探索"),
    },
    {
      src: "/software/grape/detection-results.webp",
      code: "FIELD / AI",
      alt: localize("Detected grape berries in a field image", "田间图像中被识别的葡萄果粒", "圃場画像で検出されたブドウ果粒"),
      caption: localize("Berry detection across field time series", "田间时序中的果粒检测", "圃場時系列における果粒検出"),
    },
  ],
  contact: localize(
    "Research collaboration, academic exchange and software methods.",
    "研究合作、学术交流与软件方法讨论。",
    "共同研究、学術交流、研究ソフトウェアの方法論。",
  ),
  backToTop: localize("Back to top", "返回顶部", "トップへ戻る"),
};

type SoftwareProject = (typeof softwareProjects)[number];
type SoftwareVisual = SoftwareProject["visuals"][number];

function DownArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v10M4 8l4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({ id, index, label, title }: {
  id: string;
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-code"><span>{index}</span><span>{label}</span></div>
      <h2 id={id}>{title}</h2>
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

function SoftwareCase({ project, index, locale }: { project: SoftwareProject; index: number; locale: Locale }) {
  const [active, setActive] = useState(0);
  const visual = project.visuals[active];

  return (
    <article className="software-case" id={`software-${project.slug}`}>
      <div className="software-copy">
        <div className="software-index">{String(index + 1).padStart(2, "0")} / {String(softwareProjects.length).padStart(2, "0")}</div>
        <span className="software-status">{project.status}</span>
        <h3>{project.title}</h3>
        <h4>{tx(project.subtitle, locale)}</h4>
        <p>{tx(project.description, locale)}</p>
        <div className="tag-row">{project.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
        {project.link && <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">{tx(ui.code, locale)} ↗</a>}
      </div>
      <figure className="software-media">
        <SoftwareMedia visual={visual} locale={locale} />
        <figcaption><span>{active + 1} / {project.visuals.length}</span>{tx(visual.caption, locale)}</figcaption>
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
  const languageNames: Array<[Locale, string]> = [["en", "English"], ["zh", "中文"], ["ja", "日本語"]];

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : "en";
  }, [locale]);

  return (
    <>
      <a className="skip-link" href="#main-content">{tx(ui.skip, locale)}</a>
      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="wordmark" href="#top" aria-label="Jixiao Li">
            <span className="wordmark-mark" aria-hidden="true">JL</span>
            <span><strong>{profile.englishName}</strong><small>PLANT SCIENCE · RESEARCH SOFTWARE</small></span>
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
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <p className="eyebrow">PLANT SCIENCE × COMPUTATIONAL METHODS</p>
            <h1 id="hero-title" lang={locale === "zh" ? "zh-CN" : locale}>
              <span>{ui.heroTitle[locale][0]}</span>
              <span>{ui.heroTitle[locale][1]}</span>
            </h1>
            <p className="hero-lede">{tx(ui.heroLede, locale)}</p>
            <div className="identity-lines">
              <span>{tx(profile.affiliation, locale)}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>

          <div className="hero-evidence" aria-label="Research visuals">
            {ui.heroFigures.map((figure, index) => (
              <figure className={index === 0 ? "evidence-main" : ""} key={figure.src}>
                <img src={figure.src} alt={tx(figure.alt, locale)} />
                <figcaption><span>{figure.code}</span>{tx(figure.caption, locale)}</figcaption>
              </figure>
            ))}
          </div>

          <div className="hero-actions">
            <a className="hero-action-link" href="#publications">{tx(ui.publicationCta, locale)} <DownArrow /></a>
            <a className="hero-action-link" href="#software">{tx(ui.softwareCta, locale)} <DownArrow /></a>
          </div>
        </section>

        <section className="focus-rail" aria-label={tx(ui.focus, locale)}>
          <div className="rail-label"><span>RESEARCH FOCUS</span><small>01—03</small></div>
          {researchFocus.map((focus) => (
            <article key={focus.code}>
              <span>{focus.code}</span><div><h2>{tx(focus.title, locale)}</h2><p>{tx(focus.description, locale)}</p></div>
            </article>
          ))}
        </section>

        <section className="section-block" id="publications" aria-labelledby="publications-title">
          <SectionHeading id="publications-title" index="01" label="PUBLICATIONS" title={tx(ui.sections.publications, locale)} />
          <div className="publication-list">
            {publications.map((publication, index) => (
              <article className="publication-item" key={publication.title}>
                <div className="paper-thumb"><img src={publication.thumb} alt={tx(publication.thumbAlt, locale)} loading="lazy" /></div>
                <div className="paper-copy">
                  <span className="topic-label">{publication.label}</span>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <div className="paper-venue-line"><strong>{publication.venue}</strong><a href={publication.doi} target="_blank" rel="noreferrer">DOI ↗</a></div>
                </div>
                <div className="paper-meta"><span>{String(index + 1).padStart(2, "0")}</span><b>{publication.year}</b></div>
              </article>
            ))}
          </div>
          <a className="section-link" href={profile.scholarUrl} target="_blank" rel="noreferrer">{tx(ui.scholar, locale)} ↗</a>
        </section>

        <section className="section-block software-section" id="software" aria-labelledby="software-title">
          <SectionHeading id="software-title" index="02" label="RESEARCH SOFTWARE" title={tx(ui.sections.software, locale)} />
          <div className="software-list">
            {softwareProjects.map((project, index) => <SoftwareCase project={project} index={index} locale={locale} key={project.slug} />)}
          </div>
        </section>

        <section className="section-block" id="presentations" aria-labelledby="presentations-title">
          <SectionHeading id="presentations-title" index="03" label="SOCIETY PRESENTATIONS" title={tx(ui.sections.presentations, locale)} />
          <div className="talk-list">
            {presentations.map((presentation, index) => (
              <article key={`${presentation.year}-${index}`}>
                <div className="talk-code"><span>{String(index + 1).padStart(2, "0")}</span><b>{presentation.year}</b></div>
                <div><small>{tx(presentation.format, locale)}</small><h3>{tx(presentation.title, locale)}</h3><p>{tx(presentation.event, locale)}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="projects" aria-labelledby="projects-title">
          <SectionHeading id="projects-title" index="04" label="PROJECT THREADS" title={tx(ui.sections.projects, locale)} />
          <div className="project-list">
            {researchProjects.map((project) => (
              <article key={project.code}>
                <span>{project.code}</span><div><h3>{tx(project.title, locale)}</h3><p>{tx(project.description, locale)}</p>
                  <div className="tag-row">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div><p className="eyebrow">CONTACT / ACADEMIC EXCHANGE</p><h2 id="contact-title">{tx(ui.contact, locale)}</h2></div>
          <address>
            <span>{tx(profile.affiliation, locale)}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          </address>
        </section>
      </main>

      <footer><span>© 2026 {profile.englishName}</span><span>Research · Publications · Software</span><a href="#top">{tx(ui.backToTop, locale)} ↑</a></footer>
    </>
  );
}
