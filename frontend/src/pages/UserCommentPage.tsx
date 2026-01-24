import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";
import { useUserComments } from "../services/queries";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import CommentItem from "../components/CommentItem";

const UserCommentPage = () => {
  const { user } = useContext(UserContext);
  const { data: comments } = useUserComments(user?.userId);
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
  } else if (!comments) {
    return <h1> You have no comments! </h1>;
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
        My Comments{" "}
      </Typography>
      <ul>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={`${comment.commentId}`} />
        ))}
      </ul>
    </>
  );
};

export default UserCommentPage;
