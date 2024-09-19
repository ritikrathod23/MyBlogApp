import React from 'react'
import { Link } from 'react-router-dom';
import mydelete from '../svg/mydelete.svg'

function MyFooter() {
  return (
    <div className='w-full fotter h-30 md:h-30 lg:h-30 bg-gray-800   p-2 '>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4
         justify-center justify-items-center content-center items-center  list-none p-5   text-gray-400 tracking-wider'>
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
            <ul>
                <li className='font-bold cursor-pointer' >Legal</li>
                <li className='cursor-pointer'>Privacy Policy</li>
                <li className='cursor-pointer'>Terms & Conditions</li>
                
            </ul>
        </div>
        
    </div>
  )
}

export default MyFooter