import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <section className="flex-grow">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}

export default AppLayout;
