import type { Lang } from "@/lib/site-content";

type IdeaCommentCountBadgeProps = {
  count: number;
  lang: Lang;
};

/** 项目列表卡片上展示的评论数量角标 */
export default function IdeaCommentCountBadge({
  count,
  lang,
}: IdeaCommentCountBadgeProps) {
  const label =
    lang === "zh" ? `${count} 条留言` : `${count} comment${count === 1 ? "" : "s"}`;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium tabular-nums text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
      title={label}
      aria-label={label}
    >
      <svg
        className="h-3.5 w-3.5 shrink-0 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      {count}
    </span>
  );
}
