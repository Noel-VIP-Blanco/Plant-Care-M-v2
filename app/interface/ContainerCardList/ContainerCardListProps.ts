import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";
import {
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";

export interface ContainerCardListProps {
  filteredData: ContainerProps[];
  checkboxVisible: boolean;
  setRemoveContainerID: React.Dispatch<React.SetStateAction<number[]>>;
  subIdFromNotify: subscribedIdFromNotify[];
  idFromFarm: currentUserProps[];
}
