import {useQuery} from '@tanstack/react-query';
import Comment from '../types/Comment'
import {fetchComments} from '../api/index'
export const useComments = (threadId: number) => {
    return useQuery<Comment[]>({
        queryKey: ['comments', threadId],
        queryFn: () => fetchComments(threadId),
    });
};
