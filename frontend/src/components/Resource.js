import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../Assets/unicef_logo.png';

const Resource = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);

  const token = localStorage.getItem('token'); // For authorization headers

  // Fetch all resources when component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, [token]);

  // Filter resources based on the active tab
  useEffect(() => {
    const filtered = resources.filter((resource) => {
      if (activeTab === 'courses') {
        return resource.title === 'courses';
      } else if (activeTab === 'visuals') {
        return resource.title === 'Visual Contents';
      } else if (activeTab === 'infographics') {
        return resource.title === 'Infographics';
      }
      return false;
    });
    setFilteredResources(filtered);
  }, [activeTab, resources]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-5 bg-gray-100 text-center font-sans">
      <div className="flex justify-center text-center mt-5 mb-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mt-5">
        <button
          className={`${
            activeTab === 'courses' ? 'bg-gray-500 text-white' : 'bg-gray-300'
          } px-4 py-2 rounded-md font-bold mr-3`}
          onClick={() => handleTabClick('courses')}
        >
          Courses with Certifications
        </button>
        <button
          className={`${
            activeTab === 'visuals' ? 'bg-gray-500 text-white' : 'bg-gray-300'
          } px-4 py-2 rounded-md font-bold mr-3`}
          onClick={() => handleTabClick('visuals')}
        >
          Visual Contents
        </button>
        <button
          className={`${
            activeTab === 'infographics' ? 'bg-gray-500 text-white' : 'bg-gray-300'
          } px-4 py-2 rounded-md font-bold`}
          onClick={() => handleTabClick('infographics')}
        >
          Infographics
        </button>
      </div>

      {/* Courses with Certifications */}
      {activeTab === 'courses' && (
        <section className="mt-8">
          <h2 className="text-2xl mb-4 font-bold">Available Courses</h2>
          <div className="flex justify-center flex-wrap">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="w-1/4 m-4 p-4 border rounded-lg bg-white">
                <h3 className="text-xl font-bold">{resource.title}</h3>
                <p className="my-2">{resource.description}</p>
                <a
                  href={`http://localhost:5000/api/resources/file/${resource.file}`}
                  className="border border-blue-500 px-4 py-2 rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resource
                </a>
              </div>
            ))}
          </div>
 <button className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md">Find Resources</button>
        </section>
      )}

      {/* Visual Contents with Video Playback */}
      {activeTab === 'visuals' && (
        <section className="mt-8">
          <h2 className="text-2xl mb-4 font-bold">Visual Contents</h2>
          <div className=" flex-wrap">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="w-1/4 m-4 p-4 border rounded-lg bg-white">
                <video controls className="w-full rounded-lg">
                  <source
                    src={`http://localhost:5000/api/resources/file/${resource.file}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <p className="my-2 flex"><h2 className="font-bold">video:</h2>{resource.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Infographics */}
      {activeTab === 'infographics' && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Infographics</h2>
          <div className="flex justify-center flex-wrap">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="w-1/4 m-4 p-4 border rounded-lg bg-white">
                <h3 className="text-xl font-bold">{resource.title}</h3>
                <p className="my-2">{resource.description}</p>
                <a
                  href={`http://localhost:5000/api/resources/file/${resource.file}`}
                  className="border border-blue-500 px-4 py-2 rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resource
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

     
    </div>
  );
};

export default Resource;
