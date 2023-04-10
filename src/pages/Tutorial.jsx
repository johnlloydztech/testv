import React from 'react'
import '../style/tutorial.css';

const Tutorial = () => {
  return (
    <div>
      <h1>How to use the Application</h1>
      <div className='box-margin'>
      <div className='box-data1'>
        <div className='text-margin'>
          <h3>I. Using the system for the whole process.</h3>
          <br></br>
          <p>Step 1. Prepare the fresh cacao beans.</p>
          <br></br>
          <p>Step 2. Put the fresh cacao beans inside the chamber.</p>
          <br></br>
          <p>Step 3. After putting the cacao beans in the chamber, make sure to close the chamber.</p>
          <br></br>
          <p>Step 4. Start the process in the control tab by switching on the fermentation button located in the control tab of the websiste application.</p>
          <br></br>
          <p>comment Step 5. Wait to finish the fermentation and drying process.</p>
          <br></br>
          <p>Step 6. Pull out the cacao beans from the chamber.</p>
        </div>
      </div>
      <div className='box-data1'>
        <div className='text-margin'>
          <h3>II. Software application description.</h3>
          <br></br>
          <p>A. Dashboard - The display of all data in the system comprising of the day of process, status, temperature, moisture, pH, ambient temperature, PTC, exhaust fan, and motor.</p>
          <br></br>
          <p className='tab'>1. Temperature - The temperature range of cacao beans changes depending on the phase of fermentation process.</p>
          <br></br>
          <p className='tab'>2. Moisture - The moisture range of cacao beans is set on the drying process.</p>
          <br></br>
          <p className='tab'>3. pH - The pH of cacao beans is measured only in aerobic phase.</p>
          <br></br>
          <p className='tab'>4. Ambient Temperature - The ambient of cacao beans changes depending on the phase of fermentation and drying process.</p>
          <br></br>
          <p className='tab'>5. PTC - Heating Element that operates in the whole process depending on the temperature.</p>
          <br></br>
          <p className='tab'>6. Exhaust Fan - The fan will turn on in the aerobic phase and drying process if the ambient temperature is more than the required range.</p>
          <br></br>
          <p className='tab'>7. Motor - The motor will operate in aerobic phase and drying process for the mixing process.</p>
          <br></br>
          <p>B. Control - The control of fermentation and drying process.</p>
          <br></br>
          <p className='tab'>1. Fermentation - A button that will start the fermentation process when turned on.</p>
          <br></br>
          <p className='tab'>2. Drying - A button that will start the drying process when turned on.</p>
          <br></br>
          <p>C. History Logs - There will be a table will display the logs of temperature and moisture of each day in the whole process.</p>
          <br></br>
          <p>D. Tutorial - A tab that discusses the process to use the system and description of the website application.</p>
          <br></br>
          <p>E. About - Presents the whole team that made the hardware system and software application.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Tutorial
