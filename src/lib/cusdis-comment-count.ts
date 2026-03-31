import { CUSDIS_API, CUSDIS_APP_ID } from "@/lib/cusdis-config";

/** 与 `/api/cusdis/comments` GET 的 `pageId` 规则一致 */
const PAGE_ID_RE = /^[a-z0-9_-]{1,180}__(?:en|zh)$/i;

/**
 * 读取 Cusdis 某页的留言总数（含审核通过并展示的评论；具体含义以 Cusdis 为准）。
 * 失败时返回 0，避免列表页因接口问题白屏。
 */
export async function getCusdisCommentCount(pageId: string): Promise<number> {
  const id = pageId.trim();
  if (!PAGE_ID_RE.test(id)) return 0;

  try {
    const url = new URL(CUSDIS_API);
    url.searchParams.set("appId", CUSDIS_APP_ID);
    url.searchParams.set("pageId", id);
    url.searchParams.set("page", "1");

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return 0;

    const json = (await res.json()) as {
      data?: {
        data?: unknown[];
        commentCount?: number;
      };
    };

    const inner = json.data;
    if (inner && typeof inner.commentCount === "number" && inner.commentCount >= 0) {
      return inner.commentCount;
    }
    if (inner && Array.isArray(inner.data)) {
      return inner.data.length;
    }
    return 0;
  } catch {
    return 0;
  }
}
