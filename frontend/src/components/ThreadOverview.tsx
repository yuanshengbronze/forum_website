import { useState, useContext } from "react";
import { Box, Button, Pagination, Tooltip } from "@mui/material";
import { useThreads } from "../services/queries";
import ThreadList from "./ThreadList";
import ThreadAdd from "./ThreadAdd";
import { UserContext } from "../UserContext";

const LIMIT = 10;
const ThreadOverview = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useThreads(page, LIMIT);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  function helpText() {
    if (!user) {
      return "Login to add thread!";
    } else {
      return "";
    }
  }
  if (isLoading) {
    return <p> Loading comments... </p>;
  }
  if (error) {
    return <p> Error </p>;
  }
  if (!data) {
    return <p> No Threads Found! </p>;
  }
  const totalPages = Math.ceil(data.total / data.limit);
  return (
    <Box>
      <ThreadList threads={data.items} />
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
              Create Thread
            </Button>
          </span>
        </Tooltip>
      </Box>

      {user && (
        <ThreadAdd
          userId={user.userId}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
};

export default ThreadOverview;
