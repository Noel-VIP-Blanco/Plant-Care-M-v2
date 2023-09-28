export enum PlantStatus {
  Grow = "Growing",
  Harvest = "Harvesting",
}
export type TaskItemProps = {
  taskId: string;
  plantId: string;
  contId: string;
  datePlanted: Date;
  dateExpectedHarvest: Date;
  status: PlantStatus;
  farmerName: string;
};

export type TaskItemSerializableProps = Omit<
  TaskItemProps,
  "datePlanted" | "dateExpectedHarvest"
> & {
  datePlanted: string;
  dateExpectedHarvest: string;
};
