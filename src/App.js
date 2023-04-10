import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Graph from './pages/Graph';
import Sidebar from './Sidebar/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Control from './pages/Control.jsx';
import Tutorial from './pages/Tutorial.jsx';
import About from './pages/About.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
          <Route path ="/dashboard" element={<Dashboard/>}/>
          <Route path ="/control" element={<Control/>}/>
          <Route path="/table" element={<Graph />} />
          <Route path ="/tutorial" element={<Tutorial/>}/>
          <Route path ="/about" element={<About/>}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
