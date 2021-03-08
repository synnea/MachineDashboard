import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Search from '../Dashboard/Search';
import Table from '../Machines/MachineTable';
import {
  Machine,
  Action,
  httpState,
  httpAction,
  State,
} from '../../helpers/typesAndInterfaces';
import MachineDetail from '../Machines/MachineDetail';
import LoadingIndicator from '../UI/LoadingIndicator';

const displayReducer = (curDisplayState: State, action: Action): any => {
  switch (action.type) {
    case 'SET':
      return {
        ...curDisplayState,
        displayMachines: action.displayMachines,
        originalData: action.originalData,
      };

    case 'SEARCH':
      if (action.id) {
        const stringedId = action.id.toString();

        if (stringedId !== '') {
          // helper function to slice ID to appropriate length
          const slicedId = (stringId: string) =>
            stringId.slice(0, stringedId.length);

          // create a searchId and set it to the length of the input
          const slicedArray = curDisplayState.originalData.map((machine) => ({
            ...machine,
            searchId: slicedId(machine.id.toString()),
          }));

          const filteredArray = slicedArray.filter((machine) => {
            return machine.searchId === stringedId;
          });

          return { ...curDisplayState, displayMachines: filteredArray };
        }
      }
      return {
        ...curDisplayState,
        displayMachines: curDisplayState.originalData,
      };
    default:
      return curDisplayState;
  }
};

const httpReducer = (curhttpState: httpState, action: httpAction) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, httpError: false };
    case 'ERROR':
      return { loading: false, httpError: true };
    case 'CLEAR':
      return { loading: false, httpError: curhttpState.httpError };
    default:
      return curhttpState;
  }
};

const initialState: State = {
  displayMachines: [],
  originalData: [],
};

const initialHttpState: httpState = {
  loading: false,
  httpError: false,
};

const Dashboard = () => {
  const [displayState, dispatch] = useReducer(displayReducer, initialState);
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialHttpState);

  useEffect(() => {
    fetchDisplayData();
  }, []);

  const fetchDisplayData = () => {
    dispatchHttp({ type: 'SEND', loading: true, httpError: false });
    axios
      .get('http://localhost:3001/machines')
      .then((resp) => {
        dispatch({
          type: 'SET',
          displayMachines: resp.data,
          originalData: resp.data,
        });
      })
      .catch(() => {
        dispatchHttp({ type: 'ERROR', loading: false, httpError: true });
      })
      .then(() =>
        dispatchHttp({
          type: 'CLEAR',
          loading: false,
          httpError: httpState.httpError,
        })
      );
  };

  const onSearchHandler = (searchContent: string): void => {
    const searchId = Number(searchContent);
    dispatch({
      type: 'SEARCH',
      id: searchId,
      displayMachines: displayState.displayMachines,
      originalData: displayState.originalData,
    });
  };

  let table: any = null;

  if (httpState.loading === true) table = <LoadingIndicator />;
  else if (httpState.httpError === true)
    table = <div>Sorry, we could not reach the data!</div>;
  else table = <Table data={displayState.displayMachines} />;

  return (
    <React.Fragment>
      <h1>Machine Dashboard</h1>
      <Search search={onSearchHandler} />
      {table}
    </React.Fragment>
  );
};

export default Dashboard;
