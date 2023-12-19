import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";
import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";
export type TaskCardListProps = {
  subIdFromNotify: subscribedIdFromNotify[];
  idFromFarm: currentUserProps[];
  filteredData: TaskSerializableProps[];
  checkboxVisible: boolean;
  setHarvestTasksID: React.Dispatch<React.SetStateAction<number[]>>;
};
