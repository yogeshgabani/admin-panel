import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      auth?.login();
      toast.success("login successfully");
      localStorage.setItem("token", "your-jwt-token");
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 5000);
    } catch (error) {
      console.log("error", error);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" text-center w-full p-4 bg-[#f0f0f0]">
        <h1 className="text-[42px]   text-[#222222]">Login</h1>
        <p className="text-[#222222] text-[15px]">
          <Link to="/">Home</Link>&nbsp; &nbsp; &#62; &nbsp; &nbsp;
          <span>Login</span>
        </p>
      </div>
      <div className="mt-10 grid place-items-center">
        <div className="sm:min-w-2xl w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-2  w-full">
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee] border-solid"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" mt-3 ">
              <input
                className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee] border-solid"
                type="text"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/forgot">
              <p className="text-[#222222] ms-3 text-[16px] py-5 hover:text-blue-700 hover:underline cursor-pointer">
                Forgot your password?
              </p>
            </Link>
            <button
              className="bg-black mt-4 w-full rounded-[5px] py-2 px-7 text-[16px] transition-all  cursor-pointer scale-100  text-white "
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="text-[#222222] ms-3 text-[16px] py-5  text-end">
            New Customer?{" "}
            <Link
              to="/signup"
              className="hover:text-blue-700 hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
