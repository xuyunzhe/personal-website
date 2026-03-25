import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";

type BlogPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <section className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{copy.blog.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-300">{copy.blog.intro}</p>
      </section>

      <section className="mt-8 space-y-4">
        {copy.blog.items.map((post) => (
          <article
            key={post.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-500">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{post.summary}</p>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
