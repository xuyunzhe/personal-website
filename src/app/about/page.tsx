import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";

type AboutPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">{copy.about.title}</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {copy.about.content}
        </p>
      </section>
    </SiteLayout>
  );
}
