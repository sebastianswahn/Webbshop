import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

function AuthLayout() {
  const { token } = useAuth();
  const navigate = useNavigate();

  /*   useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
 */
  return (
    <div className="h-screen flex items-center py-12 flex-col bg-pink-100">
      <p className="text-3xl font-bold text-center my-5 hidden">Auth</p>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
