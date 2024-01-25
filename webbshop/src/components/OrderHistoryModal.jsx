import React from "react";
import { Link } from "react-router-dom";

const OrderHistoryModal = () => {
  return (
    <div className="flex-row justify-center text-center bg-red-300 text-red-800 mx-20 rounded-md p-4 items-center">
      <p className="pb-4">You need to be logged in to see your orders</p>
      <Link
        className="bg-emerald-600 text-white p-2 rounded-lg mx-8"
        to="/auth/login"
      >
        Login
      </Link>
      <Link
        className="bg-emerald-600 text-white p-2 rounded-lg mx-8"
        to="/auth/register"
      >
        Register
      </Link>
    </div>
  );
};

export default OrderHistoryModal;
