import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import DetailPage from './components/Machines/MachineDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Dashboard} />
        <Route path="/:id" component={DetailPage} />
      </div>
    </Router>
  );
}

export default App;
