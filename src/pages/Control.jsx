import React, { useState, useEffect } from "react";
import "../style/control.css";
import {
  getDatabase,
  ref,
  set,
  onValue,
  off
} from "firebase/database";

const Control = () => {
  const [button1On, setButton1On] = useState(false);
  const [button2On, setButton2On] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const fermentationRef = ref(db, "Data/Control/Fermentation");
    const dryingRef = ref(db, "Data/Control/Drying");

    const handleFermentationChange = (snapshot) => {
      const fermentationRefValue = snapshot.val();
      if (fermentationRefValue === 1) {
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
      else{
        setButton2On(true);
      }
    };

    onValue(fermentationRef, handleFermentationChange);
    onValue(dryingRef, handleDryingChange);

    // cleanup function to remove listeners
    return () => {
      off(fermentationRef, handleFermentationChange);
      off(dryingRef, handleDryingChange);
    };
  }, [db]);
  
  const handleButton1Click = () => {
    const dryingRef = ref(db, "Data/Control/Drying");
    if (button2On) {
      alert("Drying process is on going");
      return;
    }
    if (button1On) {
      set(ref(db, "Data/Control"), {
        Fermentation: 0,
        Drying: button2On ? 1 : 0,
      })
        .then(() => {
          setButton1On(false);
        })
        .catch((error) => {
          console.error("Error updating database: ", error);
        });
    } else {
      set(ref(db, "Data/Control"), {
        Fermentation: 1,
        Drying: button2On ? 1 : 0,
      })
        .then(() => {
          setButton1On(true);
        })
        .catch((error) => {
          console.error("Error updating database: ", error);
        });
    }
  };
  
  
  
  const handleButton2Click = () => {
    const dryingRef = ref(db, "Data/Control/Drying");
    const fermentationRef = ref(db, "Data/Control/Fermentation");
    if (!button2On) { // check if button2On is false
      return;
    }
    if (button2On) { // check if button2On is true
      const stopDrying = window.confirm(
        "Are you sure you want to stop the drying process?"
      );
      if (stopDrying) {
        set(ref(db, "Data/Control"), {
          Fermentation: button1On ? 1 : 0,
          Drying: 0,
        }).then(() => {
          setButton2On(false);
        }).catch((error) => {
          console.error("Error updating database: ", error);
        });
      }
      return;
    }
    set(ref(db, "Data/Control"), {
      Fermentation: button1On ? 1 : 0,
      Drying: !button2On ? 1 : 0,
    }).then(() => {
      setButton2On(!button2On);
    }).catch((error) => {
      console.error("Error updating database: ", error);
    });
  };
  
  
  

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
          disabled={button1On }
        ></button>
        {button2On && <p>Drying is processing</p>}
      </div>
    </div>
  );
}
  

export default Control;
