import React, { useState,useEffect } from 'react';
import '../style/control.css';
import { getDatabase, ref, set, onValue,off } from "firebase/database";

const Control = () => {
  const [button1On, setButton1On] = useState(false);
  const [button2On, setButton2On] = useState(false);
  const [moisture, setMoisture] = useState(null);
  const [day, setDay] = useState(0);
  const db = getDatabase();

  const moistureRef = ref(db, 'Data/Moisture');
  const dayRef = ref(db, 'Data/Day');


  useEffect(() => {
    onValue(moistureRef, (snapshot) => {
      const data = snapshot.val();
      setMoisture(data);
    });
    onValue(dayRef, (snapshot) => {
      const data = snapshot.val();
      setDay(data);
    });
  }, []);
  
  useEffect(() => {
    const fermentationRef = ref(db, "Data/Control/Fermentation");
    const dryingRef = ref(db, "Data/Control/Drying");
    const moistureRef = ref(db, "Data/Moisture");
    const dayRef = ref(db, "Data/Day");
    const handleFermentationChange = (snapshot) => {
      const fermentationValue = snapshot.val();
      if (fermentationValue === 1) {
        setButton1On(true);
        setButton2On(false);
      } else {
        setButton1On(false);

      }
    };
    
  
    const handleDryingChange = (snapshot) => {
      const dryingRefValue = snapshot.val();
      if (dryingRefValue === 0) {
        setButton2On(false);
      }
    };
    
  
    const handleMoistureAndDayChange = (moistureSnapshot, daySnapshot) => {
      const moistureData = moistureSnapshot.val();
      const dayData = daySnapshot.val();
    
      if (dayData < 5 || (dayData >= 5 && moistureData > 5.5 && moistureData < 7.5)) {
        setButton2On(false);
        set(dryingRef, 0);
      } else if (dayData === 5) {
        setButton2On(true);
        set(dryingRef, 1);
      } else {
        setButton2On(false);
        set(dryingRef, 1);
      }
    };
    
    
    
    
  
    onValue(fermentationRef, handleFermentationChange);
    onValue(dryingRef, handleDryingChange);
    onValue(moistureRef, (moistureSnapshot) => {
      onValue(dayRef, (daySnapshot) => {
        handleMoistureAndDayChange(moistureSnapshot, daySnapshot);
      });
    });
  
    // cleanup function to remove listeners
    return () => {
      off(fermentationRef, handleFermentationChange);
      off(dryingRef, handleDryingChange);
      off(moistureRef);
      off(dayRef);
    };
  }, [db]);
  
  
  
  
  
  

  const handleButton1Click = () => {
    set(ref(db, "Data/Control"), {
      Fermentation: !button1On ? 1 : 0,
      Drying: button2On ? 1 : 0,
    })
      .then(() => {
        setButton1On(!button1On);
      })
      .catch((error) => {
        console.error("Error updating database: ", error);
      });
  };

  const handleButton2Click = () => {
    const db = getDatabase();
    if (day < 5) {
      return; // do nothing if day is less than 5
    }
    set(ref(db, 'Data/Control'), {
      Fermentation: button1On ? 1 : 0,
      Drying: !button2On ? 1 : 0,
    }).then(() => {
      setButton2On(!button2On);
    }).catch((error) => {
      console.error("Error updating database: ", error);
    });
  }
  

  return (
    <div>
      <h1>Control for Fermentation and Drying</h1>
      <div className="toggle-switch">
        <h1>Fermentation</h1>
        <button
          className={`button ${button1On ? 'on' : 'off'}`}
          onClick={handleButton1Click}
          disabled={button2On}
        ></button>
        {button1On && <p>Fermentation is processing</p>}
      </div>
      <div className="toggle-switch">
        <h1>Drying</h1>
        <button
          className={`button ${button2On ? 'on' : 'off'}`}
          onClick={handleButton2Click}
          disabled={button1On || day < 5}  // disable button2 if day is less than 5
        ></button>
        {button2On && <p>Drying is processing</p>}
      </div>
    </div>
  );
}
  

export default Control;
