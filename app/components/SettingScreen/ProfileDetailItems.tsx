import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import React from "react";

import { IProfileDetailItems } from "@interface/Settings/IDetailItems";

import { ProfileDetailStyle } from "@stylesheets/Setting/ProfilleDetailStyle";

const ProfileDetailItems: React.FC<IProfileDetailItems> = ({
  initialDetailObject,
}) =>  {
  const { firstName, role, lastName, username, email } =
    initialDetailObject;
  return (
    <View>
      <Text style={ProfileDetailStyle.detailItemTitleText}>First Name</Text>
      <TextInput
        mode="flat"
        value={firstName}
        editable={false}
        contentStyle={{ fontSize: 30, backgroundColor: "white" }}
        outlineStyle={{ borderRadius: 10 }}
      />
      <Text style={ProfileDetailStyle.detailItemTitleText}>Last Name</Text>
      <TextInput
        mode="flat"
        value={lastName}
        editable={false}
        contentStyle={{ fontSize: 30, backgroundColor: "white" }}
        outlineStyle={{ borderRadius: 10 }}
      />
      <Text style={ProfileDetailStyle.detailItemTitleText}>Email</Text>
      <TextInput
        mode="flat"
        value={email}
        editable={false}
        contentStyle={{ fontSize: 30, backgroundColor: "white" }}
        outlineStyle={{ borderRadius: 10 }}
      />
      <Text style={ProfileDetailStyle.detailItemTitleText}>Role</Text>
      <TextInput
        mode="flat"
        value={role}
        editable={false}
        contentStyle={{ fontSize: 30, backgroundColor: "white" }}
        outlineStyle={{ borderRadius: 10 }}
      />
      <Text style={ProfileDetailStyle.detailItemTitleText}> User Name</Text>
      <TextInput
        mode="flat"
        value={username}
        editable={false}
        contentStyle={{ fontSize: 30, backgroundColor: "white" }}
        outlineStyle={{ borderRadius: 10 }}
      />
    </View>
  );
};

export default ProfileDetailItems;
