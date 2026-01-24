import {
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import { useDeleteComment } from "../services/mutations";
import Comment from "../types/Comment";

type Props = {
  open: boolean;
  onClose: () => void;
  comment: Comment;
  threadId: number;
};

const CommentDelete = ({ comment, threadId, open, onClose }: Props) => {
  const mutation = useDeleteComment();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { commentId: comment.commentId, threadId: threadId },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      component="form"
      onSubmit={onSubmit}
    >
      <DialogTitle> Delete Comment </DialogTitle>
      <DialogContent>
        <Typography>
          {" "}
          You are about to delete comment: "{comment.body}" ! Are you sure?{" "}
        </Typography>

        <DialogActions>
          <Button onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            variant="contained"
            type="submit"
          >
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDelete;
