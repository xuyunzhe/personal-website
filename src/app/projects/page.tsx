import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang, withLang } from "@/lib/site-content";
import { ideaSlug } from "@/lib/slug";

type ProjectsPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);
  const sortedIdeas = [...copy.projects.ideas].sort((a, b) => {
    const t1 = Date.parse(a.date);
    const t2 = Date.parse(b.date);
    if (Number.isNaN(t1) || Number.isNaN(t2) || t1 === t2) {
      return a.title.localeCompare(b.title);
    }
    return t2 - t1;
  });

  const statusLabel =
    lang === "zh"
      ? {
          idea: "Idea",
          in_progress: "实现中",
          launched: "已上线",
          journal: "随记",
        }
      : {
          idea: "Idea",
          in_progress: "In Progress",
          launched: "Launched",
          journal: "Notes",
        };

  return (
    <SiteLayout lang={lang}>
      <div className="mx-auto max-w-4xl space-y-12">
        <section className="rounded-2xl border border-zinc-200 p-5 md:p-7 dark:border-zinc-800">
          <h1 className="text-3xl font-semibold tracking-tight">{copy.projects.title}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{copy.projects.intro}</p>
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-200 p-5 md:p-7 dark:border-zinc-800">
          <h2 className="text-xl font-semibold tracking-tight">
            {lang === "zh" ? "想法" : "Ideas"}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {sortedIdeas.map((idea) => (
              <Link
                key={ideaSlug(idea)}
                href={withLang(`/projects/ideas/${ideaSlug(idea)}`, lang)}
                className="block"
              >
                <article className="rounded-xl border border-zinc-200 p-5 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950">
                  <div className="flex items-start justify-between gap-4">
                    <div>
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
                      {statusLabel[idea.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                    {idea.summary}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-200 p-5 md:p-7 dark:border-zinc-800">
          <h2 className="text-xl font-semibold tracking-tight">
            {lang === "zh" ? "文章" : "Articles"}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.projects.articles.map((article) => (
              <article key={article.title} className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800" style={{ aspectRatio: "16 / 9" }}>
                  <Image
                    src={article.coverSrc}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                    quality={90}
                    priority={false}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{article.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300">{article.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
