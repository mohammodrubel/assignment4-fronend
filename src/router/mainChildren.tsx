import AboutUs from "../pages/AboutUs";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import PaymentCancelled from "../pages/PaymentCancal";
import PaymentFailed from "../pages/PaymentFaild";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import WishList from "../pages/WishList";

const mainChildren = [
  {
    path: "/",
    element: <Home />,
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
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/cart",
    element: <Cart />,
},
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-fail",
    element: <PaymentFailed />,
  },
  {
    path: "/payment-payment-cancel",
    element: <PaymentCancelled />,
  },

];
export default mainChildren