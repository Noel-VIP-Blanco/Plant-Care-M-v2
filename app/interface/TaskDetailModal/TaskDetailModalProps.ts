import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";

export type TaskDetailModalProps = {
  result: string[];
  visible: boolean;
  onClose: () => void;
  taskItem: TaskSerializableProps;
};
