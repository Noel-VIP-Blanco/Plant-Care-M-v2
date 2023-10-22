import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectFarms } from "@reduxToolkit/Features/FarmSlice";

const ProfileScreen = () => {
  const farms = useAppSelector(selectFarms);
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        onPress={() => {
          console.log(farms);
        }}
      >
        Check Farms
      </Button>
    </View>
  );
};

export default ProfileScreen;
