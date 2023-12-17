import { ModalType } from "@interface/Modals/ModalType";
import { NotificationType } from "@interface/Notification/NotificationProps";

export type OneNotificationModalProps = ModalType & {
  item: NotificationType;
};
