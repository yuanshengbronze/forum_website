import {useMutation, useQueryClient} from '@tanstack/react-query';
import Comment from '../types/Comment'
import Thread from '../types/Thread'
import User from '../types/User'
import {addComment, addThread, addUser, editComment, editThread, deleteThread, deleteComment} from '../api/index'
type AddCommentVariables = {
    threadId: number;
    comment: Pick<Comment, "body"|"authorId">;
}

type AddThreadVariables = {
    thread: Pick<Thread, "body"|"title"|"authorId">
}

type AddUserVariables = {
    user: Pick<User, "username" | "password">
}

type EditThreadVariables = {
    newtitle: string;
    threadId: number;
}

type DeleteThreadVariables = {
    threadId: number;
}

type EditCommentVariables = {
    newbody: string;
    threadId: number;
    commentId: number;
}

type DeleteCommentVariables = {
    threadId: number;
    commentId: number;
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation<Comment, Error, AddCommentVariables>({
       mutationFn: async({threadId, comment}) => {
        return addComment(threadId, comment)
       },
       onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['comments']});
       },
       onError: () => {
        console.log("Failed to add comment! (frontend)")
       }
    });
};

export const useEditComment = () => {
    const queryClient = useQueryClient();
    return useMutation<Comment, Error, EditCommentVariables>({
        mutationFn: async({commentId, threadId, newbody}) => {
            return editComment(commentId, threadId, newbody)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']})
        }
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, DeleteCommentVariables>({
        mutationFn: async({commentId, threadId}) => {
            return deleteComment(commentId, threadId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']})
        }
    })
}

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

export const useEditThread = () => {
    const queryClient = useQueryClient();
    return useMutation<Thread, Error, EditThreadVariables>({
        mutationFn: async({threadId, newtitle}) => {
            return editThread(threadId, newtitle)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['threads']})
        }
    })
}

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, DeleteThreadVariables>({
        mutationFn: async({threadId}) => {
            return deleteThread(threadId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['threads']})
        }
    })
}

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation<User, Error, AddUserVariables> ({
        mutationFn: async({user}) => {
            return addUser(user)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })
}

