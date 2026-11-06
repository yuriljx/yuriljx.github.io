"use client";

import { useState, type ReactNode } from "react";
import { earlierPresentations, imageAnalysisSessions, invitedTalk, lectureVideos, localize, presentations, teaching, type Locale, type TeachingItem } from "../content";
import { ArrowOut, Chevron, Play } from "./icons";
import { tx } from "./hooks";

const ui = {
  title: localize("Talks & teaching", "报告与教学", "発表・教育"),
  intro: localize(
    "Teaching in English and Japanese, connecting research questions, hands-on practice and open teaching materials.",
    "英语与日语授课，连接研究问题、动手实践与公开教材。",
    "英語と日本語で、研究の問い、実践、公開教材をつなぐ教育。",
  ),
  courses: localize("Courses & open teaching materials", "课程与公开教材", "講座・公開教材"),
  imageSeriesMeta: localize("English · 3 sessions", "英语 · 全3回", "英語・全3回"),
  maffMeta: localize("Japanese · 3 lecture videos", "日语 · 3部讲义视频", "日本語・講義動画3本"),
  invited: localize("Invited talk", "受邀报告", "招待講演"),
  watchLecture: localize("Watch lecture video", "观看讲义视频", "講義動画を見る"),
  watch: localize("Watch on YouTube", "在 YouTube 观看", "YouTubeで見る"),
  selected: localize("Selected presentations", "代表性报告", "主な発表"),
  earlierShow: localize("Show earlier presentations", "查看更早的报告", "それ以前の発表を見る"),
  earlierHide: localize("Hide earlier presentations", "收起更早的报告", "それ以前の発表を閉じる"),
  teaching: localize("Other teaching, mentoring and outreach", "其他教学、指导与科普", "その他の教育・指導・アウトリーチ"),
};

