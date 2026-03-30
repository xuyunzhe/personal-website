"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import type { Lang, SiteCopy } from "@/lib/site-content";

type IdeaItem = SiteCopy["projects"]["ideas"][number];

function parseBoldSegments(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-zinc-950 dark:text-zinc-50"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type IdeaDetailClientProps = {
  lang: Lang;
  idea: IdeaItem;
};

export default function IdeaDetailClient({
  lang,
  idea,
}: IdeaDetailClientProps) {
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

  return (
    <div className="space-y-6">
      <section className="space-y-2">
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
        <p className="text-zinc-600 dark:text-zinc-300">{idea.summary}</p>
      </section>

      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-4 font-mono text-sm leading-6 text-zinc-900 dark:text-zinc-100">
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

      <section className="flex gap-3">
        <Link
          href={`/projects?lang=${lang}`}
          className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          {lang === "zh" ? "返回项目" : "Back to Projects"}
        </Link>
      </section>
    </div>
  );
}

