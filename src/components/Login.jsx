import { useState } from 'react';
import AuthService from '../appwrite/Auth';  // Ensure AuthService is properly set up
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';

export default function SignUp() {
  const navigate = useNavigate();
  const [ alert, setAlert ] = useState({ show: false, message: "", type: "" })

  // Login function
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const userData = await AuthService.login(email.value, password.value);
      setAlert(userData)
      console.log(userData);
      if (userData) {
        showAlert("Login successful")
        console.log('Login successful');
        setTimeout(() => {
          navigate('/userhome')
        }, 1500);
        // navigate('/userhome'); // Navigate to another page upon successful login
      }
    } catch (error) {
      console.error('Cannot login:', error.message || error);
    }
  };
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 1000); // Hide after 3 seconds
  };

  return (
    <>
      {alert.show && (
          <Alert  message={alert.message} type={alert.type} />

        )}
        <div className="flex justify-center items-center w-96 m-2 mt-5  ">
          <div className="rounded-lg flex min-h-40 bg-slate-700 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Log in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log in
                  </button>
                </div>
              </form>
              

              <p className="mt-10 text-center text-sm text-gray-500">
                <Link to={"/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Don't have a account, register yourself
                </Link>
              </p>
            </div>
          </div>
      </div>
      
    </>
  );
}
