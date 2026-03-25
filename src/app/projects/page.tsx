import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";

type ProjectsPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <section className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{copy.projects.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-300">{copy.projects.intro}</p>
      </section>

      <section className="mt-8 grid gap-5">
        {copy.projects.items.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              {item.description}
            </p>
            <p className="mt-2 text-sm text-zinc-500">{item.tech}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {lang === "zh" ? "查看详情" : "View details"}
            </a>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
