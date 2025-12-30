import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button, TextField, Box } from "@mui/material";
import { useAddComment } from "../services/mutations";
const loginSchema = z.object({
  body: z.string(),
  author: z.string(),
});

type TLoginFormSchema = z.infer<typeof loginSchema>;

type Props = {
  threadId: number;
};

const CommentAdd = ({ threadId }: Props) => {
  const mutation = useAddComment();
  const { register, handleSubmit, reset } = useForm<TLoginFormSchema>();
  const onSubmit = handleSubmit(({ body, author }) => {
    mutation.mutate(
      { threadId, comment: { body, author } },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="username"
        required
        label="Username (required)"
        variant="filled"
        {...register("author")}
      />
      <TextField
        id="comment"
        required
        multiline
        label="Comment (required)"
        variant="filled"
        {...register("body")}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default CommentAdd;
