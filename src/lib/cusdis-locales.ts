import type { Lang } from "@/lib/site-content";

/**
 * Cusdis iframe 读取 `window.CUSDIS_LOCALE` 为「键 → 文案」对象（不是语言代码字符串）。
 * 与官方默认键一致，见 https://cusdis.com/js/iframe.umd.js 内 `ye={...}`。
 */
export type CusdisLocaleStrings = {
  powered_by: string;
  post_comment: string;
  loading: string;
  email: string;
  nickname: string;
  reply_placeholder: string;
  reply_btn: string;
  sending: string;
  mod_badge: string;
  content_is_required: string;
  nickname_is_required: string;
  nickname_too_long: string;
  nickname_placeholder: string;
  comment_has_been_sent: string;
  section_publish: string;
  empty_feed: string;
  feed_load_error: string;
  post_submit_error: string;
};

const zh: CusdisLocaleStrings = {
  powered_by: "评论由 Cusdis 提供",
  post_comment: "发布留言",
  loading: "加载中…",
  email: "邮箱（选填）",
  nickname: "昵称（选填）",
  nickname_placeholder: "留空则随机生成昵称",
  nickname_too_long: "昵称过长（最多 50 字）",
  reply_placeholder: "留言内容",
  reply_btn: "回复",
  sending: "发送中…",
  mod_badge: "管理员",
  content_is_required: "请填写留言内容",
  nickname_is_required: "请填写昵称",
  comment_has_been_sent: "留言已提交，审核通过后将显示。",
  section_publish: "发布留言",
  empty_feed: "暂无已展示的留言。发布一条后，通过审核会出现在这里。",
  feed_load_error: "加载留言列表失败，请稍后重试。",
  post_submit_error: "提交失败，请稍后重试。",
};

const en: CusdisLocaleStrings = {
  powered_by: "Comments powered by Cusdis",
  post_comment: "Post comment",
  loading: "Loading",
  email: "Email (optional)",
  nickname: "Nickname (optional)",
  nickname_placeholder: "Leave blank for a random name",
  nickname_too_long: "Nickname is too long (max 50 characters).",
  reply_placeholder: "Comment",
  reply_btn: "Reply",
  sending: "Sending…",
  mod_badge: "MOD",
  content_is_required: "Comment is required",
  nickname_is_required: "Nickname is required",
  comment_has_been_sent:
    "Your comment has been sent. It may appear after approval.",
  section_publish: "Post a comment",
  empty_feed:
    "No comments yet. After you post and it’s approved, it will show here.",
  feed_load_error: "Could not load comments. Please try again.",
  post_submit_error: "Could not submit. Please try again.",
};

export function getCusdisLocale(lang: Lang): CusdisLocaleStrings {
  return lang === "zh" ? zh : en;
}
