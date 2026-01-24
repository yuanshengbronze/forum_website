import { makeStyles } from "@mui/styles";
import { useUser } from "../services/queries";
import Thread from "../types/Thread";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import ThreadEdit from "./ThreadEdit";
import EditDeleteMenu from "./EditDeleteMenu";
import ThreadDelete from "./ThreadDelete";

type Props = {
  thread: Thread;
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

export default function ThreadCard({ thread }: Props) {
  const { user: currentUser } = useContext(UserContext);
  const { data: user, isLoading, error } = useUser(thread.authorId);

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

  function onCardClick() {
    Navigate(`/threads/${thread.threadId}/comments`);
  }

  const Navigate = useNavigate();

  function lastEditProvider() {
    if (thread.edited_at == thread.created_at) {
      return "";
    } else {
      return ` (title edited at ${new Date(thread.edited_at).toLocaleString("en-GB")})`;
    }
  }

  if (isLoading) {
    return (
      <Card classes={classes.commentCard}>
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            "Loading..."
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card classes={classes.commentCard}>
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            "Error!"
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const canModify = !!currentUser && currentUser.userId == user.userId; //determines permission

  return (
    <>
      <Card classes={classes.commentCard}>
        <CardActions>
          {
            <>
              <Box width="100%" display="flex" justifyContent="flex-start">
                <Typography
                  gutterBottom
                  component="div"
                  color="secondary"
                  className={classes.metadata}
                >
                  {user.username} -{" "}
                  {new Date(thread.created_at).toLocaleString("en-GB")}
                  {lastEditProvider()}
                </Typography>
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
        <CardActionArea
          onClick={onCardClick}
          sx={{
            height: "100%",
            "&[data-active]": {
              backgroundColor: "action.selected",
              "&:hover": {
                backgroundColor: "action.selectedHover",
              },
            },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {thread.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {thread.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ThreadEdit open={editOpen} onClose={closeEdit} thread={thread} />
      <ThreadDelete open={deleteOpen} onClose={closeDelete} thread={thread} />
    </>
  );
}
