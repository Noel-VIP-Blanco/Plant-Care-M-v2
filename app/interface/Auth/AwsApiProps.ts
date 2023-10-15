export type FarmsProps = {
  id: number;
  name: string;
  location: string;
};
export interface ArduinoBoardProps {
  id: number;
  name: string;
  sensorMappings: null | any[]; // Replace 'any' with a more specific type if needed
  status: string;
}

export interface ContainersProps {
  id: number;
  name: string;
  arduinoDto: ArduinoBoardProps; // Replace 'any' with a more specific type if needed
  plantDto: PlantProps;
  farmId: number;
}
export interface AddContainersProps {
  name: string;
  arduinoDto: { id: number }; // Replace 'any' with a more specific type if needed
  plantDto: { id: number };
  farmId: number;
}
export interface PlantProps {
  id: number;
  name: string;
  maximumEc: number;
  maximumPh: number;
  minimumEc: number;
  minimumPh: number;
  daysToMaturity: string;
  farmId: number;
}
