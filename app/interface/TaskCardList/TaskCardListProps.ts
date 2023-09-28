import { TaskItemSerializableProps } from "@interface/DataProps/TaskItemProps";
export type TaskCardListProps = {
  filteredData: TaskItemSerializableProps[];
  checkboxVisible: boolean;
  setHarvestTasksID: React.Dispatch<React.SetStateAction<string[]>>;
};
