import { loginProps } from "@interface/Auth/AuthProps";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import { baseURL } from "@root/utilities/shared/BaseURL";
import {
  setCurrentUser,
  setNotification,
  setRememberMe,
  setToken,
} from "@root/utilities/shared/LocalStorage";
import { Alert } from "react-native";

export const Logout = () => {
  fetch(baseURL + "/api/v1/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const Login = ({
  username,
  password,
  rememberMe,
  navigation,
}: loginProps) => {
  const requestBody = {
    username: username,
    password: password,
  };

  if (username === "" || password === "") {
    Alert.alert("Missing Fields", "Fill up the necessary fields");
    return;
  }

  fetch(baseURL + "/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    credentials: "include",
  })
    .then((response) => {
      let token = response.headers.get("Set-Cookie");
      if (token) {
        token = token.split(";")[0];
        //save to local storage
        setToken(token);
        console.log("Token line", token);
      }
      return response.json();
    })
    .then((data: currentUserProps) => {
      //checks if the username and password exist
      if (data.message === "Bad credentials") {
        Alert.alert("Bad Credentials", "User does not exist");
        return;
      }
      console.log(data);
      //if user login successfully
      if (password === "pass123") {
        //save to local storage
        setCurrentUser({ currentUser: data });
        setRememberMe(rememberMe);
        console.log("Allow notification saving to local from login ",data.allowNotifications)
        setNotification(data.allowNotifications)
        navigation.navigate("ChangePasswordScreen");
      } else {
        //save to local storage
        setCurrentUser({ currentUser: data });
        setRememberMe(rememberMe);
        console.log("Allow notification saving to local from login ",data.allowNotifications)
        setNotification(data.allowNotifications)
        navigation.navigate("LoadingScreenForSetupFarm");
      }
    })
    .catch((err) => {
      Alert.alert("Bad Credentials", "User does not exist");
      console.log("Error line ", err);
    });
};
