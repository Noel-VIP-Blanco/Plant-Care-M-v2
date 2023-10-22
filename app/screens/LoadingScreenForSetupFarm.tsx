import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { getAllFarms, selectFarms } from "@reduxToolkit/Features/FarmSlice";
import { getFarm, setFarm } from "@root/utilities/shared/LocalStorage";
import { getAllContainers } from "@reduxToolkit/Features/ContainerSlice";
import { getAllArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { getAllPlant } from "@reduxToolkit/Features/PlantSlice";
import { getAllTasks } from "@reduxToolkit/Features/TaskSlice";

const LoadingScreen = ({ navigation }: any) => {
  //get all data from aws database
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //farm id should be get in local storage not hard coded
        await dispatch(getAllFarms());
        navigation.navigate("LoadingScreenForFetchData");
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <View style={styles.container}>
      <Text>Setting up your farm...</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
const styles = StyleSheet.create({
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
export default LoadingScreen;