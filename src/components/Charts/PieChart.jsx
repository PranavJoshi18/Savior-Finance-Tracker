import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
ChartJS.register(ArcElement);
function PieChart(props) {
    const expenseData = props.trans
    .filter(transaction => transaction.type === "expense")
    .reduce((acc, { tag, amount }) => {
        const amt = parseInt(amount);
        acc[tag] = (acc[tag] || 0) + amt;
        return acc;
    }, {});
    const pieData = {
        labels: Object.keys(expenseData),
        datasets: [{
          data: Object.values(expenseData),
          backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#9966FF', '#FFCD56', '#6B5B95', '#88B04B', '#F7CAC9'],
          borderColor: '#000', // Border color of segments
          borderWidth: 3,
        }],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#FFF', // Color of legend text
            },
          },
          title: {
            display: true,
            text: 'Spendings',
            color: '#FFFFFF', // Title color
            font: {
              size: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return ` ${label}: ₹${value}`;
              },
            },
          },
        },
      };
    return (
        <div style={{width:"30%", cursor:"pointer"}}><Pie data={pieData} options={options} /></div>
    )
}

export default PieChart