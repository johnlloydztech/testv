import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebaseconfig';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
)

// firebase database:get /path/to/data > data.json

const db = getDatabase(app);
// const dataRef = db.collection('data');
// const chartRef = ref(db, 'Data/chartT/1');
// const chartRef1 = ref(db, 'Data/chartT/2');
// const chartRef2 = ref(db, 'Data/chartT/3');
// const chartRef3 = ref(db, 'Data/chartT/4');
// const chartRef4 = ref(db, 'Data/chartT/5');

// const db = firebase.firestore();
// const dataRef = db.collection('Data/Temperature');

const Graph = () => {

    const databaseRef = firebase.database().ref("Data/chartT/time1");
//   const [chartTemp, setChartTemp] = useState();
//   const [chartTemp1, setChartTemp1] = useState();
//   const [chartTemp2, setChartTemp2] = useState();
//   const [chartTemp3, setChartTemp3] = useState();
//   const [chartTemp4, setChartTemp4] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await dataRef.get();
  //     const chartTemp = data.docs.map((doc) => doc.data());
  //     setChartTemp(chartTemp);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    onValue(chartRef, (snapshot) => {
      const data = snapshot.val();
      setChartTemp(data);
    });
  }, []);

  useEffect(() => {
    onValue(chartRef1, (snapshot) => {
      const data = snapshot.val();
      setChartTemp1(data);
    });
  }, []);

  useEffect(() => {
    onValue(chartRef2, (snapshot) => {
      const data = snapshot.val();
      setChartTemp2(data);
    });
  }, []);

  useEffect(() => {
    onValue(chartRef3, (snapshot) => {
      const data = snapshot.val();
      setChartTemp3(data);
    });
  }, []);

  useEffect(() => {
    onValue(chartRef4, (snapshot) => {
      const data = snapshot.val();
      setChartTemp4(data);
    });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('myChart');
    const oldChart = ChartJS.getChart('myChart');
    if (oldChart) {
      oldChart.destroy();
    }
    new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        datasets: [
          {
            label: 'Day 1',
            data: [chartTemp(i)],
            backgroundColor: 'blue',
            borderColor: 'black',
            pointBorderColor: 'black',
            fill: true,
            tension: 0.4,
            borderWidth: 1,
          },
        ],
      },  
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, );
  
  // const data = {
  //   labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
  //   datasets: [{
  //     label: 'Celcius',
  //     data: [5,6,9],
  //     backgroundColor: 'red',
  //     borderColor: 'black',
  //     pointBorderColor: 'aqua',
  //     fill: true,
  //     tension: 0.4,
  //     borderWidth: 1
  //     }
  //   ]
  // }

  // const options = {
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: true
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     }
  //   }
  // }

  const data1 = {
    labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
    datasets: [{
      label: 'Percentage',
      data: [1,15,10],
      backgroundColor: 'red',
      borderColor: 'black',
      pointBorderColor: 'aqua',
      fill: true,
      tension: 0.4,
      borderWidth: 1
      }
    ]
  }

  const options1 = {
    maintainAspectRatio: false,
    plugins: {
      legend: true
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  }

  return (
    <div>
      <h1>Temperature</h1>
      <div style={
        {
        width: '600px',
        height: '300px',
        padding: '20px'
        }
      }>
      <canvas id="myChart"></canvas>
      </div>
      {/* <div style={
        {
        width: '600px',
        height: '300px',
        padding: '20px'
        }
      }>
      <Line
        data={dataTemp}
        options={options}
      ></Line>
      </div> */}
      <h1>Moisture</h1>
      <div style={
        {
        width: '600px',
        height: '300px',
        padding: '20px'
        }
      }>
      <Line
        data={data1}
        options={options1}
      ></Line>
      </div>
    </div>
  );
}

export default Graph;
