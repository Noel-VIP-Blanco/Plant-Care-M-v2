import { Text } from "react-native-paper";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackContainer from "./navigations/StackContainer";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import {
  useGetAllFarmsQuery,
  useGetArduinoQuery,
} from "@backend/RTKQuery/Services/awsAPI";

const Index = () => {
  const user = null;
  const db = FIREBASE_DATABASE;
  let currentTDS;
  const starCountRef = ref(db, "farm5/arduinoBoard5/currentWaterLevel");
  onValue(starCountRef, (snapshot) => {
    currentTDS = snapshot.val();
  });
  console.log("Current firebase data index.ts line 21", currentTDS);

  const { data: arduino } = useGetArduinoQuery();
  const { data: farms } = useGetAllFarmsQuery();
  console.log("Index.tsx line 25 all arduino", arduino);
  console.log("Index.tsx line 26 all farms", farms);

  return (
    <NavigationContainer>
      <StackContainer initialRoute={user ? "BottomTabContainer" : "Login"} />
    </NavigationContainer>
  );
};

export default Index;
