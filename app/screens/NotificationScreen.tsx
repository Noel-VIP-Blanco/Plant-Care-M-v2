import { View, Image } from "react-native";
import axios from "axios";
import {
  Text,
  TouchableRipple,
  Button,
  Switch,
  Surface,
} from "react-native-paper";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
//shared
import { COLORS } from "@root/utilities/shared/Colors";
//stylesheet
import { ShowProfileStyle } from "@stylesheets/ShowProfile/ShowProfileStyle";
import { dp, sp } from "@root/utilities/shared/SpDp";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import {
  getCurrentUser,
  setCurrentUser,
} from "@root/utilities/shared/LocalStorage";
import { registerIndieID, unregisterIndieDevice } from "native-notify";
import { baseURL } from "@root/utilities/shared/BaseURL";
const NotificationScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUserr] =
    React.useState<currentUserProps | null>(null);

  //handle switched
  const [switchNotif, setSwitchNotif] = React.useState<boolean | undefined>(
    true
  );
  React.useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUserr(user);
        setSwitchNotif(currentUser?.allowNotifications);
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });
  }, []);

  React.useEffect(() => {
    setSwitchNotif(currentUser?.allowNotifications);
  }, [currentUser]);

  console.log(
    "Notification Screen current user" + currentUser?.allowNotifications
  );
  const onTogglePushNotifSwitch = () => {
    setSwitchNotif((prevState) => !prevState);
  };

  const profileImage = "../../assets/PlantCareImages/HydroponicLogo.png";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BACKGROUNDCOLOR }}>
      <View style={ShowProfileStyle.backArrowContiner}>
        <TouchableRipple
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" color="white" size={70} />
        </TouchableRipple>
      </View>

      <View style={ShowProfileStyle.profileDetailsContainer}>
        <View
          style={{
            marginTop: -60,
            alignItems: "center",
          }}
        >
          <View style={ShowProfileStyle.userImageContainer}>
            <Image
              source={require(profileImage)}
              style={{ height: dp(300), width: dp(300), borderRadius: 60 }}
            />
          </View>
          <Text
            style={{
              marginTop: dp(20),
              fontSize: sp(50),
              color: "black",
              textAlign: "center",
            }}
          >
            {currentUser?.role === "ROLE_FARMER" ? "FARMER" : ""}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#044d04",
                fontWeight: "bold",
              }}
            >
              Notification Setting
            </Text>
          </View>

          <Surface
            elevation={1}
            style={{
              borderRadius: 10,
              padding: 3,
              margin: 15,
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#097209",
                  fontWeight: "bold",
                }}
              >
                Allow Push Notification
              </Text>

              <Switch
                value={switchNotif ?? false}
                onValueChange={onTogglePushNotifSwitch}
              />
            </View>
          </Surface>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 30,
            }}
          >
            Turning this on will allow your device to receive push notification
          </Text>
        </View>
      </View>
      <View style={ShowProfileStyle.lowerButtonMainContainer}>
        <View style={ShowProfileStyle.buttonContainer}>
          <Button
            textColor="green"
            style={{ margin: 15 }}
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 50 }}
            mode="elevated"
            onPress={() => {
              // handleEdit();
              if (switchNotif === true) {
                registerIndieID(
                  `${currentUser?.id}`,
                  13240,
                  "JgacDlBDrMg8qvQWalJuRM"
                );
                axios.patch(`${baseURL}/api/v1/users/notification-toggle`, {
                  allowNotifications: true,
                });
                const updatedUser: currentUserProps = {
                  ...(currentUser as currentUserProps), // Use type assertion to currentUserProps
                  allowNotifications: true,
                };
                setCurrentUser({ currentUser: updatedUser });
              } else {
                axios.patch(`${baseURL}/api/v1/users/notification-toggle`, {
                  allowNotifications: switchNotif,
                });
                const updatedUser: currentUserProps = {
                  ...(currentUser as currentUserProps), // Use type assertion to currentUserProps
                  allowNotifications: false,
                };
                setCurrentUser({ currentUser: updatedUser });
                axios.delete(
                  `https://app.nativenotify.com/api/app/indie/sub/13240/JgacDlBDrMg8qvQWalJuRM/${currentUser?.id}`
                );
              }
              navigation.goBack();
            }}
          >
            Save
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
