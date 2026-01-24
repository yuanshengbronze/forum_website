import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  CardActions,
  CardHeader,
  Typography,
  Link,
} from "@mui/material";
import { useUsers } from "../services/queries";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import User from "../types/User";
import { Card } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type TLoginFormSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const Navigate = useNavigate();
  const { data: users } = useUsers();
  const { register, handleSubmit, reset } = useForm<TLoginFormSchema>();
  const onSubmit = handleSubmit(({ username, password }) => {
    const testUser: Pick<User, "username" | "password"> = {
      username: username,
      password: password,
    };
    if (!users) {
      console.log("Error: failed to fetch users!");
      return;
    }
    const foundUser = users.find(
      (u) =>
        u.username === testUser.username && u.password === testUser.password,
    );
    if (foundUser) {
      setUser(foundUser);
      Navigate("/");
      reset();
    } else {
      console.log("Login Failed!");
    }
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
          title="Login"
          subheader={
            <Typography variant="body2" color="secondary">
              New user?{" "}
              <Link component={RouterLink} to="/register" underline="always">
                Register
              </Link>
            </Typography>
          }
        />

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

export default Login;
