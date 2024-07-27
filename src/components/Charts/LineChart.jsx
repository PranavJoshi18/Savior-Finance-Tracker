import React from 'react';
import './Chart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
function LineChart(props) {
      const arr = props.sortedTrans.map((item)=>{
        return {x:item.date,y:item.amount};
      })
      const data = {
        datasets: [{
          label: 'History',
          data: arr,
          borderColor: 'rgb(62, 162, 202)', //line color
          pointBackgroundColor: '#000',
          borderWidth: 3,
          pointRadius: 3,
        }],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF', // Color of the legend text
            },
          },
          title: {
            display: true,
            text: 'Transaction History',
            color: '#FFFFFF', // Title color
            font: {
              size: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label} : ₹ ${context.raw.y}`,
 
            },
            backgroundColor: '#333333', // Background color of tooltips
            titleColor: '#FFFFFF', // Title color of tooltips
            bodyColor: '#FFFFFF', // Body color of tooltips
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#FFFFFF', // Color of x-axis labels
            },
          },
          y: {
            ticks: {
              color: '#FFFFFF', // Color of y-axis labels
            },
          },
        },
        layout: {
          padding: 20,
        },
      };
      
      return (
        <div style={{width:"50%", cursor:"pointer"}}><Line data={data} options={options} /></div>
      )
}

export default LineChart