import {useMutation, useQueryClient} from '@tanstack/react-query';
import Comment from '../types/Comment'
import Thread from '../types/Thread'
import {addComment, addThread} from '../api/index'
type AddCommentVariables = {
    threadId: number;
    comment: Pick<Comment, "body" | "author">;
}

type AddThreadVariables = {
    thread: Pick<Thread, "author"|"description"|"title">
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation<Comment, Error, AddCommentVariables>({
       mutationFn: async({threadId, comment}) => {
        return addComment(threadId, comment)
       },
       onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['comments']});
       }
    });
};

export const useAddThread = () => {
    const queryClient = useQueryClient();
    return useMutation<Thread, Error, AddThreadVariables>({
        mutationFn: async({thread}) => {
            return addThread(thread)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['threads']})
        }
    })
}