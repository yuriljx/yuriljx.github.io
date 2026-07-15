"use client";

import { useState } from "react";
import {
  presentations,
  profile,
  publications,
  researchFocus,
  researchProjects,
  softwareProjects,
} from "./content";

const navigation = [
  ["论文", "#publications"],
  ["学会发表", "#presentations"],
  ["软件", "#software"],
  ["项目", "#projects"],
  ["联系", "#contact"],
] as const;

type SoftwareProject = (typeof softwareProjects)[number];
type SoftwareVisual = SoftwareProject["visuals"][number];

function SectionHeading({ index, label, title, description }: {
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-code"><span>{index}</span><span>{label}</span></div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function ScientificPanel({ panel }: { panel: string }) {
  if (panel === "audit-workbook") {
    return (
      <div className="scientific-panel audit-panel" aria-label="基因资源筛选输出结构示意">
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
        <p>结构示意，不是一次在线检索结果。</p>
      </div>
    );
  }

  if (panel === "stride-inventory") {
    return (
      <div className="scientific-panel stride-panel" aria-label="STRIDE-DH 公开矩阵清单">
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
        <p>获取数量截至 2026-07-15；不表示公开矩阵仅有两套。</p>
      </div>
    );
  }

  if (panel === "stride-dependence") {
    return (
      <div className="scientific-panel stride-panel" aria-label="STRIDE-DH 样本依赖审计">
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
        <p>连通分量只提示样本依赖；不是精确重复类，也不是有效独立样本量。</p>
      </div>
    );
  }

  return (
    <div className="scientific-panel stride-panel smoke-panel" aria-label="STRIDE-DH 合成夹具烟雾测试">
      <div className="panel-topline"><span>QC SMOKE / SYNTHETIC FIXTURE</span><strong>NO RESEARCH DATA</strong></div>
      <div className="code-window">
        <span><b>fixture</b> bundled_non_publishable_matrix_smoke_v1</span>
        <span><b>pair</b> fixture_A ↔ fixture_B</span>
        <span><b>comparable_markers</b> 3 / required 3</span>
        <span><b>mismatches</b> 0</span>
        <span><b>BH adjusted</b> [0.03, 0.06, 0.50]</span>
        <strong>PASS — deterministic QC primitives exercised</strong>
      </div>
      <p>内置合成夹具结果，仅用于确认代码路径与预期检查。</p>
    </div>
  );
}

function SoftwareMedia({ visual }: { visual: SoftwareVisual }) {
  if (visual.kind === "panel") return <ScientificPanel panel={visual.panel} />;
  return (
    <div className="software-image-wrap">
      <img
        src={visual.src}
        alt={visual.alt}
        style={{ objectPosition: visual.position ?? "center" }}
        loading="lazy"
      />
    </div>
  );
}

function SoftwareCase({ project, index }: { project: SoftwareProject; index: number }) {
  const [active, setActive] = useState(0);
  const visual = project.visuals[active];

  return (
    <article className="software-case" id={`software-${project.slug}`}>
      <div className="software-copy">
        <div className="software-index">{String(index + 1).padStart(2, "0")} / {String(softwareProjects.length).padStart(2, "0")}</div>
        <span className="software-status">{project.status}</span>
        <h3>{project.title}</h3>
        <h4>{project.subtitle}</h4>
        <p>{project.description}</p>
        <div className="tag-row">{project.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
        <p className="boundary-note"><b>证据边界</b>{project.boundary}</p>
        {project.link && <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">查看公开代码 ↗</a>}
      </div>
      <figure className="software-media">
        <SoftwareMedia visual={visual} />
        <figcaption><span>{active + 1} / {project.visuals.length}</span>{visual.caption}</figcaption>
        <div className="media-selector" aria-label={`${project.title} 图片选择`}>
          {project.visuals.map((item, itemIndex) => (
            <button
              type="button"
              key={item.caption}
              className={active === itemIndex ? "active" : ""}
              onClick={() => setActive(itemIndex)}
              aria-pressed={active === itemIndex}
              aria-label={`显示图 ${itemIndex + 1}：${item.caption}`}
            >
              <span>{String(itemIndex + 1).padStart(2, "0")}</span>
              <small>{item.caption}</small>
            </button>
          ))}
        </div>
      </figure>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="wordmark" href="#top" aria-label="返回首页顶部">
            <span className="wordmark-mark" aria-hidden="true">JL</span>
            <span><strong>{profile.englishName}</strong><small>PLANT SCIENCE · RESEARCH SOFTWARE</small></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          ><span>{menuOpen ? "关闭" : "目录"}</span><i aria-hidden="true" /></button>
          <nav id="site-navigation" className={menuOpen ? "open" : ""} aria-label="主要导航">
            {navigation.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <a className="scholar-link" href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar ↗</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <p className="eyebrow">PLANT SCIENCE × COMPUTATIONAL METHODS</p>
            <h1 id="hero-title">让田间观测、实验记录与<span>计算证据相互校准。</span></h1>
            <p className="hero-lede">研究聚焦作物表型、育种与品质分析，并将研究软件作为连接影像、实验流程和可追溯证据的基础设施。</p>
            <div className="identity-lines">
              <span>{profile.affiliation}</span>
              <span>{profile.affiliationEnglish}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>

          <div className="hero-evidence" aria-label="研究视觉证据">
            <figure className="evidence-main">
              <img src="/research/anther-culture.webp" alt="水稻花药培养实验材料" />
              <figcaption><span>LAB / 2026</span>花药培养实验材料与尺度参照</figcaption>
            </figure>
            <figure>
              <img src="/software/genome/overview.png" alt="水稻公共基因组资源检索界面" />
              <figcaption><span>SOFTWARE</span>公共基因组资源筛选</figcaption>
            </figure>
            <figure>
              <img src="/software/grape/mature-stage.webp" alt="葡萄田间时间序列图像" />
              <figcaption><span>FIELD / TIME SERIES</span>果粒生长的连续观测</figcaption>
            </figure>
          </div>

          <div className="hero-actions">
            <a className="primary-link" href="#publications">查看论文发表 <span aria-hidden="true">↓</span></a>
            <a className="quiet-link" href="#software">浏览研究软件</a>
            <a className="quiet-link" href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </section>

        <section className="focus-rail" aria-label="研究方向">
          <div className="rail-label"><span>RESEARCH FOCUS</span><small>01—03</small></div>
          {researchFocus.map((focus) => (
            <article key={focus.code}>
              <span>{focus.code}</span><div><h2>{focus.title}</h2><small>{focus.english}</small><p>{focus.description}</p></div>
            </article>
          ))}
        </section>

        <section className="section-block" id="publications" aria-labelledby="publications-title">
          <SectionHeading
            index="01" label="PUBLICATIONS" title="论文发表"
            description="按期刊论文展示。完整记录与动态引用信息以 Google Scholar 为准；缩略图仅作为相关研究材料，不替代论文图件。"
          />
          <div className="publication-list">
            {publications.map((publication, index) => (
              <article className="publication-item" key={publication.title}>
                <div className={`paper-thumb ${publication.thumb ? "with-image" : "abstract-thumb"}`}>
                  {publication.thumb
                    ? <img src={publication.thumb} alt={publication.thumbAlt} loading="lazy" />
                    : <><span>{publication.thumbCode}</span><i /><i /><i /></>}
                </div>
                <div className="paper-copy">
                  <span className="topic-label">{publication.label}</span>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <strong>{publication.venue}</strong>
                </div>
                <div className="paper-meta"><span>{String(index + 1).padStart(2, "0")}</span><b>{publication.year}</b></div>
              </article>
            ))}
          </div>
          <a className="section-link" href={profile.scholarUrl} target="_blank" rel="noreferrer">在 Google Scholar 查看完整记录 ↗</a>
        </section>

        <section className="section-block software-section" id="software" aria-labelledby="software-title">
          <SectionHeading
            index="02" label="RESEARCH SOFTWARE" title="研究软件与计算框架"
            description="真实界面与真实分析图优先；尚未形成界面的研究框架使用数据驱动的结构图，并逐项写明证据边界。"
          />
          <div className="software-list">
            {softwareProjects.map((project, index) => <SoftwareCase project={project} index={index} key={project.slug} />)}
          </div>
        </section>

        <section className="section-block" id="presentations" aria-labelledby="presentations-title">
          <SectionHeading
            index="03" label="SOCIETY PRESENTATIONS" title="学会发表"
            description="保留近期口头报告，呈现植物代谢分析、田间视觉与多模态农业 AI 的方法延伸。"
          />
          <div className="talk-list">
            {presentations.map((presentation, index) => (
              <article key={presentation.title}>
                <div className="talk-code"><span>{String(index + 1).padStart(2, "0")}</span><b>{presentation.year}</b></div>
                <div><small>{presentation.format}</small><h3>{presentation.title}</h3><p>{presentation.event}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="projects" aria-labelledby="projects-title">
          <SectionHeading
            index="04" label="PROJECT THREADS" title="研究项目脉络"
            description="不展开个人履历，只概括持续推进的研究问题与方法链。"
          />
          <div className="project-list">
            {researchProjects.map((project) => (
              <article key={project.code}>
                <span>{project.code}</span><div><h3>{project.title}</h3><p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div><p className="eyebrow">CONTACT / ACADEMIC EXCHANGE</p><h2 id="contact-title">研究合作、学术交流与软件方法讨论。</h2></div>
          <address>
            <span>{profile.affiliation}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          </address>
        </section>
      </main>

      <footer><span>© 2026 {profile.englishName}</span><span>Research · Publications · Software</span><a href="#top">返回顶部 ↑</a></footer>
    </>
  );
}
