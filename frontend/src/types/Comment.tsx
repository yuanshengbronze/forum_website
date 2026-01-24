type Comment = {
  commentId: number;
  threadId: number;
  body: string;
  authorId: number;
  created_at: Date;
  edited_at: Date;
};

export default Comment;
