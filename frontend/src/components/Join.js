import React from 'react';
import { FaUserTie, FaUser } from 'react-icons/fa'; // Icons for the buttons
import { Link} from 'react-router-dom';
import logo from '../Assets/unicef_logo.png'; 

const Join = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center  p-9 ml-32 text-xl" style={{ fontFamily: 'roboto' }}>
      <div className="text-left">
        <div className="mb-4">
          <img src={logo} alt="UNICEF Logo" className="h-12" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Child Rights <span className="text-blue-500">ADVOCACY</span>
        </h1>
      </div>
     <p className="text-left text-gray-600 mt-4 max-w-2xl">
         "Every child deserves a voice, protection, and equal opportunities to thrive. Our child rights advocacy is dedicated to promoting        and defending the rights of all children, ensuring they grow up in environments that nurture their well-being, education, and          freedom from abuse and exploitation. Through awareness, support, and legal action, we strive to create a safer world where every         child can realize their full potential and enjoy a future filled with hope and possibility."
       </p>

      <div className="flex space-x-6 mt-8">

       <Link to="/login">
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
