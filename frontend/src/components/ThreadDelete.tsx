import {
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import { useDeleteThread } from "../services/mutations";
import Thread from "../types/Thread";

type Props = {
  open: boolean;
  onClose: () => void;
  thread: Thread;
};

const ThreadDelete = ({ thread, open, onClose }: Props) => {
  const mutation = useDeleteThread();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { threadId: thread.threadId },
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
      <DialogTitle> Delete Thread </DialogTitle>
      <DialogContent>
        <Typography>
          {" "}
          You are about to delete thread: "{thread.title}" ! Are you sure?{" "}
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

export default ThreadDelete;
