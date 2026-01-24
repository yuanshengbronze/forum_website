import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAddComment } from "../services/mutations";
import { useState } from "react";
const commentformSchema = z.object({
  body: z.string(),
});

type TCommentFormSchema = z.infer<typeof commentformSchema>;

type Props = {
  threadId: number;
  userId: number;
  open: boolean;
  onClose: () => void;
};

const CommentAdd = ({ threadId, userId, open, onClose }: Props) => {
  const mutation = useAddComment();
  const { register, handleSubmit, reset } = useForm<TCommentFormSchema>();
  const [errorState] = useState(false);

  function removeWhitespace(input: string): string {
    return input
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  const onSubmit = handleSubmit(({ body }) => {
    const cleanBody = removeWhitespace(body);
    mutation.mutate(
      { threadId, comment: { body: cleanBody, authorId: userId } },
      {
        onSuccess: async () => {
          reset();
          onClose();
        },
      },
    );
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Comment</DialogTitle>
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <DialogContent>
          <TextField
            id="body"
            required
            fullWidth
            margin="dense"
            multiline
            label="Body (required)"
            variant="filled"
            {...register("body")}
          />
          {errorState && (
            <Box sx={{ mt: 1 }}>Please refresh and try again!</Box>
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
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CommentAdd;
