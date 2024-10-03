import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../Assets/unicef_logo.png';
import { FaArrowRight } from 'react-icons/fa';
import moment from 'moment'; 

const AdvocacyPage = () => {
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);


  const token = localStorage.getItem('token'); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaign', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const data = response.data;
        const eventsData = data.filter(item => item.type === 'Event');
        const campaignsData = data.filter(item => item.type === 'Campaign');

        setEvents(eventsData);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="" style={{ fontFamily: 'roboto' }}>

      <div className="flex justify-center text-center mt-5 mb-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>
      <div className="bg-gray-200 py-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">UPCOMING EVENTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-10">
          {events.map(event => (
            <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
              <p className="text-gray-600">{event.meetingType}</p>
              <p className="text-gray-600">{moment(event.date).format('MMMM Do YYYY')}</p>
              <p className="text-gray-600">Time: {event.time}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">Venue: {event.venue}</p>
              <div className="flex">
              <FaArrowRight className="text-black text-xl pt-2" /> 
              <a href={event.link} className="text-gray-900 font-semibold text-xl underline">Click here to attend</a> 
            </div>
            </div>
          ))}
        </div>
      </div>
<div className="bg-gray-200 pb-32"> {/* Added min-h-screen and padding-bottom */}
  <h2 className="text-2xl font-bold text-center text-gray-800">UPCOMING CAMPAIGNS</h2>
  <div className="flex flex-row flex-wrap justify-center"> 
    {campaigns.map(campaign => (
      <div key={campaign._id} className="flex justify-between w-10/12 bg-white p-4 mt-4 mx-2 rounded-lg shadow-md"> {/* Added mx-2 for spacing between items */}
        <h3 className="font-bold text-lg text-gray-800">{campaign.title}</h3>
        <p className="text-gray-600">{campaign.meetingType}</p>
        <p className="text-gray-600">{moment(campaign.date).format('MMMM Do YYYY')}</p>
        <p className="text-gray-600">Time: {campaign.time}</p>
        <p className="text-gray-600">Location: {campaign.location}</p>
        <p className="text-gray-600">Venue: {campaign.venue}</p>
        <a href={campaign.link} className="text-blue-500 underline flex items-center"> {/* Added flex items-center for icon alignment */}
          <FaArrowRight className="text-black mr-1" /> 
         
        </a>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default AdvocacyPage;
