import ThreadCard from "./ThreadCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const ThreadList = () => {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={4}>
          <ThreadCard
            title="Tech"
            description="For all you nerds out there"
            imagelink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIu31YRmLynMyJdgBMN7ZR-bk4ftVR9S9kOg&s"
            thread="tech"
          />
        </Grid>
        <Grid size={4}>
          <ThreadCard
            title="Gossip"
            description="Spill all the tea here!"
            imagelink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bDGhtyr2NeWM3ybu_S4o_NlnCcf49x-nqQ&s"
            thread="gossip"
          />
        </Grid>
        <Grid size={4}>
          <ThreadCard
            title="Movies"
            description="Absolute Cinema"
            imagelink="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg"
            thread="movies"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThreadList;
