import React, { useEffect, useState } from 'react';
import logo from '../Assets/unicef_logo.png'; 

const WelcomeUser = () => {
  
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user); 
    }
  }, []);
  if (!loggedInUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className=" flex justify-center text-center mt-5 mb-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>
      <div className="bg-white shadow-md p-6 mt-10 rounded-lg text-center">
        <h2 className="text-xl font-semibold mt-4">{loggedInUser.username}</h2>
        <p className="text-gray-700 mt-2">
          Welcome Again admin, <strong>{loggedInUser.username}</strong>. Help us to achieve 
          the goal of Child Advocacy. Your assistance in making a safe place for children 
          is very appreciated by our community.
        </p>

        <h3 className="text-2xl mt-6 font-bold text-blue-600">Have a great Day !!</h3>
      </div>
    </div>
  );
};

export default WelcomeUser;
