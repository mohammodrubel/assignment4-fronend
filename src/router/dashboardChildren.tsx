import AllProduct from "../pages/AllProduct";
import CreateProduct from "../pages/CreateProduct";
import DashboardHome from "../pages/DashboardHome";

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
    
  ];
export default dashboardChildren