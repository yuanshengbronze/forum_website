import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ThreadPage from "./pages/ThreadPage";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/:threadId",
    element: <ThreadPage />,
  },
]);

export default router;
