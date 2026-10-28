"use client";

import { latest, localize, researchThemes, researchThread, type Locale } from "../content";
import { useLightbox } from "./Lightbox";
import { ArrowOut, Expand } from "./icons";
import { tx } from "./hooks";

const ui = {
  latest: localize("Latest", "近况", "最新情報"),
  research: localize("Research", "研究", "研究"),
  intro: localize(
    "Three lines of work, one method question. Each line pairs an experimental system with a measurement that can be taken earlier or without destroying the material.",
    "三条研究线，一个方法问题：每条线都把一个实验体系与一种可以更早、或不破坏材料就能获得的测量结合起来。",
    "3つの研究ラインに共通するのは一つの方法論的な問いです。各ラインは、実験系と「より早く、あるいは材料を壊さずに得られる測定」とを組み合わせています。",
  ),
  question: localize("Question", "问题", "問い"),
  approach: localize("Approach", "方法", "アプローチ"),
  evidence: localize("Evidence", "证据", "エビデンス"),
  outputs: localize("Outputs", "产出", "成果"),
  enlarge: localize("Enlarge images", "放大查看图片", "画像を拡大"),
};

export function Latest({ locale }: { locale: Locale }) {
  return (
    <section className="latest" aria-labelledby="latest-title" data-reveal>
      <h2 id="latest-title" className="rail-title">{tx(ui.latest, locale)}</h2>
      <ol>
        {latest.map((item, index) => {
          const content = (
            <>
              <span className="latest-meta"><time dateTime={item.date}>{tx(item.label, locale)}</time><b>{tx(item.kind, locale)}</b></span>
              <span className="latest-text">{tx(item.text, locale)}</span>
            </>
          );
          return (
            <li key={index} style={{ "--i": index } as React.CSSProperties}>
              {"href" in item && item.href ? <a href={item.href}>{content}</a> : <div>{content}</div>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default function Research({ locale }: { locale: Locale }) {
  const openLightbox = useLightbox();

  return (
    <section className="section-block research-section" id="research" aria-labelledby="research-title">
      <div className="section-heading split" data-reveal>
        <h2 id="research-title">{tx(ui.research, locale)}</h2>
        <p>{tx(ui.intro, locale)}</p>
      </div>

      <blockquote className="research-thread" data-reveal>
        <p>{tx(researchThread, locale)}</p>
      </blockquote>

      <div className="theme-list">
        {researchThemes.map((theme) => (
          <article className={`theme theme-${theme.id}`} id={`research-${theme.id}`} key={theme.id} data-reveal>
            <header className="theme-head">
              <span className="theme-index">{theme.index}</span>
              <span className={`theme-status ${theme.id === "rice" ? "current" : ""}`}>{tx(theme.status, locale)}</span>
              <h3>{tx(theme.title, locale)}</h3>
            </header>

            <div className="theme-media">
              <button
                type="button"
                className="theme-mosaic"
                onClick={() => openLightbox({ title: tx(theme.title, locale), items: theme.images, index: 0 })}
                aria-label={`${tx(ui.enlarge, locale)}: ${tx(theme.title, locale)}`}
              >
                {theme.images.map((image, i) => (
                  <span className={`mosaic-cell cell-${i} ${"fit" in image ? "contain" : ""}`} key={image.src}>
                    <img src={image.src} alt={tx(image.alt, locale)} width={image.width} height={image.height} loading="lazy" decoding="async" />
                  </span>
                ))}
                <span className="mosaic-expand" aria-hidden="true"><Expand /></span>
              </button>
            </div>

            <div className="theme-copy">
              <p className="theme-question"><span>{tx(ui.question, locale)}</span>{tx(theme.question, locale)}</p>
              <p className="theme-body">{tx(theme.body, locale)}</p>
              <dl className="theme-evidence" aria-label={tx(ui.evidence, locale)}>
                {theme.evidence.map((item) => (
                  <div key={item.label.en}>
                    <dd>{item.value}</dd>
                    <dt>{tx(item.label, locale)}</dt>
                  </div>
                ))}
              </dl>
              <div className="theme-links">
                <span>{tx(ui.outputs, locale)}</span>
                {theme.links.map((link) => {
                  const external = link.href.startsWith("http");
                  const text = typeof link.label === "string" ? link.label : tx(link.label, locale);
                  return (
                    <a key={link.href} href={link.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {text}{external && <ArrowOut />}
                    </a>
                  );
                })}
              </div>
              <div className="tag-row">{theme.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
