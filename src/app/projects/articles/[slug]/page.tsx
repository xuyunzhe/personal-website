import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang, withLang } from "@/lib/site-content";
import { parseBoldSegments } from "@/lib/parse-bold-segments";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default async function ProjectsArticlePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const lang = getLang(query.lang);
  const copy = getCopy(lang);
  const article = copy.projects.articles.find((a) => a.slug === slug);

  if (!article?.content) notFound();

  const moduleFrame =
    "rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800";

  return (
    <SiteLayout lang={lang}>
      <article className="mx-auto max-w-4xl space-y-8">
        <header className={`space-y-4 ${moduleFrame}`}>
          {article.date ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{article.date}</p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight">{article.title}</h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {article.summary}
          </p>
        </header>

        <div
          className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={article.coverSrc}
            alt={article.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        <section className={`space-y-3 ${moduleFrame}`}>
          <div className="space-y-4 font-mono text-base leading-7 text-zinc-900 dark:text-zinc-100">
            {article.content
              .split(/\n\n+/)
              .filter((block) => block.trim().length > 0)
              .map((block, i) => (
                <p key={i} className="whitespace-pre-wrap">
                  {parseBoldSegments(block)}
                </p>
              ))}
          </div>
        </section>

        <Link
          href={withLang("/projects", lang)}
          className="inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          {lang === "zh" ? "返回项目" : "Back to Projects"}
        </Link>
      </article>
    </SiteLayout>
  );
}
