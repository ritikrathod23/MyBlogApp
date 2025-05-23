import React from 'react'
import { Link } from 'react-router-dom';
import mydelete from '../svg/mydelete.svg'


function MyFooter() {
  return (
    <div className='border-t-2 border-gray-600 border-myGray border-opacity-70
        md:h-32 h-52 w-full fotter bg-gray-200 p-2 '>
        <div className='grid grid-cols-2 md:grid-cols-4
         list-none p-5 gap-5 text-gray-700 tracking-wider'>
            <ul className=''>
                <li className='font-bold cursor-pointer'>About</li>
                <li className='cursor-pointer'>Flowbiit</li>
                <li className='cursor-pointer'>Tailwind</li>
            </ul>
            <ul>
                <li className='font-bold cursor-pointer'>Follow Us</li>
                <li className='cursor-pointer'>Github</li>
                <li className='cursor-pointer'>Linkedin</li>
            </ul>
            <ul className='text-wrap'>
                <li className='font-bold cursor-pointer' >Legal</li>
                <li className='cursor-pointer'>Privacy Policy</li>
                <li className='cursor-pointer'>Terms & Conditions</li>
                
            </ul>
        </div>
        
    </div>
  )
}

export default MyFooter