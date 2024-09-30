import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../Assets/unicef_logo.png'; // Adjust the path according to your file structure
import moment from 'moment'; // To format dates and times

const AdvocacyPage = () => {
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token'); // For authorization headers

  // Fetch events and campaigns from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaign', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request headers
          },
        });

        const data = response.data;

        // Separate events and campaigns based on the .type field
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
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex justify-center text-center mt-5 mb-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>

      {/* Upcoming Events Section */}
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
              <a href={event.link} className="text-blue-500 underline">Click here to attend</a>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Campaigns Section */}
      <div className="bg-white py-6 mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">UPCOMING CAMPAIGNS</h2>
        <div className="flex flex-col items-center">
          {campaigns.map(campaign => (
            <div key={campaign._id} className="w-10/12 bg-gray-200 p-4 mt-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg text-gray-800">{campaign.title}</h3>
              <p className="text-gray-600">{campaign.meetingType}</p>
              <p className="text-gray-600">{moment(campaign.date).format('MMMM Do YYYY')}</p>
              <p className="text-gray-600">Time: {campaign.time}</p>
              <p className="text-gray-600">Location: {campaign.location}</p>
              <p className="text-gray-600">Venue: {campaign.venue}</p>
              <a href={campaign.link} className="text-blue-500 underline">Click here to support</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvocacyPage;
