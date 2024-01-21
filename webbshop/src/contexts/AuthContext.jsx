import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const localToken = localStorage.getItem("accesstoken");
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localToken ?? false);

  useEffect(() => {
    if (token) return;

    const localToken = localStorage.getItem("accesstoken");

    if (localToken !== null) {
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem("accesstoken", token);
  }, [token]);

  const register = async (formData) => {
    try {
      const res = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(res);
      const data = await res.json();
      console.log(data);

      if (res.status !== 201) {
        throw new Error(data);
      }

      setToken(data.token);
      return { success: "User created" };
    } catch (error) {
      return { error: error.message };
    }
  };

  const login = async (formData) => {
    try {
      const res = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(res);
      const data = await res.json();
      console.log(data);

      if (res.status !== 200) {
        throw new Error(data);
      }

      setIsLoggedIn(true);
      setToken(data.token);
      return { success: "User Logged In" };
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("accesstoken");
    setToken(null);
    setIsLoggedIn(false);
  };

  const value = {
    token,
    register,
    login,
    logout,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be inside an AuthContextProvider");

  return context;
};
