"use client";

import { useState, type CSSProperties } from "react";
import {
  appointments,
  education,
  funding,
  industry,
  localize,
  patentKinds,
  patents,
  pathway,
  pathwayRange,
  service,
  trackLabels,
  type Locale,
  type Track,
} from "../content";
import { ArrowOut, Chevron, Printer } from "./icons";
import { tx, useInViewOnce } from "./hooks";

const ui = {
  title: localize("Background", "经历", "経歴"),
  intro: localize(
    "Chemistry, a testing laboratory and plant breeding — the same habit of validating measurements, carried across three fields.",
    "化学、检测实验室、植物育种——把“先验证测量，再下结论”的习惯带进三个领域。",
    "化学、検査ラボ、植物育種。測定を検証してから結論を出すという習慣を、3つの分野で貫いてきました。",
  ),
  path: localize("Path", "路径", "歩み"),
  now: localize("now", "现在", "現在"),
  appointments: localize("Academic appointments", "学术任职", "職歴（研究）"),
  education: localize("Education", "教育背景", "学歴"),
  industry: localize("Professional experience outside academia", "产业与实验室经历", "研究機関外での職歴"),
  grantsReview: localize("Grant proposals under review (as PI)", "在审基金申请（主持人）", "審査中の研究費申請（研究代表者）"),
  grantsReceived: localize("Fellowships and research support received", "奖学金与研究资助", "フェローシップ・研究支援"),
  service: localize("Service and other", "学术服务与其他", "学術貢献ほか"),
  patents: localize("Patents", "专利", "特許"),
  patentSummary: localize(
    "Four granted Chinese utility-model patents and three published invention-patent applications, 2014–2024 — including a rapid histamine-detection device for food.",
    "授权实用新型 4 项、已公开发明专利申请 3 项（2014–2024），其中包括食品组胺快速检测装置。",
    "中国の実用新案（登録）4件、特許出願（公開）3件（2014–2024年）。食品中ヒスタミンの迅速検出装置を含みます。",
  ),
  showPatents: localize("Show patent records", "查看专利记录", "特許の一覧を見る"),
  hidePatents: localize("Hide patent records", "收起专利记录", "特許の一覧を閉じる"),
  print: localize("Print or save as PDF", "打印或保存为 PDF", "印刷・PDFで保存"),
};

const tracks: Track[] = ["chemistry", "industry", "plant"];

