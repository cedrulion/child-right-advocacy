import React from 'react';
import { FaUserTie, FaUser } from 'react-icons/fa'; // Icons for the buttons
import { Link} from 'react-router-dom';
import logo from '../Assets/unicef_logo.png'; 

const Join = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center  p-9" style={{ fontFamily: 'roboto' }}>
      {/* UNICEF Logo and Title Section */}
      <div className="text-left">
        <div className="mb-4">
          <img src={logo} alt="UNICEF Logo" className="h-12" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Child Rights <span className="text-blue-500">ADVOCACY</span>
        </h1>
      </div>

      {/* Description Section */}
      <p className="text-left text-gray-600 mt-4 max-w-2xl">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-6 mt-8">

       <Link to="/alogin">
    <button className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
      <FaUserTie />
      <span>Go as Admin</span>
         </button>
        </Link>
       <Link to="/login">
    <button className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
      <FaUser />
      <span>Go as User</span>
    </button>
  </Link>


      </div>
    </div>
  );
};

export default Join;
