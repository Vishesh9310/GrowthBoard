import React from 'react'
import Sidebar from '../components/layout/Sidebar';
import { Outlet } from 'react-router-dom';


const Workspace:React.FC = () => {
  return (
    <div className='flex min-h-fit font-sans py-10'>
        <div className='w-fit bg-gray-50'>
            <Sidebar/>
        </div>
        <div className='w-3/4 p-6'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Workspace;