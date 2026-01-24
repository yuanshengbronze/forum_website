import ThreadCard from "./ThreadCard";
import Thread from "../types/Thread";

type Props = {
  threads: Thread[];
};

const ThreadList = ({ threads }: Props) => {
  return (
    <ul>
      {threads?.map((thread) => (
        <>
          <ThreadCard thread={thread} key={`${thread.threadId}`} />
          <br />
        </>
      ))}
    </ul>
  );
};

export default ThreadList;
