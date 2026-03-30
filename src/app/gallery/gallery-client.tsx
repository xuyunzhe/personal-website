"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/lib/site-content";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

type GalleryClientProps = {
  photos: GalleryPhoto[];
  lang: Lang;
};

export default function GalleryClient({ photos, lang }: GalleryClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const open = useCallback((index: number) => setOpenIndex(index), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close]);

  return (
    <>
      <div className="-mx-6">
        <div className="grid w-full grid-cols-2 gap-0 sm:grid-cols-4 [&>*]:min-w-0">
          {photos.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              onClick={() => open(index)}
              className="group relative m-0 aspect-square w-full cursor-zoom-in overflow-hidden border-0 bg-zinc-200 p-0 dark:bg-zinc-900"
              aria-label={
                lang === "zh"
                  ? `${photo.alt}，${photo.caption}，点击查看大图`
                  : `${photo.alt}. ${photo.caption}. Click to enlarge`
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && photos[openIndex] ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "zh" ? "大图预览" : "Image preview"}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="fixed right-4 top-4 z-[60] rounded-full border border-white/30 bg-zinc-900/90 px-3 py-1.5 text-sm text-white shadow-lg hover:bg-zinc-800"
          >
            {lang === "zh" ? "关闭" : "Close"}
          </button>
          {/* min-h-full + flex 居中；外层 overflow-y-auto 超长图可滚动；避免 min-height:auto 裁切 */}
          <div className="flex min-h-full min-w-0 flex-col items-center justify-center px-4 pb-12 pt-14 sm:px-8">
            <div
              className="flex w-full max-w-[min(96vw,1920px)] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={photos[openIndex].src}
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                className="h-auto w-auto max-h-[min(85vh,85dvh)] max-w-full object-contain"
              />
              {photos[openIndex].caption ? (
                <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-zinc-300">
                  {photos[openIndex].caption}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
