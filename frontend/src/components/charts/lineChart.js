import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Important: This automatically registers the chart type

const LineChart = () => {
  // Data for your chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Sales',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Options for your chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;