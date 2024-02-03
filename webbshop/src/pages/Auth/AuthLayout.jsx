import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="h-screen flex items-center py-12 flex-col bg-pink-100">
      <p className="text-3xl font-bold text-center my-5 hidden">Auth</p>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
