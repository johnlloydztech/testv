import React, { useState, useEffect } from 'react';
import '../style/tablev1.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // current child index
  const [currentDayData, setCurrentDayData] = useState([]); // data for current day

  useEffect(() => {
    const dataRef = db.ref('Data/Loggings');
    const dayRef = dataRef.child(currentDayIndex + 1); // child reference for current day

    dayRef.on('value', (snapshot) => {
      const newData = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const date = new Date(childData.timestamp * 1000);
        let hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert to 12-hour format
        const formattedDate = `${date.toLocaleDateString()} ${hours}:${minutes.substr(-2)} ${period}`;
        newData.push({
          time: formattedDate,
          temp: childData.temperature,
          moisture: childData.moisture
        });
      });
      setCurrentDayData(newData);
    });
  }, [currentDayIndex]);

  const handleNextDayClick = () => {
    const nextDayIndex = currentDayIndex + 1;
    if (nextDayIndex < 5) {
      const dataRef = db.ref('Data/Loggings');
      const dayRef = dataRef.child(nextDayIndex + 1); // child reference for next day
  
      dayRef.once('value', (snapshot) => {
        if (snapshot.exists()) { // check if there is data for the next day
          setCurrentDayIndex(nextDayIndex);
        }
      });
    }
  }

  const handlePreviousDayClick = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  }

  const handleDownloadCSV = () => {
    const csvData = [["Time", "Temperature", "Moisture"]]; // header row
    currentDayData.forEach((val) => {
      csvData.push([val.time, val.temp, val.moisture]); // data rows
    });
    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(",")).join("\n");
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", `day${currentDayIndex + 1}_data.csv`);
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div>
      <h1>History Logs</h1>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={handlePreviousDayClick} style={{padding: '8px 16px'}}>&laquo; Previous Day</button>
        <span style={{ margin: '0 10px', fontSize: 'large', fontWeight: 'bold' }}>Day {currentDayIndex + 1}</span>
        {currentDayIndex < 1 || currentDayData.length > 0 ? (
          <button onClick={handleNextDayClick} style={{padding: '8px 16px'}}>Next Day &raquo;</button>
        ) : null}
        
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ margin: '0 auto', width: '100%', tableLayout: 'fixed' }}>
          <thead style={{ position: 'sticky', top: 0 }}>
            <tr>
              <th style={{ width: '30%' }}>Time</th>
              <th style={{ width: '35%' }}>Temperature (°C)</th>
              <th style={{ width: '35%' }}>Moisture (%)</th>
            </tr>
          </thead>
          <tbody>
            {currentDayData.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.time}</td>
                  <td>{val.temp} °C</td>
                  <td>{val.moisture} %</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={handleDownloadCSV} style={{padding: '8px 16px'}}>Download CSV</button>
        </div>
      </div>
    </div>
  );
}

export default Graph;
