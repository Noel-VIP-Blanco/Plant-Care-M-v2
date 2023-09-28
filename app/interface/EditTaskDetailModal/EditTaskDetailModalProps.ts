import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";
import { PlantItemProps } from "@interface/DataProps/PlantItemProps";
import { TaskItemSerializableProps } from "@interface/DataProps/TaskItemProps";

export type EditTaskDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  closeTaskDetailModal: () => void;
  dataForEditInitial: {
    taskObj: TaskItemSerializableProps;
    containerObj: ContainerItemProps | undefined;
    plantObj: PlantItemProps;
  };
};