function VideoMotif({ kind }: { kind: string }) {
  if (kind === "images") {
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <rect x="55" y="12" width="69" height="65" />
        <rect x="39" y="27" width="69" height="65" />
        <rect x="23" y="42" width="69" height="65" />
        <path className="image-leaf" d="M61 95 C61 77 44 80 40 63 C53 62 60 72 61 79 C60 63 65 49 79 48 C79 62 71 69 63 73 C70 65 80 67 85 63 C86 78 73 85 63 84" />
        <path className="leaf-stem" d="M61 95 C60 80 61 65 71 56" />
      </svg>
    );
  }
  if (kind === "segmentation") {
    const leaf = "M40 92 C40 76 27 78 21 63 C31 62 37 68 40 74 C33 58 34 47 40 37 C49 40 52 53 48 65 C55 54 61 52 67 51 C67 67 54 78 44 80 L44 92";
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <rect x="10" y="25" width="60" height="74" />
        <rect x="98" y="25" width="52" height="74" />
        <path className="source-leaf" d={leaf} />
        <path className="segmented-leaf" d={leaf} transform="translate(85 0) scale(.86 1)" />
        <path className="segment-arrow" d="M77 53h13m-4-4 4 4-4 4" />
      </svg>
    );
  }
  if (kind === "curves") {
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <path className="curve-axis" d="M18 12v94h132" />
        <path className="curve-line" d="M18 97C40 96 48 94 59 83S77 47 92 36 120 23 149 22" />
        {[[34, 90], [53, 84], [72, 60], [88, 37], [108, 28], [124, 19], [138, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.6" />)}
      </svg>
    );
  }
  if (kind === "network") {
    const layers = [[30, 60, 90], [20, 45, 70, 95], [40, 75]];
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        {layers.slice(0, -1).map((layer, li) => layer.map((y, i) => layers[li + 1].map((y2, j) => (
          <line key={`${li}-${i}-${j}`} x1={30 + li * 50} y1={y} x2={30 + (li + 1) * 50} y2={y2} />
        ))))}
        {layers.map((layer, li) => layer.map((y, i) => <circle key={`${li}-${i}`} cx={30 + li * 50} cy={y} r="6" />))}
      </svg>
    );
  }
  if (kind === "vision") {
    return (
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <path d="M20 95 C 45 60, 70 70, 85 45 S 130 30, 140 20" className="stem" />
        {[[52, 70, 9], [86, 48, 10], [118, 34, 8]].map(([x, y, r], i) => (
          <g key={i}><circle cx={x} cy={y} r={r} /><rect x={x - r - 4} y={y - r - 4} width={(r + 4) * 2} height={(r + 4) * 2} /></g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <rect x="22" y="22" width="52" height="40" />
      <rect x="86" y="22" width="52" height="40" />
      <rect x="54" y="74" width="52" height="26" className="fill" />
      <path d="M48 62v8h32v4M112 62v8H80" />
    </svg>
  );
}

function CourseIntro({ item, meta, id, locale }: { item: TeachingItem; meta: string; id: string; locale: Locale }) {
  return (
    <div className="course-intro">
      <p className="course-meta">{item.period} · {meta}</p>
      <h4 id={id}>{tx(item.title, locale)}</h4>
      <p className="course-description">{tx(item.text, locale)}</p>
      {item.links && (
        <div className="course-links">
          {item.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {typeof link.label === "string" ? link.label : tx(link.label, locale)} <ArrowOut />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CourseVideo({ href, title, language, motif, index, meta, watch }: {
  href: string;
  title: string;
  language: "en" | "ja";
  motif: string;
  index: string;
  meta?: ReactNode;
  watch: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`video-card motif-${motif}`}>
      <span className="video-art" aria-hidden="true">
        <VideoMotif kind={motif} />
        <span className="video-play"><Play /></span>
        <span className="video-index">{index}</span>
      </span>
      <div className="video-copy">
        {meta && <small>{meta}</small>}
        <h5 lang={language}>{title}</h5>
        <span className="video-watch">{watch} <ArrowOut /></span>
      </div>
    </a>
  );
}

export default function Teaching({ locale }: { locale: Locale }) {
  const [showEarlier, setShowEarlier] = useState(false);

  return (
    <section className="section-block" id="teaching" aria-labelledby="teaching-title">
      <div className="section-heading split" data-reveal>
        <h2 id="teaching-title">{tx(ui.title, locale)}</h2>
        <p>{tx(ui.intro, locale)}</p>
      </div>

      <div className="course-series">
        <h3 className="teaching-heading" data-reveal>{tx(ui.courses, locale)}</h3>
        <article className="course-band course-band-image-analysis" aria-labelledby="image-series-title" data-reveal>
          <CourseIntro item={teaching[0]} meta={tx(ui.imageSeriesMeta, locale)} id="image-series-title" locale={locale} />
          <ul className="course-lessons">
            {imageAnalysisSessions.map((session) => (
              <li key={session.id}>
                <CourseVideo
                  href={`https://www.youtube.com/watch?v=${session.id}`}
                  title={session.title}
                  language="en"
                  motif={session.motif}
                  index={session.index}
                  meta={<><time dateTime={session.date}>{tx(session.dateLabel, locale)}</time> · {tx(localize(`${session.participants} participants`, `${session.participants} 人参加`, `${session.participants}名参加`), locale)}</>}
                  watch={tx(ui.watchLecture, locale)}
                />
              </li>
            ))}
          </ul>
        </article>
        <article className="course-band course-band-maff" aria-labelledby="maff-course-title" data-reveal>
          <CourseIntro item={teaching[1]} meta={tx(ui.maffMeta, locale)} id="maff-course-title" locale={locale} />
          <ul className="course-lessons">
            {lectureVideos.map((video) => (
              <li key={video.id}>
                <CourseVideo
                  href={`https://youtu.be/${video.id}`}
                  title={video.title}
                  language="ja"
                  motif={video.motif}
                  index={video.index}
                  meta={tx(video.topic, locale)}
                  watch={tx(ui.watch, locale)}
                />
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="invited" data-reveal>
        <span className="invited-label">{tx(ui.invited, locale)} · {tx(invitedTalk.date, locale)}</span>
        <h3>{invitedTalk.title}</h3>
        <p>{tx(invitedTalk.event, locale)}</p>
        <blockquote>“{tx(invitedTalk.quote, locale)}”</blockquote>
      </article>

      <div className="talks-grid">
        <div data-reveal>
          <h3 className="teaching-heading">{tx(ui.selected, locale)}</h3>
          <ol className="talk-list" id="talk-list">
            {[...presentations, ...(showEarlier ? earlierPresentations : [])].map((talk, index) => (
              <li key={`${talk.year}-${index}`} className={index >= presentations.length ? "earlier" : ""}>
                <time dateTime={talk.year}>{talk.year}</time>
                <div>
                  <h4>{tx(talk.title, locale)}</h4>
                  <p>{tx(talk.event, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
          <button
            className="disclosure-button"
            type="button"
            aria-expanded={showEarlier}
            aria-controls="talk-list"
            onClick={() => setShowEarlier((open) => !open)}
          >
            <span>{tx(showEarlier ? ui.earlierHide : ui.earlierShow, locale)}</span>
            {!showEarlier && <small>{earlierPresentations.length}</small>}
            <Chevron open={showEarlier} />
          </button>
        </div>

        <div data-reveal>
          <h3 className="teaching-heading">{tx(ui.teaching, locale)}</h3>
          <ol className="teach-list">
            {teaching.slice(2).map((item) => (
              <li key={item.title.en}>
                <span className="teach-period">{item.period}</span>
                <div>
                  <h4>{tx(item.title, locale)}</h4>
                  <p>{tx(item.text, locale)}</p>
                  {item.links && (
                    <div className="theme-links">
                      {item.links.map((link) => {
                        const external = link.href.startsWith("http");
                        return (
                          <a key={link.href} href={link.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
                            {typeof link.label === "string" ? link.label : tx(link.label, locale)}{external && <ArrowOut />}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
