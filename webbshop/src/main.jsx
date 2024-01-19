import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./contexts/ProductsContext.jsx";
import { CategoryFilterProvider } from "./contexts/CategoryFilterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <CategoryFilterProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CategoryFilterProvider>
  </ProductProvider>
);
