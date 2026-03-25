import { notFound } from "next/navigation";
import SiteLayout from "@/components/site-layout";
import { getCopy, getLang } from "@/lib/site-content";
import { toSlug } from "@/lib/slug";
import IdeaDetailClient from "./IdeaDetailClient";

type IdeaDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default async function IdeaDetailPage({
  params,
  searchParams,
}: IdeaDetailPageProps) {
  const p = await params;
  const query = await searchParams;
  const lang = getLang(query.lang);
  const copy = getCopy(lang);

  const idea = copy.projects.ideas.find(
    (i) => toSlug(i.title) === p.slug,
  );

  if (!idea) notFound();

  return (
    <SiteLayout lang={lang}>
      <IdeaDetailClient lang={lang} idea={idea} />
    </SiteLayout>
  );
}

