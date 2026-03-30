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
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="p-5 md:p-7">
          <h1 className="text-3xl font-semibold tracking-tight">{copy.contact.title}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {copy.contact.intro}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <h2 className="text-sm font-medium text-zinc-500">
              {copy.contact.emailLabel}
            </h2>
            <a
              href="mailto:450711931@qq.com"
              className="mt-2 inline-block text-base font-semibold text-zinc-800 hover:underline dark:text-zinc-100"
            >
              450711931@qq.com
            </a>
          </article>

          <article className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <h2 className="text-sm font-medium text-zinc-500">
              {copy.contact.locationLabel}
            </h2>
            <p className="mt-2 text-base font-semibold">
              {lang === "zh" ? "中国·北京" : "China · Beijing"}
            </p>
          </article>
        </section>
      </div>
    </SiteLayout>
  );
}
