import { createBrowserRouter } from "react-router-dom";
import SignIn from "../src/component/signin";
import SignUp from "../src/component/signup";
import Home from "../src/component/home";
import ProtectedRoute from "./protectedroute";
import { Children } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<Home />} />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
export default router;
