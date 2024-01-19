import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          // path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "product/:productId", // Use a dynamic parameter for productId
          element: <ProductDetails />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
