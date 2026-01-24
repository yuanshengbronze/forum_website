import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import ThreadAdd from "../components/ThreadAdd";
import { Box, Button, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import ThreadList from "../components/ThreadList";
import { useUserThreads } from "../services/queries";

const UserThreadPage = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { data: threads } = useUserThreads(user?.userId);
  if (!user) {
    return (
      <>
        You are a Guest!{" "}
        <Link component={RouterLink} to="/register" underline="always">
          Register
        </Link>{" "}
        or{" "}
        <Link component={RouterLink} to="/login" underline="always">
          Login
        </Link>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Typography
        align="center"
        variant="h2"
        sx={{ fontWeight: "bold", color: "#8B4513", mb: 2 }}
      >
        {" "}
        My Threads{" "}
      </Typography>
      <div>
        <Box>
          <ThreadList threads={threads || []} />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              disabled={!user}
            >
              Create Thread
            </Button>
          </Box>

          {user && (
            <ThreadAdd
              userId={user.userId}
              open={open}
              onClose={() => setOpen(false)}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default UserThreadPage;
