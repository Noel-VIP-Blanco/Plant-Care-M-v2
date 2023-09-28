import { View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";

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
        marginTop: 10,
      }}
    >
      <Button
        mode="elevated"
        onPress={() => {
          onClose();
        }}
        textColor="black"
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ padding: 5 }}
        style={{ flex: 1, margin: 5 }}
      >
        Cancel
      </Button>
      <Button
        mode="elevated"
        onPress={() => {
          onSave();
        }}
        textColor="black"
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ backgroundColor: "#44f321", padding: 5 }}
        style={{ flex: 1, margin: 5 }}
      >
        {labelForSave}
      </Button>
    </View>
  );
};

export default ModalButtons;
