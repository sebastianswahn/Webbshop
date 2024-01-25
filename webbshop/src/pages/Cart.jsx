import React from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useContext, useState } from "react";
import OrderModal from "../components/OrderModal";
import { useAuth } from "../contexts/AuthContext";

const Cart = () => {
  const { cartItems, setcartItems } = useProducts();
  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price,
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
    <div className=" border-2 p-4 border-gray-200 rounded-lg h-screen">
      <h2 className="text-center mb-8 text-4xl">Shopping Cart</h2>
      {cartItems.map((product, index) => (
        <div
          key={index}
          className="text-center text-xl p-4 flex justify-center"
        >
          <p className="px-4">{product.name}</p>{" "}
          <p className="text-green-600 font-bold">{product.price}$</p>
          {/* adjust as needed based on the structure of your cart items */}
          {/* display other properties of the item as needed */}
          <div className="flex-1 text-right">
            <p className="text-xl">Quantity: {product.quantity}</p>
          </div>
        </div>
      ))}
      <h2 className="text-green-600 font-bold text-center text-3xl p-8">
        Total: {totalPrice}$
      </h2>
      <div className="flex-row py-8 text-center justify-center items-center">
        <button
          className="bg-emerald-600 text-white p-2 rounded-md"
          onClick={handleOrder}
        >
          Place Order
        </button>
        <p className="mt-8">{message}</p>
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
