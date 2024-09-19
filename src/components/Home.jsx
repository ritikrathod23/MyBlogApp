import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className=" height text-xl text-center">
        <h2 className="text-5xl mb-7">Welcome to my home page</h2>
        <div>If your are new to this website , please register your self</div>
        <div className="mt-10 gap-9 flex justify-center content-center">
        <Link to={'/signup'}>
          <button
            // onClick={handleClick}
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
           SignUp  
          </button>
          </Link>
          
          <Link to={'/login'}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
           Login  
          </button>
          </Link> 
        </div>
      </div>
    </>
  );
}

export default Home;
