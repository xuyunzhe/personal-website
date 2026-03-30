export function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export type IdeaLike = { slug?: string; title: string };

/** URL segment for an idea; use explicit `slug` when the title is not Latin. */
export function ideaSlug(idea: IdeaLike): string {
  const s = idea.slug?.trim();
  if (s) return s;
  return toSlug(idea.title);
}

