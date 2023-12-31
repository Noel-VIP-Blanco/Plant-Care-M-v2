import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import React, { useEffect } from "react";

import { resetArduinoBoard } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { resetContainer } from "@reduxToolkit/Features/ContainerSlice";
import { resetFarm } from "@reduxToolkit/Features/FarmSlice";
import { resetPlant } from "@reduxToolkit/Features/PlantSlice";
import { resetTasks } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";
import { ActivityIndicator } from "react-native-paper";
import { Logout } from "@backend/Auth/auth";
import { removeAllLocalStorage } from "@root/utilities/shared/LocalStorage";
import { sp } from "@root/utilities/shared/SpDp";
const LoadingScreenForLogout = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const logout = async () => {
      dispatch(resetArduinoBoard());
      dispatch(resetContainer());
      dispatch(resetFarm());
      dispatch(resetPlant());
      dispatch(resetTasks());
      await removeAllLocalStorage();
      Logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    };
    logout();
  }, []);
  const logout = async () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
const styles = StyleSheet.create({
  text: { fontSize: sp(60) },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center the content horizontally
  },
  horizontal: {
    justifyContent: "space-around",
    padding: 10,
  },
});
export default LoadingScreenForLogout;
