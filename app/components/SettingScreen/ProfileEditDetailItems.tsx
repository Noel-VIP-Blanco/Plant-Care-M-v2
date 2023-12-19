import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { IProfileEditDetailItem } from "../../interface/Settings/IProfileEditDetailItem";
import { ProfileEditDetailStyle } from "../../stylesheets/Setting/ProfileEditDetailStyle";

const ProfileEditDetailItems: React.FC<IProfileEditDetailItem> = ({
  tempDetailObject,
  tempDetailFunctionObject,
}) => {
  const { tempEmail, tempFirstName, tempLastName, tempUsername } =
    tempDetailObject;
  const { setTempEmail, setTempFirstName, setTempLastName, setTempUsername } =
    tempDetailFunctionObject;
  return (
    <View>
      <TextInput
        style={ProfileEditDetailStyle.textInputStyle}
        outlineStyle={{ borderColor: "green", borderRadius: 15 }}
        label="First Name"
        mode="outlined"
        value={tempFirstName}
        editable={true}
        onChangeText={(text) => {
          setTempFirstName(text);
        }}
      />
      <TextInput
        style={ProfileEditDetailStyle.textInputStyle}
        outlineStyle={{ borderColor: "green", borderRadius: 15 }}
        label="Last Name"
        mode="outlined"
        value={tempLastName}
        editable={true}
        onChangeText={(text) => {
          setTempLastName(text);
        }}
      />

      <TextInput
        style={ProfileEditDetailStyle.textInputStyle}
        outlineStyle={{ borderColor: "green", borderRadius: 15 }}
        label="Email Address"
        mode="outlined"
        value={tempEmail}
        editable={false}
        onChangeText={(text) => {
          setTempEmail(text);
        }}
      />

      <TextInput
        style={ProfileEditDetailStyle.textInputStyle}
        outlineStyle={{ borderColor: "green", borderRadius: 15 }}
        label="Username"
        mode="outlined"
        value={tempUsername}
        editable={false}
        onChangeText={(text) => {
          setTempUsername(text);
        }}
      />
    </View>
  );
};

export default ProfileEditDetailItems;
