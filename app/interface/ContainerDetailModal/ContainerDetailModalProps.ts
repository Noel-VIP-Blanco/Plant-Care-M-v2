//inteface
import {
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";

export type ContainerDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  result: string[];
  containerItem: ContainerProps;
};
