import Comment  from "../types/Comment";
import Thread from "../types/Thread";

const threads: Thread[] = [
  { threadId: 1, 
    title: "Movies", 
    description: "Absolute Cinema",
    author: "Christopher Nolan",
    timestamp: new Date(2022, 10, 28, 10, 33, 30)},
  { threadId: 2, 
    title: "Tech",
    description: "For all you nerds out there",
    author: "Elon Musk",
    timestamp: new Date(2023, 10, 28, 10, 33, 30)},
  { threadId: 3, 
    title: "Gossip",
    description: "Spill all the tea here!",
    author: "MrBeast",
    timestamp: new Date(2021, 5, 28, 10, 33, 30)}
];

const comments: Comment[] = [
  {
    commentId: 1,
    threadId: 1,
    body: "Any fool can write code that a computer can understand.\nGood programmers write code that humans can understand.\n ~ Martin Fowler",
    author: "Benedict",
    timestamp: new Date(2022, 10, 28, 10, 33, 30),
  },
  {
    commentId: 2,
    threadId: 1,
    body: "Code reuse is the Holy Grail of Software Engineering.\n ~ Douglas Crockford",
    author: "Casey",
    timestamp: new Date(2022, 11, 1, 11, 11, 11),
  },
  {
    commentId: 3,
    threadId: 1,
    body: "Nine people can't make a baby in a month.\n ~ Fred Brooks",
    author: "Duuet",
    timestamp: new Date(2022, 11, 2, 10, 30, 0),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchThread = async(threadId: number): Promise<Thread | undefined> => {
  await delay(500);
  return threads.find((t) => t.threadId === threadId);
}

export const fetchThreads = async (): Promise<Thread[]> => {
  await delay(500);
  console.log("Fetched threads");
  return [...threads];
};

export const fetchComments = async (threadId: number): Promise<Comment[]> => {
  await delay(500);
  console.log(`Fetched comments for thread ${threadId}`);
  return comments.filter((c) => c.threadId === threadId);
};

export const addComment = async (
  threadId: number,
  comment: Pick<Comment, "body" | "author">
): Promise<Comment> => {
  await delay(500);

  const newComment: Comment = {
    commentId: comments.length + 1,
    threadId,
    body: comment.body,
    author: comment.author,
    timestamp: new Date(),
  };

  comments.push(newComment);
  console.log("Added comment", newComment);

  return newComment;
};

export const addThread = async (
  thread: Pick<Thread, "title"|"author"|"description">
): Promise<Thread> => {
  await delay(500);

  const newThread: Thread = {
    threadId: threads.length + 1,
    title: thread.title,
    description: thread.description,
    author: thread.author,
    timestamp: new Date(),
  };

  threads.push(newThread);
  return newThread;
}