import { useState } from "react";
import AuthService from "../appwrite/Auth";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "../svg/AddIcon.png";
import Alerts from "./Alert";
import { useForm, SubmitHandler } from "react-hook-form";

export default function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: true, message: "", type: "" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    setAlert({
      show: false,
    });
    setError("");
    const { email, password, name } = data;
    try {
      const userData = await AuthService.createAccount(email, password, name);
      // handle successful account creation
      if (AuthService.getUserSession) {
        setAlert({
          show: true,
          message: "Account created successfully",
          type: "success",
        });
        setInterval(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "Invalid Creadentials",
        type: "error",
      });
      setError("SignUp failed");
      console.log(error);
    }
  };

  // const onSubmit = (data) =>{
  //   console.log("Form data",data)
  //   const {name, email, password } = data
  //    try {
  //     const userData = await AuthService.createAccount(
  //       email.value,
  //       password.value,
  //       name.value
  //     );

  //      if (AuthService.getUserSession) {
  //       setAlert({
  //         show: true,
  //         message: "Account created successfully",
  //         type: "success",
  //       });
  //       setInterval(() => {
  //         navigate("/login");
  //       }, 2000);
  //     }
  //   }
  // }
  return (
    <>
      {alert.show && <Alerts {...alert} />}
      <div className="flex justify-center mt-2">
        <div className="flex justify-center items-center shadow-lg rounded-md w-96 m-2 mt-5  ">
          <div className="rounded-lg flex min-h-40 bg-slate-700  flex-1 flex-col justify-center px-6 py-6  lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="m-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
              {error && (
                <p className="text-myRed mt-2 text-center">{error}</p>
              )}
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-2"
              >
                <div className="">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("name", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "name must me minmun 3 characters",
                        },
                      })}
                      aria-invalid={errors.name ? "true" : "false"}
                      name="name"
                      className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name && (
                      <p className="text-myRed text-sm  m-0 p-0">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        require: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                      name="email"
                     
                      // autoComplete="email"
                      className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="text-myRed text-sm  m-0 p-0">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                    type="password"
                      {...register("password",{
                        required: true,
                        minLength: {value: 4, message: "password must atleast 4 characters"}
                      })}
                      id="password"
                     
                      autoComplete="current-password"
                      className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  {errors.password && (
                    <p className="text-myRed text-sm  m-0 p-0">
                      {errors.password.message}
                    </p>
                  )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex mt-5 bg-myOrange w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className=" block mt-3 text-center text-sm text-gray-500">
                <Link
                  to={"/login"}
                  className="font-semibold text-myOrange hover:opacity-50 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Have an account, Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
