import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { useAppDispatch } from "@reduxToolkit/Hooks";
import { getAllFarms } from "@reduxToolkit/Features/FarmSlice";
import { sp } from "@root/utilities/shared/SpDp";

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
      <Text style={styles.text}>Setting up your farm...</Text>
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
export default LoadingScreen;
