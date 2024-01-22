import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./contexts/ProductsContext.jsx";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ProductContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProductContextProvider>
  </AuthContextProvider>
);
