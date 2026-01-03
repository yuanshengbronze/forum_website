import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button, TextField, Box } from "@mui/material";
import { useAddThread } from "../services/mutations";
const loginSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
});

type TLoginFormSchema = z.infer<typeof loginSchema>;

const ThreadAdd = () => {
  const mutation = useAddThread();
  const { register, handleSubmit, reset } = useForm<TLoginFormSchema>();
  const onSubmit = handleSubmit(({ title, description, author }) => {
    mutation.mutate(
      { thread: { author, title, description } },
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
        id="title"
        required
        multiline
        label="Thread Title (required)"
        variant="filled"
        {...register("title")}
      />
      <TextField
        id="description"
        required
        multiline
        label="Thread Description (required)"
        variant="filled"
        {...register("description")}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default ThreadAdd;
