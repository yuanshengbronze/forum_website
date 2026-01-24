import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Comment from "../types/Comment";
import { useUser } from "../services/queries";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";
import EditDeleteMenu from "./EditDeleteMenu";

type Props = {
  comment: Comment;
};

const useStyles = makeStyles(() => ({
  commentBody: {
    fontSize: 16,
    whiteSpace: "pre-wrap",
    paddingBottom: "1em",
  },
  commentCard: {
    marginBottom: "1em",
  },
  metadata: {
    fontSize: 14,
  },
}));

const CommentItem: React.FC<Props> = ({ comment }) => {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUser(comment.authorId);
  const { user: currentUser } = useContext(UserContext);
  const classes = useStyles();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  function openEdit() {
    setEditOpen(true);
  }
  function closeEdit() {
    setEditOpen(false);
  }

  function openDelete() {
    setDeleteOpen(true);
  }

  function closeDelete() {
    setDeleteOpen(false);
  }

  function metadata(comment: Comment) {
    if (comment.created_at == comment.edited_at) {
      return (
        <Typography
          gutterBottom
          component="div"
          className={classes.metadata}
          color="secondary"
        >
          {user?.username} -{" "}
          {new Date(comment.created_at).toLocaleString("en-GB")}
        </Typography>
      );
    } else {
      return (
        <Typography
          gutterBottom
          component="div"
          className={classes.metadata}
          color="secondary"
        >
          {user?.username} -{" "}
          {new Date(comment.created_at).toLocaleString("en-GB")} (edited at{" "}
          {new Date(comment.edited_at).toLocaleString("en-GB")})
        </Typography>
      );
    }
  }

  if (userLoading) {
    return (
      <Card className={classes.commentCard}>
        <CardContent>
          <Typography
            variant="body2"
            color="textDisabled"
            className={classes.commentBody}
            component="p"
          >
            Loading...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (userError || !user) {
    return (
      <Card className={classes.commentCard}>
        <CardContent>
          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.commentBody}
            component="p"
          >
            Error!
          </Typography>
        </CardContent>
      </Card>
    );
  }
  const canModify = !!currentUser && currentUser.userId == user.userId; //determines permission

  return (
    <>
      <Card className={classes.commentCard}>
        <CardActions>
          {
            <>
              <Box width="100%" display="flex" justifyContent="flex-start">
                {metadata(comment)}
              </Box>
              <EditDeleteMenu
                canModify={canModify}
                disabledReason={
                  !currentUser ? "Login to edit/delete!" : "Access Denied!"
                }
                onEdit={openEdit}
                onDelete={openDelete}
              />
            </>
          }
        </CardActions>
        <CardContent>
          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.commentBody}
            component="p"
          >
            {comment.body}
          </Typography>
        </CardContent>
      </Card>
      <CommentEdit
        open={editOpen}
        onClose={closeEdit}
        commentId={comment.commentId}
        threadId={comment.threadId}
        initialBody={comment.body}
      />
      <CommentDelete
        open={deleteOpen}
        onClose={closeDelete}
        comment={comment}
        threadId={comment.threadId}
      />
    </>
  );
};

export default CommentItem;
