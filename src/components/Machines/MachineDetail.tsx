import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import { Machine } from '../../helpers/typesAndInterfaces';
import './MachineDetail.css';

export interface IMachineData {
  data: Machine[];
}

const MachineDetail = () => {
  const [allMachineData, setAllMachineData] = useState<IMachineData>();
  const [detailMachine, setDetailMachine] = useState<IMachineData>();
  const [error, setError] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.slice(1);

  useEffect(() => {
    fetchMachineData();
  }, []);

  useEffect(() => {
    if (!allMachineData) {
      return;
    } else {
      const machine = allMachineData.data.filter(
        (machine) => machine.id === id
      );
      setDetailMachine({ data: machine });
    }
  }, [allMachineData]);

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

  let displayError = null;

  if (error) {
    displayError = <h2>Sorry, something went wrong</h2>;
  }

  if (detailMachine) {
    machine = detailMachine.data;
  }

  return (
    <div className="detail-page">
      <h1>Machine Detail</h1>
      {displayError}
      {machine.map((machine) => {
        return (
          <div key={machine.id} className="machine-card">
            <div className="machine-info info">
              <h3>Machine Info</h3>
              <p>
                ID:
                {machine.id}
              </p>
              <p>Machine: {machine.name}</p>
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
