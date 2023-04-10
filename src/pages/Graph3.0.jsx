import React, { useState, useEffect } from 'react';
import '../style/tablev1.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCrsBHji8SmH4dZVRLcHInRxFEmzrKx3Wo",
  authDomain: "cacao-test.firebaseapp.com",
  databaseURL: "https://cacao-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cacao-test",
  storageBucket: "cacao-test.appspot.com",
  messagingSenderId: "423532869885",
  appId: "1:423532869885:web:2a103afd6f51672af1e694"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const Graph = () => {
  const [currentDay, setCurrentDay] = useState(new Date().toLocaleDateString());
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    
    const dataRef = db.ref('Data/Loggings');


    dataRef.on('value', (snapshot) => {
      const newData = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const date = new Date(childData.timestamp * 1000); // Convert epoch time to milliseconds
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Format date string as "MM/DD/YYYY HH:MM:SS"
        if (formattedDate.includes(currentDay)) {
          newData.push({
            time: formattedDate,
            temp: childData.temperature,
            moisture: childData.moisture
          });
        }
      });
      setTemp(newData);
    });
  }, [currentDay]);

  const handleNextDayClick = () => {
    const nextDay = new Date(currentDay);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDay(nextDay.toLocaleDateString());
  }

  const handlePreviousDayClick = () => {
    const previousDay = new Date(currentDay);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDay(previousDay.toLocaleDateString());
  }

  return (
    <div className="Graph">
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={handlePreviousDayClick}>Previous Day</button>
        <span style={{ margin: '0 10px' }}>{currentDay}</span>
        <button onClick={handleNextDayClick}>Next Day</button>
      </div>
  
      <table style={{ margin: '0 auto', width: '80%' }}>
        <tr>
          <th>Time</th>
          <th>Temperature</th>
          <th>Moisture</th>
          
        </tr>
        {temp.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.time}</td>
              <td>{val.temp}</td>
              <td>{val.moisture}</td>
            
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Graph;
