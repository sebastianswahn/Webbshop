import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

function RootLayout() {
  return (
    <div className="h-screen ">
      <Navbar />
      <div className="px-2 max-w-[900px] m-auto">
        <Outlet />
      </div>
    </div>
  );
}
export default RootLayout;
