import { useComments } from "../services/queries";
import CommentAdd from "./CommentAdd";
import CommentList from "./CommentList";
type Props = {
  threadId: number;
};

const ThreadView = ({ threadId }: Props) => {
  const { data: comments, isLoading, error } = useComments(threadId);
  if (isLoading) {
    return <p> Loading comments... </p>;
  }
  if (error) {
    return <p> Error </p>;
  }
  return (
    <div>
      <h1> Thread {threadId} </h1>
      <CommentList comments={comments || []} />
      <CommentAdd threadId={threadId} />
    </div>
  );
};

export default ThreadView;
