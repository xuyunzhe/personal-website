"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/lib/site-content";
import { getCusdisLocale } from "@/lib/cusdis-locales";
import type { CusdisComment } from "@/lib/cusdis-types";

function replyList(c: CusdisComment): CusdisComment[] {
  const r = c.replies as unknown;
  if (Array.isArray(r)) return r;
  if (r && typeof r === "object" && "data" in r) {
    const d = (r as { data: unknown }).data;
    if (Array.isArray(d)) return d as CusdisComment[];
  }
  return [];
}

type IdeaCommentsFeedProps = {
  pageId: string;
  lang: Lang;
  refreshKey: number;
};

function formatWhen(comment: CusdisComment, lang: Lang): string {
  if (comment.parsedCreatedAt?.trim()) return comment.parsedCreatedAt;
  const d = comment.createdAt ? new Date(comment.createdAt) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return d.toLocaleString();
  }
}

function Avatar({
  nickname,
  small,
}: {
  nickname: string;
  small?: boolean;
}) {
  const ch = nickname.trim().slice(0, 1) || "?";
  return (
    <div
      className={
        small
          ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 text-xs font-semibold text-zinc-700 dark:from-zinc-600 dark:to-zinc-700 dark:text-zinc-100"
          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 text-sm font-semibold text-zinc-700 dark:from-zinc-600 dark:to-zinc-700 dark:text-zinc-100"
      }
      aria-hidden
    >
      {ch}
    </div>
  );
}

function CommentBody({ comment }: { comment: CusdisComment }) {
  const raw =
    comment.parsedContent?.trim() || comment.content || "";
  const looksHtml = /<[^>]+>/.test(raw);
  if (looksHtml) {
    return (
      <div
        className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200 [&_a]:break-all [&_a]:text-blue-600 dark:[&_a]:text-blue-400"
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }
  return (
    <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">
      {raw}
    </p>
  );
}

function CommentItem({
  comment,
  lang,
  depth,
}: {
  comment: CusdisComment;
  lang: Lang;
  depth: number;
}) {
  const when = formatWhen(comment, lang);
  const replies = replyList(comment);

  return (
    <div className="flex gap-3">
      <Avatar nickname={comment.by_nickname} small={depth > 0} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {comment.by_nickname}
          </span>
          {when ? (
            <time
              className="text-xs text-zinc-500 dark:text-zinc-400"
              dateTime={comment.createdAt}
            >
              {when}
            </time>
          ) : null}
        </div>
        <div className="mt-2">
          <CommentBody comment={comment} />
        </div>
        {replies.length > 0 ? (
          <div className="mt-4 space-y-4 border-l-2 border-zinc-200 pl-4 dark:border-zinc-600">
            {replies.map((r) => (
              <CommentItem
                key={r.id}
                comment={r}
                lang={lang}
                depth={depth + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function IdeaCommentsFeed({
  pageId,
  lang,
  refreshKey,
}: IdeaCommentsFeedProps) {
  const labels = getCusdisLocale(lang);
  const [items, setItems] = useState<CusdisComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `/api/cusdis/comments?pageId=${encodeURIComponent(pageId)}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error("fetch");
      const json = (await res.json()) as {
        data?: { data?: CusdisComment[] };
      };
      const list = json.data?.data;
      setItems(Array.isArray(list) ? list : []);
    } catch {
      setError(true);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  if (loading) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{labels.loading}</p>
    );
  }
  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400" role="alert">
        {labels.feed_load_error}
      </p>
    );
  }
  if (items.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{labels.empty_feed}</p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
      {items.map((c) => (
        <li key={c.id} className="py-4 first:pt-0 last:pb-0">
          <CommentItem comment={c} lang={lang} depth={0} />
        </li>
      ))}
    </ul>
  );
}
