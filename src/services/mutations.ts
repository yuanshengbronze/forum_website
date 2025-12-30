import {useMutation, useQueryClient} from '@tanstack/react-query';
import Comment from '../types/Comment'
import {addComment} from '../api/index'
type AddCommentVariables = {
    threadId: number;
    comment: Pick<Comment, "body" | "author">;
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
