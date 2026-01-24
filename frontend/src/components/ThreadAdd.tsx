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
import { useAddThread } from "../services/mutations";
import { useState } from "react";

type Props = {
  userId: number;
  open: boolean;
  onClose: () => void;
};

const threadformSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

type TThreadFormSchema = z.infer<typeof threadformSchema>;

const ThreadAdd = ({ userId, open, onClose }: Props) => {
  const [errorState, setErrorState] = useState(false);
  const mutation = useAddThread();
  const { register, handleSubmit, reset } = useForm<TThreadFormSchema>();
  const onSubmit = handleSubmit(({ title, body }) => {
    setErrorState(false);
    mutation.mutate(
      { thread: { title, body, authorId: userId } },
      {
        onSuccess: async () => {
          reset();
          onClose();
        },
      },
    );
  });
  if (errorState) {
    return <p> Please refresh and try again! </p>;
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Thread</DialogTitle>
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <DialogContent>
          <TextField
            id="title"
            required
            fullWidth
            margin="dense"
            label="Thread Title (required)"
            variant="filled"
            {...register("title")}
          />
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
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ThreadAdd;
