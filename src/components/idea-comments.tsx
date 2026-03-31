"use client";

import type { Lang } from "@/lib/site-content";
import { getCusdisLocale } from "@/lib/cusdis-locales";
import IdeaCommentsFeed from "@/components/idea-comments-feed";
import IdeaCommentsForm from "@/components/idea-comments-form";

type IdeaCommentsProps = {
  slug: string;
  lang: Lang;
  ideaTitle: string;
};

/**
 * 留言板块：上方「已有留言」列表（Cusdis Open API），下方「发布留言」表单（经本站 API 代理提交）。
 */
export default function IdeaComments({ slug, lang, ideaTitle }: IdeaCommentsProps) {
  const labels = getCusdisLocale(lang);
  const pageId = `${slug}__${lang}`;

  const frame =
    "rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800";

  const publishHint =
    lang === "zh"
      ? "留言为必填，昵称选填；未填昵称将随机生成。新留言需审核通过后会在「已有留言」中展示。"
      : "Comment is required; nickname is optional. A random nickname is used if you leave it blank. After approval, comments appear in the list above.";

  return (
    <section className={`space-y-5 ${frame} overflow-visible`}>
      <h2 className="text-base font-semibold tracking-tight">
        {lang === "zh" ? "留言" : "Comments"}
      </h2>

      <IdeaCommentsFeed pageId={pageId} lang={lang} />

      <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/80">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-left">
          <h3 className="shrink-0 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {labels.section_publish}
          </h3>
          <p className="max-w-full text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {publishHint}
          </p>
        </div>
        <IdeaCommentsForm pageId={pageId} lang={lang} ideaTitle={ideaTitle} />
      </div>

      <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
        {labels.powered_by}
      </p>
    </section>
  );
}
