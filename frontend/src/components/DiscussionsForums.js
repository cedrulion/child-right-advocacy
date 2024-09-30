import React from 'react';

const DiscussionsForums = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header Section */}
      <header className="bg-white w-full flex justify-between items-center py-4 px-8 shadow-lg">
        <img src="unicef-logo.png" alt="UNICEF Logo" className="h-12" />
        <h1 className="text-2xl font-bold text-blue-600">
          Child Rights <span className="text-black">ADVOCACY</span>
        </h1>
      </header>

      {/* Discussions & Forums Section */}
      <div className="px-10 py-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          DISCUSSIONS & FORUMS
        </h2>

        {/* Discussion Themes */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Discussion Themes</h3>
          <div className="space-y-4">
            {/* Discussion Theme 1 */}
            <div className="bg-gray-500 rounded-md p-4 flex justify-between items-center text-white text-lg">
              <span>Rights of Children in our Community.</span>
              <span className="text-sm">7 hours</span>
              <span className="text-blue-300">#AnthonyJ</span>
            </div>

            {/* Discussion Theme 2 */}
            <div className="bg-gray-500 rounded-md p-4 flex justify-between items-center text-white text-lg">
              <span>Parents Relationship affect child.</span>
              <span className="text-sm">3 hours</span>
              <span className="text-blue-300">#UmunnaEze</span>
            </div>
          </div>

          {/* Add New Theme Button */}
          <div className="flex justify-center mt-4">
            <button className="bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              +
            </button>
          </div>
        </div>

        {/* Discussion Forums */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Discussion Forums</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Forum 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-bold mb-2">Human Rights FORUM</h4>
              <p className="text-sm text-gray-600">GoogleMeet</p>
              <p className="text-sm text-gray-600 mb-4">10 July 2025 @07:30pm</p>
              <button className="bg-gray-800 text-white py-2 px-6 rounded-md">
                ➔ Click here to Attend
              </button>
            </div>

            {/* Forum 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-bold mb-2">
                UN-Child Watch ( Unicef Agents FORUM )
              </h4>
              <p className="text-sm text-gray-600">GoogleMeet</p>
              <p className="text-sm text-gray-600 mb-4">04 April 2025 @10:00am</p>
              <button className="bg-gray-800 text-white py-2 px-6 rounded-md">
                ➔ Click here to Attend
              </button>
            </div>

            {/* Forum 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-bold mb-2">
                UN-Child Watch ( Unicef Agents FORUM )
              </h4>
              <p className="text-sm text-gray-600">GoogleMeet</p>
              <p className="text-sm text-gray-600 mb-4">01 June 2025 @08:00 am</p>
              <button className="bg-gray-800 text-white py-2 px-6 rounded-md">
                ➔ Click here to Attend
              </button>
            </div>
          </div>

          {/* Add New Forum Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionsForums;
