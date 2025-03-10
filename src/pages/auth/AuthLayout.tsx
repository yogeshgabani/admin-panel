import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="lg:flex block min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black text-white w-full px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>
      <div className="w-full grid place-items-center md:m-4 m-0">

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
