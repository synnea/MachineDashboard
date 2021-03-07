export interface Machine {
  id: string;
  searchId: string;
  name: string;
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

export type Action = {
  type: string;
  displayMachines: Machine[];
  originalData: Machine[];
  id: string;
};
