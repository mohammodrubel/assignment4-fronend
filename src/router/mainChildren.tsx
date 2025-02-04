import AboutUs from "../pages/AboutUs";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import Home from "../pages/Home";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import WishList from "../pages/WishList";
import ProtectedRouter from "./ProtectedRouter";

const mainChildren = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/:id",
    element: <ProductDetails />,
  },
  {
    path: '/shop',
    element: <Shop />
  },
  {
    path: "/checkout",
    element: <ProtectedRouter><CheckOut /></ProtectedRouter>,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },

];
export default mainChildren