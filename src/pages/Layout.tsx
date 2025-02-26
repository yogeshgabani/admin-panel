import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminHeader from "../components/header";
import Breadcrumb from "../constants/Breadcumb";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        <main className="flex-1 flex-col flex bg-muted/40 px-3 lg:mr-3 mr-0 ">
          <Breadcrumb />
          {/* <Main /> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
