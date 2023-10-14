//inteface
import { ContainersProps } from "@interface/Auth/AwsApiProps";
// import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

export type ContainerDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  containerItem: ContainersProps;
};
