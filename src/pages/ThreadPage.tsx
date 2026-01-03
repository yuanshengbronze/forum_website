import { useParams } from "react-router-dom";
import ThreadView from "../components/ThreadView";
import { useThread } from "../services/queries";

const ThreadPage = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const { data: thread } = useThread(Number(threadId));
  return (
    <div>
      <h1> {thread?.title} </h1>
      <ThreadView threadId={Number(threadId)} />
    </div>
  );
};

export default ThreadPage;
