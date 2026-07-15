import { profile, researchAreas, publicationSlots, experienceSlots, projects } from "./content";

const navigation = [
  ["研究", "#research"],
  ["成果", "#publications"],
  ["软件", "#software"],
  ["经历", "#experience"],
  ["联系", "#contact"],
] as const;

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>

      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="wordmark" href="#top" aria-label="返回首页顶部">
            <span className="wordmark-mark" aria-hidden="true">JL</span>
            <span>
              <strong>{profile.name}</strong>
              <small>Research · Software</small>
            </span>
          </a>

          <nav aria-label="主要导航">
            {navigation.map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>

          <a className="text-link header-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <div className="architecture-note" role="note">
          <span>ARCHITECTURE PREVIEW</span>
          <p>当前版本用于确认信息架构。简历导入后将替换占位内容，并重做重点排序与视觉细节。</p>
        </div>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Researcher · Software Developer</p>
            <h1 id="hero-title">
              把研究问题转化为
              <span>可复现的方法与可用的软件。</span>
            </h1>
            <p className="hero-lede">
              这是 {profile.name} 的个人研究与软件主页架构。它将集中呈现研究主题、代表性成果、
              开源项目与学术经历，并为后续中英文内容保留清晰入口。
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#research">查看内容结构 <span aria-hidden="true">↓</span></a>
              <a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
                访问 GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="hero-index" aria-label="网站结构摘要">
            <div className="index-topline">
              <span>CONTENT MAP</span>
              <span>v0.1</span>
            </div>
            <ol>
              <li><span>01</span><div><strong>Research</strong><small>问题、方法与方向</small></div></li>
              <li><span>02</span><div><strong>Publications</strong><small>论文与研究成果</small></div></li>
              <li><span>03</span><div><strong>Software</strong><small>工具、代码与案例</small></div></li>
              <li><span>04</span><div><strong>Experience</strong><small>教育与专业经历</small></div></li>
            </ol>
          </aside>
        </section>

        <section className="section-block" id="research" aria-labelledby="research-title">
          <SectionHeading
            index="01"
            eyebrow="RESEARCH"
            title="研究主题将按“问题—方法—贡献”组织"
            description="不只罗列关键词，而是让访问者快速理解你研究什么、如何研究，以及工作产生了什么价值。"
          />
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <article className="research-item" key={area.title}>
                <span className="item-number">0{index + 1}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <div className="tag-row" aria-label={`${area.title} 内容标签`}>
                  {area.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block publication-layout" id="publications" aria-labelledby="publications-title">
          <div>
            <SectionHeading
              index="02"
              eyebrow="PUBLICATIONS & OUTPUTS"
              title="成果页既适合论文，也容纳数据、方法与报告"
              description="简历导入后会统一作者格式、发表状态、链接入口与个人贡献说明。"
            />
            <div className="publication-list">
              {publicationSlots.map((item, index) => (
                <article className="publication-item" key={item.type}>
                  <div className="publication-meta">
                    <span>{item.year}</span>
                    <span>{item.type}</span>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="publication-status">待导入</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="content-principles" aria-label="成果整理原则">
            <span className="aside-label">CONTENT PRINCIPLES</span>
            <h3>让成果可读，而不只是可数。</h3>
            <ul>
              <li><span>01</span>优先呈现代表作与个人贡献</li>
              <li><span>02</span>区分论文、预印本、数据与软件</li>
              <li><span>03</span>提供 DOI、全文、代码和演示入口</li>
              <li><span>04</span>保留完整成果清单的独立入口</li>
            </ul>
          </aside>
        </section>

        <section className="section-block" id="software" aria-labelledby="software-title">
          <SectionHeading
            index="03"
            eyebrow="SOFTWARE"
            title="软件项目用研究语境解释，而不是只展示代码"
            description="每个项目将说明它解决的问题、核心方法、技术栈、当前状态，以及与你研究工作的关系。"
          />
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-row ${project.placeholder ? "is-placeholder" : ""}`} key={project.title}>
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="project-main">
                  <div className="project-title-line">
                    <h3>{project.title}</h3>
                    <span>{project.status}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                {project.url ? (
                  <a className="project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`在 GitHub 查看 ${project.title}`}>
                    查看项目 <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="project-link muted">简历导入后补充</span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="experience" aria-labelledby="experience-title">
          <SectionHeading
            index="04"
            eyebrow="EXPERIENCE"
            title="经历按学术叙事重组，不机械复制简历"
            description="时间线将保留必要事实，同时把教育、研究与软件开发经历连接成一条清晰的成长路径。"
          />
          <div className="experience-list">
            {experienceSlots.map((item, index) => (
              <article className="experience-row" key={item.title}>
                <span className="experience-period">{item.period}</span>
                <span className="experience-dot" aria-hidden="true" />
                <div>
                  <span className="experience-type">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="experience-state">0{index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-section" id="contact" aria-labelledby="contact-title">
          <div className="closing-copy">
            <p className="eyebrow">ABOUT & CONTACT</p>
            <h2 id="contact-title">简历会成为下一轮内容设计的唯一事实来源。</h2>
            <p>
              收到简历后，我会提取可公开信息、建立成果清单、确定首页重点，并把仍需你确认的内容单独列出，
              不会用推测填补事实空白。
            </p>
          </div>
          <div className="contact-panel">
            <span>NEXT INPUT</span>
            <strong>个人简历 / Academic CV</strong>
            <p>推荐 PDF 或 Word；中英文版本均可。可先隐去不希望公开的电话、住址等信息。</p>
            <a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              GitHub / {profile.githubHandle} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <span>© 2026 {profile.name}</span>
          <span>Research · Software · Open Work</span>
        </div>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </>
  );
}
