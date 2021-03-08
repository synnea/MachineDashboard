import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import './MachineTable.css';
import { Machine, Row } from '../../helpers/typesAndInterfaces';

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

  const history = useHistory();

  const rowClickHandler = (id: string) => {
    const numId = Number(id);
    history.push(`/${numId}`, { state: props.data });
  };

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

  const table = (
    <DataTable
      pagination={true}
      className="table"
      columns={columns}
      data={rows}
      conditionalRowStyles={conditionalRowStyles}
      onRowClicked={(row) => rowClickHandler(row.id)}
      title="Machine Data"
    />
  );

  return <div>{table}</div>;
};

export default MachineTable;
