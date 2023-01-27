import { RouteObject } from "react-router-dom";
import Bloglayout from "./layouts/Blog";
import Home from "./pages/Home";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Bloglayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];
