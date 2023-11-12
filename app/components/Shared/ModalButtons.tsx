import { View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { dp, sp } from "@root/utilities/shared/SpDp";
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();
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
        textColor={colorScheme === "light" ? "black" : "white"}
        labelStyle={{ fontSize: sp(40) }}
        contentStyle={{ padding: dp(10), height: dp(130) }}
        style={{ flex: 1, margin: dp(10) }}
        className=" dark:bg-slate-500"
      >
        Cancel
      </Button>
      <Button
        mode="elevated"
        onPress={() => {
          onSave();
        }}
        textColor={colorScheme === "light" ? "black" : "white"}
        labelStyle={{ fontSize: sp(35) }}
        contentStyle={{
          padding: dp(10),
          height: dp(130),
        }}
        style={{ flex: 1, margin: dp(10) }}
        className=" bg-green-400 dark:bg-green-600"
      >
        {labelForSave}
      </Button>
    </View>
  );
};

export default ModalButtons;
