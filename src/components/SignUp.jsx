import { useState } from "react";
import AuthService from "../appwrite/Auth";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "../svg/AddIcon.png";
import Alerts from './Alert';

export default function SignUp() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [ alert, setAlert ] = useState({show: true, message: '',  type: ''});


  const handleSubmit = async (event) => {
    setError("");
    event.preventDefault(); // prevent default form submission behavior
    const { email, password, name } = event.target.elements;
    try {
      const userData = await AuthService.createAccount(
        email.value,
        password.value,
        name.value
      );
      // handle successful account creation
      if (AuthService.getUserSession) {
        setMessage("Sign up successfully");
        setInterval(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setAlert({
        show: true,
        message: 'Invalid Creadentials',
        type: 'error'
      })
      setError("Invalid Creadentials, Please try again");
      console.log(error);
    }
  };

  return (
    <>
      { alert.show && (
        <Alerts {...alert}/>
      )}

      <div className="flex justify-center items-center w-96 m-2 mt-5  ">
        <div className="rounded-lg flex min-h-40 bg-slate-700  flex-1 flex-col justify-center px-6 py-6  lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            /> */}
            <h2 className="m-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="h-6">
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            {message && <p className="text-green-600 mt-8 text-center">{message}</p>}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-400 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className=" block mt-3 text-center text-sm text-gray-500">
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-500"
              >
                Have an account, Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
