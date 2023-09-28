import { TaskItemSerializableProps } from "@interface/DataProps/TaskItemProps";

export type RenderTaskCardProps = {
  item: TaskItemSerializableProps;
  checkboxVisible: boolean;
  setCompleteTasksID: React.Dispatch<React.SetStateAction<string[]>>;
};
