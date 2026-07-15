import {
  profile,
  publications,
  presentations,
  researchFocus,
  researchProjects,
  softwareProjects,
} from "./content";

const navigation = [
  ["论文", "#publications"],
  ["学会发表", "#presentations"],
  ["研究软件", "#software"],
  ["项目", "#projects"],
  ["联系", "#contact"],
] as const;

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

function SimulationBadge() {
  return <span className="simulation-badge">SIMULATED OUTPUT · 示意</span>;
}

function StrideVisual() {
  return (
    <div className="mock-app stride-visual" aria-label="STRIDE-DH 模拟界面">
      <div className="mock-toolbar"><span>STRIDE-DH / analysis</span><SimulationBadge /></div>
      <div className="stride-layout">
        <div className="pipeline-steps">
          <span className="active">01 Data</span><span>02 Network</span><span>03 Perturb</span><span>04 Rank</span>
        </div>
        <div className="network-board" aria-hidden="true">
          <span className="network-line line-a" /><span className="network-line line-b" /><span className="network-line line-c" />
          <span className="network-node node-a">A</span><span className="network-node node-b">B</span>
          <span className="network-node node-c">C</span><span className="network-node node-d">D</span>
          <span className="network-node node-e">E</span>
        </div>
        <div className="candidate-panel">
          <strong>Candidate ranking</strong>
          {[84, 71, 58, 46].map((value, index) => (
            <div className="rank-row" key={value}><span>R-{index + 1}</span><i><b style={{ width: `${value}%` }} /></i><em>{value}</em></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldVisual() {
  return (
    <div className="mock-app field-visual" aria-label="水稻田间表型模拟界面">
      <div className="mock-toolbar"><span>RiceVision / plot 12</span><SimulationBadge /></div>
      <div className="field-layout">
        <div className="field-canvas" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, index) => <span className={index % 7 === 0 || index === 10 ? "flagged" : ""} key={index} />)}
          <div className="detect-box box-one"><small>P34</small></div>
          <div className="detect-box box-two"><small>P35</small></div>
          <div className="detect-box box-three"><small>P36</small></div>
        </div>
        <div className="field-stats">
          <span>batch status <strong>review</strong></span>
          <div><small>canopy cover</small><b>82%</b></div>
          <div><small>detected objects</small><b>148</b></div>
          <div><small>flagged plots</small><b>03</b></div>
        </div>
      </div>
    </div>
  );
}

function TraitVisual() {
  const bars = [36, 52, 48, 69, 64, 82, 74, 91];
  return (
    <div className="mock-app trait-visual" aria-label="TraitFlow 模拟输出">
      <div className="mock-toolbar"><span>TraitFlow / model compare</span><SimulationBadge /></div>
      <div className="trait-layout">
        <div className="feature-stack"><span>RGB</span><span>TIME</span><span>LAB</span><i>→</i><strong>FUSION</strong></div>
        <div className="bar-chart" aria-hidden="true">
          {bars.map((height, index) => <i key={height} style={{ height: `${height}%` }}><span>{index + 1}</span></i>)}
        </div>
        <div className="model-score">
          <small>validation summary</small><strong>R² 0.87</strong><span>illustrative value</span>
        </div>
      </div>
    </div>
  );
}

function GrapeVisual() {
  const growth = [18, 26, 34, 43, 52, 61, 69, 76, 81, 84];
  return (
    <div className="mock-app grape-visual" aria-label="葡萄生长监测模拟输出">
      <div className="mock-toolbar"><span>Grape Growth / series K5</span><SimulationBadge /></div>
      <div className="grape-layout">
        <div className="growth-chart" aria-hidden="true">
          <span className="axis-label top">relative diameter</span>
          <div className="growth-bars">
            {growth.map((height, index) => <i key={height} style={{ height: `${height}%` }}><b /><small>D{index + 1}</small></i>)}
          </div>
        </div>
        <div className="grape-summary">
          <div><small>detections</small><strong>1,248</strong></div>
          <div><small>series QC</small><strong>PASS</strong></div>
          <div><small>smoothing</small><strong>BIO</strong></div>
        </div>
      </div>
    </div>
  );
}

function SoftwareVisual({ slug }: { slug: string }) {
  if (slug === "stride") return <StrideVisual />;
  if (slug === "field") return <FieldVisual />;
  if (slug === "trait") return <TraitVisual />;
  return <GrapeVisual />;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>

      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="wordmark" href="#top" aria-label="返回首页顶部">
            <span className="wordmark-mark" aria-hidden="true">JL</span>
            <span><strong>{profile.name}</strong><small>{profile.englishName}</small></span>
          </a>
          <nav aria-label="主要导航">
            {navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <a className="header-link" href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar ↗</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">INTELLIGENT AGRICULTURE · PLANT SCIENCE</p>
            <h1 id="hero-title">从田间影像到<span>可解释的作物性状。</span></h1>
            <p className="hero-lede">
              研究聚焦智能农业、作物表型、倍性育种与品质分析，连接田间观测、实验测量、
              计算机视觉和可复现的软件流程。
            </p>
            <div className="identity-lines">
              <span>{profile.affiliation}</span>
              <span>{profile.affiliationEnglish}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="hero-actions">
              <a className="primary-link" href="#publications">查看论文发表 <span aria-hidden="true">↓</span></a>
              <a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>

          <aside className="hero-aside" aria-label="研究概览">
            <div className="research-matrix">
              <span><small>FIELD</small><strong>田间成像</strong></span>
              <span><small>LAB</small><strong>生化分析</strong></span>
              <span><small>MODEL</small><strong>计算建模</strong></span>
              <span><small>SOFTWARE</small><strong>研究工具</strong></span>
            </div>
            <div className="scholar-metrics">
              <div className="metrics-head"><span>GOOGLE SCHOLAR</span><span>2026.07</span></div>
              {profile.scholarStats.map((stat) => (
                <a href={profile.scholarUrl} target="_blank" rel="noreferrer" key={stat.label}>
                  <strong>{stat.value}</strong><span>{stat.label}</span>
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="focus-strip" aria-label="研究方向">
          {researchFocus.map((focus) => (
            <article key={focus.code}>
              <span>{focus.code}</span><h2>{focus.title}</h2><small>{focus.english}</small><p>{focus.description}</p>
            </article>
          ))}
        </section>

        <section className="section-block" id="publications" aria-labelledby="publications-title">
          <SectionHeading
            index="01" label="PUBLICATIONS" title="论文发表"
            description="以下为 Google Scholar 与简历交叉核对后的期刊论文。引用指标会变化，完整与最新记录以 Scholar 主页为准。"
          />
          <div className="publication-list">
            {publications.map((publication, index) => (
              <article className="publication-item" key={publication.title}>
                <div className="publication-index"><span>{String(index + 1).padStart(2, "0")}</span><b>{publication.year}</b></div>
                <div>
                  <span className="topic-label">{publication.label}</span>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <strong>{publication.venue}</strong>
                </div>
              </article>
            ))}
          </div>
          <a className="section-link" href={profile.scholarUrl} target="_blank" rel="noreferrer">在 Google Scholar 查看完整记录 ↗</a>
        </section>

        <section className="section-block" id="presentations" aria-labelledby="presentations-title">
          <SectionHeading
            index="02" label="PRESENTATIONS" title="学会发表"
            description="以近期口头报告为主，呈现从植物代谢分析到多模态农业 AI 的研究延伸。"
          />
          <div className="presentation-grid">
            {presentations.map((presentation) => (
              <article key={presentation.title}>
                <div><span>{presentation.year}</span><small>{presentation.format}</small></div>
                <h3>{presentation.title}</h3><p>{presentation.event}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block software-section" id="software" aria-labelledby="software-title">
          <SectionHeading
            index="03" label="RESEARCH SOFTWARE" title="研究软件与分析原型"
            description="软件界面与效果图为结构化示意，不代表真实实验数据。正式产品名称、截图和公开范围可在确认后继续替换。"
          />
          <div className="software-list">
            {softwareProjects.map((project, index) => (
              <article className="software-case" key={project.slug}>
                <div className="software-copy">
                  <div className="software-number">0{index + 1}</div>
                  <span className="software-status">{project.status}</span>
                  <h3>{project.title}</h3><h4>{project.subtitle}</h4><p>{project.description}</p>
                  <div className="tag-row">{project.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
                  {project.link && <a className="text-link" href={project.link} target="_blank" rel="noreferrer">查看公开代码 ↗</a>}
                </div>
                <figure><SoftwareVisual slug={project.slug} /><figcaption>界面与数值为视觉模拟，用于说明软件工作流。</figcaption></figure>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="projects" aria-labelledby="projects-title">
          <SectionHeading
            index="04" label="RESEARCH PROJECTS" title="研究项目脉络"
            description="不展示教育或任职履历，仅以概括性项目说明各阶段研究问题的延续与方法变化。"
          />
          <div className="project-timeline">
            {researchProjects.map((project, index) => (
              <article key={project.title}>
                <span className="timeline-index">0{index + 1}</span>
                <div><small>{project.phase}</small><h3>{project.title}</h3><p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">CONTACT</p>
          <h2 id="contact-title">研究合作、学术交流与软件方法讨论。</h2>
          <div>
            <span>{profile.affiliation}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </section>
      </main>

      <footer><span>© 2026 {profile.englishName}</span><span>Research · Publications · Software</span><a href="#top">返回顶部 ↑</a></footer>
    </>
  );
}
