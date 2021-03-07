import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Search from '../Dashboard/Search';
import Table from '../Machines/MachineTable';
import { Machine, Action } from '../../helpers/types';

interface State {
  displayMachines: Machine[];
  displayError: boolean | undefined;
}

const displayReducer = (curDisplayState: State, action: Action): any => {
  switch (action.type) {
    case 'SET':
      return {
        ...curDisplayState,
        displayError: undefined,
        displayMachines: action.displayMachines,
      };

    case 'SEARCH':
      const filteredId = curDisplayState.displayMachines.filter(
        (machine) => machine.id === action.id
      );
      if (filteredId.length === 1) {
        return {
          ...curDisplayState,
          displayError: false,
          displayMachines: filteredId,
        };
      } else {
        return { ...curDisplayState, displayError: true };
      }
    case 'CLEAR':
      return { ...curDisplayState, displayError: undefined };
    default:
      return curDisplayState;
  }
};

const initialState: State = {
  displayMachines: [],
  displayError: undefined,
};

const Dashboard = () => {
  const [displayState, dispatch] = useReducer(displayReducer, initialState);

  useEffect(() => {
    fetchDisplayData();
  }, []);

  useEffect(() => {
    console.log('displayError' + JSON.stringify(displayState.displayError));
  }, [displayState]);

  const fetchDisplayData = () => {
    axios.get('http://localhost:3001/machines').then((resp) => {
      dispatch({
        type: 'SET',
        displayMachines: resp.data,
      });
    });
  };

  const onSearchHandler = (searchContent: string): void => {
    dispatch({
      type: 'SEARCH',
      id: searchContent,
    });
  };

  const onClearFilterHandler = () => {
    fetchDisplayData();
  };

  return (
    <React.Fragment>
      <h1>Machine Dashboard</h1>
      <Search
        search={onSearchHandler}
        notFound={displayState.displayError}
        clearfilter={onClearFilterHandler}
      />
      <Table data={displayState.displayMachines} />
    </React.Fragment>
  );
};

export default Dashboard;
