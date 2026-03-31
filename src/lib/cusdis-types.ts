/** Cusdis GET /api/open/comments 单条留言（含嵌套回复） */
export type CusdisComment = {
  id: string;
  by_nickname: string;
  content: string;
  parsedContent?: string;
  parsedCreatedAt?: string;
  createdAt?: string;
  replies?: { data: CusdisComment[] } | CusdisComment[];
  moderator?: { displayName?: string };
};

export type CusdisCommentsPage = {
  data: CusdisComment[];
  commentCount: number;
  pageSize: number;
  pageCount: number;
};
