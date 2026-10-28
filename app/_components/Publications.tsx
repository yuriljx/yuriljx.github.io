"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import {
  localize,
  manuscripts,
  profile,
  publications,
  publicationTopics,
  type Locale,
  type PublicationTopic,
} from "../content";
import { ArrowOut, Check, Copy } from "./icons";
import { tx } from "./hooks";

type Filter = "all" | "first" | PublicationTopic;

const ui = {
  title: localize("Publications", "论文发表", "論文"),
  intro: localize(
    "Eight peer-reviewed journal articles, four as first author. Author order as published; my name is highlighted.",
    "同行评审期刊论文 8 篇，其中第一作者 4 篇。作者顺序依正式出版记录，本人姓名以高亮标出。",
    "査読付き原著論文8報（うち筆頭著者4報）。著者順は出版時のとおりで、本人を強調表示しています。",
  ),
  all: localize("All", "全部", "すべて"),
  first: localize("First author", "第一作者", "筆頭著者"),
  firstBadge: localize("First author", "第一作者", "筆頭"),
  filterLabel: localize("Filter publications", "筛选论文", "論文を絞り込む"),
  showing: localize("Showing", "显示", "表示中"),
  of: localize("of", "/", "/"),
  copy: localize("Copy citation", "复制引用", "引用をコピー"),
  copied: localize("Copied", "已复制", "コピーしました"),
  code: localize("Code", "代码", "コード"),
  review: localize("Submitted & under review", "已投稿与在审稿件", "投稿中・審査中"),
  scholar: localize("Full record on Google Scholar", "在 Google Scholar 查看完整记录", "Google Scholar で全記録を見る"),
  orcid: localize("ORCID record", "ORCID 记录", "ORCID 記録"),
};

/** Renders *italic* segments (species names) inside titles. */
function RichTitle({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? <i key={i}>{part.slice(1, -1)}</i> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

function Authors({ authors, self }: { authors: readonly string[]; self: number }) {
  const nodes: ReactNode[] = [];
  authors.forEach((author, i) => {
    if (i) nodes.push("; ");
    nodes.push(i === self ? <mark key={i}>{author}</mark> : author);
  });
  return <p className="paper-authors">{nodes}</p>;
}

function plainCitation(p: (typeof publications)[number]) {
  return `${p.authors.join("; ")} (${p.year}). ${p.title.replace(/\*/g, "")}. ${p.journal}, ${p.details}. https://doi.org/${p.doi}`;
}

export default function Publications({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState<string | null>(null);

  const filters = useMemo(() => {
    const items: Array<{ id: Filter; label: string; count: number }> = [
      { id: "all", label: tx(ui.all, locale), count: publications.length },
      { id: "first", label: tx(ui.first, locale), count: publications.filter((p) => p.self === 0).length },
      ...publicationTopics.map((topic) => ({
        id: topic.id as Filter,
        label: tx(topic.label, locale),
        count: publications.filter((p) => p.topic === topic.id).length,
      })),
    ];
    return items;
  }, [locale]);

  const visible = publications.filter((p) =>
    filter === "all" ? true : filter === "first" ? p.self === 0 : p.topic === filter,
  );

  const copyCitation = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section className="section-block" id="publications" aria-labelledby="publications-title">
      <div className="section-heading split" data-reveal>
        <h2 id="publications-title">{tx(ui.title, locale)}</h2>
        <p>{tx(ui.intro, locale)}</p>
      </div>

      <div className="filter-bar" role="toolbar" aria-label={tx(ui.filterLabel, locale)} data-reveal>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? "active" : ""}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}<small>{item.count}</small>
          </button>
        ))}
        <span className="filter-status" aria-live="polite">
          {tx(ui.showing, locale)} {visible.length} {tx(ui.of, locale)} {publications.length}
        </span>
      </div>

      <ol className="publication-list" key={filter}>
        {visible.map((p, index) => (
          <li className={`publication-item ${p.self === 0 ? "is-first" : ""}`} key={p.id} style={{ "--i": index } as React.CSSProperties}>
            <a className="paper-thumb" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
              <img src={p.thumb} alt={tx(p.thumbAlt, locale)} loading="lazy" decoding="async" width={1000} height={800} />
            </a>
            <div className="paper-copy">
              <div className="paper-labels">
                <time dateTime={p.year}>{p.year}</time>
                {p.self === 0 && <span className="first-badge">{tx(ui.firstBadge, locale)}</span>}
                <span className="topic-label">{tx(publicationTopics.find((t) => t.id === p.topic)!.label, locale)}</span>
              </div>
              <h3><a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer"><RichTitle text={p.title} /></a></h3>
              <Authors authors={p.authors} self={p.self} />
              <div className="paper-venue-line">
                <strong><i>{p.journal}</i>, {p.details}</strong>
                <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI <ArrowOut /></a>
                {"code" in p && p.code && <a href={p.code} target="_blank" rel="noreferrer">{tx(ui.code, locale)} <ArrowOut /></a>}
                <button type="button" className="cite-button" onClick={() => copyCitation(p.id, plainCitation(p))}>
                  {copied === p.id ? <Check /> : <Copy />}
                  <span aria-live="polite">{copied === p.id ? tx(ui.copied, locale) : tx(ui.copy, locale)}</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="manuscripts" data-reveal>
        <h3 className="sub-heading">{tx(ui.review, locale)}<small>{manuscripts.length}</small></h3>
        <ol>
          {manuscripts.map((m) => (
            <li key={m.id}>
              <span className="ms-id">{m.id}</span>
              <div>
                <p className="ms-title"><RichTitle text={m.title} /></p>
                <Authors authors={m.authors} self={m.self} />
                <p className="ms-venue">
                  <i>{m.journal}</i>
                  <span className="ms-status">{tx(m.status, locale)}</span>
                  {"extra" in m && m.extra && (
                    <a href={m.extra.href} target="_blank" rel="noreferrer">{tx(m.extra.label, locale)} <ArrowOut /></a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="section-links" data-reveal>
        <a href={profile.scholarUrl} target="_blank" rel="noreferrer">{tx(ui.scholar, locale)} <ArrowOut /></a>
        <a href={profile.orcidUrl} target="_blank" rel="noreferrer">{tx(ui.orcid, locale)} · {profile.orcid} <ArrowOut /></a>
      </div>
    </section>
  );
}
