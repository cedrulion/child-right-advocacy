import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Assets/unicef_logo.png'; // Replace with the correct path for your UNICEF logo

const Case = () => {
  const [activeTab, setActiveTab] = useState('reporting'); // 'reporting' or 'emergencies'
  const [formData, setFormData] = useState({
    reportAs: 'Adult',
    typeOfAbuse: 'Sexual',
    abusedChildName: '',
    abusedChildAge: '',
    abusedChildAddress: '',
    guardianName: '',
    guardianAddress: '',
    caseSuspectName: '',
    caseSuspectAge: '',
    caseSuspectRelation: '',
    caseSuspectAddress: '',
  });

  const [ageOfAbuse, setAgeOfAbuse] = useState(16);

  // Get the token from localStorage (for authenticated API requests)
  const token = localStorage.getItem('token');

  const handleTabSwitch = (tab) => setActiveTab(tab);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/report',
        formData, // Submit form data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers for authorization
          },
        }
      );
      console.log('Report submitted:', response.data);
      alert('Report submitted successfully');
    } catch (error) {
      console.error('Error submitting the report:', error);
      alert('Failed to submit the report.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-screen-lg mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-center text-center mt-5 mb-3">
          <img src={logo} alt="UNICEF Logo" className="h-10" />
          <h1 className="text-4xl font-bold text-gray-800">
            Child Rights <span className="text-blue-400">ADVOCACY</span>
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleTabSwitch('reporting')}
            className={`px-4 py-2 ${activeTab === 'reporting' ? 'bg-gray-300' : 'bg-gray-200'} rounded-lg`}
          >
            Case Reporting
          </button>
          <button
            onClick={() => handleTabSwitch('emergencies')}
            className={`px-4 py-2 ${activeTab === 'emergencies' ? 'bg-gray-300' : 'bg-gray-200'} rounded-lg`}
          >
            Case Emergencies
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'reporting' ? (
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Report as</label>
                <select
                  name="reportAs"
                  value={formData.reportAs}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="Adult">Adult</option>
                  <option value="Child">Child</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type of Abuse</label>
                <select
                  name="typeOfAbuse"
                  value={formData.typeOfAbuse}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="Sexual">Sexual</option>
                  <option value="Physical">Physical</option>
                  <option value="Emotional">Emotional</option>
                </select>
              </div>
            </div>

            {/* Abused Child Information */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Abused Child Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="abusedChildName"
                  placeholder="Abused Child Name"
                  value={formData.abusedChildName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="abusedChildAge"
                  placeholder="Age"
                  value={formData.abusedChildAge}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="abusedChildAddress"
                  placeholder="Address/Location"
                  value={formData.abusedChildAddress}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Guardian Information */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guardians Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="guardianName"
                  placeholder="Guardian Name"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="guardianAddress"
                  placeholder="Address/Email"
                  value={formData.guardianAddress}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Case Suspect Information */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Suspect Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="caseSuspectName"
                  placeholder="Suspected Person Name"
                  value={formData.caseSuspectName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="caseSuspectAge"
                  placeholder="Age"
                  value={formData.caseSuspectAge}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <select
                  name="caseSuspectRelation"
                  value={formData.caseSuspectRelation}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Is he/she a relative?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="caseSuspectAddress"
                  placeholder="Address/Email"
                  value={formData.caseSuspectAddress}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Report
            </button>
          </form>
        ) : (
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Emergencies</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age of Abuse</label>
                <select
                  value={ageOfAbuse}
                  onChange={(e) => setAgeOfAbuse(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  {[...Array(100).keys()].map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 text-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Health Emergencies</h4>
                <p>ISANGE One Stop Centre</p>
                <p className="text-blue-600">Call 3029</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Police & Law Emergencies</h4>
                <p>Rwanda Investigation Bureau</p>
                <p className="text-blue-600">Call 116</p>
                <p>Rwanda National Police</p>
                <p className="text-blue-600">Call 116</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Case;
