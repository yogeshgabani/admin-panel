import { Link } from "react-router-dom";

const  Forgot = () => {
  return (
    <>
      <div className="py-[60px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
        <h1 className="text-[42px] font-inter font-semibold text-[#222222]">Forgot Password</h1>
        <p className="text-[#222222] font-poppins text-[15px]">
          <Link className="hover:text-red-700" to="/">Home</Link>&nbsp; &nbsp; &#62; &nbsp; &nbsp;
          <span>Forgot</span>
        </p>
      </div>
    </>
  );
}

export default Forgot;
