import React from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useContext, useState } from "react";
import OrderModal from "../components/OrderModal";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const {
    cartItems,
    setcartItems,
    addQuantity,
    removeItem,
    clearCart,
    removeQuantity,
  } = useProducts();
  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { token } = useAuth();
  const [message, setMessage] = useState("");

  const handleOrder = async () => {
    if (isLoggedIn === false || isLoggedIn === null) {
      setIsModalOpen(true);
    } else {
      // place order
      console.log(cartItems);
      const orderItems = {
        products: cartItems.map((item) => ({
          productId: item.id, // assuming the product id is stored in _id
          quantity: item.quantity,
        })),
      };
      console.log(orderItems);

      const res = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderItems),
        }
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        // If the response is ok, clear the cart and show a success message
        setcartItems([]);
        setMessage("Order placed successfully!");
      } else {
        // If there was an error, show an error message
        setMessage("There was an error placing your order.");
      }
    }
  };

  return (
    <div className="border-2 p-4 border-gray-200 rounded-lg h-screen">
      <h2 className="text-center mb-8 text-4xl font-bold">Shopping Cart</h2>
      {cartItems.map((product, index) => (
        <div
          key={index}
          className="text-center text-xl p-4 flex justify-between items-center border-b-2 border-gray-200"
        >
          <p className="px-4 font-medium">{product.name}</p>
          <p className="text-green-600 font-bold">{product.price}$</p>
          <div className="flex items-center">
            <p className="text-xl mr-4">x: {product.quantity} </p>
            <div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                onClick={() => addQuantity(product.id)}
              >
                <FaPlus />
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                onClick={() => removeQuantity(product.id)}
              >
                <FaMinus />
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => removeItem(product.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
      <h2 className="text-green-600 font-bold text-center text-3xl p-8">
        Total: {totalPrice}$
      </h2>
      <div className="flex flex-col items-center py-8">
        <button
          className="bg-emerald-600 text-white p-2 rounded-md mx-4 mb-4"
          onClick={handleOrder}
        >
          Place Order
        </button>
        <button
          className="bg-emerald-600 text-white p-2 rounded-md mx-4"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <p className="mt-8 text-red-600">{message}</p>
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
