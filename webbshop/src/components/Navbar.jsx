import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export const Navbar = ({ cartCount }) => {
  const { isLoggedIn } = useAuth();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setBounce(true);
    const timer = setTimeout(() => setBounce(false), 1000); // remove bounce after 1s
    return () => clearTimeout(timer); // cleanup on unmount
  }, [cartCount]);
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
          {isLoggedIn && (
            <li>
              <NavLink className="text-white [&.active]:underline" to="/logout">
                Logout
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink className="text-white [&.active]:underline" to="/orders">
                Orders
              </NavLink>
            </li>
          )}
          <li>
            <NavLink className="text-white [&.active]:underline" to="/cart">
              Cart{" "}
              <span className={`text-sm ${bounce ? "animate-bounce" : ""}`}>
                {" "}
                ({cartCount})
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
