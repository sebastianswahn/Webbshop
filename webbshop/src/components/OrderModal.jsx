import React from "react";
import { Link } from "react-router-dom";

const OrderModal = () => {
  return (
    <div>
      <p>You need to be logged in to make an order</p>
      <Link to="/auth/login">Login</Link>
    </div>
  );
};

export default OrderModal;
