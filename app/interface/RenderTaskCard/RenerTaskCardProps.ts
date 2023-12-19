import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";
import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";

export type RenderTaskCardProps = {
  subIdFromNotify: subscribedIdFromNotify[];
  idFromFarm: currentUserProps[];
  item: TaskSerializableProps;
  checkboxVisible: boolean;
  setCompleteTasksID: React.Dispatch<React.SetStateAction<number[]>>;
};
