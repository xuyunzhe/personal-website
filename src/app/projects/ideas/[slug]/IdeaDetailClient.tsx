"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import IdeaComments from "@/components/idea-comments";
import { parseBoldSegments } from "@/lib/parse-bold-segments";
import { withLang, type Lang, type SiteCopy } from "@/lib/site-content";

type IdeaItem = SiteCopy["projects"]["ideas"][number];

type IdeaDetailClientProps = {
  lang: Lang;
  idea: IdeaItem;
  /** URL segment for this idea; used by comments API. */
  slug: string;
};

export default function IdeaDetailClient({
  lang,
  idea,
  slug,
}: IdeaDetailClientProps) {
  const [previewOpen, setPreviewOpen] = useState<number | null>(null);

  const closePreview = useCallback(() => setPreviewOpen(null), []);

  useEffect(() => {
    if (previewOpen === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [previewOpen, closePreview]);

  const statusLabels = useMemo(() => {
    if (lang === "en") {
      return {
        idea: "Idea",
        in_progress: "In Progress",
        launched: "Launched",
        journal: "Notes",
      } satisfies Record<IdeaItem["status"], string>;
    }
    return {
      idea: "Idea",
      in_progress: "实现中",
      launched: "已上线",
      journal: "随记",
    } satisfies Record<IdeaItem["status"], string>;
  }, [lang]);

  const statusPill = useMemo(() => {
    if (idea.status === "in_progress") {
      return "bg-amber-500 text-white";
    }
    if (idea.status === "launched") {
      return "bg-emerald-600 text-white";
    }
    if (idea.status === "journal") {
      return "bg-violet-600 text-white";
    }
    return "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100";
  }, [idea.status]);

  const dateLabel = useMemo(() => {
    // Ensure we display only YYYY-MM-DD (input format should be YYYY-MM-DD).
    const d = idea.date?.trim();
    if (!d) return "";
    return d.length >= 10 ? d.slice(0, 10) : d;
  }, [idea.date]);

  const moduleFrame =
    "rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800";

  return (
    <div className="space-y-6">
      <section className={`space-y-2 ${moduleFrame}`}>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {idea.title}
            {dateLabel ? (
              <span className="ml-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {dateLabel}
              </span>
            ) : null}
          </h1>
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-medium",
              statusPill,
            ].join(" ")}
          >
            {statusLabels[idea.status]}
          </span>
        </div>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          {idea.summary}
        </p>
      </section>

      <section className={`space-y-3 ${moduleFrame}`}>
        <div className="space-y-4 font-mono text-base leading-7 text-zinc-900 dark:text-zinc-100">
          {idea.content
            .split(/\n\n+/)
            .filter((block) => block.trim().length > 0)
            .map((block, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {parseBoldSegments(block)}
              </p>
            ))}
        </div>
      </section>

      {idea.status === "launched" ? (
        <>
          <section className={`space-y-3 ${moduleFrame}`}>
            <h2 className="text-base font-semibold tracking-tight">
              {lang === "zh" ? "预览页面" : "Preview"}
            </h2>
            {idea.previewImages && idea.previewImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {idea.previewImages.map((item, idx) => (
                  <button
                    key={`${item.src}-${idx}`}
                    type="button"
                    onClick={() => setPreviewOpen(idx)}
                    className="group block w-full overflow-hidden rounded-xl border border-zinc-200 text-left dark:border-zinc-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt ?? `${idea.title} preview ${idx + 1}`}
                      className="h-48 w-full cursor-zoom-in object-cover transition group-hover:scale-[1.01]"
                      loading="lazy"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {lang === "zh" ? "暂未添加预览图片。" : "No preview images yet."}
              </p>
            )}
          </section>

          <section className={`space-y-3 ${moduleFrame}`}>
            <h2 className="text-base font-semibold tracking-tight">
              {lang === "zh" ? "体验链接" : "Live Link"}
            </h2>
            {idea.link ? (
              <a
                href={idea.link}
                target="_blank"
                rel="noreferrer"
                className="text-base font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
              >
                {idea.link}
              </a>
            ) : (
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {lang === "zh" ? "暂未添加体验链接。" : "No live link yet."}
              </p>
            )}
          </section>
          {previewOpen !== null &&
          idea.previewImages &&
          idea.previewImages[previewOpen] ? (
            <div
              className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/90"
              role="dialog"
              aria-modal="true"
              aria-label={lang === "zh" ? "预览大图" : "Image preview"}
              onClick={closePreview}
            >
              <button
                type="button"
                onClick={closePreview}
                className="fixed right-4 top-4 z-[60] rounded-full border border-white/30 bg-zinc-900/90 px-3 py-1.5 text-sm text-white shadow-lg hover:bg-zinc-800"
              >
                {lang === "zh" ? "关闭" : "Close"}
              </button>
              <div className="flex min-h-full min-w-0 flex-col items-center justify-center px-4 pb-12 pt-14 sm:px-8">
                <div
                  className="flex w-full max-w-[min(96vw,1920px)] flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={idea.previewImages[previewOpen].src}
                    src={idea.previewImages[previewOpen].src}
                    alt={
                      idea.previewImages[previewOpen].alt ??
                      `${idea.title} preview ${previewOpen + 1}`
                    }
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    draggable={false}
                    className="h-auto w-auto max-h-[min(85vh,85dvh)] max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <IdeaComments slug={slug} lang={lang} ideaTitle={idea.title} />

      <Link
        href={withLang("/projects", lang)}
        className="inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        {lang === "zh" ? "返回项目" : "Back to Projects"}
      </Link>
    </div>
  );
}

