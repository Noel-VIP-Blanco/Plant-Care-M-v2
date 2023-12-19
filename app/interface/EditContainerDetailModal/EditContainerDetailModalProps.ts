//interface
import {
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";
import {
  ArduinoBoardsProps,
  ArduinoBoardProps,
} from "@interface/DataProps/ArduinoBoardsProps";
import {
  PlantItemProps,
  PlantProps,
} from "@interface/DataProps/PlantItemProps";

export type EditContainerDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  closeContainerDetailModal: () => void;
  result: string[];
  dataForEditInitial: {
    containerObj: ContainerProps;
    arduinoBoardObj: ArduinoBoardProps | undefined;
    plantObj: PlantProps | undefined;
  };
};
