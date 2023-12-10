export type currentUserProps = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: string;
  username: string;
  allowNotifications: boolean;
  message?: string;
};

export type setCurrentUserProps = {
  currentUser: currentUserProps;
};
