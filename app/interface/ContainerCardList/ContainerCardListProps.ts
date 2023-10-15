import { ContainersProps } from "@interface/Auth/AwsApiProps";
// import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

export interface ContainerCardListProps {
  filteredData: ContainersProps[];
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<string[]>>;
}
