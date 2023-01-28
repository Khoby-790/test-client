import { RouteObject } from "react-router-dom";
import Bloglayout from "./layouts/Blog";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import UpdatePost from "./pages/UpdatePost";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Bloglayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "update-post",
        element: <UpdatePost />,
      },
    ],
  },
];
