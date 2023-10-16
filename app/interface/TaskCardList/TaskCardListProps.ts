import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";
export type TaskCardListProps = {
  filteredData: TaskSerializableProps[];
  checkboxVisible: boolean;
  setHarvestTasksID: React.Dispatch<React.SetStateAction<number[]>>;
};
