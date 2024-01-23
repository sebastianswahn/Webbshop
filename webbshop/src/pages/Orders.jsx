import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = "your_token_here"; // replace with your token

    fetch("https://js2-ecommerce-api.vercel.app/api/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order.id}>
          {/* replace with your actual order properties */}
          <p>{order.name}</p>
          <p>{order.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
