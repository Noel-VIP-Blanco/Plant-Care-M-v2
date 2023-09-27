import { ModalType } from "@interface/Modals/ModalType";
import { INotificationItem } from "@interface/Notification/NotificationProps";

export type OneNotificationModalProps = ModalType & {
  item: INotificationItem;
};
