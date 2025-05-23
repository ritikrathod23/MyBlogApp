import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className=" mt-10 font-sans font-medium height text-xl text-center">
        <h2 className="text-5xl mb-7">Welcome to my home page</h2>
        <div>If your are new to this website , please register your self</div>
        <div className="mt-10 gap-9 flex justify-center content-center">
        <Link to={'/signup'}>
          <button
            // onClick={handleClick}
            type="button"
            className=" p-2 rounded-lg shadow-md w-20 text-sm bg-myOrange hover:bg-opacity-80"
          >
           SignUp  
          </button>
          </Link>
          
          <Link to={'/login'}>
          <button
            type="button"
            className="bg-myOrange p-2 rounded-lg shadow-md w-20 text-sm hover:bg-opacity-80 "
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
