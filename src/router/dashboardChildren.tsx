import AllProduct from "../pages/AllProduct";
import ChangePassword from "../pages/ChangePassword";
import CreateProduct from "../pages/CreateProduct";
import DashboardHome from "../pages/DashboardHome";
import Order from "../pages/Order";
import PersonalProfile from "../pages/PersonalProfile";
import ViewOrder from "../pages/ViewOrder";

const dashboardChildren = [
    {
      path: "/dashboard",
      element: <DashboardHome />,
    },
    {
      path: "/dashboard/all-product",
      element: <AllProduct />
    },
    {
      path: "/dashboard/create-product",
      element: <CreateProduct />,
    },
    {
      path: "/dashboard/order",
      element: <Order />,
    },
    {
      path: "/dashboard/order/:id",
      element: <ViewOrder />,
    },
    {
      path: "/dashboard/personal-profile",
      element: <PersonalProfile />,
    },
    {
      path: "/dashboard/change-password",
      element: <ChangePassword />,
    },

    
  ];
export default dashboardChildren