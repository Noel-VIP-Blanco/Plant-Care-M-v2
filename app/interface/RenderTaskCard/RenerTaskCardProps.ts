import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";

export type RenderTaskCardProps = {
  item: TaskSerializableProps;
  checkboxVisible: boolean;
  setCompleteTasksID: React.Dispatch<React.SetStateAction<string[]>>;
};
