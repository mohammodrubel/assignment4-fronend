import AllProduct from "../pages/AllProduct";
import CreateProduct from "../pages/CreateProduct";
import DashboardHome from "../pages/DashboardHome";
import Order from "../pages/Order";
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
    
  ];
export default dashboardChildren