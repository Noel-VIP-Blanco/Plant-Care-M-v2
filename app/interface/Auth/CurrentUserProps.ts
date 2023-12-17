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

export type subscribedIdFromNotify = {
  android_fcm_token: string[];
  expo_android_token: string[];
  expo_ios_token: null | string[];
  ios_apn_token: null | string[];
  sub_id: string;
};
