import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import { useProducts } from "./contexts/ProductsContext";
// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthLayout from "./pages/Auth/AuthLayout";
import Cart from "./pages/Cart";
import Logout from "./pages/Logout";

import "tailwindcss/tailwind.css";

function App() {
  const { cartItems } = useProducts();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout cartCount={cartItems.length} />,
      children: [
        {
          // path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "product/:productId",
          element: <ProductDetails />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
