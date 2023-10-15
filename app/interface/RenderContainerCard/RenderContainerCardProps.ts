import { ContainersProps } from "@interface/Auth/AwsApiProps";
// import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

export interface RenderContainerCardProps {
  container: ContainersProps;
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<string[]>>;
}
