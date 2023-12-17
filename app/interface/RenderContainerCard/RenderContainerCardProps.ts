import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";
import { ContainerProps } from "@interface/DataProps/ContainerItemProps";

export interface RenderContainerCardProps {
  container: ContainerProps;
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<number[]>>;
  subIdFromNotify: subscribedIdFromNotify[];
  idFromFarm: currentUserProps[];
}
