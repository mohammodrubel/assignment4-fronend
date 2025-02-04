import CheckOut from "../pages/CheckOut";
import MyOrder from "../pages/MyOrder";
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
];
export default userChildren