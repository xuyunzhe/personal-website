import Link from "next/link";
import { getCopy, type Lang, withLang } from "@/lib/site-content";

type SiteLayoutProps = {
  lang: Lang;
  children: React.ReactNode;
};

export default function SiteLayout({ lang, children }: SiteLayoutProps) {
  const copy = getCopy(lang);
  const switchTo = lang === "zh" ? "en" : "zh";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
        <div className="mx-auto w-full max-w-5xl px-6 py-3">
          <nav className="flex w-full min-w-0 items-center gap-1 rounded-lg border border-zinc-200 bg-white/80 p-1 text-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto whitespace-nowrap md:overflow-visible md:whitespace-normal">
              {copy.nav.map((item) => (
                <Link
                  key={item.href}
                  href={withLang(item.href, lang)}
                  className="shrink-0 rounded-md px-2.5 py-1.5 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <span
              className="h-4 w-px shrink-0 bg-zinc-200 dark:bg-zinc-700"
              aria-hidden
            />
            <Link
              href={`?lang=${switchTo}`}
              className="shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {copy.langSwitchLabel}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-14">{children}</main>

      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {copy.footer}
      </footer>
    </div>
  );
}
