import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Account() {
  return (
    <>
      <div className="hidden sm:grid sm:grid-cols-[0.1fr_0.9fr] lg:grid-cols-[0.2fr_0.8fr] m-2 min-h-[calc(100vh-5rem)]">
        <Sidebar />
        <Outlet />
      </div>
      <div className="sm:hidden m-2 min-h-[calc(100vh-5rem)]">
        <Outlet />
      </div>
    </>
  );
}

export default Account;
