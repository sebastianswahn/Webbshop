import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const addQuantity = (id) => {
    setcartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /* 
  const addQuantity = (newItem) => {
    setcartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };
 */

  const removeQuantity = (id) => {
    setcartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setcartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setcartItems([]);
  };

  console.log(cartItems);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://js2-ecommerce-api.vercel.app/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        setcartItems,
        selectedCategory,
        setSelectedCategory,
        addQuantity,
        removeItem,
        clearCart,
        removeQuantity,
        totalPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error("useProducts must be inside an ProductContextProvider");

  return context;
};
