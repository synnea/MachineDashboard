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
  displayMachines: Machine[];
  originalData: Machine[];
}

export type Action = {
  type: string;
  displayMachines: Machine[];
  originalData: Machine[];
  id?: number;
};

export type httpAction = {
  type: string;
  loading: boolean;
  httpError: boolean;
};
