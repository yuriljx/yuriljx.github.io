"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { localize, type Locale } from "../content";
import { tx, useOnScreen, useReducedMotion } from "./hooks";

const panels = [
  {
    id: "growth",
    tab: localize("Field growth", "田间生长", "圃場の成長"),
    caption: localize(
      "Berry diameters detected in ordinary field photographs, then fitted with a double-sigmoid growth curve. Validation: detection mAP50; calipers on 89 detached berries.",
      "从普通田间照片中检测果粒直径，再拟合双 S 型生长曲线。验证：检测 mAP50；89 个离体果与卡尺对比。",
      "普通の圃場写真から果粒径を検出し、二重シグモイド成長曲線を当てはめます。検証：検出 mAP50、離脱果 89 個でのノギス比較。",
    ),
    facts: ["mAP50 0.931", "R² 0.97", "MAE 0.8 mm"],
    href: "#research-field",
  },
  {
    id: "ploidy",
    tab: localize("Ploidy", "倍性", "倍数性"),
    caption: localize(
      "Ploidy measured by flow cytometry, then linked to morphology, reproduction and fruit chemistry.",
      "以流式细胞术测定倍性，再与形态、繁殖和果实化学组成相关联。",
      "フローサイトメトリーで倍数性を判定し、形態・繁殖・果実成分と結び付けます。",
    ),
    facts: ["FCM", "GC–MS", "3 papers"],
    href: "#research-ploidy",
  },
  {
    id: "callus",
    tab: localize("Callus", "愈伤组织", "カルス"),
    caption: localize(
      "Current project: follow each callus through time and test whether early frames can call which ones will form green shoots.",
      "当前项目：逐个追踪愈伤组织的时间序列，检验能否用早期图像判断哪些会长出绿色苗。",
      "現在の課題：カルスを個別に時系列で追跡し、初期画像から緑色シュートを形成する個体を判定できるかを検証します。",
    ),
    facts: ["Time series", "Non-destructive", "In progress"],
    href: "#research-rice",
  },
] as const;

type PanelId = (typeof panels)[number]["id"];

const label = {
  figure: localize("FIG. 0 — WHAT I MEASURE", "图 0 — 我测量什么", "図0 — 何を測るか"),
  schematic: localize("Schematic illustration", "示意图", "模式図"),
  more: localize("Read more", "了解更多", "詳しく見る"),
  pick: localize("Choose a figure", "选择图示", "図を選択"),
  days: localize("Days", "天数", "日数"),
  diameter: localize("Relative diameter", "相对直径", "相対果粒径"),
  dna: localize("Relative DNA content", "相对 DNA 含量", "相対DNA量"),
  aneuploid: localize("aneuploid", "非整倍体", "異数体"),
  morphology: localize("Morphology", "形态", "形態"),
  reproduction: localize("Reproduction", "繁殖", "繁殖"),
  chemistry: localize("Fruit chemistry", "果实化学", "果実成分"),
  quality: localize("Integrated quality", "综合品质", "総合品質"),
  earlyCall: localize("early call", "早期判定", "早期判定"),
  shoot: localize("green shoot", "绿色苗", "緑色シュート"),
};

/* --- Growth panel --------------------------------------------------- */

const growth = (t: number) => 0.52 / (1 + Math.exp(-0.13 * (t - 24))) + 0.43 / (1 + Math.exp(-0.12 * (t - 80)));
const noise = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * 0.075;
};

