export interface Machine {
  id: number;
  searchId: string;
  name: string;
  type: string;
  location: {
    lat: number;
    lon: number;
  };
  contact: {
    name: string;
    phone: number;
  };
  live_data: {
    state: string;
    current_consumption: number;
    current_consumption_unit: string;
    temperature: number;
    plc_alarm: boolean | string;
  };
}

export interface Row {
  id: number;
  name: string;
  state: string;
  current_consumption: number;
  current_consumption_unit: string;
  temperature: number;
  plc_alarm: string;
}

export interface httpState {
  loading: boolean;
  httpError: boolean;
}

export interface State {
  filteredMachines: Machine[];
  allMachines: Machine[];
}

export type Action = {
  type: string;
  filteredMachines: Machine[];
  allMachines: Machine[];
  id?: number;
};

export type httpAction = {
  type: string;
  loading: boolean;
  httpError: boolean;
};
