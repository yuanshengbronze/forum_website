import Comment  from "../types/Comment";
import Thread from "../types/Thread";
import User from '../types/User';
import api from './api'

type PagedResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
}

export const fetchThreads = async(page: number, limit: number): Promise<PagedResponse<Thread>> => {
    const res = await api.get('/threads', {
      params: {page, limit}
    });
    return res.data;
}

export const fetchThread = async(threadId: number): Promise<Thread> => {
  const res = await api.get(`/threads/${threadId}`);
  return res.data;
}

export const fetchUserThreads = async(userId: number): Promise<Thread[]> => {
  const res = await api.get(`/users/${userId}/threads`)
  return res.data;
}

export const fetchComments = async(threadId: number, page: number, limit: number): Promise<PagedResponse<Comment>> => {
  const res = await api.get(`/threads/${threadId}/comments`, {
    params: {page, limit}
  });
  return res.data;
}

export const fetchUserComments = async(userId: number): Promise<Comment[]> => {
  const res = await api.get(`/users/${userId}/comments`)
  return res.data;
}

export const fetchUser = async(userId: number): Promise<User> => {
  const res = await api.get(`/users/${userId}`)
  return res.data;
}

export const fetchUsers = async(): Promise<User[]> => {
  const res = await api.get(`/users`)
  return res.data;
}

export const addComment = async (threadId: number, 
  comment: Pick<Comment, "body"|"authorId">
): Promise<Comment> => {
  const res = await api.post(`/threads/${threadId}/comments`, comment)
  return res.data;
};

export const editComment = async (commentId: number, threadId: number, newbody: string)
: Promise<Comment> => {
  const res = await api.patch(`/threads/${threadId}/${commentId}/edit`, newbody);
  return res.data;
}

export const deleteComment = async (commentId: number, threadId: number): Promise<void> => {
  await api.delete(`/threads/${threadId}/${commentId}/delete`);
}

export const addThread = async (
  thread: Pick<Thread, "title"|"body"|"authorId">
): Promise<Thread> => {
  const res = await api.post(`/threads`, thread);
  return res.data;
}

export const editThread = async (threadId: number, newtitle: string)
: Promise<Thread> => {
  const res = await api.patch(`/threads/${threadId}/edit`, newtitle);
  return res.data;
}

export const deleteThread = async (threadId: number): Promise<void> => {
  await api.delete(`/threads/${threadId}/delete`);
}

export const addUser = async (
  user: Pick<User, "username" | "password">
): Promise<User> => {
  const res = await api.post(`/users`, user)
  return res.data;
}
