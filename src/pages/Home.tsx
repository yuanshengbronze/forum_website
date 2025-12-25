import ThreadList from "../components/ThreadList";
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
      <div>
        <ThreadList />
      </div>
    </>
  );
};

export default Home;
