import AboutUs from "../pages/AboutUs";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import PaymentSuccess from "../pages/PaymentSuccess";
import Shop from "../pages/Shop";
import WishList from "../pages/WishList";

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
    path: '/shop',
    element: <Shop />
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