import { ScrollView, View, Image } from "react-native";
import { Text, Button, TouchableRipple } from "react-native-paper";
import React, { useState } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@root/utilities/shared/Colors";

//style
import { ShowProfileStyle } from "@stylesheets/ShowProfile/ShowProfileStyle";
//component
import ProfileEditDetailItems from "@components/SettingScreen/ProfileEditDetailItems";
//iinterface
import { IEditProfile } from "@interface/Settings/IEditProfile";
import { useNavigation } from "@react-navigation/native";
import { dp, sp } from "@root/utilities/shared/SpDp";
const EditProfileScreen: React.FC<IEditProfile> = ({
  handleCancel,
  handleSave,
  tempDetailObject,
  tempDetailFunctionObject,
}) => {
  const profileImage = "../../assets/PlantCareImages/HydroponicLogo.png";
  console.log("role from edit profile", tempDetailObject.tempRole);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BACKGROUNDCOLOR }}>
      <View style={ShowProfileStyle.backArrowContiner}>
        <TouchableRipple
          onPress={() => {
            handleCancel();
          }}
        >
          <Ionicons name="arrow-back" color="white" size={70} />
        </TouchableRipple>
      </View>
      <View style={ShowProfileStyle.profileDetailsContainer}>
        <View
          style={{
            marginTop: -70,
            alignItems: "center",
          }}
        >
          <View style={ShowProfileStyle.userImageContainer}>
            {/* <Ionicons name="person" color="white" size={90} /> */}
            <Image
              source={require(profileImage)}
              style={{ height: dp(300), width: dp(300), borderRadius: 60 }}
            />
          </View>
        </View>

        <View
          style={{
            alignItems: "center",

            marginLeft: 90,
            marginTop: -30,
          }}
        >
          {/* <TouchableRipple
            onPress={() => {
              console.log("Change Profile Image Pressed");
            }}
            style={{ backgroundColor: "white", borderRadius: 50 }}
          >
            <Ionicons name="camera" color="black" size={35} />
          </TouchableRipple> */}
        </View>

        <Text
          style={{
            marginTop: dp(40),
            fontSize: sp(60),
            color: "black",
            textAlign: "center",
          }}
        >
          {tempDetailObject.tempRole === "ROLE_FARMER" ? "FARMER" : ""}
        </Text>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", margin: 15 }}>
            <View style={{ flex: 9 }}>
              <ScrollView style={{ marginBottom: 30 }}>
                {/* Render detail item for editing */}
                <ProfileEditDetailItems
                  tempDetailObject={tempDetailObject}
                  tempDetailFunctionObject={tempDetailFunctionObject}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <View style={ShowProfileStyle.lowerButtonMainContainer}>
        <View style={ShowProfileStyle.buttonContainer}>
          <Button
            textColor="green"
            style={{ margin: 10, flex: 1 }}
            mode="elevated"
            onPress={() => {}}
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 50 }}
          >
            Cancel
          </Button>
          <Button
            textColor="black"
            style={{ margin: 10, flex: 1 }}
            mode="elevated"
            onPress={() => {
              handleSave();
            }}
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ backgroundColor: "#a2ff8f", height: 50 }}
          >
            Save
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
