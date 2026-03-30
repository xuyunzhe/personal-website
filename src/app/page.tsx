import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang, withLang } from "@/lib/site-content";
import { ideaSlug } from "@/lib/slug";

type HomeProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const copy = getCopy(lang);
  const sortedIdeas = [...copy.projects.ideas].sort((a, b) => {
    const t1 = Date.parse(a.date);
    const t2 = Date.parse(b.date);
    if (Number.isNaN(t1) || Number.isNaN(t2) || t1 === t2) {
      return a.title.localeCompare(b.title);
    }
    return t2 - t1;
  });

  const statusLabel =
    lang === "zh"
      ? {
          idea: "Idea",
          in_progress: "实现中",
          launched: "已上线",
          journal: "随记",
        }
      : {
          idea: "Idea",
          in_progress: "In Progress",
          launched: "Launched",
          journal: "Notes",
        };

  const statusDotClass = (status: (typeof sortedIdeas)[0]["status"]) =>
    status === "in_progress"
      ? "bg-amber-500 dark:bg-amber-400"
      : status === "launched"
        ? "bg-emerald-500 dark:bg-emerald-400"
        : status === "journal"
          ? "bg-violet-500 dark:bg-violet-400"
          : "bg-zinc-400 dark:bg-zinc-500";

  return (
    <SiteLayout lang={lang}>
      <section className="mx-auto max-w-4xl space-y-16">
        <section className="px-5 pt-5 pb-0 md:px-7 md:pt-7">
          <div className="grid items-start gap-7 md:grid-cols-[180px_minmax(0,1fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
              {lang === "zh" ? "我" : "Me"}{" "}
              <span className="text-zinc-500">| {lang === "zh" ? "Me" : "我"}</span>
              </h2>
              <div className="mt-10 overflow-hidden">
                <div className="relative aspect-square w-full">
                  <div className="relative h-3/4 w-3/4 overflow-hidden mx-auto">
                    <Image
                      src="/cat-home.png"
                      alt={lang === "zh" ? "我的小猫" : "My cat"}
                      fill
                      sizes="180px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
              <p className="mt-1 text-center text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                {lang === "zh"
                  ? "这是我的小猫🐱"
                  : "This is my little cat 🐱"}
              </p>
            </div>

            <div className="max-w-xl space-y-5 pt-16 md:pr-8 lg:pr-12">
              <p className="font-song whitespace-pre-line text-lg leading-9 text-black dark:text-zinc-100">
                {copy.hero.intro}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <Link
                  href={withLang("/projects", lang)}
                  className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
                >
                  {lang === "zh" ? "查看项目" : "View projects"}
                </Link>
                <span>·</span>
                <Link
                  href={withLang("/gallery", lang)}
                  className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
                >
                  {lang === "zh" ? "进入摄影集" : "View photography"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-5 pt-0 md:px-7 md:pb-7">
          <div className="mb-16 flex gap-6 md:gap-8">
            <div
              className="w-[2px] shrink-0 self-stretch bg-[#888] dark:bg-zinc-500"
              aria-hidden
            />
            <div className="min-w-0 space-y-2 font-serif text-lg leading-relaxed text-[#888] dark:text-zinc-400">
              <p>{copy.homeArticleLead.line1}</p>
              <p>{copy.homeArticleLead.line2}</p>
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            {lang === "zh" ? "项目" : "Projects"}{" "}
            <span className="text-zinc-500">| {lang === "zh" ? "Projects" : "项目"}</span>
          </h2>
          <div className="overflow-hidden rounded-xl">
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {sortedIdeas.map((idea) => (
                <li key={ideaSlug(idea)}>
                  <Link
                    href={withLang(`/projects/ideas/${ideaSlug(idea)}`, lang)}
                    className="flex items-start justify-between gap-6 px-5 py-5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  >
                    <div className="min-w-0">
                      <p className="flex min-w-0 items-center gap-2.5 text-base font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                        <span className="inline-flex shrink-0 items-center gap-1.5">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${statusDotClass(idea.status)}`}
                            aria-hidden
                          />
                          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                            {statusLabel[idea.status]}
                          </span>
                        </span>
                        <span className="min-w-0 truncate">{idea.title}</span>
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {idea.summary}
                      </p>
                    </div>
                    <span className="shrink-0 pt-0.5 text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                      {idea.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </SiteLayout>
  );
}
