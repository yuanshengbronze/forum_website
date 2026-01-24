import { useParams } from "react-router-dom";
import { useComments, useThread } from "../services/queries";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { Box, Button, Pagination, Tooltip, Typography } from "@mui/material";
import CommentAdd from "../components/CommentAdd";
import CommentItem from "../components/CommentItem";

const LIMIT = 10;
const ThreadPage = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const { data: thread } = useThread(Number(threadId));
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useComments(Number(threadId), page, LIMIT);

  function helpText() {
    if (!user) {
      return "Login to add comment!";
    } else {
      return "";
    }
  }

  if (isLoading) {
    return <p> Loading comments... </p>;
  }
  if (error || !data) {
    return <p> Error </p>;
  }
  const totalPages = Math.ceil(data.total / data.limit);
  const comments = data.items;
  if (!user) {
    if (!comments) {
      return <h1> No Comments! </h1>;
    }
    return (
      <div>
        <Navbar />
        <Typography
          align="center"
          variant="h2"
          sx={{ fontWeight: "bold", color: "#8B4513", mb: 2 }}
        >
          {thread?.title}
        </Typography>
        <ul>
          {comments.map((comment) => (
            <CommentItem comment={comment} key={`${comment.commentId}`} />
          ))}
        </ul>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        </Box>
      </div>
    );
  } else if (!thread) {
    return <h1> Error! No thread found! </h1>;
  } else if (!comments) {
    return <h1> No Comments! </h1>;
  } else {
    return (
      <>
        <Navbar />
        <Typography
          align="center"
          variant="h2"
          sx={{ fontWeight: "bold", color: "#8B4513", mb: 2 }}
        >
          {thread.title}
        </Typography>
        <ul>
          {comments.map((comment) => (
            <CommentItem comment={comment} key={`${comment.commentId}`} />
          ))}
        </ul>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
          <Tooltip title={helpText()}>
            <span>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                disabled={!user}
              >
                Add Comment
              </Button>
            </span>
          </Tooltip>
        </Box>

        <CommentAdd
          userId={user.userId}
          threadId={thread.threadId}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }
};

export default ThreadPage;
