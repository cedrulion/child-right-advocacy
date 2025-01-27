import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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

const Statistics = () => {
  // Hardcoded case reports
  const caseReports = [
    { createdAt: '2025-01-01', type: 'awareness', status: 'resolved', solutionRate: 90 },
    { createdAt: '2025-01-15', type: 'engagement', status: 'pending', solutionRate: 70 },
    { createdAt: '2025-02-05', type: 'awareness', status: 'resolved', solutionRate: 80 },
    { createdAt: '2025-02-20', type: 'engagement', status: 'resolved', solutionRate: 75 },
    { createdAt: '2025-03-10', type: 'awareness', status: 'resolved', solutionRate: 95 },
  ];

  const [awarenessLevel, setAwarenessLevel] = useState(0);
  const [engagementLevel, setEngagementLevel] = useState(0);

  useEffect(() => {
    calculateAwarenessLevel(caseReports);
    calculateEngagementLevel(caseReports);
  }, []);

  const calculateAwarenessLevel = (reports) => {
    const totalReports = reports.length;
    if (totalReports === 0) return;
    const awarenessReports = reports.filter((report) => report.type === 'awareness');
    const awarenessPercentage = (awarenessReports.length / totalReports) * 100;
    setAwarenessLevel(awarenessPercentage.toFixed(2));
  };

  const calculateEngagementLevel = (reports) => {
    const totalReports = reports.length;
    if (totalReports === 0) return;
    const resolvedReports = reports.filter((report) => report.status === 'resolved');
    const engagementPercentage = (resolvedReports.length / totalReports) * 100;
    setEngagementLevel(engagementPercentage.toFixed(2));
  };

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
        fill: true,
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
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Cases Per Month</h3>
          <Line data={lineChartData} />
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Solution Rate / 100 vs. Month</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Community Awareness Level</h3>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${awarenessLevel}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              ></div>
            </div>
            <span className="text-gray-600">{awarenessLevel}%</span>
          </div>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Community Engagement Level</h3>
          <div className="flex items-center justify-center">
            <svg className="w-32 h-32">
              <circle cx="50%" cy="50%" r="45" stroke="#F5F5F5" strokeWidth="10" fill="none" />
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
            <span className="text-2xl font-bold absolute">{engagementLevel}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
