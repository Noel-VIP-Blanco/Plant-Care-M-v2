export type currentUserProps = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: string;
  username: string;
  message?: string;
};

export type setCurrentUserProps = {
  currentUser: currentUserProps;
};
