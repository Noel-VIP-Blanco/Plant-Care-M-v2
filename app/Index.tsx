import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackContainer from "./navigations/StackContainer";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import {
  useGetAllFarmsQuery,
  useGetArduinoQuery,
  useGetContainersQuery,
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

  // const { data: arduino } = useGetArduinoQuery();
  // const { data: farms } = useGetAllFarmsQuery();
  const { data: containers } = useGetContainersQuery(1);
  // console.log("Index.tsx line 26 all arduino", arduino);
  // console.log("Index.tsx line 27 all farms", farms);
  console.log("Index.tsx line 28 all containers", containers);

  return (
    <NavigationContainer>
      <StackContainer initialRoute={user ? "BottomTabContainer" : "Login"} />
    </NavigationContainer>
  );
};

export default Index;

// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import StackContainer from "./navigations/StackContainer";
// import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
// import { onValue, ref } from "firebase/database";
// import {
//   useGetAllFarmsQuery,
//   useGetArduinoQuery,
//   useGetContainersQuery,
// } from "@backend/RTKQuery/Services/awsAPI";
// import { Text } from "react-native-paper";

// const Index = () => {
//   const user = null;
//   const db = FIREBASE_DATABASE;
//   let currentTDS;
//   const starCountRef = ref(db, "farm5/arduinoBoard5/currentWaterLevel");
//   onValue(starCountRef, (snapshot) => {
//     currentTDS = snapshot.val();
//   });
//   console.log("Current firebase data index.ts line 21", currentTDS);

//   const { data: arduino, isLoading: arduinoIsLoading } = useGetArduinoQuery();
//   const { data: farms, isLoading: farmsIsLoading } = useGetAllFarmsQuery();
//   const { data: containers, isLoading: containersIsLoading } =
//     useGetContainersQuery(1);

//   const [isDataLoaded, setIsDataLoaded] = useState(false);

//   useEffect(() => {
//     if (!arduinoIsLoading && !farmsIsLoading && !containersIsLoading) {
//       setIsDataLoaded(true);
//     }
//   }, [arduinoIsLoading, farmsIsLoading, containersIsLoading]);

//   if (!isDataLoaded) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <NavigationContainer>
//       <StackContainer initialRoute={user ? "BottomTabContainer" : "Login"} />
//     </NavigationContainer>
//   );
// };

// export default Index;
