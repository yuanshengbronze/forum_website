import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEditComment } from "../services/mutations";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  commentId: number;
  threadId: number;
  initialBody: string;
};
const editCommentSchema = z.object({
  newbody: z.string().min(1),
});

type TEditThreadSchema = z.infer<typeof editCommentSchema>;

const CommentEdit = ({
  open,
  onClose,
  commentId,
  threadId,
  initialBody,
}: Props) => {
  const mutation = useEditComment();

  const { register, handleSubmit, reset } = useForm<TEditThreadSchema>({
    resolver: zodResolver(editCommentSchema),
    defaultValues: { newbody: initialBody },
  });

  useEffect(() => {
    if (open) reset({ newbody: initialBody });
  }, [open, initialBody, reset]);

  const onSubmit = handleSubmit(({ newbody }) => {
    mutation.mutate(
      { commentId: commentId, threadId: threadId, newbody: newbody },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      onSubmit={onSubmit}
      component="form"
    >
      <DialogTitle> Edit Comment </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          minRows={4}
          margin="dense"
          id="newtitle"
          required
          label="New Body (required)"
          variant="filled"
          {...register("newbody")}
        />
        {mutation.isError && (
          <div style={{ marginTop: 8 }}>
            Comment edit failed. Please try again!
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isPending}>
          Cancel
        </Button>
        <Button
          onClick={onClose}
          disabled={mutation.isPending}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentEdit;
