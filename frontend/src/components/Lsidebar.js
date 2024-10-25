import React, { useEffect, useState } from 'react';
import { FaSearch, FaUser, FaEllipsisH } from 'react-icons/fa'; 
import axios from 'axios';

const Lsidebar = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data); // Assuming the response contains an array of users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-blue-600 text-white w-64 p-4 h-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-10 bg-blue-700 rounded-full outline-none text-white placeholder-gray-300"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-300" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Trending</h3>
        <div className="mb-4">
          <div className="flex justify-between">
            <span>Trending in Israel</span>
            <FaEllipsisH />
          </div>
          <h4 className="font-bold">Child Education</h4>
          <p className="text-gray-300">25 posts</p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <span>Trending in Canada</span>
            <FaEllipsisH />
          </div>
          <h4 className="font-bold">Child Malnutrition</h4>
          <p className="text-gray-300">200 posts</p>
        </div>
        <button className="text-blue-300 hover:underline">More</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Who to Follow?</h3>
        {users.slice(0, 5).map((user) => (
          <div key={user.username} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaUser className="text-gray-700 text-xl mx-2" />
              <div>
                <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-gray-300">@{user.username}</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full">Follow</button>
          </div>
        ))}
        <button className="text-blue-300 hover:underline">More</button>
      </div>
    </div>
  );
};

export default Lsidebar;
