"use client";

import { useState } from "react";
import { localize, profile, type Locale } from "../content";
import { ArrowOut, Check, Copy } from "./icons";
import { tx } from "./hooks";

const ui = {
  eyebrow: localize("CONTACT", "联系", "連絡先"),
  title: localize(
    "Open to collaboration on phenotyping methods, tissue-culture breeding and reproducible research software.",
    "欢迎在表型方法、组织培养育种与可复现研究软件方面开展合作。",
    "表現型評価手法、組織培養を用いた育種、再現可能な研究ソフトウェアに関する共同研究を歓迎します。",
  ),
  languages: localize("Correspondence in English, Chinese or Japanese.", "可使用英语、中文或日语联系。", "英語・中国語・日本語で対応できます。"),
  copy: localize("Copy email address", "复制邮箱地址", "メールアドレスをコピー"),
  copied: localize("Copied", "已复制", "コピーしました"),
};

export default function Contact({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false);

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
      <div>
        <p className="eyebrow">{tx(ui.eyebrow, locale)}</p>
        <h2 id="contact-title">{tx(ui.title, locale)}</h2>
        <p className="contact-note">{tx(ui.languages, locale)}</p>
      </div>
      <address>
        <span className="contact-affiliation">{tx(profile.affiliation, locale)}<br />{tx(profile.location, locale)}</span>
        <span className="contact-email">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(profile.email);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              } catch {
                setCopied(false);
              }
            }}
            aria-label={tx(ui.copy, locale)}
            title={tx(ui.copy, locale)}
          >
            {copied ? <Check /> : <Copy />}
            <span className="sr-only" aria-live="polite">{copied ? tx(ui.copied, locale) : ""}</span>
          </button>
        </span>
        <a href={profile.orcidUrl} target="_blank" rel="noreferrer">ORCID {profile.orcid} <ArrowOut /></a>
        <a href={profile.scholarUrl} target="_blank" rel="noreferrer">Google Scholar <ArrowOut /></a>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub · yuriljx <ArrowOut /></a>
      </address>
    </section>
  );
}
