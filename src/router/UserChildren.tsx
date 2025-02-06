import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import CheckOut from "../pages/CheckOut";
import MyOrder from "../pages/MyOrder";
import PersonalProfile from "../pages/PersonalProfile";
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
        path: "/user/personal-profile",
        element: <PersonalProfile />,
    },
    {
        path: "/user/change-password",
        element: <ChangePassword />,
    },
    {
        path: "/user/my-order/:id",
        element: <ViewUserOrderDetails />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },


];
export default userChildren