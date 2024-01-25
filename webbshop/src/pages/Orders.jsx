import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import OrderHistoryModal from "../components/OrderHistoryModal";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token, isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setOrders(data))
        .catch((error) => console.error("Error:", error));
    } else {
      setShowModal(true);
    }
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl">Orders</h1>
      {showModal && <OrderHistoryModal />}
      {orders.map((order) => (
        <div
          className="flex-row text-center p-4 border-2 border-solid border-gray-200 rounded-lg shadow-md m-4 bg-gray-1"
          key={order._id}
        >
          <h2 className="text-2xl">Order number: {order._id}</h2>
          <p className="text-gray-500 py-4">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {order.products.map((productItem) => (
            <div className="p-8" key={productItem._id}>
              <h4 className="text-2xl pb-2">{productItem.product.name}</h4>
              <img
                className="items-center w-1/2 mx-auto"
                src={
                  productItem.product.images && productItem.product.images[0]
                }
                alt={productItem.product.name}
              />
              <p>Quantity: {productItem.quantity}</p>
              <p className="text-green-600 font-bold text-xl">
                Price: {productItem.product.price} $
              </p>
            </div>
          ))}
          <h3 className="text-green-600 font-bold text-3xl">
            Total Price: {order.totalPrice} $
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Orders;