function Pathway({ locale }: { locale: Locale }) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>({ threshold: 0.25 });
  const span = pathwayRange.end - pathwayRange.start;
  const pos = (year: number) => ((year - pathwayRange.start) / span) * 100;
  const years = Array.from({ length: span / 3 + 1 }, (_, i) => pathwayRange.start + i * 3);

  return (
    <div className="pathway-scroll" data-reveal>
      <div className={`pathway ${seen ? "in-view" : ""}`} ref={ref} role="img" aria-label={pathway.map((p) => `${Math.floor(p.start)}–${"current" in p ? tx(ui.now, locale) : Math.floor(p.end)}: ${tx(p.label, locale)}, ${tx(p.place, locale)}`).join("; ")}>
        <div className="pathway-axis" aria-hidden="true">
          {years.map((year) => <span key={year} style={{ left: `${pos(year)}%` }}>{year}</span>)}
        </div>
        {tracks.map((track) => (
          <div className={`pathway-track track-${track}`} key={track} aria-hidden="true">
            <span className="track-label">{tx(trackLabels[track], locale)}</span>
            <div className="track-lane">
              {pathway.filter((item) => item.track === track).map((item, i) => (
                <div
                  className={`pathway-item ${i % 2 ? "below" : "above"} ${pos(item.start) > 70 ? "end" : ""} ${"current" in item ? "current" : ""}`}
                  key={item.label.en}
                  style={{
                    "--x": `${pos(item.start)}%`,
                    "--w": `${pos(item.end) - pos(item.start)}%`,
                    "--delay": `${tracks.indexOf(track) * 220 + i * 180}ms`,
                  } as CSSProperties}
                >
                  <i className="pathway-bar" />
                  <span className="pathway-label">
                    <strong>{tx(item.label, locale)}</strong>
                    <small>{tx(item.place, locale)}</small>
                    <em className="pathway-years">{Math.floor(item.start)}–{"current" in item ? tx(ui.now, locale) : Math.floor(item.end)}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="pathway-now" style={{ left: `calc(180px + (100% - 180px) * ${(pos(2026.83) / 100).toFixed(4)})` }} aria-hidden="true"><span>{tx(ui.now, locale)}</span></div>
      </div>
    </div>
  );
}

export default function Background({ locale }: { locale: Locale }) {
  const [showPatents, setShowPatents] = useState(false);

  return (
    <section className="section-block" id="background" aria-labelledby="background-title">
      <div className="section-heading split" data-reveal>
        <h2 id="background-title">{tx(ui.title, locale)}</h2>
        <p>{tx(ui.intro, locale)}</p>
      </div>

      <Pathway locale={locale} />

      <div className="cv-grid">
        <div className="cv-col" data-reveal>
          <h3 className="sub-heading">{tx(ui.appointments, locale)}</h3>
          <ol className="cv-list">
            {appointments.map((item) => (
              <li key={item.period.en}>
                <span className="cv-when">{tx(item.period, locale)}</span>
                <div><h4>{tx(item.title, locale)}</h4><p>{tx(item.place, locale)}</p></div>
              </li>
            ))}
          </ol>

          <h3 className="sub-heading">{tx(ui.education, locale)}</h3>
          <ol className="cv-list">
            {education.map((item) => (
              <li key={item.year}>
                <span className="cv-when">{item.year}</span>
                <div>
                  <h4>{tx(item.degree, locale)}</h4>
                  <p>{tx(item.place, locale)}</p>
                  {"note" in item && item.note && <p className="cv-note">{tx(item.note, locale)}</p>}
                </div>
              </li>
            ))}
          </ol>

          <h3 className="sub-heading">{tx(ui.service, locale)}</h3>
          <dl className="service-list">
            {service.map((item) => (
              <div key={item.label.en}><dt>{tx(item.label, locale)}</dt><dd>{tx(item.text, locale)}</dd></div>
            ))}
          </dl>
        </div>

        <div className="cv-col" data-reveal>
          <h3 className="sub-heading">{tx(ui.industry, locale)}</h3>
          <ol className="cv-list">
            {industry.map((item) => (
              <li key={item.period.en}>
                <span className="cv-when">{tx(item.period, locale)}</span>
                <div><h4>{tx(item.title, locale)}</h4><p>{tx(item.place, locale)}</p><p className="cv-note">{tx(item.text, locale)}</p></div>
              </li>
            ))}
          </ol>

          <h3 className="sub-heading">{tx(ui.grantsReview, locale)}</h3>
          <ol className="cv-list">
            {funding.underReview.map((item) => (
              <li key={item.project}>
                <span className="cv-when">{item.year}</span>
                <div>
                  <h4>{tx(item.title, locale)}</h4>
                  <p lang="ja">{item.project}</p>
                  {tx(item.gloss, locale) && locale !== "ja" && <p className="cv-note">{tx(item.gloss, locale)}</p>}
                </div>
              </li>
            ))}
          </ol>

          <h3 className="sub-heading">{tx(ui.grantsReceived, locale)}</h3>
          <ol className="cv-list compact">
            {funding.received.map((item) => (
              <li key={item.title.en}>
                <span className="cv-when">{tx(item.period, locale)}</span>
                <div><h4>{tx(item.title, locale)}</h4></div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="patent-disclosure" data-reveal>
        <button
          className="patent-summary"
          type="button"
          aria-expanded={showPatents}
          aria-controls="patent-list"
          onClick={() => setShowPatents((open) => !open)}
        >
          <span className="patent-summary-copy">
            <small>{tx(ui.patents, locale)} · 7</small>
            <strong>{tx(ui.patentSummary, locale)}</strong>
          </span>
          <span className="patent-summary-action">
            {tx(showPatents ? ui.hidePatents : ui.showPatents, locale)}
            <Chevron open={showPatents} />
          </span>
        </button>
        <ol className="patent-list" id="patent-list" hidden={!showPatents}>
          {patents.map((patent) => (
            <li key={patent.number} className={"highlight" in patent && patent.highlight ? "highlight" : ""}>
              <time dateTime={patent.year}>{patent.year}</time>
              <div>
                <small>{tx(patentKinds[patent.kind], locale)}</small>
                <h4>{tx(patent.title, locale)}</h4>
              </div>
              <a href={`https://patents.google.com/patent/${patent.number}`} target="_blank" rel="noreferrer">{patent.number} <ArrowOut /></a>
            </li>
          ))}
        </ol>
      </div>

      <button type="button" className="print-button" onClick={() => window.print()} data-reveal>
        <Printer /> {tx(ui.print, locale)}
      </button>
    </section>
  );
}
