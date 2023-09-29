//interface
import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";
import { ArduinoBoardsProps } from "@interface/DataProps/ArduinoBoardsProps";
import { PlantItemProps } from "@interface/DataProps/PlantItemProps";

export type EditContainerDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  closeContainerDetailModal: () => void;
  dataForEditInitial: {
    containerObj: ContainerItemProps | undefined;
    arduinoBoardObj: ArduinoBoardsProps | undefined;
    plantObj: PlantItemProps | undefined;
  };
};
