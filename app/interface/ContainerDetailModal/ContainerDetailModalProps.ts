//inteface
import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

export type ContainerDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  containerItem: ContainerItemProps;
};
