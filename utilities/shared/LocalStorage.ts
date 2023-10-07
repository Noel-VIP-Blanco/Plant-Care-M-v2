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
