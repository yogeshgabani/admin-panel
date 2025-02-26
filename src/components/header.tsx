import { CiSearch } from "react-icons/ci";
import profilepic from "../assets/images/react.svg";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = (): void => {
    navigate("/login"); // Redirect to login page
    localStorage.removeItem("token")
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="mx-3 sm:flex block py-6 lg:pl-0 sm:pl-[80px] pl-[55px] items-center justify-between sm:px-6 px-0 bg-background border-b">
      <div className="flex items-center">
        <input
          type="text"
          className="text-[20px] sm:w-auto w-full border-solid border-[#f0f0f0] py-2 px-4 border bg-white text-[#212529] indent-2"
          placeholder="Search"
        />
        <button className="bg-[#e1e4e7] py-[14px] px-3 border-border-solid border-[#f0f0f0] text-[#212529]">
          <CiSearch className="text-[20px] font-extrabold" />
        </button>
      </div>
      <div className="flex items-center sm:justify-start justify-end gap-2 sm:mt-0 mt-3">
        <div className="sm:block hidden">
          <h1 className="text-[14px] font-inter text-[#212529] font-bold">hello</h1>
          <p className="text-[12px] font-poppins text-[#212529] ">admin profile</p>
        </div>
        <div
          className="rounded-full border border-solid border-[#dee2e6] p-1 relative cursor-pointer"
          onClick={() => setOpen(!open)}
          ref={menuRef}
        >
          <img src={profilepic} alt="Profile" />
          <div
            style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
            className={`absolute w-[200px] left-[-150px] bg-white top-[50px] rounded-[5px] transition-all ease-in-out duration-500 ${
              open ? "visible h-[150px] opacity-100" : "invisible h-0 opacity-0"
            }`}
          >
            <ul>
              <li className="flex items-center gap-3 p-3 border-b border-b-[#252926] border-b-solid">
                <div>
                  <img src={profilepic} alt="Profile" />
                </div>
                <div>
                  <h1 className="text-[14px] text-[#212529] font-bold">user</h1>
                  <p className="text-[12px] text-[#212529] ">email</p>
                </div>
              </li>
              <Link to="/myaccount">
                <li className="p-2 mx-3 cursor-pointer hover:bg-[#7258db] hover:text-white">Profile Page</li>
              </Link>
              <li
                className="p-2 mx-3 cursor-pointer hover:bg-[#7258db] hover:text-white"
                onClick={handleLogout}
              >
                Signout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;