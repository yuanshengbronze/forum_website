import {useQuery} from '@tanstack/react-query';
import Comment from '../types/Comment'
import Thread from '../types/Thread'
import {fetchComments, fetchThread, fetchThreads, fetchUser, fetchUserComments, fetchUsers, fetchUserThreads} from '../api/index'

export const useComments = (threadId: number, page: number, limit: number) => {
    return useQuery({
        queryKey: ['comments', threadId, page, limit],
        queryFn: () => fetchComments(threadId, page, limit),
    });
};

export const useUserComments = (userId?: number) => {
    return useQuery<Comment[] | undefined>({
        queryKey: ['comments', userId],
        queryFn: () => fetchUserComments(userId as number),
        enabled: typeof userId === "number",
    })
}

export const useThread = (threadId: number) => {
    return useQuery<Thread | undefined>({
        queryKey: ['thread', threadId],
        queryFn: () => fetchThread(threadId)
    });
}

export const useThreads = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['threads', page, limit],
        queryFn: () => fetchThreads(page, limit),
    })
}

export const useUserThreads = (userId?: number) => {
    return useQuery<Thread[] | undefined>({
        queryKey: ['threads',userId],
        queryFn: () => fetchUserThreads(userId as number),
        enabled: typeof userId === "number",
    });
}

export const useUser = (userId: number) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId)
    });
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers()
    });
}

