import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Table from '../Machines/MachineTable';
import { Machine, Action } from '../../helpers/types';

const displayReducer = (currentDisplay: Machine[], action: Action) => {
  switch (action.type) {
    case 'SET':
      return action.displayData;
    default:
      return currentDisplay;
  }
};

const Dashboard = () => {
  const [displayData, dispatch] = useReducer(displayReducer, []);

  useEffect(() => {
    fetchDisplayData();
  }, []);

  useEffect(() => {
    console.log(displayData);
  }, [displayData]);

  const fetchDisplayData = () => {
    axios.get('http://localhost:3001/machines').then((resp) => {
      dispatch({ type: 'SET', displayData: resp.data });
    });
  };

  return (
    <React.Fragment>
      <h1>Machine Dashboard</h1>
      <Table data={displayData} />
    </React.Fragment>
  );
};

export default Dashboard;
