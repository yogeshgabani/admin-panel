import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import PrivateRoutes from "../components/PrivateRoutes";
import Signup from "../pages/auth/Register";
import AuthLayout from "../pages/auth/AuthLayout";
import { ToastContainer } from "react-toastify";
import NotFound from "../components/NotFound";
import Forgot from "../pages/auth/Forgot";
import Analytics from "../pages/dashboard/Analytics";
import Overviews from "../pages/dashboard/Overviews.tsx";
import MainLayout from "../pages/Layout.tsx";
import SalesPromotion from "../pages/sales-promotion/SalesPromotion.tsx";
import Products from "../pages/products/Products.tsx";
import Categories from "../pages/category/Categories.tsx";
import Customers from "../pages/customer/Customer.tsx";
import Users from "../pages/users/Users.tsx";
import Orders from "../pages/orders/Orders.tsx";
import Pending from "../pages/orders/Pending.tsx";
import Completed from "../pages/orders/Completed.tsx";
import MyAccount from "../components/MyAccount.tsx";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot" element={<Forgot />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="overview" element={<Overviews />} />
            </Route>
            <Route path="/orders" element={<MainLayout />}>
              <Route index element={<Orders />} />
              <Route path="pending" element={<Pending />} />
              <Route path="completed" element={<Completed />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="products" element={<Products />} />
              <Route path="user" element={<Users />} />
              <Route path="categories" element={<Categories />} />
              <Route path="customers" element={<Customers />} />
              <Route path="sales-promotion" element={<SalesPromotion />} />
              <Route path="myaccount" element={<MyAccount />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
