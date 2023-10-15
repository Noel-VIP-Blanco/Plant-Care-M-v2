export type ArduinoBoardsProps = {
  arduinoBoardId: string;
  arduinoBoardStatus: string;
  plantId: string;
  waterNutrient: string;
  waterLevel: string;
  waterAcidity: string;
  tempAndHumidity?: string;
};
export type ArduinoBoardProps = {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  sensorMappings: null | any[]; // Define the appropriate type for sensorMappings based on your data structure
};
