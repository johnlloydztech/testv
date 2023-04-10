import React, { useState, useEffect } from 'react';
import '../style/dashboard.css';
import { MdOutlineWaterDrop} from "react-icons/md";
import { FaFan } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { FaTemperatureHigh } from "react-icons/fa";
import {GiHeatHaze} from "react-icons/gi";
import {BsFillDropletFill} from "react-icons/bs";
import {AiFillWarning} from "react-icons/ai";

import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebaseconfig';

const Dashboard = () => {
  const [temp, setTemp] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [pH, setpH] = useState(null);
  const [exhaustFan, setexhaustFan] = useState(null);
  const [motor, setMotor] = useState(null);
  // const [blowerFan, setblowerFan] = useState(null);
  const [heatingElement, setheatingElement] = useState(null);
  const [day, setDay] = useState(null);
  const [ambient, setAmbient] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningmoisture, setShowWarningmoisture] = useState(false);
  
  const db = getDatabase(app);
  const tempRef = ref(db, 'Data/Temperature'); //Temperature

  useEffect(() => {
    onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      setTemp(data);
    });
  }, []);

  const moistureRef = ref(db, 'Data/Moisture'); // Moisture

  useEffect(() => {
    onValue(moistureRef, (snapshot) => {
      const data = snapshot.val();
      setMoisture(data);
    });
  }, []);

  const pHRef = ref(db, 'Data/pH'); // pH

  useEffect(() => {
    onValue(pHRef, (snapshot) => {
      const data = snapshot.val();
      setpH(data);
    });
  }, []);

  const ambientRef = ref(db, 'Data/ambient'); // pH

  useEffect(() => {
    onValue(ambientRef, (snapshot) => {
      const data = snapshot.val();
      setAmbient(data);
    });
  }, []);

  // const fanRef = ref(db, 'Data/Blower_Fan'); // Exhaust Fan

  // useEffect(() => {
  //   onValue(fanRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setblowerFan(data);
  //   });
  // }, []);

  const motorRef = ref(db, 'Data/MOTOR'); // Motor

  useEffect(() => {
    onValue(motorRef, (snapshot) => {
      const data = snapshot.val();
      setMotor(data);
    });
  }, []);

  const exhaustFanRef = ref(db, 'Data/Exhaust_Fan'); // Motor

  useEffect(() => {
    onValue(exhaustFanRef, (snapshot) => {
      const data = snapshot.val();
      setexhaustFan(data);
    });
  }, []);

  const heatingElementRef = ref(db, 'Data/PTC'); // Motor

  useEffect(() => {
    onValue(heatingElementRef, (snapshot) => {
      const data = snapshot.val();
      setheatingElement(data);
    });
  }, []);

  const dayRef = ref(db, 'Data/day');

  useEffect(() => {
    onValue(dayRef, (snapshot) => {
      const data = snapshot.val();
      setDay(data);
    });
  }, []);
  const getAcceptedRange = () => {
    if (day === 1) {
      return <p>Accepted Range: 30 °C - 34 °C</p>;
    } else if (day === 2) {
      return <p>Accepted Range: 35 °C - 39 °C</p>;
    } else if (day === 3 || day === 4) {
      return <p>Accepted Range: 40 °C - 45 °C</p>;
    } else {
      return <p>No required value for temperature in Drying</p>;
    }
  };
  useEffect(() => {
    if (day <= 4 && (ambient < 30 || ambient > 40)) {
      setShowWarning(true);
    } else if (day > 4 && ambient >= 50) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [ambient, day]);

  useEffect(() => {
    if (day >= 5 && (moisture< 5.5 || moisture> 7.5)) {
      setShowWarningmoisture(true);
    } else {
      setShowWarningmoisture(false);
    }
  }, [moisture, day]);
  
  

  return (
    <div>
      <h1>Dashboard</h1>
      <h2 className='tab1'>Day {day}</h2>
      {day <= 2 ? (
        <p className='centered1'>Status: Fermentation on Process (Anaerobic Phase)</p>
      ) : day >= 3 && day <= 4 ? (
        <p className='centered1'>Status: Fermentation on Process (Aerobic Phase)</p>
      ) : day ===5 ? (
        <p className='centered1'>Status: Drying on Process</p>
      ) : (
        <p className='centered1'>Status: No current process</p>
      )}
      <div className="home-container">
        <div className="box">
          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <span>Temperature (Cacao)</span>
            <h1>{temp} °C</h1>
            {getAcceptedRange()}
            {(day === 1 && (temp < 30 || temp > 34)) ||
             (day === 2 && (temp < 35 || temp > 39)) ||
             ((day === 3 || day === 4) && (temp < 40 || temp > 45)) ? (
              <AiFillWarning className="danger" />
            ) : null}
          </div>
        </div>

        <div className="box">
          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <span>Ambient Temperature</span>
            <h1>{ambient} °C</h1>
            {day <= 4 ? (
              <p>Accepted Range: 30 °C - 40 °C</p>
            ) : (
              <p>Accepted Range: less than than 50 °C</p>
            )}
            {showWarning && <AiFillWarning className="danger" />}
          </div>
        </div>

        <div className="box">

          <div className="box-icon">
            <GiHeatHaze/>
          </div>
          <div className="box-data">
            <span>PTC</span>
            <h1>{heatingElement}</h1>
            <p class="centered">Provides heat to regulate the temperature </p>
          </div>
        </div>

        <div className="box">

          <div className="box-icon">
            <MdOutlineWaterDrop/>
          </div>
          <div className="box-data">
            <span>Moisture</span>
            <h1>{moisture} %</h1>
            {day <= 4 ? (
              <p>No required value for fermentation</p>
            ) : day === 5 ? (
              <p>Acceptable Range: 5.5 % - 7.5 %</p>
            ) : (
              <p>No required value for moisture</p>
            )}
              {showWarningmoisture && <AiFillWarning className="danger" />}
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <BsFillDropletFill />
          </div>
          <div className="box-data">
            <span>pH (Cotyledon)</span>
            <h1>{pH}</h1>
            {day <= 2 ? (
              <p>No required value for fermentation (anaerobic)</p>
            ) : day === 3 || day ===4 ? (
              <p>Acceptable Range: 4.8 - 6.5</p>
            ) : (
              <p>No require value for pH</p>
            )}
            
          </div>

        </div>

        {/* <div className="box">

          <div className="box-icon">
          <GiHeatHaze/>
          <FaFan/>
          </div>
          <div className="box-data">
            <span>Blower Fan</span>
            <h1>{blowerFan}</h1>
            <p class="centered">Activates to spread the heat from PTC</p>
          </div>

        </div> */}
      
        <div className="box">

          <div className="box-icon">
            <FaFan/>
          </div>
          <div className="box-data">  
            <span>Exhaust Fan</span>
            <h1>{exhaustFan}</h1>
            { day >= 1 && day <= 2 ? (
              <p class="centered">Will not turn on in this phase</p>
            ) : day === 3 || day === 4 ? (
              <p class="centered">Turns on when the ambient temperature is more than 40 °C</p>
            ) : (
              <p class="centered">Turns on when the ambient temperature is more than 49 °C</p>
            )}
          </div>

        </div>
        <div className="box">
          <div className="box-icon">
            <RiSettings2Line/>
          </div>
          <div className="box-data">
            <span>Motor</span>
            <h1>{motor}</h1>
            { day === 1 || day === 2 ? (
              <p class="centered">Will not turn on in this phase</p>
            ) : (
              <p class="centered">Operates the mixing process</p>
            )}
            
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default Dashboard

