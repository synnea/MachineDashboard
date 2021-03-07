import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Search from '../Dashboard/Search';
import Table from '../Machines/MachineTable';
import { Machine, Action } from '../../helpers/types';
import { responsiveFontSizes } from '@material-ui/core';

const displayReducer = (currentDisplay: Machine[], action: Action) => {
  switch (action.type) {
    case 'SET':
      return action.displayData;
    case 'SEARCH':
      const filteredId = currentDisplay.filter(
        (machine) => machine.id === action.id
      );
      if (filteredId === []) {
        // onErrorHandler();
      }
      return filteredId;
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
    // console.log(displayData);
  }, [displayData]);

  const fetchDisplayData = () => {
    axios.get('http://localhost:3001/machines').then((resp) => {
      dispatch({ type: 'SET', displayData: resp.data, id: '' });
    });
  };

  const onSearchHandler = (searchContent: number): void => {
    const stringId = searchContent.toString();
    dispatch({ type: 'SEARCH', displayData: displayData, id: stringId });
  };

  const onErrorHandler = () => {};

  return (
    <React.Fragment>
      <h1>Machine Dashboard</h1>
      <Search search={onSearchHandler} />
      <Table data={displayData} />
    </React.Fragment>
  );
};

export default Dashboard;
