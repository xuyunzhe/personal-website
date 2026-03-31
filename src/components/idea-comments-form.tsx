"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/site-content";
import { getCusdisLocale } from "@/lib/cusdis-locales";

type IdeaCommentsFormProps = {
  pageId: string;
  lang: Lang;
  ideaTitle: string;
};

const NICK_MAX = 50;
const CONTENT_MAX = 4000;

export default function IdeaCommentsForm({
  pageId,
  lang,
  ideaTitle,
}: IdeaCommentsFormProps) {
  /** 表单仅在客户端挂载后渲染，避免 input 等属性在 SSR 与首帧 hydration 不一致 */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const labels = getCusdisLocale(lang);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = nickname.trim();
    const c = content.trim();
    if (!c) {
      setError(labels.content_is_required);
      return;
    }
    if (n.length > NICK_MAX) {
      setError(labels.nickname_too_long);
      return;
    }
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/cusdis/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId,
          nickname: n,
          content: c,
          pageUrl: window.location.href,
          pageTitle: ideaTitle,
        }),
      });
      if (!res.ok) {
        await res.json().catch(() => null);
        setError(labels.post_submit_error);
        return;
      }
      await res.json().catch(() => null);
      setNickname("");
      setContent("");
      setMessage(labels.comment_has_been_sent);
    } catch {
      setError(labels.post_submit_error);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500";

  if (!mounted) {
    return (
      <div
        className="space-y-4"
        aria-busy="true"
        aria-label={lang === "zh" ? "表单加载中" : "Loading form"}
      >
        <div className="h-[42px] rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-[120px] rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-9 w-28 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="cusdis-nickname"
          className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          {labels.nickname}
        </label>
        <input
          id="cusdis-nickname"
          name="nickname"
          type="text"
          autoComplete="nickname"
          maxLength={NICK_MAX}
          placeholder={labels.nickname_placeholder ?? ""}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className={inputClass}
          disabled={submitting}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="cusdis-content"
          className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          {labels.reply_placeholder}
        </label>
        <textarea
          id="cusdis-content"
          name="content"
          rows={4}
          maxLength={CONTENT_MAX}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${inputClass} min-h-[6rem] resize-y`}
          disabled={submitting}
        />
      </div>
      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {submitting ? labels.sending : labels.post_comment}
      </button>
    </form>
  );
}
