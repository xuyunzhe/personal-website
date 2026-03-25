import Image from "next/image";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";

type GalleryPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);

  return (
    <SiteLayout lang={lang}>
      <section className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{copy.gallery.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-300">{copy.gallery.intro}</p>
      </section>

      <section className="mt-8">
        <div className="relative w-full overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src="/hero-image.png"
            alt={copy.hero.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
          {copy.gallery.caption}
        </p>
      </section>
    </SiteLayout>
  );
}

