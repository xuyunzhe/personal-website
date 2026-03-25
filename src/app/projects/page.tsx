import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";
import { toSlug } from "@/lib/slug";

type ProjectsPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  const statusLabel =
    lang === "zh"
      ? {
          idea: "Idea",
          in_progress: "实现中",
          launched: "已上线",
        }
      : {
          idea: "Idea",
          in_progress: "In Progress",
          launched: "Launched",
        };

  return (
    <SiteLayout lang={lang}>
      <section className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{copy.projects.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-300">{copy.projects.intro}</p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {lang === "zh" ? "想法" : "Ideas"}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {copy.projects.ideas.map((idea) => (
            <Link
              key={idea.title}
              href={`/projects/ideas/${toSlug(idea.title)}?lang=${lang}`}
              className="block"
            >
              <article className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-950">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{idea.title}</h3>
                  <span
                    className={[
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                      idea.status === "in_progress"
                        ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
                        : idea.status === "launched"
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
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

      <section className="mt-14 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {lang === "zh" ? "文章" : "Articles"}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {copy.projects.articles.map((article) => (
            <article
              key={article.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800" style={{ aspectRatio: "16 / 9" }}>
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
              <h3 className="mt-4 text-xl font-semibold">{article.title}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">{article.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
