export type INotificationItem = {
  notifId: string;
  notifTitle: string;
  notifSubTitle: string;
  notifDate: Date;
  notifHasRead: boolean;
};

export type NotificationItemProps = {
  notification: INotificationItem;
};
