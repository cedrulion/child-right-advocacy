import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

// Register the components that you're going to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BASE_URL = 'http://localhost:5000/api';

const Statistics = () => {
  const [caseReports, setCaseReports] = useState([]);
  const [awarenessLevel, setAwarenessLevel] = useState(0);
  const [engagementLevel, setEngagementLevel] = useState(0);
  const token = localStorage.getItem('token');

  const fetchCaseReports = async () => {
    const response = await axios.get(`${BASE_URL}/reports`, {
      headers: { Authorization: `Bearer ${token}` }, // Ensure token is defined
    });
    setCaseReports(response.data);

    // Call functions to dynamically calculate awareness and engagement levels
    calculateAwarenessLevel(response.data);
    calculateEngagementLevel(response.data);
  };

  useEffect(() => {
    fetchCaseReports();
  }, []);

  // Function to calculate Community Awareness Level based on the data
  const calculateAwarenessLevel = (reports) => {
    const totalReports = reports.length;
    if (totalReports === 0) return; // Avoid division by zero

    const awarenessReports = reports.filter((report) => report.type === 'awareness'); // Assuming 'type' field indicates the category
    const awarenessPercentage = (awarenessReports.length / totalReports) * 100;
    setAwarenessLevel(awarenessPercentage.toFixed(2)); // Set the calculated awareness level
  };

  // Function to calculate Community Engagement Level based on the data
  const calculateEngagementLevel = (reports) => {
    const totalReports = reports.length;
    if (totalReports === 0) return; // Avoid division by zero

    const resolvedReports = reports.filter((report) => report.status === 'resolved'); // Assuming 'status' indicates resolution
    const engagementPercentage = (resolvedReports.length / totalReports) * 100;
    setEngagementLevel(engagementPercentage.toFixed(2)); // Set the calculated engagement level
  };

  // Prepare data for Cases Per Month chart
  const casesPerMonthData = caseReports.reduce((acc, report) => {
    const month = new Date(report.createdAt).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const solutionRateData = caseReports.reduce((acc, report) => {
    const month = new Date(report.createdAt).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + (report.solutionRate || 0);
    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(casesPerMonthData),
    datasets: [
      {
        label: 'Cases Per Month',
        data: Object.values(casesPerMonthData),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(solutionRateData),
    datasets: [
      {
        label: 'Solution Rate / 100',
        data: Object.values(solutionRateData),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Cases Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Line Chart for Cases Per Month */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Cases Per Month</h3>
          <Line data={lineChartData} />
        </div>

        {/* Bar Chart for Solution Rate */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Solution rate / 100 vs. Month</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Community Awareness Level */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Community Awareness Level</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block text-gray-600">{awarenessLevel}%</span>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style={{ width: `${awarenessLevel}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              <div style={{ width: `${100 - awarenessLevel}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Community Engagement Level */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Community Engagement Level</h3>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45"
                  stroke="#F5F5F5"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45"
                  stroke="#FF6F61"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="282"
                  strokeDashoffset={282 - (engagementLevel / 100) * 282}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{engagementLevel}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
