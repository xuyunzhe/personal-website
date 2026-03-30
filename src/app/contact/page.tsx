import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";

type ContactPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">{copy.contact.title}</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          {copy.contact.intro}
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-500">
            {copy.contact.emailLabel}
          </h2>
          <a
            href="mailto:450711931@qq.com"
            className="mt-2 inline-block text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            450711931@qq.com
          </a>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-500">
            {copy.contact.locationLabel}
          </h2>
          <p className="mt-2 text-lg font-semibold">
            {lang === "zh" ? "中国·北京" : "China · Beijing"}
          </p>
        </article>
      </section>
    </SiteLayout>
  );
}
