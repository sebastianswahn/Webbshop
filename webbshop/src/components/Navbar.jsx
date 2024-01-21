import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-emerald-800 py-4">
      <div className=" max-w-[1100px] m-auto px-2 flex justify-between items-center">
        <Link className="text-white text-2xl font-semibold" to="/">
          <p>My Store</p>
        </Link>
        <ul className="flex gap-x-8">
          <li>
            <NavLink className="text-white [&.active]:underline" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white [&.active]:underline" to="/contact">
              Contact
            </NavLink>
          </li>

          {!isLoggedIn && (
            <li>
              <NavLink
                className="text-white [&.active]:underline"
                to="/auth/login"
              >
                Login
              </NavLink>
            </li>
          )}

          <li>
            <NavLink className="text-white [&.active]:underline" to="/orders">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
