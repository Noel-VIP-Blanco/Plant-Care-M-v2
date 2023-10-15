import {
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";
import {
  PlantItemProps,
  PlantProps,
} from "@interface/DataProps/PlantItemProps";
import {
  TaskItemSerializableProps,
  TaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";

export type EditTaskDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  closeTaskDetailModal: () => void;
  dataForEditInitial: {
    taskObj: TaskSerializableProps;
    containerObj: ContainerProps | undefined;
    plantObj: PlantProps;
  };
};
