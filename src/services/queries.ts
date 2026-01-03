import {useQuery} from '@tanstack/react-query';
import Comment from '../types/Comment'
import Thread from '../types/Thread'
import {fetchComments, fetchThread, fetchThreads} from '../api/index'
export const useComments = (threadId: number) => {
    return useQuery<Comment[]>({
        queryKey: ['comments', threadId],
        queryFn: () => fetchComments(threadId),
    });
};

export const useThread = (threadId: number) => {
    return useQuery<Thread | undefined>({
        queryKey: ['thread', threadId],
        queryFn: () => fetchThread(threadId)
    });
}

export const useThreads = () => {
    return useQuery<Thread[]>({
        queryKey: ['threads'],
        queryFn: () => fetchThreads()
    })
}
