import { View,Image } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState } from "react";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//stylesheets
import { SettingScreenStyle } from "@stylesheets/Setting/SettingScreenStyle";

//reduxtoolkit
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectUser } from "@reduxToolkit/Features/UserSlice";

//components
import UserImage from "@components/SettingScreen/UserImage";
import MyFarmItem from "@components/SettingScreen/MyFarmItem";
import MyAccountItemContainers from "@components/SettingScreen/MyAccountItemContainers";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import { getCurrentUser } from "@root/utilities/shared/LocalStorage";
import { dp, sp } from "@root/utilities/shared/SpDp";

const SettingScreen = ({ navigation }: any) => {
  const userImage = "../../assets/PlantCareImages/HydroponicLogo.png";

  const [currentUser, setCurrentUser] = React.useState<currentUserProps | null>(
    null
  );
  React.useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });
  }, []);
  return (
    <View style={{ backgroundColor: COLORS.BACKGROUNDCOLOR, flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <View
        className="bg-white dark:bg-slate-800"
        style={{
          flex: 5,
          borderTopLeftRadius: dp(100),
          borderTopRightRadius: dp(100),
        }}
      >
        <View style={{ alignItems: "center" }}>
          {/* <UserImage photoURL={userImage} /> */}
          <Image
              source={require(userImage)}
              style={{ height: dp(300), width: dp(300), marginTop:dp(-120),borderRadius: 60 }}
            />
          <Text style={{ fontSize: sp(40) }}>
            {currentUser?.role === "ROLE_FARMER" ? "FARMER" : "ADMIN"}
          </Text>
        </View>

        <View style={SettingScreenStyle.accountTextContainer}>
          <Text
            className="text-green-800 dark:text-green-400"
            style={SettingScreenStyle.accountText}
          >
            My Account
          </Text>
        </View>

        {/* Render the items in account detail item */}
        <View
          className="bg-white dark:bg-slate-500"
          style={SettingScreenStyle.myAccountContainer}
        >
          <MyAccountItemContainers navigation={navigation} />
        </View>

        <View style={SettingScreenStyle.accountTextContainer}>
          <Text
            className="text-green-800 dark:text-green-400"
            style={SettingScreenStyle.accountText}
          >
            My Farm
          </Text>
        </View>

        {/* Render the item in farm item */}
        <View style={SettingScreenStyle.myAccountContainer}>
          <MyFarmItem navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;
