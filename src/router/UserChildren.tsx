import ChangePassword from "../pages/ChangePassword";
import CheckOut from "../pages/CheckOut";
import MyOrder from "../pages/MyOrder";
import ViewUserOrderDetails from "../pages/ViewUserOrderDetails";

const userChildren = [
    {
        path: "/checkout",
        element: <CheckOut />,
    },
    {
        path: "/user/my-order",
        element: <MyOrder />,
    },
    {
        path: "/user/change-password",
        element: <ChangePassword />,
    },
    {
        path: "/user/my-order/:id",
        element: <ViewUserOrderDetails />,
    },



];
export default userChildren