import React from 'react'
import { Outlet } from 'react-router-dom';

function Container() {
  return (
    <div className='grid grid-rows-1 justify-center container height'>
        <Outlet />
    </div>
  )
}

export default Container