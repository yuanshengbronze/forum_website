import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ThreadPage from "./pages/ThreadPage";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserThreadPage from "./pages/UserThreadPage";
import UserCommentPage from "./pages/UserCommentPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/threads/:threadId/comments",
    element: <ThreadPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/my/threads",
    element: <UserThreadPage />,
  },
  {
    path: "/my/comments",
    element: <UserCommentPage />,
  },
]);

export default router;
