import { loginProps } from "@interface/Auth/AuthProps";
import { Alert } from "react-native";
export const Login = ({
  username,
  password,
  rememberMe,
  navigation,
}: loginProps) => {
  const baseURL = "http://ec2-184-73-6-113.compute-1.amazonaws.com:80";
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
        console.log("Token line", token);
      }
      return response.json();
    })
    .then((data) => {
      //checks if the username and password exist
      if (data.message === "Bad credentials") {
        Alert.alert("Bad Credentials", "No user found");
        return;
      }

      //if user login successfully
      if (password === "pass123") {
        navigation.navigate("ChangePasswordScreen");
      } else {
        console.log("Entering else block");
        navigation.navigate("BottomTabContainer");
      }
    })
    .catch((err) => {
      Alert.alert("Bad Credentials", "User does not exist");
      console.log("Error line ", err);
    });
};
