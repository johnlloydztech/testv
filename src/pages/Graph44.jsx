import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import firebase from 'firebase/app';
import 'firebase/database';


const db = getDatabase(app);
const LineGraph = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = db.database().ref('data');
    dbRef.on('value', snapshot => {
      const values = snapshot.val();
      const labels = Object.keys(values);
      const data = Object.values(values);

      setData({
        labels,
        datasets: [
          {
            label: 'Data',
            data,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            lineTension: 0.1
          }
        ]
      });
    });
  }, []);

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
