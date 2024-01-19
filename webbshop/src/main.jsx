import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./contexts/ProductsContext.jsx";
import { CategoryFilterProvider } from "./contexts/CategoryFilterContext.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <CategoryFilterProvider>
      <AuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </CategoryFilterProvider>
  </ProductProvider>
);
