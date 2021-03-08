import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoadingIndicator from '../UI/LoadingIndicator';

import { useLocation } from 'react-router-dom';
import { Machine } from '../../helpers/typesAndInterfaces';
import './MachineDetail.css';

export interface IMachineData {
  data: Machine[];
}

// 'useReducer' would be a more elegant solution here, but I ran out of time to implement it.
// so using several useState instances instead.

// the visual design of this detail page is not great either; if I had more time I would look for a suitable layout template.

const MachineDetail = () => {
  const [allMachineData, setAllMachineData] = useState<IMachineData>();
  const [detailMachineData, setDetailMachineData] = useState<IMachineData>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [enteredName, setNewName] = useState('');

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.slice(1);

  useEffect(() => {
    fetchMachineData();
  }, []);

  useEffect(() => {
    if (!allMachineData) setLoading(true);
    else {
      setLoading(false);
      const machine = allMachineData.data.filter(
        (machine) => machine.id === Number(id)
      );
      setDetailMachineData({ data: machine });
    }
  }, [allMachineData, id]);

  useEffect(() => {
    if (editMode) {
    }
  }, [editMode]);

  const fetchMachineData = () => {
    axios
      .get('http://localhost:3001/machines')
      .then((resp) => {
        setAllMachineData({ data: resp.data });
      })
      .catch(() => {
        setError(true);
      });
  };

  let machine: Machine[] = [];

  if (detailMachineData) {
    machine = detailMachineData.data;
  }

  let display = null;

  if (loading) display = <LoadingIndicator />;

  if (error) display = <h2>Sorry, something went wrong</h2>;

  const onClickHandler = () => {
    setEditMode(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(e.target.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmitHandler();
    }
  };

  const onSubmitHandler = () => {
    if (detailMachineData) {
      const numId = Number(id);

      axios
        .put(`http://localhost:3001/machines/${numId}`, {
          ...machine[0],
          name: enteredName,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          setError(true);
        })
        .then(() => {
          setEditMode(false);
          fetchMachineData();
        });
    }
  };

  let button = (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={onClickHandler}
    >
      Update Name
    </Button>
  );

  return (
    <div className="detail-page">
      <h1>Machine Detail</h1>
      {display}
      {machine.map((machine) => {
        return (
          <div key={machine.id} className="machine-card">
            <div className="machine-info info">
              <h3>Machine Info</h3>
              <p>
                ID:
                {machine.id}
              </p>
              {editMode ? (
                <TextField
                  placeholder={machine.name}
                  value={enteredName}
                  onKeyPress={onKeyPressHandler}
                  onChange={onChangeHandler}
                ></TextField>
              ) : (
                <p id="name-field">
                  {machine.name} {button}
                </p>
              )}
              <p>Type: {machine.type}</p>
            </div>
            <div className="machine-info location">
              <h3>Location Info</h3>
              <p>Lat: {machine.location.lat}</p>
              <p>Lon: {machine.location.lon}</p>
            </div>
            <div className="machine-info contact">
              <h3>Contact Info</h3>
              <p>Name: {machine.contact.name}</p>
              <p>Phone: {machine.contact.phone}</p>
            </div>
            <div className="machine-info livedata">
              <h3>Live Data</h3>
              <p>State: {machine.live_data.state}</p>
              <p>CC: {machine.live_data.current_consumption}</p>
              <p>CCU: {machine.live_data.current_consumption_unit}</p>
              <p>Temperature: {machine.live_data.temperature}</p>
              <p>PLC Alarm: {machine.live_data.plc_alarm.toString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MachineDetail;
