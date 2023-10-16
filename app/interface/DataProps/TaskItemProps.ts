export enum PlantStatus {
  Grow = "GROWING",
  Harvest = "HARVESTING",
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

export type UpdateTaskProps = {
  containerId?: number;
  plantId: number;
};
export interface TaskProps {
  id: number;
  datePlanted: string;
  harvestDate: string;
  status: string;
  plantId: number;
  containerId: number;
  farmId: number;
  numberOfTasks: number;
}

export type TaskSerializableProps = Omit<
  TaskProps,
  "datePlanted" | "harvestDate"
> & {
  datePlanted: string;
  harvestDate: string;
};

export type AddTaskSerializableProps = {
  datePlanted: string;
  numberOfTasks: number;
  harvestDate: string;
  plantId: number;
};

export type TaskItemSerializableProps = Omit<
  TaskItemProps,
  "datePlanted" | "dateExpectedHarvest"
> & {
  datePlanted: string;
  dateExpectedHarvest: string;
};
