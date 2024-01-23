import React from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useContext, useState } from "react";
import OrderModal from "../components/OrderModal";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Cart = () => {
  const { cartItems } = useProducts();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleOrder = () => {
    if (isLoggedIn === false || isLoggedIn === null) {
      setIsModalOpen(true);
    } else {
      // place order
      axios
        .post("https://js2-ecommerce-api.vercel.app/api/orders", cartItems)
        .then((response) => {
          console.log(response.data);
          // handle successful order
        })
        .catch((error) => {
          console.error(error);
          // handle error
        });
    }
  };

  return (
    <div className=" border-2 p-4 border-gray-200 rounded-lg h-screen">
      <h2 className="text-center mb-8 text-4xl">Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="text-center text-xl p-4 flex justify-center"
        >
          <p className="px-4">{item.name}</p>{" "}
          <p className="text-green-600 font-bold">{item.price}$</p>
          {/* adjust as needed based on the structure of your cart items */}
          {/* display other properties of the item as needed */}
        </div>
      ))}
      <h2 className="text-green-600 font-bold text-center text-3xl p-8">
        Total: {totalPrice}$
      </h2>
      <div className="flex py-8 text-center justify-center items-center">
        <button
          className="bg-emerald-600 text-white p-2 rounded-md"
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>
      {isModalOpen && (
        <OrderModal onClose={() => setIsModalOpen(false)}>
          You need to log in to place an order.
        </OrderModal>
      )}
    </div>
  );
};

export default Cart;
