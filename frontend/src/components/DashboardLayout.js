import React, { useState } from 'react';
import { Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Lsidebar from './Lsidebar';


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(isSidebarOpen);
  };

  return (
    <div className="flex" style={{ fontFamily: 'roboto' }}>
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
      <div className={`flex-grow ${isSidebarOpen ? 'ml-56' : 'ml-0'}`}>
        <div className='font-sans bg-white'>
          <Outlet />
        </div>
      </div>
      <div className="hidden lg:block rounded-full ">
        <Lsidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
