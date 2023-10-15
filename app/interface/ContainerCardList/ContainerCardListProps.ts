import {
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";

export interface ContainerCardListProps {
  filteredData: ContainerProps[];
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<number[]>>;
}
