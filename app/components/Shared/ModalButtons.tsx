import { View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { dp, sp } from "@root/utilities/shared/SpDp";

interface IModalButtons {
  labelForSave: string;
  onClose: () => void;
  onSave: () => void;
}
const ModalButtons: React.FC<IModalButtons> = ({
  onSave,
  onClose,
  labelForSave,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: dp(20),
      }}
    >
      <Button
        mode="elevated"
        onPress={() => {
          onClose();
        }}
        textColor="black"
        labelStyle={{ fontSize: sp(40) }}
        contentStyle={{ padding: dp(10), height: dp(130) }}
        style={{ flex: 1, margin: dp(10) }}
      >
        Cancel
      </Button>
      <Button
        mode="elevated"
        onPress={() => {
          onSave();
        }}
        textColor="black"
        labelStyle={{ fontSize: sp(40) }}
        contentStyle={{
          backgroundColor: "#44f321",
          padding: dp(10),
          height: dp(130),
        }}
        style={{ flex: 1, margin: dp(10) }}
      >
        {labelForSave}
      </Button>
    </View>
  );
};

export default ModalButtons;
