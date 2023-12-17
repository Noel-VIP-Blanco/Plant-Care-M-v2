export type INotificationItem = {
  notifId: string;
  notifTitle: string;
  notifSubTitle: string;
  notifDate: Date;
  notifHasRead: boolean;
};

export type NotificationItemProps = {
  notification: NotificationType;
};

export type NotificationType = {
  id: number;
  date: string;
  content: string;
  title: string;
  readNotification: boolean;
};
