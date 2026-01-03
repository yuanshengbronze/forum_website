import Box from "@mui/material/Box";
import { useThreads } from "../services/queries";
import ThreadList from "./ThreadList";
import ThreadAdd from "./ThreadAdd";
const ThreadOverview = () => {
  const { data: threads, isLoading, error } = useThreads();
  if (isLoading) {
    return <p> Loading comments... </p>;
  }
  if (error) {
    return <p> Error </p>;
  }
  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <ThreadList threads={threads || []} />
      </Box>
      <br />
      <br />
      <ThreadAdd />
    </>
  );
};

export default ThreadOverview;
