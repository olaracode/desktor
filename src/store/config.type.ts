export type UserData = {
  name: string;
  pw: string;
};

export type ConfigData = {
  email: string;
  api_key: string;
  specialty: string;
  base_price: number;
};

export type ConfigForm = {
  email: string;
  apiKey: string;
  specialty: string;
  basePrice: number;
};

export type Config = ConfigData & {
  user_data: UserData;
};

export type ConfigResponse = {
  config_file: Config;
  message: string;
  status: "Complete" | "Setup" | "UserSetup";
};
export interface ConfigSlice {
  config: ConfigResponse | null;
  getFromFile: () => void;
  updateUser: (data: UserData) => Promise<boolean>;
  updateConfigData: (data: ConfigForm) => Promise<boolean>;
}
