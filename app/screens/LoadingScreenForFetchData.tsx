import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectFarms } from "@reduxToolkit/Features/FarmSlice";
import { getFarm, setFarm } from "@root/utilities/shared/LocalStorage";
import { getAllContainers } from "@reduxToolkit/Features/ContainerSlice";
import { getAllArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { getAllPlant } from "@reduxToolkit/Features/PlantSlice";
import { getAllTasks } from "@reduxToolkit/Features/TaskSlice";

const LoadingScreenForFetchData = ({ navigation }: any) => {
  //get all data from aws database
  const dispatch = useAppDispatch();

  const farms = useAppSelector(selectFarms);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFarmId = await getFarm();
        console.log("All farms 22", farms);
        if (fetchedFarmId === null) {
          if (farms.length !== 0) {
            await setFarm(farms[0].id);
            await dispatch(getAllContainers(farms[0].id.toString()));
            await dispatch(getAllArduinoBoards(farms[0].id.toString()));
            await dispatch(getAllPlant(farms[0].id.toString()));
            await dispatch(getAllTasks(farms[0].id.toString()));
            navigation.navigate("BottomTabContainer");
          }
        }
        if (fetchedFarmId) {
          await dispatch(getAllContainers(fetchedFarmId));
          await dispatch(getAllArduinoBoards(fetchedFarmId));
          await dispatch(getAllPlant(fetchedFarmId));
          await dispatch(getAllTasks(fetchedFarmId));
          navigation.navigate("BottomTabContainer");
        }
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);
  return (
    <View style={styles.container}>
      <Text>Fetching necessary data...</Text>
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
    padding: 10,
  },
});
export default LoadingScreenForFetchData;