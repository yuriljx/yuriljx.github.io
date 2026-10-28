const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ArrowDown() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v10M4 8l4 4 4-4" {...base} /></svg>;
}

export function ArrowUp() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14V4M4 8l4-4 4 4" {...base} /></svg>;
}

export function ArrowOut() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" {...base} /></svg>;
}

export function Chevron({ open = false }: { open?: boolean }) {
  return <svg className={open ? "open" : ""} viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" {...base} /></svg>;
}

export function ChevronSide({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d={direction === "previous" ? "M11.5 3.5 6 9l5.5 5.5" : "M6.5 3.5 12 9l-5.5 5.5"} {...base} />
    </svg>
  );
}

export function Close() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" {...base} /></svg>;
}

export function Globe() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" {...base} />
      <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5" {...base} />
    </svg>
  );
}

export function ThemeIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" {...base} />
      <path d="M10 3a7 7 0 0 1 0 14z" fill="currentColor" />
    </svg>
  );
}

export function Mail() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="1" {...base} /><path d="m3 5.5 7 5.5 7-5.5" {...base} /></svg>;
}

export function Copy() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1" {...base} /><path d="M10.5 3.5v-1h-8v8h1" {...base} /></svg>;
}

export function Check() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" {...base} /></svg>;
}

export function Play() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4.8v10.4L15.2 10z" fill="currentColor" /></svg>;
}

export function Expand() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" {...base} /></svg>;
}

export function Printer() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 7.5v-4h9v4M5.5 13.5h-2v-6h13v6h-2M5.5 11.5h9v5h-9z" {...base} /></svg>;
}

export function OrcidMark() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" {...base} />
      <path d="M7 8.5v5M7 6.2v.1M9.6 13.5V7h1.8a3.25 3.25 0 0 1 0 6.5z" {...base} />
    </svg>
  );
}

export function ScholarMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m2.5 8 7.5-5 7.5 5-7.5 5z M5.5 10v3.5c1.2 1.4 2.7 2 4.5 2s3.3-.6 4.5-2V10" {...base} /></svg>;
}

export function GithubMark() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.5 16.5c-3 .9-3-1.5-4.2-1.8M11.8 18.2v-2.6c0-.8.1-1.2-.4-1.7 2.2-.2 4.5-1.1 4.5-4.9a3.8 3.8 0 0 0-1-2.6 3.5 3.5 0 0 0-.1-2.6s-.8-.3-2.7 1a9.3 9.3 0 0 0-4.8 0c-1.9-1.3-2.7-1-2.7-1a3.5 3.5 0 0 0-.1 2.6 3.8 3.8 0 0 0-1 2.6c0 3.8 2.3 4.7 4.5 4.9-.5.5-.5 1-.4 1.7v2.6" {...base} />
    </svg>
  );
}
