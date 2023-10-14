import { View, SafeAreaView, Image, Alert } from "react-native";
import {
  Button,
  Text,
  Checkbox,
  TextInput,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

//components
import ForgotPasswordModal from "@components/Login/ForgotPasswordModal";
//stylesheets
import { LoginStyle } from "@stylesheets/Login/LoginStyle";
//backend
import { Login } from "@backend/Auth/auth";

const LoginScreen = ({ navigation }: any) => {
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

      <View style={{ flex: 1 }}>
        <Surface elevation={5} style={LoginStyle.contentContainer}>
          <Text style={LoginStyle.titleText}>Plant-Care</Text>
          <Text style={LoginStyle.titleSubText}>Good to see you back.</Text>
          <TextInput
            left={
              <TextInput.Icon
                icon={() => <Ionicons name="person" size={25} />}
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
                <Text style={LoginStyle.forgotPasswordText}>
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
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 50 }}
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
