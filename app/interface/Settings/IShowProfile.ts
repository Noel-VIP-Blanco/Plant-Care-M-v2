import { IProfileDetailItems } from "./IDetailItems";

export interface IShowProfile extends IProfileDetailItems {
  handleEdit: () => void; //React.Dispatch<React.SetStateAction<boolean>>
}