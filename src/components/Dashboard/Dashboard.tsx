import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Search from '../Dashboard/Search';
import Table from '../Machines/MachineTable';
import { Machine, Action } from '../../helpers/types';
import MachineDetail from '../Machines/MachineDetail';

interface State {
  displayMachines: Machine[];
  originalData: Machine[];
}

const displayReducer = (curDisplayState: State, action: Action): any => {
  switch (action.type) {
    case 'SET':
      return {
        ...curDisplayState,
        displayMachines: action.displayMachines,
        originalData: action.originalData,
      };

    case 'SEARCH':
      if (action.id.length !== 0) {
        // helper function to slice ID to appropriate length
        const slicedId = (id: string) => id.slice(0, action.id.length);

        // create a searchId and set it to the length of the input
        const array = curDisplayState.originalData.map((machine) => ({
          ...machine,
          searchId: slicedId(machine.id),
        }));

        // filter array, matching input to searchId
        const filteredArray = array.filter((machine) => {
          return machine.searchId === action.id;
        });

        return { ...curDisplayState, displayMachines: filteredArray };
      } else
        return {
          ...curDisplayState,
          displayMachines: curDisplayState.originalData,
        };
    default:
      return curDisplayState;
  }
};

const initialState: State = {
  displayMachines: [],
  originalData: [],
};

const Dashboard = () => {
  const [displayState, dispatch] = useReducer(displayReducer, initialState);

  useEffect(() => {
    fetchDisplayData();
  }, []);

  const fetchDisplayData = () => {
    axios.get('http://localhost:3001/machines').then((resp) => {
      dispatch({
        type: 'SET',
        id: '',
        displayMachines: resp.data,
        originalData: resp.data,
      });
    });
  };

  const onSearchHandler = (searchContent: string): void => {
    dispatch({
      type: 'SEARCH',
      id: searchContent,
      displayMachines: displayState.displayMachines,
      originalData: displayState.originalData,
    });
  };
  return (
    <React.Fragment>
      <h1>Machine Dashboard</h1>
      <Search search={onSearchHandler} />
      <Table data={displayState.displayMachines} />
    </React.Fragment>
  );
};

export default Dashboard;
