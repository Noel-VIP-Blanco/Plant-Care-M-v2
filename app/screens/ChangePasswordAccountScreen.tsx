import { View, Image, Alert } from "react-native";
import { Text, Button, TextInput, TouchableRipple } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@root/utilities/shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

//stylesheets
import { ChangePasswordAccountStyle } from "@stylesheets/ChangePasswordAccount/ChangePasswordAccountStyle";
import { LoginStyle } from "@stylesheets/Login/LoginStyle";
import { dp, sp } from "@root/utilities/shared/SpDp";
import { baseURL } from "@root/utilities/shared/BaseURL";

const ChangePasswordAccountScreen = ({ navigation }: any) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const plantCareLogo = "../../assets/PlantCareImages/HydroponicLogo.png";

  const handleChangePassword = () => {
    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      Alert.alert("Missing Fields", "Fill up the necessary fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert("New Password do not match", "Check your new password");
      return;
    }
    axios
      .post(`${baseURL}/api/v1/auth/update-password`, {
        currentPassword: oldPassword,
        newPassword: confirmNewPassword,
      })
      .then(() => {
        navigation.navigate("LoadingScreenForSetupFarm");
      })
      .catch((err) => {
        Alert.alert("Error resetting password", err);
      });
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDCOLOR, flex: 1 }}>
      <View style={ChangePasswordAccountStyle.backButtonContainer}>
        <TouchableRipple
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={60} color="white" />
        </TouchableRipple>
      </View>

      <View
        className="bg-white dark:bg-slate-800"
        style={ChangePasswordAccountStyle.lowerContainer}
      >
        <View style={ChangePasswordAccountStyle.outerLogoContainer}>
          <View style={ChangePasswordAccountStyle.innerLogoContainer}>
            <Image
              source={require(plantCareLogo)}
              style={ChangePasswordAccountStyle.image}
            />
          </View>
        </View>

        <View style={ChangePasswordAccountStyle.outerTitleContainer}>
          <View style={ChangePasswordAccountStyle.innerTitleContainer}>
            <Text style={ChangePasswordAccountStyle.resetPasswordText}>
              Reset Password
            </Text>
          </View>
          <View style={{ marginHorizontal: dp(40) }}>
            <TextInput
              left={<TextInput.Icon icon="lock" />}
              outlineStyle={ChangePasswordAccountStyle.textInputOutline}
              style={{ fontSize: sp(35), margin: dp(6) }}
              secureTextEntry
              autoCapitalize="none"
              mode="outlined"
              label="Old Password"
              value={oldPassword}
              onChangeText={(value) => setOldPassword(value)}
            />
          </View>
          <View style={{ marginHorizontal: dp(40), marginTop: dp(25) }}>
            <TextInput
              left={<TextInput.Icon icon="lock" />}
              outlineStyle={ChangePasswordAccountStyle.textInputOutline}
              style={{ fontSize: sp(40), margin: dp(6) }}
              secureTextEntry
              autoCapitalize="none"
              mode="outlined"
              label="New Password"
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}
            />
          </View>
          <View style={{ marginHorizontal: dp(40), marginTop: dp(25) }}>
            <TextInput
              left={<TextInput.Icon icon="lock" />}
              outlineStyle={ChangePasswordAccountStyle.textInputOutline}
              style={{ fontSize: sp(40), margin: dp(6) }}
              secureTextEntry
              autoCapitalize="none"
              mode="outlined"
              label="Comfirm New Password"
              value={confirmNewPassword}
              onChangeText={(value) => setConfirmNewPassword(value)}
            />
          </View>
          <View style={{ marginHorizontal: dp(40), marginTop: dp(25) }}>
            <Button
              mode="contained"
              onPress={() => {
                handleChangePassword();
              }}
              style={LoginStyle.logInButton}
              labelStyle={{ fontSize: sp(40) }}
              contentStyle={{ height: dp(130) }}
            >
              Update Password
            </Button>
          </View>
        </View>
      </View>
      {/* For debugging puspose only */}
      {/* <Button
        onPress={async () => {
          const token = await AsyncStorage.getItem("userToken");
          console.log("TOKEN = " + token);
          console.log(user);
        }}
      >
        Check if user is logged in
      </Button> */}
    </SafeAreaView>
  );
};

export default ChangePasswordAccountScreen;
