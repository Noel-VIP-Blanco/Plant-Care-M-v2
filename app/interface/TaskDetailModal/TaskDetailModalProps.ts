import { TaskItemSerializableProps } from "@interface/DataProps/TaskItemProps";

export type TaskDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  taskItem: TaskItemSerializableProps;
};
