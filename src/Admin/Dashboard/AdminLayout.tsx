import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-100 text-black">
      <Sidebar />
      <div className="ml-0 md:ml-64 flex-grow p-4 flex flex-col min-h-screen">
        <AdminHeader />
        <div className="flex-grow">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
