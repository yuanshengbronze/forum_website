import CommentItem from "./CommentItem";

type Comment = {
  body: string;
  author: string;
  timestamp: Date;
};

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem comment={comment} key="" />
      ))}
    </ul>
  );
};

export default CommentList;
