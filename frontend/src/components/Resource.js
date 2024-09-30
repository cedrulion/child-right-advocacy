import React, { useState } from 'react';
import logo from '../Assets/unicef_logo.png';

const Resource = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-5 bg-gray-100 text-center font-sans">
      <div className=" flex justify-center text-center mt-5 mb-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>

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

      {activeTab === 'courses' && (
        <section className="mt-8">
          <h2 className="text-2xl mb-4 font-bold">Available Courses</h2>
          <div className="flex justify-center flex-wrap">
            <div className="w-1/4 m-4 p-4 border rounded-lg bg-white">
              <h3 className="text-xl font-bold">Child Caring</h3>
              <p className="my-2">Learn valuable skills to apply best child caring values.</p>
              <button className="border border-blue-500 px-4 py-2 rounded-md">Next</button>
            </div>
            <div className="w-1/4 m-4 p-4 border rounded-lg bg-white">
              <h3 className="text-xl font-bold">Child Abuse</h3>
              <p className="my-2">Learn valuable skills to apply while you meet with child abuse cases.</p>
              <button className="border border-blue-500 px-4 py-2 rounded-md">Next</button>
            </div>
            <div className="w-1/4 m-4 p-4 border rounded-lg bg-white">
              <h3 className="text-xl font-bold">Child Law</h3>
              <p className="my-2">Learn valuable skills to help apply the law in Child Abuse cases.</p>
              <button className="border border-blue-500 px-4 py-2 rounded-md">Next</button>
            </div>
            <div className="w-1/4 m-4 p-4 border rounded-lg bg-white">
              <h3 className="text-xl font-bold">Child Support</h3>
              <p className="my-2">Learn valuable skills at your own pace to support the abused child.</p>
              <button className="border border-blue-500 px-4 py-2 rounded-md">Next</button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'visuals' && (
        <section className="mt-8">
          <div className="flex justify-around">
            <div className="w-1/3 text-center">
              <h2 className="text-2xl font-bold">Documentary Videos</h2>
              <img
                src="video1-thumbnail.png"
                alt="Video 1"
                className="w-full rounded-lg mb-3"
              />
              <p>Video - 01: Learn about children’s rights.</p>
              <img
                src="video2-thumbnail.png"
                alt="Video 2"
                className="w-full rounded-lg mb-3"
              />
              <p>Video - 02: Proper ways of parenting, documentary by Bill's Family.</p>
            </div>

            <div className="w-1/3 text-center">
              <h2 className="text-2xl font-bold">Cartoon Contents</h2>
              <img
                src="cartoon1-thumbnail.png"
                alt="Cartoon 1"
                className="w-full rounded-lg mb-3"
              />
              <p>Cartoon: Emily’s Mother</p>
              <img
                src="cartoon2-thumbnail.png"
                alt="Cartoon 2"
                className="w-full rounded-lg mb-3"
              />
              <p>Cartoon: Lily’s neighborhood story</p>
            </div>

            <div className="w-1/3 text-center">
              <h2 className="text-2xl font-bold">Storytelling Books</h2>
              <img
                src="book1.png"
                alt="Book 1"
                className="w-4/5 mx-auto my-3"
              />
              <img
                src="book2.png"
                alt="Book 2"
                className="w-4/5 mx-auto my-3"
              />
              <img
                src="book3.png"
                alt="Book 3"
                className="w-4/5 mx-auto my-3"
              />
            </div>
          </div>
        </section>
      )}

      {activeTab === 'infographics' && (
        <section className="mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Infographics Coming Soon</h2>
          </div>
        </section>
      )}

      <button className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md">Find Resources</button>
    </div>
  );
};

export default Resource;
