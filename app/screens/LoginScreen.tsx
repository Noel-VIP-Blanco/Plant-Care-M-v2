import { View, SafeAreaView, Image, Alert, PixelRatio } from "react-native";
import {
  Button,
  Text,
  Checkbox,
  TextInput,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

//components
import ForgotPasswordModal from "@components/Login/ForgotPasswordModal";
//stylesheets
import { LoginStyle } from "@stylesheets/Login/LoginStyle";
//backend
import { Login } from "@backend/Auth/auth";
import { dp, sp } from "@root/utilities/shared/SpDp";

const LoginScreen = ({ navigation }: any) => {
  const { colorScheme } = useColorScheme();

  console.log("Pixel Ratio", PixelRatio.getFontScale());
  const plantCareLogo = "../../assets/PlantCareImages/PlantCareLogo.png";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //forgot password modal
  const [forgotPassModalVisible, setForgotPassModalVisible] = useState(false);
  const openForgotPassModal = () => setForgotPassModalVisible(true);
  const closeForgotPassModal = () => setForgotPassModalVisible(false);
  return (
    <SafeAreaView style={LoginStyle.safeAreaView}>
      <View style={LoginStyle.mainContainer}>
        <View style={LoginStyle.logoContainer}>
          <Image source={require(plantCareLogo)} style={LoginStyle.logoImage} />
        </View>
      </View>

      <View className="bg-white dark:bg-slate-800" style={{ flex: 1 }}>
        <Surface
          elevation={5}
          className="bg-white dark:bg-slate-800"
          style={LoginStyle.contentContainer}
        >
          <Text
            className="text-green-800 dark:text-green-400"
            style={LoginStyle.titleText}
          >
            Plant-Care
          </Text>
          <Text style={LoginStyle.titleSubText}>Good to see you back.</Text>
          <TextInput
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name="person"
                    size={25}
                    color={colorScheme === "light" ? "black" : "white"}
                  />
                )}
              />
            }
            autoCapitalize="none"
            outlineStyle={LoginStyle.textInputOutline}
            style={LoginStyle.textInputStyle}
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
          <TextInput
            left={<TextInput.Icon icon="lock" />}
            outlineStyle={LoginStyle.textInputOutline}
            style={LoginStyle.textInputStyle}
            mode="outlined"
            autoCapitalize="none"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <View style={LoginStyle.utilitiesContainer}>
            <View style={LoginStyle.rememberMeContainer}>
              <Text style={LoginStyle.rememberMeText}>Remember Me</Text>
              <Checkbox
                onPress={() => {
                  setRememberMe((prev) => !prev);
                }}
                status={rememberMe ? "checked" : "unchecked"}
              />
            </View>
            <View style={LoginStyle.forgotPasswordContainer}>
              <TouchableRipple
                onPress={() => {
                  openForgotPassModal();
                }}
              >
                <Text
                  className="text-green-800 dark:text-green-400"
                  style={LoginStyle.forgotPasswordText}
                >
                  Forgot Password?
                </Text>
              </TouchableRipple>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              Login({ username, password, rememberMe, navigation });
            }}
            style={LoginStyle.logInButton}
            labelStyle={{ fontSize: sp(40) }}
            contentStyle={{ height: dp(115) }}
          >
            Sign in
          </Button>
        </Surface>
        <ForgotPasswordModal
          visible={forgotPassModalVisible}
          onClose={closeForgotPassModal}
        />
        {/* <ActivityIndicatorModal
        title="Fetching data"
        showActivityIndicator={loading}
      /> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
