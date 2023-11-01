import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

//stylesheets
import { SettingScreenStyle } from "@stylesheets/Setting/SettingScreenStyle";
import {
  getCurrentUser,
  getRememberMe,
  getToken,
} from "@root/utilities/shared/LocalStorage";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import { sp } from "@root/utilities/shared/SpDp";

const MyAccountItemContainers = ({ navigation }: any) => {
  const [currentUser, setCurrentUser] = React.useState<currentUserProps | null>(
    null
  );

  //for testing purposes
  const [token, setToken] = React.useState<string>();
  const [rememberMe, setRememberMe] = React.useState<boolean>();
  React.useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });

    getToken()
      .then((tokenFromLocal) => {
        if (tokenFromLocal) {
          setToken(tokenFromLocal);
        }
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });

    getRememberMe()
      .then((rememberMeFromLocal) => {
        setRememberMe(rememberMeFromLocal);
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });
  }, []);
  currentUser === null ? console.log("Null") : console.log(currentUser.email);
  console.log(token === undefined ? "Undefined" : token);
  console.log(rememberMe === undefined ? "Undefined" : rememberMe);

  return (
    <>
      <View
        className="bg-white dark:bg-slate-500"
        style={SettingScreenStyle.itemContainer}
      >
        <View
          className="bg-white dark:bg-slate-500"
          style={SettingScreenStyle.accountBox1}
        >
          <Ionicons name="person" style={SettingScreenStyle.accountBox1Icon} />
          <Text
            className="text-black dark:text-white"
            style={SettingScreenStyle.itemTitleText}
          >
            Profile
          </Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={SettingScreenStyle.acountBox2Items}>
            <Text style={{ fontSize: sp(35) }}>{currentUser?.firstName}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            >
              <Ionicons
                name="arrow-forward"
                style={SettingScreenStyle.accountBox2Icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        className="bg-white dark:bg-slate-500"
        style={SettingScreenStyle.itemContainer}
      >
        <View style={SettingScreenStyle.accountBox1}>
          <Ionicons
            name="notifications"
            style={SettingScreenStyle.accountBox1Icon}
          />
          <Text style={SettingScreenStyle.itemTitleText}>Notifications</Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={SettingScreenStyle.acountBox2Items}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NotificationScreen");
              }}
            >
              <Ionicons
                name="arrow-forward"
                style={SettingScreenStyle.accountBox2Icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        className="bg-white dark:bg-slate-500"
        style={SettingScreenStyle.itemContainer}
      >
        <View style={SettingScreenStyle.accountBox1}>
          <Ionicons
            name="lock-closed"
            style={SettingScreenStyle.accountBox1Icon}
          />
          <Text style={SettingScreenStyle.itemTitleText}>Change Password</Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={SettingScreenStyle.acountBox2Items}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePasswordScreen");
              }}
            >
              <Ionicons
                name="arrow-forward"
                style={SettingScreenStyle.accountBox2Icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        className="bg-white dark:bg-slate-500"
        style={SettingScreenStyle.itemContainer}
      >
        <View style={SettingScreenStyle.accountBox1}>
          <Ionicons
            name="log-out-sharp"
            color="red"
            style={SettingScreenStyle.accountBox1Icon}
          />
          <Text
            className="text-red-700 dark:text-red-400"
            style={[SettingScreenStyle.itemTitleText, { fontWeight: "bold" }]}
          >
            Sign Out
          </Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoadingScreenForLogout");
              }}
            >
              <Ionicons
                name="arrow-forward"
                color="red"
                style={SettingScreenStyle.accountBox2Icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default MyAccountItemContainers;
