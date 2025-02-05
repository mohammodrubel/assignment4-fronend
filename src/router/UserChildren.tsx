import ChangePassword from "../pages/ChangePassword";
import CheckOut from "../pages/CheckOut";
import MyOrder from "../pages/MyOrder";
import PersonalProfile from "../pages/PersonalProfile";
import ProductDetails from "../pages/ProductDetails";

const userChildren = [
    {
        path: "/checkout",
        element: <CheckOut />,
    },
    {
        path: "/:id",
        element: <ProductDetails />,
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
];
export default userChildren