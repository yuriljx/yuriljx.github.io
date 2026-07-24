"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  type Locale,
  type LocalizedText,
  localize,
  patents,
  presentations,
  profile,
  publications,
  researchFocus,
  researchProjects,
  softwareProjects,
} from "./content";
import {
  detectDefaultLocale,
  readSavedLocale,
  saveLocale,
} from "./language-preference";
import { scrollPageToTop, tokenizeHeroLine } from "./page-navigation";
import { startVisitorAnalytics } from "./visitor-analytics";

const tx = (value: LocalizedText | string, locale: Locale) =>
  typeof value === "string" ? value : value[locale];

type Theme = "light" | "dark";

const ui = {
  skip: localize("Skip to main content", "跳到主要内容", "メインコンテンツへ移動"),
  menu: localize("Menu", "目录", "メニュー"),
  close: localize("Close", "关闭", "閉じる"),
  navigationLabel: localize("Primary navigation", "主要导航", "メインナビゲーション"),
  languageLabel: localize("Select language", "选择语言", "言語を選択"),
  darkTheme: localize("Switch to dark theme", "切换为深色主题", "ダークテーマに切り替え"),
  lightTheme: localize("Switch to light theme", "切换为浅色主题", "ライトテーマに切り替え"),
  navigation: [
    [localize("Publications", "论文", "論文"), "#publications"],
    [localize("Software", "软件", "ソフトウェア"), "#software"],
    [localize("Presentations", "学会发表", "学会発表"), "#presentations"],
    [localize("Patents", "专利", "特許"), "#patents"],
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
  stats: [
    { value: publications.length, label: localize("Peer-reviewed papers", "同行评审论文", "査読論文") },
    { value: softwareProjects.length, label: localize("Research software", "研究软件", "研究ソフトウェア") },
    { value: patents.length, label: localize("Patents & models", "专利与实用新型", "特許・実用新案") },
    { value: presentations.length, label: localize("Conference talks", "学会 / 会议发表", "学会・会議発表") },
  ],
  sections: {
    publications: localize("Publications", "论文发表", "論文発表"),
    software: localize("Research software & computational frameworks", "研究软件与计算框架", "研究ソフトウェアと計算フレームワーク"),
    presentations: localize("Society presentations", "学会发表", "学会発表"),
    patents: localize("Patents", "专利", "特許"),
    projects: localize("Research threads", "研究项目脉络", "研究テーマ"),
  },
  scholar: localize("View full record on Google Scholar", "在 Google Scholar 查看完整记录", "Google Scholarで全記録を見る"),
  code: localize("View project repository", "查看项目仓库", "プロジェクトリポジトリを見る"),
  figurePicker: localize("Figure selector", "图片选择", "図の選択"),
  showFigure: localize("Show figure", "显示图", "図を表示"),
  previousFigure: localize("Previous visual", "上一张图片", "前の画像"),
  nextFigure: localize("Next visual", "下一张图片", "次の画像"),
  graphLabel: localize(
    "Interactive evidence graph connecting research materials, methods and software",
    "连接研究材料、方法与软件的交互式证据图谱",
    "研究材料・手法・ソフトウェアを結ぶインタラクティブなエビデンスグラフ",
  ),
  graphHint: localize(
    "Hover to trace links · click a project node",
    "悬停查看关联 · 点击项目节点跳转",
    "カーソルで関連表示・ノードをクリック",
  ),
  graphJump: localize("Project links", "项目链接", "プロジェクトリンク"),
  legendField: localize("Field", "田间观测", "圃場観測"),
  legendMethod: localize("Method", "计算方法", "計算手法"),
  legendSoftware: localize("Software / evidence", "软件 / 证据", "ソフト / 証拠"),
  evidenceGalleries: [
    {
      className: "evidence-lab",
      autoAdvance: true,
      label: localize("Laboratory and culture research visuals", "实验与培养研究图片", "実験・培養研究画像"),
      slides: [
        {
          src: "/research/anther-culture.webp",
          code: "LAB / CULTURE",
          alt: localize("Rice anther-culture material with a scale reference", "带尺度参照的水稻花药培养实验材料", "スケール参照を含むイネ葯培養実験材料"),
          caption: localize("Rice anther-culture material", "水稻花药培养材料", "イネ葯培養材料"),
        },
        {
          src: "/research/microspore-fluorescence.webp",
          code: "MICROSCOPY / FLUORESCENCE",
          alt: localize("Fluorescence micrograph of isolated rice microspores", "分离水稻小孢子的荧光显微观察图", "単離イネ小胞子の蛍光顕微鏡像"),
          caption: localize("Fluorescence observation of isolated microspores", "分离小孢子的荧光观察", "単離小胞子の蛍光観察"),
        },
        {
          src: "/research/microspore.webp",
          code: "MICROSCOPY / MORPHOLOGY",
          alt: localize("Microspore microscopy with a scale reference", "带尺度参照的小孢子显微图像", "スケール参照を含む小胞子顕微鏡像"),
          caption: localize("Microspore morphology and scale", "小孢子形态与尺度", "小胞子の形態とスケール"),
        },
        {
          src: "/software/callustrack/annotation-workspace.png",
          code: "ANNOTATION / TRACKING",
          alt: localize("CallusTrack workspace with persistent labels on callus objects across a culture sequence", "CallusTrack 工作区中跨培养时序持续标记的愈伤组织", "培養時系列を通じてカルスを継続的に標識したCallusTrack画面"),
          caption: localize("Persistent callus labels across culture frames", "跨培养时序帧持续追踪的愈伤组织标记", "培養時系列を通じたカルスの継続追跡"),
          imageClassName: "crop-callus-annotation",
        },
      ],
    },
    {
      className: "evidence-field",
      autoAdvance: true,
      label: localize("Field and greenhouse research visuals", "田间与温室研究图片", "圃場・温室研究画像"),
      slides: [
        {
          src: "/research/haskap-field.webp",
          code: "HASKAP / FIELD",
          alt: localize("Haskap fruit phenotype observed in the field", "田间观测的蓝靛果表型", "圃場で観測したハスカップ果実形質"),
          caption: localize("Haskap fruit phenotype in the field", "田间蓝靛果表型", "圃場のハスカップ果実形質"),
        },
        {
          src: "/research/rice-greenhouse.webp",
          code: "RICE / GREENHOUSE",
          alt: localize("Rice plants under greenhouse culture", "温室培养的水稻植株", "温室栽培のイネ植物"),
          caption: localize("Rice plants under greenhouse culture", "温室培养的水稻植株", "温室栽培のイネ植物"),
          position: "center 38%",
        },
        {
          src: "/research/grape-field.webp",
          code: "GRAPE / FIELD",
          alt: localize("Grape berries photographed with a field scale reference", "带尺度参照拍摄的田间葡萄果粒", "スケール参照と撮影した圃場ブドウ果粒"),
          caption: localize("Grape berries with a field scale reference", "带尺度参照的田间葡萄果粒", "スケール参照付きの圃場ブドウ果粒"),
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
  patentRecords: localize(`${patents.length} patent records`, `${patents.length} 项专利记录`, `特許記録 ${patents.length}件`),
  patentOverview: localize(
    "Patent work spanning energy storage, analytical detection, environmental systems and automated inspection.",
    "涵盖储能、分析检测、环境设备与自动化检验的专利工作。",
    "蓄電、分析検出、環境機器、自動検査にわたる特許実績。",
  ),
  showPatents: localize("View patent records", "查看专利记录", "特許記録を見る"),
  hidePatents: localize("Hide patent records", "折叠专利记录", "特許記録を閉じる"),
  patentPublication: localize("Publication", "公开号", "公開番号"),
  patentInventors: localize("Inventors", "发明人", "発明者"),
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

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" />
      <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5" fill="none" stroke="currentColor" />
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" />
      <path d="M10 3a7 7 0 0 1 0 14z" fill="currentColor" />
    </svg>
  );
}

function StatCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let observer: IntersectionObserver | null = null;

    const run = () => {
      if (reducedMotion) {
        node.textContent = String(value);
        return;
      }

      node.textContent = "0";
      let startedAt: number | null = null;
      const duration = 1100;
      const step = (timestamp: number) => {
        startedAt ??= timestamp;
        const progress = Math.min(1, (timestamp - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = String(Math.round(value * eased));
        if (progress < 1) animationFrame = window.requestAnimationFrame(step);
      };
      animationFrame = window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      run();
    } else {
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer?.disconnect();
        run();
      }, { threshold: 0.45 });
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

function EvidenceGraph({ locale, theme }: { locale: Locale; theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [
      { x: .10, y: .22, label: "Haskap", group: 0 },
      { x: .14, y: .44, label: "Grape", group: 0 },
      { x: .10, y: .64, label: "Rice", group: 0 },
      { x: .08, y: .84, label: "Microspore", group: 0 },
      { x: .23, y: .34, label: "Field imaging", group: 0 },
      { x: .45, y: .16, label: "Ploidy / DH", group: 1, href: "software-rice-dh-record" },
      { x: .43, y: .40, label: "RGB features", group: 1 },
      { x: .49, y: .62, label: "GC–MS", group: 1 },
      { x: .44, y: .85, label: "YOLOv8", group: 1, href: "software-grape-length" },
      { x: .54, y: .28, label: "Time series", group: 1 },
      { x: .86, y: .22, label: "CallusTrack", group: 2, href: "software-callustrack" },
      { x: .90, y: .45, label: "Genome Finder", group: 2, href: "software-genome-finder" },
      { x: .84, y: .67, label: "Trait Explorer", group: 2, href: "software-trait-explorer" },
      { x: .90, y: .85, label: "Provenance", group: 2 },
    ].map((node, index) => ({
      ...node,
      phase: index * .7,
      radius: node.group === 2 ? 4 : node.group === 1 ? 3 : 3.3,
      px: 0,
      py: 0,
    }));
    const edges = [
      [0, 5], [0, 7], [0, 6], [1, 8], [1, 9], [2, 5], [2, 3], [2, 10],
      [3, 5], [4, 6], [4, 8], [5, 10], [6, 12], [7, 12], [9, 12], [8, 10],
      [11, 12], [11, 13], [10, 13], [12, 13],
    ] as const;
    const neighbours = nodes.map(() => new Set<number>());
    edges.forEach(([a, b]) => {
      neighbours[a].add(b);
      neighbours[b].add(a);
    });

    const palette = theme === "dark"
      ? { grid: "rgba(255,255,255,.05)", edge: "rgba(120,150,170,.24)", dim: "rgba(255,255,255,.07)", groups: ["#5fc79a", "#45d3f1", "#5cc0e8"], background: "#0b1a27", text: "#8ba0ac" }
      : { grid: "rgba(6,19,31,.05)", edge: "rgba(90,120,140,.28)", dim: "rgba(6,19,31,.06)", groups: ["#2c6b4f", "#0a9fce", "#17567f"], background: "#ffffff", text: "#6d7c86" };

    let hovered = -1;
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    let animationFrame = 0;
    let startedAt: number | null = null;

    const locatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };
    const clearPointer = () => {
      pointerX = null;
      pointerY = null;
      hovered = -1;
      canvas.style.cursor = "default";
    };
    const activateNode = () => {
      const target = hovered >= 0 ? nodes[hovered] : null;
      if (!target?.href) return;
      document.getElementById(target.href)?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    canvas.addEventListener("pointermove", locatePointer);
    canvas.addEventListener("pointerleave", clearPointer);
    canvas.addEventListener("click", activateNode);

    const draw = (timestamp: number) => {
      startedAt ??= timestamp;
      const elapsed = (timestamp - startedAt) / 1000;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      const gap = Math.max(26, width / 15);
      context.fillStyle = palette.grid;
      for (let x = gap * .5; x < width; x += gap) {
        for (let y = gap * .5; y < height; y += gap) context.fillRect(x, y, 1, 1);
      }

      const drift = reducedMotion ? 0 : 1;
      nodes.forEach((node) => {
        node.px = (node.x + Math.sin(elapsed * .45 + node.phase) * .004 * drift) * width;
        node.py = (node.y + Math.cos(elapsed * .4 + node.phase) * .006 * drift) * height;
      });

      hovered = -1;
      if (pointerX !== null && pointerY !== null) {
        let closest = 20 * 20;
        nodes.forEach((node, index) => {
          const dx = node.px - pointerX!;
          const dy = node.py - pointerY!;
          const distance = dx * dx + dy * dy;
          if (distance < closest) {
            closest = distance;
            hovered = index;
          }
        });
      }
      canvas.style.cursor = hovered >= 0 && nodes[hovered].href ? "pointer" : "default";

      edges.forEach(([from, to], edgeIndex) => {
        const source = nodes[from];
        const target = nodes[to];
        const progress = reducedMotion ? 1 : Math.max(0, Math.min(1, (elapsed - .15 - edgeIndex * .04) / .5));
        if (!progress) return;
        const connected = hovered < 0 || from === hovered || to === hovered;
        context.strokeStyle = hovered < 0 ? palette.edge : connected ? palette.groups[1] : palette.dim;
        context.lineWidth = hovered >= 0 && connected ? 1.8 : 1;
        context.beginPath();
        context.moveTo(source.px, source.py);
        context.lineTo(
          source.px + (target.px - source.px) * progress,
          source.py + (target.py - source.py) * progress,
        );
        context.stroke();
      });

      const wide = width >= 380;
      context.textBaseline = "middle";
      nodes.forEach((node, index) => {
        const progress = reducedMotion ? 1 : Math.max(0, Math.min(1, (elapsed - .05 - index * .045) / .4));
        if (!progress) return;
        const active = hovered < 0 || index === hovered || neighbours[hovered].has(index);
        const color = palette.groups[node.group];
        const filled = node.group === 2 || index === hovered;
        const radius = node.radius * progress * (index === hovered ? 1.5 : 1);

        if ((node.group === 2 || index === hovered) && !reducedMotion) {
          context.globalAlpha = active ? .9 : .2;
          context.strokeStyle = color;
          context.lineWidth = 1;
          context.beginPath();
          context.arc(node.px, node.py, radius + 3 + Math.sin(elapsed * 2 + node.phase) * 1.6, 0, Math.PI * 2);
          context.stroke();
        }

        context.globalAlpha = active ? 1 : .26;
        context.fillStyle = filled ? color : palette.background;
        context.beginPath();
        context.arc(node.px, node.py, radius, 0, Math.PI * 2);
        context.fill();
        if (!filled) {
          context.strokeStyle = color;
          context.lineWidth = 1.3;
          context.stroke();
        }

        if (index === hovered || (wide && elapsed >= 1 && (hovered < 0 || active))) {
          const alignRight = node.group !== 2;
          context.font = `${index === hovered ? 600 : 400} ${index === hovered ? 11 : 9.5}px "IBM Plex Mono", monospace`;
          context.textAlign = alignRight ? "left" : "right";
          context.globalAlpha = index === hovered ? 1 : hovered < 0 ? .72 : .95;
          context.fillStyle = index === hovered ? color : palette.text;
          context.fillText(node.label, alignRight ? node.px + radius + 6 : node.px - radius - 6, node.py);
        }
      });
      context.globalAlpha = 1;

      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", locatePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("click", activateNode);
    };
  }, [theme]);

  return (
    <div className="evidence-graph" role="group" aria-label={tx(ui.graphLabel, locale)}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="evidence-graph-heading" aria-hidden="true">
        <span>EVIDENCE GRAPH</span>
        <small>{tx(ui.graphHint, locale)}</small>
      </div>
      <div className="evidence-graph-legend" aria-hidden="true">
        <span><i className="legend-field" />{tx(ui.legendField, locale)}</span>
        <span><i className="legend-method" />{tx(ui.legendMethod, locale)}</span>
        <span><i className="legend-software" />{tx(ui.legendSoftware, locale)}</span>
      </div>
      <div className="evidence-graph-links" role="navigation" aria-label={tx(ui.graphJump, locale)}>
        <a href="#software-callustrack">CallusTrack</a>
        <a href="#software-genome-finder">Genome Finder</a>
        <a href="#software-grape-length">Grape Length</a>
      </div>
    </div>
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
        const { tokens, usesWordSpacing }: { tokens: string[]; usesWordSpacing: boolean } = tokenizeHeroLine(line);
        const lineStart = lines.slice(0, lineIndex).reduce((total, item) => total + item.length + 1, 0);
        return (
          <span className="hero-title-line" aria-hidden="true" key={lineIndex}>
            {tokens.map((word, wordIndex) => {
              const wordStart = lineStart + tokens.slice(0, wordIndex).reduce(
                (total, item) => total + item.length + (usesWordSpacing ? 1 : 0),
                0,
              );
              const keepsClosingPunctuation = !usesWordSpacing && word.length > 1;
              return (
                <span
                  className={[
                    "hero-title-word",
                    usesWordSpacing ? "" : "hero-title-glyph",
                    keepsClosingPunctuation ? "hero-title-tail" : "",
                  ].filter(Boolean).join(" ")}
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

type HeroGalleryData = (typeof ui.evidenceGalleries)[number];

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
            <img
              className={"imageClassName" in slide ? slide.imageClassName ?? "" : ""}
              src={slide.src}
              alt={tx(slide.alt, locale)}
              style={{ objectPosition: "position" in slide ? slide.position : undefined }}
            />
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
      <div className="hero-gallery-dots" aria-label={tx(ui.figurePicker, locale)}>
        {gallery.slides.map((slide, index) => (
          <button
            type="button"
            className={active === index ? "active" : ""}
            aria-label={`${tx(ui.showFigure, locale)} ${index + 1}: ${tx(slide.caption, locale)}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            key={`${slide.src}-dot`}
          />
        ))}
      </div>
    </div>
  );
}

function SoftwareMedia({ visual, locale }: { visual: SoftwareVisual; locale: Locale }) {
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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [showAllPresentations, setShowAllPresentations] = useState(false);
  const [showPatents, setShowPatents] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });
  const languageNames: Array<[Locale, string]> = [["en", "English"], ["zh", "中文"], ["ja", "日本語"]];
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);
  const visiblePresentations = showAllPresentations ? presentations : recentPresentations;
  const earlierPresentationCount = presentations.length - recentPresentations.length;

  useEffect(() => startVisitorAnalytics(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("jixiao-theme", theme);
    } catch {
      // The visual preference remains active for this page even when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    const savedLocale = readSavedLocale() as Locale | null;
    const initialLocale: Promise<Locale> = savedLocale
      ? Promise.resolve(savedLocale)
      : detectDefaultLocale() as Promise<Locale>;

    void initialLocale.then((detectedLocale) => {
      if (!cancelled && !readSavedLocale()) setLocale(detectedLocale);
      else if (!cancelled && savedLocale) setLocale(savedLocale);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : "en";
  }, [locale]);

  useEffect(() => {
    if (!languageOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) setLanguageOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setLanguageOpen(false);
      languageTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsidePress, { passive: true });
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [languageOpen]);

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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducedMotion || !finePointer) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnet]"));
    const cleanups = elements.map((element) => {
      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .16;
        const y = (event.clientY - rect.top - rect.height / 2) * .22;
        element.style.transform = `translate(${x}px, ${y}px)`;
      };
      const reset = () => {
        element.style.transform = "";
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">{tx(ui.skip, locale)}</a>
      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="wordmark" href="#top" aria-label="Jixiao Li">
            <span className="wordmark-mark" aria-hidden="true" />
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
            onClick={() => {
              setLanguageOpen(false);
              setMenuOpen((open) => !open);
            }}
          ><span>{menuOpen ? tx(ui.close, locale) : tx(ui.menu, locale)}</span><i aria-hidden="true" /></button>
          <nav id="site-navigation" className={menuOpen ? "open" : ""} aria-label={tx(ui.navigationLabel, locale)}>
            {ui.navigation.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{tx(label, locale)}</a>)}
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
                <GlobeIcon />
                <span className="language-code" aria-hidden="true">{locale.toUpperCase()}</span>
              </button>
              <div id="language-options" className="language-options" aria-label={tx(ui.languageLabel, locale)}>
                {languageNames.map(([code, label]) => (
                  <button
                    key={code}
                    type="button"
                    className={locale === code ? "active" : ""}
                    aria-pressed={locale === code}
                    onClick={() => {
                      saveLocale(code);
                      setLocale(code);
                      setLanguageOpen(false);
                    }}
                  >
                    <span>{label}</span>
                    <small>{code === "en" ? "EN" : code === "zh" ? "ZH" : "JA"}</small>
                  </button>
                ))}
              </div>
            </div>
            <button
              className="theme-toggle"
              type="button"
              data-magnet
              suppressHydrationWarning
              aria-label={tx(theme === "dark" ? ui.lightTheme : ui.darkTheme, locale)}
              title={tx(theme === "dark" ? ui.lightTheme : ui.darkTheme, locale)}
              aria-pressed={theme === "dark"}
              onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            >
              <ThemeIcon />
            </button>
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
            <div className="hero-actions">
              <a className="hero-action-link primary" href="#publications" data-magnet>{tx(ui.publicationCta, locale)} <DownArrow /></a>
              <a className="hero-action-link" href="#software" data-magnet>{tx(ui.softwareCta, locale)} <DownArrow /></a>
            </div>
            <dl className="hero-stats">
              {ui.stats.map((stat) => (
                <div key={stat.value + tx(stat.label, locale)}>
                  <dd><StatCounter value={stat.value} /></dd>
                  <dt>{tx(stat.label, locale)}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-evidence" aria-label="Research visuals">
            <EvidenceGraph locale={locale} theme={theme} />
            {ui.evidenceGalleries.map((gallery) => <HeroGallery gallery={gallery} locale={locale} key={gallery.className} />)}
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

        <section className="section-block" id="patents" aria-labelledby="patents-title">
          <SectionHeading id="patents-title" title={tx(ui.sections.patents, locale)} />
          <div className="patent-disclosure" data-reveal>
            <button
              className="patent-summary"
              type="button"
              aria-expanded={showPatents}
              aria-controls="patent-list"
              onClick={() => setShowPatents((open) => !open)}
            >
              <span className="patent-summary-copy">
                <small>{tx(ui.patentRecords, locale)} · 2014—2024</small>
                <strong>{tx(ui.patentOverview, locale)}</strong>
              </span>
              <span className="patent-summary-action">
                {tx(showPatents ? ui.hidePatents : ui.showPatents, locale)}
                <DisclosureArrow open={showPatents} />
              </span>
            </button>
            <div className="patent-list" id="patent-list" hidden={!showPatents}>
              {patents.map((patent) => (
                <article key={patent.publicationNumber}>
                  <time className="patent-year" dateTime={patent.year}>{patent.year}</time>
                  <div className="patent-copy">
                    <small>{tx(patent.type, locale)}</small>
                    <h3>{tx(patent.title, locale)}</h3>
                    <p><span>{tx(ui.patentInventors, locale)}</span>{tx(patent.inventors, locale)}</p>
                  </div>
                  <a className="patent-publication" href={patent.link} target="_blank" rel="noreferrer">
                    <span>{tx(ui.patentPublication, locale)}</span>
                    <strong>{patent.publicationNumber}</strong>
                  </a>
                </article>
              ))}
            </div>
          </div>
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

      <button
        type="button"
        className={`floating-back-to-top ${showBackToTop ? "visible" : ""}`}
        data-magnet
        aria-label={tx(ui.backToTop, locale)}
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={() => scrollPageToTop(window)}
      >
        <span>{tx(ui.backToTop, locale)}</span><UpArrow />
      </button>
      <footer><span>© 2026 {profile.englishName}</span></footer>
    </>
  );
}
