import Link from "next/link";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";

type HomeProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <section className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          {copy.hero.role}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {copy.hero.name}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {copy.hero.intro}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/projects?lang=${lang}`}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {copy.hero.primaryCta}
          </Link>
          <Link
            href={`/contact?lang=${lang}`}
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {copy.hero.secondaryCta}
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">{copy.about.title}</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {copy.about.content}
          </p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">{copy.projects.title}</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {copy.projects.intro}
          </p>
          <Link
            href={`/projects?lang=${lang}`}
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {lang === "zh" ? "查看更多项目" : "See all projects"}
          </Link>
        </article>
      </section>
    </SiteLayout>
  );
}
