import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

import './MachineTable.css';
import { Machine } from '../../helpers/types';

interface TableProps {
  data: Machine[];
}

const conditionalRowStyles = [
  {
    when: (row: Row) => row.plc_alarm === 'true',
    style: {
      backgroundColor: 'lightsalmon',
    },
  },
];

interface Row {
  id: string;
  name: string;
  current_consumption: number;
  current_consumption_unit: string;
  temperature: number;
  plc_alarm: string;
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
    if (
      machine.live_data.plc_alarm === true ||
      machine.live_data.plc_alarm === false
    ) {
      return {
        id: machine.id,
        name: machine.name,
        current_consumption: machine.live_data.current_consumption,
        current_consumption_unit: machine.live_data.current_consumption_unit,
        temperature: machine.live_data.temperature,
        plc_alarm: machine.live_data.plc_alarm.toString(),
      };
    } else {
      return {
        id: machine.id,
        name: machine.name,
        current_consumption: machine.live_data.current_consumption,
        current_consumption_unit: machine.live_data.current_consumption_unit,
        temperature: machine.live_data.temperature,
        plc_alarm: '',
      };
    }
  });

  let table = null;

  if (props.data.length > 0) {
    table = (
      <DataTable
        pagination={true}
        className="table"
        columns={columns}
        data={rows}
        conditionalRowStyles={conditionalRowStyles}
        title="Machine Data"
      />
    );
  }

  return <div>{table}</div>;
};

export default MachineTable;
