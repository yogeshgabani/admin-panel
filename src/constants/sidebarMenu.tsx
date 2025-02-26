import { ShoppingBasket } from "lucide-react";
import { BsPeopleFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa6";
import { HiMiniPercentBadge } from "react-icons/hi2";

const SidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <IoHome />,
    submenu: [
      { id: "overview", label: "Overview", path: "/dashboard/overview" },
      { id: "analytics", label: "Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    id: "products",
    label: "Products",
    path: "/products",
    icon: <ShoppingBasket />,
  },
  { id: "users", label: "Users", path: "/user", icon: <BsPeopleFill /> },
  {
    id: "categories",
    label: "Categories",
    path: "/categories",
    icon: <BiCategoryAlt />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/orders",
    icon: <FaShippingFast />,
    submenu: [
      { id: "pending", label: "Pending Orders", path: "/orders/pending" },
      { id: "completed", label: "Completed Orders", path: "/orders/completed" },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    path: "/customers",
    icon: <FaUserNurse />,
  },
  {
    id: "sales-promotion",
    label: "Sales Promotion",
    path: "/sales-promotion",
    icon: <HiMiniPercentBadge />,
  },
];

export default SidebarMenuItems;
