//interface
import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";
import { ArduinoBoardsProps } from "@interface/DataProps/ArduinoBoardsProps";
import { PlantItemProps } from "@interface/DataProps/PlantItemProps";
import {
  ArduinoBoardProps,
  ContainersProps,
} from "@interface/Auth/AwsApiProps";

export type EditContainerDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  closeContainerDetailModal: () => void;
  dataForEditInitial: {
    containerObj: ContainersProps | undefined;
    arduinoBoardObj: ArduinoBoardProps | undefined;
    plantObj: PlantItemProps | undefined;
  };
};
