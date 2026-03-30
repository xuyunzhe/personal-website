import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";
import GalleryClient from "./gallery-client";

type GalleryPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <div className="space-y-0">
        <section className="mx-auto max-w-4xl space-y-3 px-0 pb-10 pt-0">
          <h1 className="text-3xl font-semibold tracking-tight">{copy.gallery.title}</h1>
          <p className="text-zinc-600 dark:text-zinc-300">{copy.gallery.intro}</p>
        </section>

        {/* 紧密网格 object-cover；点击查看大图（GalleryClient） */}
        <GalleryClient photos={copy.gallery.photos} lang={lang} />
      </div>
    </SiteLayout>
  );
}
