import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";

export type TaskDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  taskItem: TaskSerializableProps;
};
