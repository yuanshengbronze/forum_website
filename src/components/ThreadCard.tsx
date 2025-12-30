import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

type Props = {
  title: string;
  description: string;
  imagelink: string;
  thread: string;
};

export default function ThreadCard({
  title,
  description,
  imagelink,
  thread,
}: Props) {
  const Navigate = useNavigate();

  function onClick() {
    Navigate(`/${thread}`);
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 120 }}
        image={`${imagelink}`}
        title={`Image of ${title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>
          Open Thread
        </Button>
      </CardActions>
    </Card>
  );
}
