import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button, TextField, Box } from "@mui/material";
const loginSchema = z.object({
  body: z.string(),
  author: z.string(),
});

type TLoginFormSchema = z.infer<typeof loginSchema>;

type Comment = {
  body: string;
  author: string;
  timestamp: Date;
};

const CommentAdd = () => {
  const { register, handleSubmit } = useForm<TLoginFormSchema>();
  const [comment, setComment] = useState<Comment>();
  const onSubmit = handleSubmit(({ body, author }) => {
    alert(`Logging in user: ${author} with comment: ${body}`);
    setComment({ body: body, author: author, timestamp: new Date() });
  });

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={onSubmit}>
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
      </form>
    </Box>
  );
};

export default CommentAdd;
