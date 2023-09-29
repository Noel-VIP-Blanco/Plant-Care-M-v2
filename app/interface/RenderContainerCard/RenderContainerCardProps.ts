import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

export interface RenderContainerCardProps {
  item: ContainerItemProps;
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<string[]>>;
}
