import AllProduct from "../pages/AllProduct";
import CreateProduct from "../pages/CreateProduct";
import DashboardHome from "../pages/DashboardHome";
import Order from "../pages/Order";

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
    
  ];
export default dashboardChildren