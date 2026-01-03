import ThreadOverview from "../components/ThreadOverview";
const Home = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "16px",
          fontSize: "20px",
        }}
      >
        <h3> Simple Forum </h3>
      </div>
      <br /> <br /> <br /> <br />
      <div>
        <ThreadOverview />
      </div>
    </>
  );
};

export default Home;
