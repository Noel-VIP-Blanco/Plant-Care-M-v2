type INotificationItem = {
  notifId: string;
  notifTitle: string;
  notifSubTitle: string;
  notifDate: Date;
  notifHasRead: boolean;
};

export const dummyNotifications: INotificationItem[] = [
  {
    notifId: "notif1",
    notifTitle: "Notification Title 1",
    notifSubTitle: "Notification subtitle 1",
    notifDate: new Date("2023-08-30"),
    notifHasRead: true,
  },
  {
    notifId: "notif2",
    notifTitle: "Notification Title 2",
    notifSubTitle: "Notification subtitle 2",
    notifDate: new Date("2023-08-30"),
    notifHasRead: true,
  },
  {
    notifId: "notif3",
    notifTitle: "Notification Title 3",
    notifSubTitle: "Notification subtitle 3",
    notifDate: new Date("2023-08-30"),
    notifHasRead: true,
  },
  {
    notifId: "notif4",
    notifTitle: "Notification Title 4",
    notifSubTitle: "Notification subtitle 4",
    notifDate: new Date("2023-08-30"),
    notifHasRead: true,
  },
  {
    notifId: "notif5",
    notifTitle: "Notification Title 5",
    notifSubTitle: "Notification subtitle 5",
    notifDate: new Date("2023-08-30"),
    notifHasRead: true,
  },
  {
    notifId: "notif6",
    notifTitle: "Notification Title 6",
    notifSubTitle: "Notification subtitle 6",
    notifDate: new Date("2023-08-30"),
    notifHasRead: false,
  },
  {
    notifId: "notif7",
    notifTitle: "Notification Title 7",
    notifSubTitle: "Notification subtitle 7",
    notifDate: new Date("2023-08-30"),
    notifHasRead: false,
  },
  {
    notifId: "notif8",
    notifTitle: "Notification Title 8",
    notifSubTitle: "Notification subtitle 8",
    notifDate: new Date("2023-08-30"),
    notifHasRead: false,
  },
];
