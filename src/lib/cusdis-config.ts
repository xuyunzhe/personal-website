/** 与 Cusdis 后台一致；可用 NEXT_PUBLIC_CUSDIS_APP_ID 覆盖 */
export const CUSDIS_APP_ID =
  process.env.NEXT_PUBLIC_CUSDIS_APP_ID?.trim() ||
  "6dd9d3f9-b0f9-4e84-bc10-94bff66b9095";

export const CUSDIS_API = "https://cusdis.com/api/open/comments";
