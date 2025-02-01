import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
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
    path: "/:id",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },

];
export default mainChildren