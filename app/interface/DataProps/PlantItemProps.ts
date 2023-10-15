export type PlantItemProps = {
  plantID: string;
  plantName: string;
  plantDay: number;
  plantMinpH: number;
  plantMinEc: number;
  plantMaxpH: number;
  plantMaxEc: number;
};

export type PlantProps = {
  id: number;
  name: string;
  maximumEc: number;
  maximumPh: number;
  minimumEc: number;
  minimumPh: number;
  daysToMaturity: string;
  farmId: number;
};
