import Login from "../pages/Login";
import Register from "../pages/Register";

const authRouteChildren = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];
export default authRouteChildren