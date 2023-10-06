import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

//stylesheets
import { SettingScreenStyle } from "@stylesheets/Setting/SettingScreenStyle";

const MyAccountItemContainers = ({ navigation }: any) => {
  return (
    <>
      <View style={SettingScreenStyle.itemContainer}>
        <View style={SettingScreenStyle.accountBox1}>
          <Ionicons name="person" style={SettingScreenStyle.accountBox1Icon} />
          <Text>Profile</Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={SettingScreenStyle.acountBox2Items}>
            <Text>Michael Angelo Duran</Text>
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

      <View style={SettingScreenStyle.itemContainer}>
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

      <View style={SettingScreenStyle.itemContainer}>
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

      <View style={SettingScreenStyle.itemContainer}>
        <View style={SettingScreenStyle.accountBox1}>
          <Ionicons
            name="log-out-sharp"
            color="red"
            style={SettingScreenStyle.accountBox1Icon}
          />
          <Text style={{ color: "red" }}>Sign Out</Text>
        </View>
        <View style={SettingScreenStyle.accountBox2}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                // logout().then(() => {
                //   navigation.navigate("Login");
                // });
                //navigation.navigate("LoginScreen");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "LoginScreen" }],
                });
                // signOut(auth).then(() => {
                //   navigation.navigate("Login");
                // });
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
