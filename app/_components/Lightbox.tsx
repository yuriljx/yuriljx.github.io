"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { localize, type Locale, type Visual } from "../content";
import { ChevronSide, Close } from "./icons";
import { tx } from "./hooks";

type Gallery = { title: string; items: readonly Visual[]; index: number };

const LightboxContext = createContext<(gallery: Gallery) => void>(() => {});

export const useLightbox = () => useContext(LightboxContext);

const ui = {
  close: localize("Close image viewer", "关闭图片查看", "画像ビューアを閉じる"),
  previous: localize("Previous image", "上一张", "前の画像"),
  next: localize("Next image", "下一张", "次の画像"),
};

export function LightboxProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);

  const open = useCallback((next: Gallery) => setGallery(next), []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !gallery) return;
    if (!dialog.open) dialog.showModal();
  }, [gallery]);

  const move = (step: number) =>
    setGallery((current) => current && {
      ...current,
      index: (current.index + step + current.items.length) % current.items.length,
    });

  const item = gallery?.items[gallery.index];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={gallery?.title ?? ""}
        onClose={() => setGallery(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
      >
        {gallery && item && (
          <div className="lightbox-frame">
            <div className="lightbox-top">
              <strong>{gallery.title}</strong>
              <span>{gallery.index + 1} / {gallery.items.length}</span>
              <button type="button" onClick={close} aria-label={tx(ui.close, locale)}><Close /></button>
            </div>
            <figure>
              <img src={item.src} alt={tx(item.alt, locale)} width={item.width} height={item.height} key={item.src} />
              <figcaption>{tx(item.caption, locale)}</figcaption>
            </figure>
            {gallery.items.length > 1 && (
              <div className="lightbox-nav">
                <button type="button" onClick={() => move(-1)} aria-label={tx(ui.previous, locale)}><ChevronSide direction="previous" /></button>
                <div className="lightbox-thumbs">
                  {gallery.items.map((thumb, i) => (
                    <button
                      type="button"
                      key={thumb.src}
                      className={i === gallery.index ? "active" : ""}
                      aria-label={tx(thumb.caption, locale)}
                      aria-pressed={i === gallery.index}
                      onClick={() => setGallery({ ...gallery, index: i })}
                    >
                      <img src={thumb.src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => move(1)} aria-label={tx(ui.next, locale)}><ChevronSide direction="next" /></button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}
