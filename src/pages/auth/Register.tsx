import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import countryData from "../../api/country.json";
import stateData from "../../api/state.json";
import citiesData from "../../api/cities.json";
import { toast } from "react-toastify";

interface Country {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
  country_id: number;
}

interface City {
  id: number;
  name: string;
  state_id: number;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState<{ id: number; name: string; country_id: number }[]>([]);
  const [citiesList, setCitiesList] = useState<{ id: number; name: string; state_id: number }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // country select handle
  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryName = e.target.value;

    const selectedCountry: any = countryData.find(
      (c: Country) => c.name === selectedCountryName
    );

    setFormData((prev) => ({ ...prev, country: selectedCountry.name }));

    const filteredStates: any = stateData.filter(
      (state: State) => state.country_id === selectedCountry.id
    );
    setStates(filteredStates);
  };

  // state select handle
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedStateName = e.target.value;
    const selectedState: any = stateData.find(
      (s: State) => s.name === selectedStateName
    );

    setFormData((prev) => ({ ...prev, state: selectedState.name }));

    const filteredCities: any = citiesData.filter(
      (city: City) => city.state_id === selectedState.id
    );
    setCitiesList(filteredCities);
  };

  //handle submit regiaster form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("register", setFormData);
    try {
      toast.success("Your registration was successful!");
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <>
        <div className="py-[30px] w-full border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
          <h1 className="text-[42px]  text-[#222222]">Register</h1>
          <p className="text-[#222222] text-[15px]">
            <Link to="/">Home</Link>&nbsp; &nbsp; &gt; &nbsp; &nbsp;
            <span>Register</span>
          </p>
        </div>
        <div className="mt-10 grid place-items-center">
          <form onSubmit={handleSubmit} >
            <div className="sm:min-w-2xl w-full grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                />
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                {error? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                />
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
                {error && (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                    name="password"
                    type={!showPassword ? "password" : "text"}
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <span
                    className="bg-black text-white py-[6px] w-[80px] px-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? "Show" : "Hide"}
                  </span>
                </div>
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  placeholder="Mobile"
                  onChange={handleChange}
                />
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  onChange={handleCountryChange}
                  value={formData.country}
                  name="country"
                >
                  <option value="">Select Country</option>
                  {countryData.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  onChange={handleStateChange}
                  value={formData.state}
                  name="state"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  {citiesList.map((city) => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                  ))}
                </select>
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <label className="block text-[#222] font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                  type="text"
                  name="address"
                  value={formData.address}
                  placeholder="Address"
                  onChange={handleChange}
                />
                {error ? (
                  <p className="text-red-500 ps-2 pt-1 text-[14px]">
                    {error}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <button
              className="bg-black mt-6 w-full rounded-[5px] py-2 px-7 text-[16px] text-white transition-all cursor-pointer"
              type="submit"
            >
              {!loading ? (
                <p className="text-white text-[18px]">Register</p>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <div className="spinner"></div>
                  <p className="text-white text-[18px]">Loading...</p>
                </div>
              )}
            </button>

            <p className="text-[#222222] text-[16px] py-5 text-end">
              Already have an account?{" "}
              <Link to="/login" className="hover:text-blue-700 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </>
    </>
  );
};

export default Signup;
