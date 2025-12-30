// src/services/mockApi.ts
import Comment  from "../types/Comment";
import Thread from "../types/Thread";

// In-memory mock data
const threads: Thread[] = [
  { threadId: 1, title: "Movies" },
  { threadId: 2, title: "Tech" },
  {threadId: 3, title: "Gossip"}
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

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock function to fetch threads
 */
export const fetchThreads = async (): Promise<Thread[]> => {
  await delay(500);
  console.log("Fetched threads");
  return [...threads];
};

/**
 * Mock function to fetch comments for a thread
 */
export const fetchComments = async (threadId: number): Promise<Comment[]> => {
  await delay(500);
  console.log(`Fetched comments for thread ${threadId}`);
  return comments.filter((c) => c.threadId === threadId);
};

/**
 * Mock function to add a comment
 */
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