"use client";

import { useState } from "react";
import { earlierPresentations, invitedTalk, lectureVideos, localize, presentations, teaching, type Locale } from "../content";
import { ArrowOut, Chevron, Play } from "./icons";
import { tx } from "./hooks";

const ui = {
  title: localize("Talks & teaching", "报告与教学", "発表・教育"),
  intro: localize(
    "Teaching in English and Japanese — from university chemistry labs to open video lectures on AI in agriculture.",
    "以英语和日语授课——从大学化学实验课到面向公众的农业 AI 开放视频课程。",
    "英語と日本語で教えてきました。大学の化学実験から、農業AIのオープン講義動画まで。",
  ),
  invited: localize("Invited talk", "受邀报告", "招待講演"),
  videos: localize("Video lectures · Hokkaido University Smart Agriculture Education Hub", "视频课程 · 北海道大学智能农业教育基地", "講義動画・北海道大学スマート農業教育拠点"),
  videosNote: localize("Japanese · 49 min 51 s in total · MAFF smart-agriculture online materials", "日语 · 共 49 分 51 秒 · 收录于农林水产省智能农业在线教材", "日本語・計49分51秒・農林水産省スマート農業オンライン教材に収録"),
  watch: localize("Watch on YouTube", "在 YouTube 观看", "YouTubeで見る"),
  selected: localize("Selected presentations", "代表性报告", "主な発表"),
  earlierShow: localize("Show earlier presentations", "查看更早的报告", "それ以前の発表を見る"),
  earlierHide: localize("Hide earlier presentations", "收起更早的报告", "それ以前の発表を閉じる"),
  teaching: localize("Teaching, mentoring and outreach", "教学、指导与科普", "教育・指導・アウトリーチ"),
};

function VideoMotif({ kind }: { kind: string }) {
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

export default function Teaching({ locale }: { locale: Locale }) {
  const [showEarlier, setShowEarlier] = useState(false);

  return (
    <section className="section-block" id="teaching" aria-labelledby="teaching-title">
      <div className="section-heading split" data-reveal>
        <h2 id="teaching-title">{tx(ui.title, locale)}</h2>
        <p>{tx(ui.intro, locale)}</p>
      </div>

      <article className="invited" data-reveal>
        <span className="invited-label">{tx(ui.invited, locale)} · {tx(invitedTalk.date, locale)}</span>
        <h3>{invitedTalk.title}</h3>
        <p>{tx(invitedTalk.event, locale)}</p>
        <blockquote>“{tx(invitedTalk.quote, locale)}”</blockquote>
      </article>

      <div className="videos" data-reveal>
        <div className="videos-head">
          <h3 className="sub-heading">{tx(ui.videos, locale)}</h3>
          <p>{tx(ui.videosNote, locale)}</p>
        </div>
        <ul>
          {lectureVideos.map((video) => (
            <li key={video.id}>
              <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noreferrer" className={`video-card motif-${video.motif}`}>
                <span className="video-art">
                  <VideoMotif kind={video.motif} />
                  <span className="video-play"><Play /></span>
                  <span className="video-index">{video.index}</span>
                </span>
                <span className="video-copy">
                  <small>{tx(video.topic, locale)}</small>
                  <strong lang="ja">{video.title}</strong>
                  <em>{tx(ui.watch, locale)} <ArrowOut /></em>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="talks-grid">
        <div data-reveal>
          <h3 className="sub-heading">{tx(ui.selected, locale)}</h3>
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
          <h3 className="sub-heading">{tx(ui.teaching, locale)}</h3>
          <ol className="teach-list">
            {teaching.map((item) => (
              <li key={item.title.en}>
                <span className="teach-period">{item.period}</span>
                <div>
                  <h4>{tx(item.title, locale)}</h4>
                  <p>{tx(item.text, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
