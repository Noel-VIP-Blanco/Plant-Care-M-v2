export enum PlantStatus {
  Grow = "Growing",
  Harvest = "Harvesting",
}
export type ITaskItem = {
  taskId: string;
  plantId: string;
  contId: string;
  datePlanted: Date;
  dateExpectedHarvest: Date;
  status: PlantStatus;
  farmerName: string;
};

export type ITaskItemSerializable = Omit<
  ITaskItem,
  "datePlanted" | "dateExpectedHarvest"
> & {
  datePlanted: string;
  dateExpectedHarvest: string;
};