function GrowthPanel({ locale }: { locale: Locale }) {
  const W = 460;
  const H = 380;
  const pad = { l: 40, r: 12, t: 30, b: 42 };
  const sx = (t: number) => pad.l + (t / 120) * (W - pad.l - pad.r);
  const sy = (y: number) => H - pad.b - y * (H - pad.t - pad.b);

  const points = useMemo(
    () => Array.from({ length: 23 }, (_, i) => {
      const t = 5 + i * 5;
      return { t, y: Math.max(0.02, Math.min(1, growth(t) + noise(i))) };
    }),
    [],
  );
  const curve = useMemo(() => {
    const steps = 96;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const t = (i / steps) * 120;
      return `${i ? "L" : "M"}${sx(t).toFixed(1)},${sy(growth(t)).toFixed(1)}`;
    }).join("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stages = [
    { from: 0, to: 42, name: "I" },
    { from: 42, to: 62, name: "II" },
    { from: 62, to: 120, name: "III" },
  ];

  return (
    <svg className="lf-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tx(panels[0].caption, locale)}>
      {stages.map((stage, index) => (
        <g key={stage.name}>
          <rect className={`lf-band ${index % 2 ? "alt" : ""}`} x={sx(stage.from)} y={pad.t} width={sx(stage.to) - sx(stage.from)} height={H - pad.t - pad.b} />
          <text className="lf-stage" x={(sx(stage.from) + sx(stage.to)) / 2} y={pad.t + 14} textAnchor="middle">{stage.name}</text>
        </g>
      ))}
      <path className="lf-axis" d={`M${pad.l},${pad.t} V${H - pad.b} H${W - pad.r}`} />
      {[0, 30, 60, 90, 120].map((t) => (
        <g key={t}>
          <path className="lf-tick" d={`M${sx(t)},${H - pad.b} v4`} />
          <text className="lf-tick-label" x={sx(t)} y={H - pad.b + 16} textAnchor="middle">{t}</text>
        </g>
      ))}
      {[0, 0.5, 1].map((y) => (
        <text key={y} className="lf-tick-label" x={pad.l - 8} y={sy(y) + 3} textAnchor="end">{y}</text>
      ))}
      <text className="lf-axis-label" x={W - pad.r} y={H - 6} textAnchor="end">{tx(label.days, locale)}</text>
      <text className="lf-axis-label" x={pad.l} y={14}>{tx(label.diameter, locale)}</text>

      {/* detection inset */}
      <g className="lf-inset" transform={`translate(${pad.l + 14} ${pad.t + 28})`}>
        <rect className="lf-inset-frame" width="118" height="78" />
        {[[30, 40, 13], [62, 30, 15], [88, 50, 12], [56, 58, 11]].map(([cx, cy, r], i) => (
          <g key={i} style={{ "--d": `${i * 120}ms` } as CSSProperties}>
            <circle className="lf-berry" cx={cx} cy={cy} r={r} />
            <rect className="lf-bbox" x={cx - r - 3} y={cy - r - 3} width={(r + 3) * 2} height={(r + 3) * 2} />
          </g>
        ))}
        <text className="lf-inset-label" x="4" y="74">YOLOv8</text>
      </g>

      {points.map((p, i) => (
        <circle
          key={p.t}
          className="lf-point"
          cx={sx(p.t)}
          cy={sy(p.y)}
          r={3.4}
          style={{ "--d": `${250 + i * 45}ms` } as CSSProperties}
        />
      ))}
      <path className="lf-curve" d={curve} pathLength={1} />
    </svg>
  );
}

/* --- Ploidy panel --------------------------------------------------- */

