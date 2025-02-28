import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarMenuItems from "../constants/sidebarMenu";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    SidebarMenuItems.forEach((menuItem) => {
      if (menuItem.submenu) {
        menuItem.submenu.forEach((subItem) => {
          if (location.pathname === subItem.path) {
            setActiveMenu(menuItem.id);
          }
        });
      }
    });
  }, [location.pathname]);

  const handleMenuClick = (menuItem: any) => {
    navigate(menuItem.path);
    if (menuItem.submenu) {
      setActiveMenu(activeMenu === menuItem.id ? null : menuItem.id);
    } else {
      // navigate(menuItem.path);
      if (isMobile) setOpen(false);
    }
  };

  const handleSubmenuClick = (path: string) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className="bg-[#7258db] rounded-[15px] lg:m-3 m-0">
        <div
          className={`fixed ${
            isMobile
              ? "top-0 bg-[#7258db] rounded-r-[15px] left-0 h-full z-50"
              : "mt-3 relative"
          } 
        ${isMobile && !open ? "-translate-x-full" : "translate-x-0"} 
         text-white  transition-transform duration-300 ease-in-out overflow-hidden
        ${isMobile ? "w-64" : open ? "w-64" : "w-20"}`}
        >
          {/* eBazzar Logo - Fixed at the Top */}
          <div
            className="sticky top-0 z-10 bg-[#7258db] flex items-center gap-2 justify-center p-4 border-b border-white cursor-pointer "
            onClick={() => navigate("/")}
          >
            <RiShoppingBag3Fill className="text-3xl" />
            <h1
              className={`text-2xl font-comfortaa font-play transition-all ${
                !open && !isMobile ? "hidden" : "block"
              }`}
            >
              e Bazzar
            </h1>
          </div>
          {/* Scrollable Menu Section */}
          <nav className="mt-2 flex flex-col overflow-y-auto max-h-[calc(100vh-185px)]">
            {SidebarMenuItems.map((menuItem) => {
              const isActive = location.pathname === menuItem.path;
              return (
                <div key={menuItem.id} className="w-full">
                  <div
                    className={`flex font-josefin cursor-pointer items-center gap-2 rounded-md mb-1 px-3 py-2 text-xl hover:bg-white/20 transition-all 
                  ${isActive ? "bg-white/20" : ""}
                  ${
                    isMobile
                      ? "justify-start mx-1"
                      : open
                      ? "justify-start mx-1"
                      : "justify-center mx-2"
                  }`}
                    onClick={() => handleMenuClick(menuItem)}
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && !isMobile ? "hidden" : "block"
                      } transition-all`}
                    >
                      {menuItem.label}
                    </span>
                    {menuItem.submenu && (
                      <span
                        className={`ml-auto ${
                          isMobile ? "block" : open ? "block" : "hidden"
                        }`}
                      >
                        <IoMdArrowDropdown
                          className={`${
                            activeMenu === menuItem.id
                              ? "transition-all duration-200 ease-in-out rotate-180"
                              : "rotate-0  transition-all duration-200 ease-in-out"
                          }`}
                        />
                        {/* {activeMenu === menuItem.id ? (
                          <IoMdArrowDropdown />
                        ) : (
                          <IoMdArrowDropright />
                        )} */}
                      </span>
                    )}
                  </div>

                  {/* submenu if available */}
                  {menuItem.submenu && activeMenu === menuItem.id && (
                    <div
                      className={` flex flex-col font-josefin overflow-hidden transition-[max-height] duration-300 ease-in-out
                        ${
                          activeMenu === menuItem.id
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                     ${isMobile ? "ml-6" : open ? "ml-6" : "ml-0"}
                  `}
                    >
                      {menuItem.submenu.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <div
                            key={subItem.id}
                            className={`cursor-pointer mx-2  rounded-md py-1 text-lg hover:bg-white/10 transition-all
                             ${
                               isMobile
                                 ? "text-lg px-3"
                                 : open
                                 ? "text-lg px-3"
                                 : " text-[11px] px-1 text-center"
                             }
                            ${isSubActive ? "bg-white/20" : ""}`}
                            onClick={() => handleSubmenuClick(subItem.path)}
                          >
                            {subItem.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Back Button - Fixed at Bottom */}
          <div className="p-4 flex justify-center">
            <button className="cursor-pointer" onClick={() => setOpen(!open)}>
              <IoIosArrowBack
                className={`text-3xl transition-transform duration-300 ${
                  !open ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* shopping bag button <1024px screen resolution view*/}
        {isMobile && !open && (
          <button
            className="fixed top-6 left-4 z-50 p-2 bg-[#7258db] text-white rounded-full transition-all duration-300"
            onClick={() => setOpen(true)}
          >
            <RiShoppingBag3Fill className="text-3xl" />
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
