import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { CUSDIS_API, CUSDIS_APP_ID } from "@/lib/cusdis-config";

/** 与想法 slug + `__en` / `__zh` 一致；限制长度防滥用 */
const PAGE_ID_RE = /^[a-z0-9_-]{1,180}__(?:en|zh)$/i;

function badPageId(): NextResponse {
  return NextResponse.json({ error: "invalid_page_id" }, { status: 400 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId")?.trim();
  const page = searchParams.get("page")?.trim() || "1";
  if (!pageId || !PAGE_ID_RE.test(pageId)) return badPageId();
  if (!/^\d+$/.test(page)) {
    return NextResponse.json({ error: "invalid_page" }, { status: 400 });
  }

  const url = new URL(CUSDIS_API);
  url.searchParams.set("appId", CUSDIS_APP_ID);
  url.searchParams.set("pageId", pageId);
  url.searchParams.set("page", page);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = (await res.json()) as unknown;
  return NextResponse.json(json, { status: res.status });
}

type PostBody = {
  pageId?: string;
  nickname?: string;
  content?: string;
  pageUrl?: string;
  pageTitle?: string;
  parentId?: string | null;
};

const NICK_MAX = 50;
const CONTENT_MAX = 4000;

/** 未填昵称时由服务端生成，避免与 Cusdis 必填字段冲突 */
function randomGuestNickname(pageId: string): string {
  const lang = pageId.endsWith("__zh") ? "zh" : "en";
  const id = randomBytes(3).toString("hex");
  return lang === "zh" ? `访客_${id}` : `Guest_${id}`;
}

export async function POST(request: Request) {
  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const pageId = body.pageId?.trim();
  if (!pageId || !PAGE_ID_RE.test(pageId)) return badPageId();

  let nickname = String(body.nickname ?? "").trim();
  const content = String(body.content ?? "").trim();
  const pageUrl = String(body.pageUrl ?? "").trim();
  const pageTitle = String(body.pageTitle ?? "").trim();

  if (!nickname) {
    nickname = randomGuestNickname(pageId);
  } else if (nickname.length > NICK_MAX) {
    return NextResponse.json({ error: "invalid_nickname" }, { status: 400 });
  }
  if (!content || content.length > CONTENT_MAX) {
    return NextResponse.json({ error: "invalid_content" }, { status: 400 });
  }
  if (!pageUrl || !pageTitle) {
    return NextResponse.json({ error: "missing_meta" }, { status: 400 });
  }

  const payload = {
    appId: CUSDIS_APP_ID,
    pageId,
    nickname,
    content,
    email: "",
    pageUrl,
    pageTitle,
    parentId: body.parentId ?? null,
  };

  const res = await fetch(CUSDIS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = (await res.json()) as unknown;
  return NextResponse.json(json, { status: res.status });
}
