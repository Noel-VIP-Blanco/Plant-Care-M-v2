import { setCurrentUserProps } from "@interface/Auth/CurrentUserProps";
import AsyncStorage from "@react-native-async-storage/async-storage";

//handling current logged in user
export const setCurrentUser = async ({ currentUser }: setCurrentUserProps) => {
  try {
    const jsonValue = JSON.stringify(currentUser);
    await AsyncStorage.setItem("ASYNC_CURRENTUSER", jsonValue);
  } catch (e) {
    console.log("LocalStorage.ts line 9 error", e);
  }
};

export const getCurrentUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("ASYNC_CURRENTUSER");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("LocalStorage.ts line 19 error", e);
  }
};

//handling token
export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("ASYNC_TOKEN", token);
  } catch (e) {
    console.log("LocalStorage.ts line 28 error", e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("ASYNC_TOKEN");
    return token;
  } catch (e) {
    console.log("LocalStorage.ts line 37 error", e);
  }
};

//handle remember me
export const setRememberMe = async (rememberMe: boolean) => {
  try {
    await AsyncStorage.setItem("ASYNC_REMEMBERME", rememberMe.toString());
  } catch (e) {
    console.log("LocalStorage.ts line 47 error", e);
  }
};

export const getRememberMe = async () => {
  try {
    const token = await AsyncStorage.getItem("ASYNC_REMEMBERME");
    return !!(token === "true");
  } catch (e) {
    console.log("LocalStorage.ts line 37 error", e);
  }
};

//handle post notification
export const setNotification = async (notification: boolean | undefined) => {
  try {
    if (notification) {
      await AsyncStorage.setItem("ASYNC_NOTIFICATION", notification.toString());
    } else {
      await AsyncStorage.setItem("ASYNC_NOTIFICATION", "true");
    }
  } catch (e) {
    console.log("LocalStorage.ts line 64 error", e);
  }
};

export const getNotification = async () => {
  try {
    const token = await AsyncStorage.getItem("ASYNC_NOTIFICATION");
    return !!(token === "true");
  } catch (e) {
    console.log("LocalStorage.ts line 73 error", e);
  }
};

//handle farm/s per user
export const setFarm = async (farm: number) => {
  try {
    await AsyncStorage.setItem("ASYNC_FARM", farm.toString());
  } catch (e) {
    console.log("LocalStorage.ts line 64 error", e);
  }
};

export const getFarm = async () => {
  try {
    const farmId = await AsyncStorage.getItem("ASYNC_FARM");
    return farmId;
  } catch (e) {
    console.log("LocalStorage.ts line 73 error", e);
  }
};

//delete all local storage after logout
export const removeAllLocalStorage = async () => {
  const keys = [
    "ASYNC_FARM",
    "ASYNC_REMEMBERME",
    "ASYNC_CURRENTUSER",
    "ASYNC_TOKEN",
  ];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
  }
};
