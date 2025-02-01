import Cart from "../pages/Cart";
import Home from "../pages/Home";
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
    path: "/wishlist",
    element: <WishList />,
  },

];
export default mainChildren