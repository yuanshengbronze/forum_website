import CommentItem from "./CommentItem";
import Comment from "../types/Comment";

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={`${comment.commentId}`} />
      ))}
    </ul>
  );
};

export default CommentList;
