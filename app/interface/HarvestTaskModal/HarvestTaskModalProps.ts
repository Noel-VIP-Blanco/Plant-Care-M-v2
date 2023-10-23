import { ModalType } from "@interface/Modals/ModalType";

export enum HarvestOrRemove {
  Harvest = "Harvest",
  Remove = "Remove",
}
export type HarvestTaskModalProps = ModalType & {
  harvestTasksID: number[];
  harvestOrRemove: HarvestOrRemove;
};
