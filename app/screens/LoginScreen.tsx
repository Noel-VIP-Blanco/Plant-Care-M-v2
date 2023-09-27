import { View, SafeAreaView, Image, Alert } from "react-native";
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

//components
import { ForgotPasswordModal } from "@components/index";
//stylesheets
import { LoginStyle } from "@stylesheets/index";

const LoginScreen = ({ navigation }: any) => {
  const plantCareLogo = "../../assets/PlantCareImages/PlantCareLogo.png";
  const [email, setEmail] = useState("");
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
            outlineStyle={LoginStyle.textInputOutline}
            style={LoginStyle.textInputStyle}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            left={<TextInput.Icon icon="lock" />}
            outlineStyle={LoginStyle.textInputOutline}
            style={LoginStyle.textInputStyle}
            mode="outlined"
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
              // signIn();
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
