
import pagenot from "../assets/images/404-img.cdac141b.svg";
import { useNavigate } from "react-router-dom";

const  NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  console.log('isAuthenticated', isAuthenticated)
  const handleBack = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); 
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center pt-10 gap-3">
      <h1 className="text-6xl text-[#005490] font-black">Oh No!</h1>
      <h4 className="text-[60px] font-confortaa text-black font-medium">
        This page is not found
      </h4>
      <img src={pagenot} alt="page not found" />
      <div className="max-w-md w-full flex items-center border border-solid border-[#e5e7eb]">
        
          <button className="text-lg w-full rounded-lg bg-gradient-to-r py-3 px-8 from-[#006ab6] to-[#00406d] text-white border-1 border-transparent transition duration-500 hover:text-[#005490] hover:border-[#005490] hover:from-white hover:to-white cursor-pointer"
          onClick={handleBack}
          >
            See More
          </button>
       
      </div>
    </div>
  );
}

export default NotFound;