function gaussianPath(mu: number, sigma: number, amp: number, sx: (x: number) => number, sy: (y: number) => number) {
  const parts: string[] = [];
  for (let x = mu - sigma * 3.2; x <= mu + sigma * 3.2; x += sigma / 6) {
    const y = amp * Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
    parts.push(`${parts.length ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  parts.push(`L${sx(mu + sigma * 3.2).toFixed(1)},${sy(0).toFixed(1)} L${sx(mu - sigma * 3.2).toFixed(1)},${sy(0).toFixed(1)} Z`);
  return parts.join(" ");
}

function PloidyPanel({ locale }: { locale: Locale }) {
  const W = 460;
  const H = 380;
  const plot = { l: 30, r: 440, t: 44, b: 210 };
  const sx = (x: number) => plot.l + ((x - 20) / 160) * (plot.r - plot.l);
  const sy = (y: number) => plot.b - y * (plot.b - plot.t);
  const peaks = [
    { mu: 62, sigma: 7, amp: 0.92, cls: "p2", name: "2x" },
    { mu: 124, sigma: 9, amp: 0.78, cls: "p4", name: "4x" },
    { mu: 96, sigma: 8, amp: 0.46, cls: "pa", name: tx(label.aneuploid, locale) },
  ];
  const traits = [label.morphology, label.reproduction, label.chemistry, label.quality];

  return (
    <svg className="lf-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tx(panels[1].caption, locale)}>
      <path className="lf-axis" d={`M${plot.l},${plot.t - 10} V${plot.b} H${plot.r}`} />
      <text className="lf-axis-label" x={plot.r} y={plot.b + 18} textAnchor="end">{tx(label.dna, locale)}</text>
      <text className="lf-axis-label" x={plot.l} y={18}>FCM</text>
      {peaks.map((peak, i) => (
        <g key={peak.cls} className={`lf-peak ${peak.cls}`} style={{ "--d": `${200 + i * 260}ms` } as CSSProperties}>
          <path d={gaussianPath(peak.mu, peak.sigma, peak.amp, sx, sy)} />
          <text x={sx(peak.mu)} y={sy(peak.amp) - 8} textAnchor="middle">{peak.name}</text>
        </g>
      ))}
      <path className="lf-link" d={`M235,${plot.b + 24} V${plot.b + 44}`} pathLength={1} style={{ "--d": "900ms" } as CSSProperties} />
      <path className="lf-arrow" d={`M229,${plot.b + 38} L235,${plot.b + 46} L241,${plot.b + 38}`} style={{ "--d": "1300ms" } as CSSProperties} />
      {traits.map((trait, i) => {
        const x = i % 2 ? 240 : 30;
        const y = i < 2 ? 266 : 316;
        return (
          <g key={i} className="lf-trait" style={{ "--d": `${1000 + i * 160}ms` } as CSSProperties}>
            <rect x={x} y={y} width="190" height="38" />
            <text x={x + 14} y={y + 24}>{tx(trait, locale)}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* --- Callus panel --------------------------------------------------- */

const days = [0, 7, 14, 21, 28];
const calli = Array.from({ length: 20 }, (_, i) => {
  const r = Math.sin(i * 7.31 + 1.7) * 10000;
  const rand = r - Math.floor(r);
  return {
    i,
    col: i % 5,
    row: Math.floor(i / 5),
    growth: 0.55 + rand * 0.6,
    shoot: [1, 4, 7, 10, 13, 18].includes(i),
    called: [1, 4, 7, 10, 12, 18].includes(i),
    wobble: rand,
  };
});

function CallusPanel({ locale, playing }: { locale: Locale; playing: boolean }) {
  const reduced = useReducedMotion();
  const [tick, setFrame] = useState(0);
  const frame = reduced ? days.length - 1 : tick;

  useEffect(() => {
    if (reduced || !playing) return;
    const timer = window.setInterval(() => setFrame((f) => (f + 1) % days.length), 1150);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);

  const W = 460;
  const H = 380;
  const cell = { w: 80, h: 58, x0: 34, y0: 22 };

  return (
    <svg className="lf-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tx(panels[2].caption, locale)}>
      <rect className="lf-dish" x="20" y="14" width={W - 40} height="250" rx="6" />
      {calli.map((c) => {
        const cx = cell.x0 + c.col * cell.w + cell.w / 2 - 4;
        const cy = cell.y0 + c.row * cell.h + cell.h / 2 + 4;
        const scale = 0.32 + (frame / (days.length - 1)) * c.growth * 0.62;
        const r = 19;
        const green = c.shoot && frame >= 3;
        return (
          <g key={c.i} className="lf-callus-cell">
            <g className="lf-grow" style={{ transform: `scale(${scale.toFixed(3)})`, transformOrigin: `${cx}px ${cy}px` }}>
              <ellipse
                className={`lf-callus ${green ? "green" : ""}`}
                cx={cx}
                cy={cy}
                rx={r * (1 + c.wobble * 0.18)}
                ry={r * (0.86 + c.wobble * 0.1)}
              />
              <g className={`lf-shoot ${green ? "on" : ""}`}>
                <circle cx={cx - r * 0.25} cy={cy - r * 0.2} r={r * 0.26} />
                <circle cx={cx + r * 0.32} cy={cy + r * 0.12} r={r * 0.19} />
              </g>
            </g>
            <circle className={`lf-call ${c.called && frame >= 1 ? "on" : ""}`} cx={cx} cy={cy} r={25} />
            <text className="lf-cell-id" x={cx - cell.w / 2 + 3} y={cy - cell.h / 2 + 9}>{String(c.i + 1).padStart(2, "0")}</text>
          </g>
        );
      })}
      <g className="lf-scrub">
        <path className="lf-axis" d={`M50,292 H${W - 50}`} />
        {days.map((d, i) => {
          const x = 50 + (i / (days.length - 1)) * (W - 100);
          return (
            <g key={d} className={i === frame ? "active" : i < frame ? "past" : ""}>
              <circle cx={x} cy={292} r={i === frame ? 5 : 3.5} />
              <text x={x} y={314} textAnchor="middle">{`d${d}`}</text>
            </g>
          );
        })}
      </g>
      <g className="lf-legend" transform="translate(56 352)">
        <circle className="lf-call" cx="0" cy="-2" r="6" />
        <text x="12" y="2">{tx(label.earlyCall, locale)}</text>
      </g>
      <g className="lf-legend" transform="translate(220 352)">
        <circle className="lf-callus green" cx="0" cy="-2" r="6" />
        <circle className="lf-legend-shoot" cx="-1.5" cy="-3" r="2.4" />
        <text x="12" y="2">{tx(label.shoot, locale)}</text>
      </g>
    </svg>
  );
}

/* --- Wrapper -------------------------------------------------------- */

export default function LiveFigure({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<PanelId>("growth");
  const [hovering, setHovering] = useState(false);
  const [manual, setManual] = useState(false);
  const [ref, onScreen] = useOnScreen<HTMLDivElement>(0.15);
  const reduced = useReducedMotion();

  const index = panels.findIndex((panel) => panel.id === active);
  const panel = panels[index];
  const autoplay = !reduced && !hovering && !manual && onScreen;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setActive(panels[(index + 1) % panels.length].id), 8200);
    return () => window.clearTimeout(timer);
  }, [autoplay, index]);

  return (
    <div
      className="live-figure"
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="lf-head">
        <span className="lf-code">{tx(label.figure, locale)}</span>
        <div className="lf-tabs" role="tablist" aria-label={tx(label.pick, locale)}>
          {panels.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`lf-tab-${item.id}`}
              aria-selected={item.id === active}
              aria-controls="lf-panel"
              className={item.id === active ? "active" : ""}
              onClick={() => {
                setManual(true);
                setActive(item.id);
              }}
            >
              {tx(item.tab, locale)}
              {item.id === active && autoplay && <i className="lf-progress" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>
      <div className="lf-body" id="lf-panel" role="tabpanel" aria-labelledby={`lf-tab-${active}`} key={active}>
        {active === "growth" && <GrowthPanel locale={locale} />}
        {active === "ploidy" && <PloidyPanel locale={locale} />}
        {active === "callus" && <CallusPanel locale={locale} playing={onScreen} />}
      </div>
      <div className="lf-foot">
        <p>{tx(panel.caption, locale)}</p>
        <div className="lf-facts">
          {panel.facts.map((fact) => <span key={fact}>{fact}</span>)}
          <a href={panel.href}>{tx(label.more, locale)} →</a>
        </div>
        <small>{tx(label.schematic, locale)}</small>
      </div>
    </div>
  );
}
