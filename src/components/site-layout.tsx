import Link from "next/link";
import { getCopy, type Lang } from "@/lib/site-content";

type SiteLayoutProps = {
  lang: Lang;
  children: React.ReactNode;
};

export default function SiteLayout({ lang, children }: SiteLayoutProps) {
  const copy = getCopy(lang);
  const switchTo = lang === "zh" ? "en" : "zh";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link href={`/?lang=${lang}`} className="text-sm font-semibold">
            {copy.siteTitle}
          </Link>
          <nav className="flex w-full gap-4 overflow-x-auto whitespace-nowrap text-sm md:w-auto md:overflow-visible md:whitespace-normal">
            {copy.nav.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}?lang=${lang}`}
                className="shrink-0 text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={`?lang=${switchTo}`}
            className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {copy.langSwitchLabel}
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-14">{children}</main>

      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {copy.footer}
      </footer>
    </div>
  );
}
