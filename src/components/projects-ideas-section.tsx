"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import IdeaCommentCountBadge from "@/components/idea-comment-count-badge";
import type { Lang, SiteCopy } from "@/lib/site-content";
import { withLang } from "@/lib/site-content";
import { ideaSlug } from "@/lib/slug";

type IdeaItem = SiteCopy["projects"]["ideas"][number];
type IdeaStatus = IdeaItem["status"];

type Item = { idea: IdeaItem; commentCount: number };

type ProjectsIdeasSectionProps = {
  lang: Lang;
  items: Item[];
  statusLabels: Record<IdeaStatus, string>;
};

const STATUS_ORDER: ("all" | IdeaStatus)[] = [
  "all",
  "idea",
  "in_progress",
  "launched",
  "journal",
];

export default function ProjectsIdeasSection({
  lang,
  items,
  statusLabels,
}: ProjectsIdeasSectionProps) {
  const [filter, setFilter] = useState<"all" | IdeaStatus>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((x) => x.idea.status === filter);
  }, [items, filter]);

  const filterOptionLabel = (v: "all" | IdeaStatus) => {
    if (v === "all") return lang === "zh" ? "全部" : "All";
    return statusLabels[v];
  };

  const emptyHint =
    lang === "zh" ? "没有符合该筛选的想法。" : "No ideas match this filter.";

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 p-5 md:p-7 dark:border-zinc-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          {lang === "zh" ? "想法" : "Ideas"}
        </h2>
        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
          <label
            htmlFor="ideas-status-filter"
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            {lang === "zh" ? "筛选" : "Filter"}
          </label>
          <select
            id="ideas-status-filter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | IdeaStatus)
            }
            className="min-w-[8.5rem] rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            {STATUS_ORDER.map((v) => (
              <option key={v} value={v}>
                {filterOptionLabel(v)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{emptyHint}</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map(({ idea, commentCount }) => (
            <Link
              key={ideaSlug(idea)}
              href={withLang(`/projects/ideas/${ideaSlug(idea)}`, lang)}
              className="block h-full"
            >
              <article className="flex h-full flex-col rounded-xl border border-zinc-200 p-5 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{idea.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {idea.date}
                    </p>
                  </div>
                  <span
                    className={[
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                      idea.status === "in_progress"
                        ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
                        : idea.status === "launched"
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
                          : idea.status === "journal"
                            ? "bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-200"
                            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-200",
                    ].join(" ")}
                  >
                    {statusLabels[idea.status]}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-zinc-600 dark:text-zinc-300">
                  {idea.summary}
                </p>
                <div className="mt-3 flex justify-end">
                  <IdeaCommentCountBadge count={commentCount} lang={lang} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
