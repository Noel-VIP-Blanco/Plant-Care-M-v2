import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

export interface ContainerCardListProps {
  filteredData: ContainerItemProps[];
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<string[]>>;
}
