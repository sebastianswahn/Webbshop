import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <div>Redirecting</div>;
}

export default Logout;
