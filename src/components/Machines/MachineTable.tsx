import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

import './MachineTable.css';
import { Machine } from '../../helpers/types';

interface TableProps {
  data: Machine[];
}

const MachineTable = (props: TableProps) => {
  const columns = [
    {
      name: 'id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Current Consumption',
      selector: 'current_consumption',
      sortable: true,
    },
    {
      name: 'Current Consumption Unit',
      selector: 'current_consumption_unit',
      sortable: true,
    },
    {
      name: 'Temperature',
      selector: 'temperature',
      sortable: true,
    },
    {
      name: 'PLC Alarm',
      selector: 'plc_alarm',
      sortable: true,
    },
  ];

  const rows = props.data.map((machine) => {
    return {
      id: machine.id,
      name: machine.name,
      current_consumption: machine.live_data.current_consumption,
      current_consumption_unit: machine.live_data.current_consumption_unit,
      temperature: machine.live_data.temperature,
      plc_alarm: machine.live_data.plc_alarm,
    };
  });

  useEffect(() => {
    console.log('rows' + JSON.stringify(rows));
  });

  let table = null;

  if (props.data.length > 0) {
    table = (
      <DataTable
        className="table"
        columns={columns}
        data={rows}
        title="Machine Data"
      />
    );
  }

  return <div>{table}</div>;
};

export default MachineTable;
