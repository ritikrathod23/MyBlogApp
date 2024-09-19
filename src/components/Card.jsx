import React from 'react'
import { Link } from "react-router-dom";
import jjk from '../svg/jjk.jpg'
import mydelete from '../svg/mydelete.svg'


function Card({note, image}) 
 {

  return (

    
      <div
          className="rounded-lg bg-slate-200  w-80 h-52 p-2  
          shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 bg-[hsla(0,0%,98%,0.15) ">
            <Link to={'/userhome'}>
            <div
              className="relative overflow-hidden bg-cover bg-no-repeat  bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-80 cursor-pointer ">
              <img
                className="rounded-t-lg w-80 h-40 "
                src={image}
                alt="no image" />
            </div>
            
            <h5
              className="grid grid-cols-2 mx-2 items-center  text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {note}
            {/* <img className='relative left-20 hover:fill-slate-500'
            onClick={handleDelete}
              width={20} 
              src={mydelete} 
              alt="Add" 
              /> */}
            </h5>
            <div>
            </div>
            </Link>
              
      </div>
  )
}

export default Card