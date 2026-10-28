"use client";

import { useState } from "react";
import { localize, openSoftware, researchTools, type Locale } from "../content";
import { useLightbox } from "./Lightbox";
import { ArrowOut, Expand } from "./icons";
import { tx } from "./hooks";

const ui = {
  title: localize("Software", "研究软件", "ソフトウェア"),
  intro: localize(
    "Two open packages accompany my first-author studies: the grape growth code for the published Hortic. J. paper, and a DOI-archived reproduction package for the submitted Rice manuscript. Tools that support day-to-day experiments are shown separately as showcases.",
    "两个开放软件包分别配套我的第一作者研究：已发表 Hortic. J. 论文的葡萄生长代码，以及已投稿 Rice 稿件的复现软件包（带 DOI）。支撑日常实验的研究工具以展示仓库形式单独列出。",
    "筆頭著者研究には2つの公開パッケージがあります。既発表の Hortic. J. 論文のブドウ成長解析コードと、Rice 投稿論文の再現用パッケージ（DOI付き）です。日々の実験を支える研究ツールは、ショーケースとして別に紹介します。",
  ),
  open: localize("Open software", "开放软件", "公開ソフトウェア"),
  tools: localize("Research tools in development", "开发中的研究工具", "開発中の研究ツール"),
  toolsNote: localize(
    "Showcase repositories present synthetic illustrations only — no experimental data.",
    "展示仓库仅包含合成示意图，不含实验数据。",
    "ショーケースのリポジトリは合成図のみで、実験データは含みません。",
  ),
  showcase: localize("Showcase", "展示仓库", "ショーケース"),
  images: localize("View images", "查看图片", "画像を見る"),
  figure: localize("Figure", "图", "図"),
  noDownloads: localize("no downloads · no model fitting · no tuning", "不下载 · 不拟合 · 不调参", "ダウンロード・推定・調整なし"),
  inputs: localize("inputs checked before scoring", "评分前检查输入", "採点前に入力を検査"),
  cells: localize("4,940 frozen prediction cells scored", "已评分 4,940 个冻结预测单元", "保存済み予測 4,940 セルを採点"),
  rows: localize("9,240 metric rows written", "已写出 9,240 行指标", "指標 9,240 行を出力"),
  datasets: localize("rice NAM · MAGIC · IRRI comparisons", "水稻 NAM · MAGIC · IRRI 比较", "イネ NAM・MAGIC・IRRI 比較"),
};

function ReproductionPanel({ locale }: { locale: Locale }) {
  return (
    <div className="repro-panel" aria-hidden="true">
      <div className="repro-bar"><i /><i /><i /><span>reproduce.py</span></div>
      <pre>
        <span className="repro-line"><b>$</b> python reproduce.py &lt;NAM workbook&gt; &lt;IRRI zip&gt; &lt;new output dir&gt;</span>
        <span className="repro-line muted"># {tx(ui.datasets, locale)}</span>
        <span className="repro-line ok">✓ {tx(ui.inputs, locale)}</span>
        <span className="repro-line ok">✓ {tx(ui.cells, locale)}</span>
        <span className="repro-line ok">✓ {tx(ui.rows, locale)}</span>
        <span className="repro-line muted">  {tx(ui.noDownloads, locale)}</span>
      </pre>
      <div className="repro-badges"><span>v1.0.0</span><span>DOI 10.5281/zenodo.23438608</span><span>MIT · CC BY 4.0</span></div>
    </div>
  );
}

function OpenSoftwareCard({ project, locale }: { project: (typeof openSoftware)[number]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const openLightbox = useLightbox();
  const visual = project.visuals[active];

  return (
    <article className="open-card" id={`software-${project.slug}`} data-reveal>
      <div className="open-media">
        {project.visuals.length ? (
          <>
            <button
              type="button"
              className="open-image"
              onClick={() => openLightbox({ title: project.title, items: project.visuals, index: active })}
              aria-label={`${tx(ui.images, locale)}: ${project.title}`}
            >
              <img src={visual.src} alt={tx(visual.alt, locale)} width={visual.width} height={visual.height} loading="lazy" decoding="async" key={visual.src} />
              <span className="mosaic-expand" aria-hidden="true"><Expand /></span>
            </button>
            <div className="open-selector">
              {project.visuals.map((item, i) => (
                <button
                  type="button"
                  key={item.src}
                  className={i === active ? "active" : ""}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span>{tx(ui.figure, locale)} {i + 1}</span>
                  <small>{tx(item.caption, locale)}</small>
                </button>
              ))}
            </div>
          </>
        ) : (
          <ReproductionPanel locale={locale} />
        )}
      </div>
      <div className="open-copy">
        <span className="software-status">{tx(project.meta, locale)}</span>
        <h4>{project.title}</h4>
        <p>{tx(project.summary, locale)}</p>
        <ul>{project.points.map((point) => <li key={point.en}>{tx(point, locale)}</li>)}</ul>
        <div className="tag-row">{project.stack.map((item) => <small key={item}>{item}</small>)}</div>
        <div className="open-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {typeof link.label === "string" ? link.label : tx(link.label, locale)} <ArrowOut />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Software({ locale }: { locale: Locale }) {
  const openLightbox = useLightbox();

  return (
    <section className="section-block" id="software" aria-labelledby="software-title">
      <div className="section-heading split" data-reveal>
        <h2 id="software-title">{tx(ui.title, locale)}</h2>
        <p>{tx(ui.intro, locale)}</p>
      </div>

      <h3 className="sub-heading" data-reveal>{tx(ui.open, locale)}<small>{openSoftware.length}</small></h3>
      <div className="open-list">
        {openSoftware.map((project) => <OpenSoftwareCard project={project} locale={locale} key={project.slug} />)}
      </div>

      <div className="tools-head" data-reveal>
        <h3 className="sub-heading">{tx(ui.tools, locale)}<small>{researchTools.length}</small></h3>
        <p>{tx(ui.toolsNote, locale)}</p>
      </div>
      <ul className="tool-grid">
        {researchTools.map((tool, index) => (
          <li className="tool-card" id={`tool-${tool.slug}`} key={tool.slug} data-reveal style={{ "--i": index } as React.CSSProperties}>
            <button
              type="button"
              className="tool-thumb"
              onClick={() => openLightbox({ title: tool.title, items: tool.visuals, index: 0 })}
              aria-label={`${tx(ui.images, locale)}: ${tool.title}`}
            >
              <img src={tool.visuals[0].src} alt={tx(tool.visuals[0].alt, locale)} width={tool.visuals[0].width} height={tool.visuals[0].height} loading="lazy" decoding="async" />
              <span className="tool-count"><Expand /> {tool.visuals.length}</span>
            </button>
            <div className="tool-copy">
              <span className="tool-version">{tool.version}</span>
              <h4>{tool.title}</h4>
              <p>{tx(tool.summary, locale)}</p>
              <div className="tag-row">{tool.features.map((feature) => <small key={feature}>{feature}</small>)}</div>
              <a className="tool-link" href={tool.link} target="_blank" rel="noreferrer">{tx(ui.showcase, locale)} <ArrowOut /></a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
