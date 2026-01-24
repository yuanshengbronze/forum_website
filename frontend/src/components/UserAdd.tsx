import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Card,
  CardActions,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import { useAddUser } from "../services/mutations";
import { useNavigate, Link as RouterLink } from "react-router";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type TLoginFormSchema = z.infer<typeof loginSchema>;

const UserAdd = () => {
  const Navigate = useNavigate();
  const mutation = useAddUser();
  const { register, handleSubmit, reset } = useForm<TLoginFormSchema>();
  const onSubmit = handleSubmit(({ username, password }) => {
    mutation.mutate(
      { user: { username, password } },
      {
        onSuccess: () => {
          reset();
          Navigate(`/`);
        },
      },
    );
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      noValidate
      autoComplete="off"
    >
      <Card
        sx={{
          maxWidth: 240,
          width: "100%",
          m: 2,
        }}
      >
        <CardHeader
          title="Register"
          subheader={
            <Typography variant="body2" color="secondary">
              Registered user?{" "}
              <Link component={RouterLink} to="/login" underline="always">
                Login
              </Link>
            </Typography>
          }
        />{" "}
        <TextField
          id="username"
          required
          label="Username (required)"
          variant="filled"
          {...register("username")}
        />
        <TextField
          id="password"
          required
          label="Password (required)"
          variant="filled"
          {...register("password")}
        />
        <CardActions>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserAdd;
