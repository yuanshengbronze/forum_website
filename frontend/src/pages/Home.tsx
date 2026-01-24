import ThreadOverview from "../components/ThreadOverview";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import ThreadAdd from "../components/ThreadAdd";

const Home = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <>
        <Navbar />
        <br /> <br />
        <div>
          <ThreadOverview />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <br /> <br />
      <div>
        <ThreadOverview />
        <ThreadAdd
          userId={user.userId}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
};

export default Home;
