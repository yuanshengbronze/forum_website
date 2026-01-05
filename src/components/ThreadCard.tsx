import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useThread } from "../services/queries";

type Props = {
  threadId: number;
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

export default function ThreadCard({ threadId }: Props) {
  const Navigate = useNavigate();
  const { data: thread } = useThread(threadId);
  const classes = useStyles();

  if (thread !== undefined) {
    function onClick() {
      Navigate(`/${thread?.threadId}`);
    }

    return (
      <Card classes={classes.commentCard}>
        <CardActionArea
          onClick={onClick}
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
            <Typography gutterBottom variant="body2" component="div">
              {thread.author} - {thread.timestamp.toLocaleString()}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {thread.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {thread.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else {
    return <h1> Error </h1>;
  }
}
