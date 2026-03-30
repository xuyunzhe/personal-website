import Image from "next/image";
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
      <section className="space-y-8">
        <div
          className="relative w-full overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={copy.hero.imageSrc}
            alt={copy.hero.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            quality={100}
            unoptimized
            className="object-cover"
            priority
          />
        </div>
        <p className="-mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
          拍摄于 摩尔曼斯克极夜时间
        </p>
        <h1 className="mt-1 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {copy.hero.name}
        </h1>
        <p className="max-w-2xl whitespace-pre-line text-lg leading-9 text-zinc-600 dark:text-zinc-300">
          {copy.hero.intro}
        </p>
        <div className="w-full max-w-sm space-y-2">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/cat-home.png"
                alt={lang === "zh" ? "我的小猫" : "My cat"}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {lang === "zh" ? "这是我的小猫🐱" : "This is my little cat 🐱"}
          </p>
        </div>
      </section>

      <div className="flex items-center justify-center gap-3 px-4">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="select-none text-xs text-zinc-400">—</span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">{copy.projects.title}</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {copy.projects.intro}
          </p>
          <Link
            href={`/projects?lang=${lang}`}
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {lang === "zh" ? "查看更多" : "View more"}
          </Link>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">
            {lang === "zh" ? "我的摄影集" : "My Photography"}
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {lang === "zh"
              ? "记录我记录的记录"
              : "A record of the records I keep."}
          </p>
          <Link
            href={`/gallery?lang=${lang}`}
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {lang === "zh" ? "进入摄影集" : "View photography"}
          </Link>
        </article>
      </section>
    </SiteLayout>
  );
}
