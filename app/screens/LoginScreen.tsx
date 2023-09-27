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
import { COLORS } from "@root/utilities/shared/Colors";

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
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.BACKGROUNDCOLOR,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            padding: 15,
            borderRadius: 70,
          }}
        >
          <Image
            source={require(plantCareLogo)}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Surface
          elevation={5}
          style={{
            marginTop: -150,
            padding: 7,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginHorizontal: 25,
          }}
        >
          <Text style={LoginStyle.titleText}>Plant-Care</Text>
          <Text style={LoginStyle.titleSubText}>Good to see you back.</Text>
          <TextInput
            left={
              <TextInput.Icon
                icon={() => <Ionicons name="person" size={25} />}
              />
            }
            outlineStyle={{ borderRadius: 30, borderColor: "#3dff3d" }}
            style={{ fontSize: 20, margin: 5 }}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            left={<TextInput.Icon icon="lock" />}
            outlineStyle={{ borderRadius: 30, borderColor: "#3dff3d" }}
            style={{ fontSize: 20, margin: 5 }}
            mode="outlined"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View
              style={{
                flexDirection: "row",

                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  marginRight: 5,
                  fontSize: 20,
                }}
              >
                Remember Me
              </Text>
              <Checkbox
                onPress={() => {
                  setRememberMe((prev) => !prev);
                }}
                status={rememberMe ? "checked" : "unchecked"}
              />
            </View>
            <View style={{ marginTop: 17, alignItems: "center" }}>
              <TouchableRipple
                onPress={() => {
                  openForgotPassModal();
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "green",
                  }}
                >
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
