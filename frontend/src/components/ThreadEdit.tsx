import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";
import { useEditThread } from "../services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Thread from "../types/Thread";

type Props = {
  open: boolean;
  onClose: () => void;
  thread: Thread;
};
const editThreadSchema = z.object({
  newtitle: z.string().min(1),
});

type TEditThreadSchema = z.infer<typeof editThreadSchema>;

const ThreadEdit = ({ thread, open, onClose }: Props) => {
  const mutation = useEditThread();

  const { register, handleSubmit, reset } = useForm<TEditThreadSchema>({
    resolver: zodResolver(editThreadSchema),
    defaultValues: { newtitle: thread.title },
  });

  useEffect(() => {
    if (open) reset({ newtitle: thread.title });
  }, [open, thread.title, reset]);

  const onSubmit = handleSubmit(({ newtitle }) => {
    mutation.mutate(
      { newtitle: newtitle, threadId: thread.threadId },
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
      component="form"
      onSubmit={onSubmit}
    >
      <DialogTitle> Edit Thread Title </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          minRows={4}
          margin="dense"
          id="newtitle"
          required
          label="New Title (required)"
          variant="filled"
          {...register("newtitle")}
        />
        {mutation.isError && (
          <div style={{ marginTop: 8 }}>
            Thread edit failed. Please try again!
          </div>
        )}

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
      </DialogContent>
    </Dialog>
  );
};

export default ThreadEdit;
