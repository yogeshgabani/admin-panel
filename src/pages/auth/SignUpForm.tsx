import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import countryData from "../../api/country.json";
import stateData from "../../api/state.json";
import citiesData from "../../api/cities.json";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be a 10-digit number")
    .required("Mobile is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
});

const SignUpForm = () => {
  const [states, setStates] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // formik submit button
  const handleSubmitForm = (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("registration successfully..");
      console.log("Form submitted successfully", values);
      setSubmitting(false);
      navigate("/login");
      setLoading(false);
    }, 3000);
  };

  // country select handle
  const handleCountryChange = (
    e: ChangeEvent<HTMLSelectElement>,
    setFieldValue: Function
  ) => {
    const selectedCountryName = e.target.value;

    const selectedCountry: any = countryData.find(
      (c) => c.name === selectedCountryName
    );
    setFieldValue("country", selectedCountry.name || "");

    const filteredStates: any = stateData.filter(
      (state) => state.country_id === selectedCountry?.id
    );
    setStates(filteredStates);
  };

  // state select handle
  const handleStateChange = (
    e: ChangeEvent<HTMLSelectElement>,
    setFieldValue: Function
  ) => {
    const selectedStateName = e.target.value;
    const selectedState: any = stateData.find(
      (s) => s.name === selectedStateName
    );

    setFieldValue("state", selectedState.name || "");

    const filteredCities: any = citiesData.filter(
      (city) => city.state_id === selectedState?.id
    );
    setCitiesList(filteredCities);
  };

  return (
    <>
      <div className="mx-3">
        <div className="py-[30px] w-full border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0]">
          <h1 className="text-[42px]  text-[#222222]">Register</h1>
        </div>
        <div className="sm:mt-10 mt-7 grid place-items-center">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              mobile: "",
              gender: "",
              address: "",
              country: "",
              state: "",
              city: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="">
                <div className=" w-full grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                      placeholder="Full Name*"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                      placeholder="Last Name*"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                      placeholder="email*"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <Field
                        name="password"
                        type={!showPassword ? "password" : "text"}
                        className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                        placeholder="password*"
                      />
                      <span
                        className="bg-black text-white py-[6px] w-[80px] px-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? "Show" : "Hide"}
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="mobile"
                      type="mobile"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                      placeholder="mobile*"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {["male", "female", "other"].map((g) => (
                        <label key={g} className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="gender"
                            value={g}
                            className="border border-solid border-[#726E70] rounded-[15px] w-full placeholder:text-[16px] placeholder:text-[#949494] indent-5"
                          />
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="p"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Coutry <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="country"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                      onChange={(e: any) =>
                        handleCountryChange(e, setFieldValue)
                      }
                    >
                      <option
                        //   selected
                        disabled
                        className="text-[#949494]"
                        value=""
                      >
                        Choose
                      </option>
                      {countryData.map((c: any) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="state"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                      onChange={(e: any) => handleStateChange(e, setFieldValue)}
                    >
                      <option disabled className="text-[#949494]" value="">
                        Choose
                      </option>
                      {states.map((s: any) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="state"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="city"
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                    >
                      <option
                        //   selected
                        disabled
                        className="text-[#949494]"
                        value=""
                      >
                        Choose
                      </option>
                      {citiesList.map((c: any) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="city"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-[#222] font-medium mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="textarea"
                      name="address"
                      rows={2}
                      className="bg-white outline-0 rounded-[5px] w-full py-[6px] px-4 border-[1px] border-[#eee]"
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ boxShadow: "0 4px 10px 0 #00000040" }}
                  disabled={isSubmitting}
                  className="bg-[#333333] font-comfortaa text-[20px] my-8 font-bold text-white w-full sm:h-14 h-12 rounded-[30px]"
                >
                  {!loading ? "Submit your form" : "Submitting..."}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
