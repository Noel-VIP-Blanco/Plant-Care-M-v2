import { Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackContainer from "./navigations/StackContainer";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import { onValue, ref } from "firebase/database";
import { getRememberMe } from "@root/utilities/shared/LocalStorage";
import LoadingScreenForCheckingUser from "@screens/LoadingScreenForCheckingUser";
import { View } from "react-native";

const Index = () => {
  const [user, setUser] = useState<boolean | undefined | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rememberMeFromLocal = await getRememberMe();
        setUser(rememberMeFromLocal);
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user !== null) {
          setLoading(false);
        }
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [user]);

  if (loading) {
    return (
      <LoadingScreenForCheckingUser
        showActivityIndicator={loading}
        title="Checking for Logged user..."
      />
    );
  }
  // const db = FIREBASE_DATABASE;
  // let currentTDS;
  // const starCountRef = ref(db, "farm5/arduinoBoard5/currentWaterLevel");
  // onValue(starCountRef, (snapshot) => {
  //   currentTDS = snapshot.val();
  //   console.log("Current TDS", currentTDS);
  // });

  return (
    <NavigationContainer>
      <StackContainer
        initialRoute={user ? "LoadingScreenForSetupFarm" : "Login"}
      />
    </NavigationContainer>
  );
};

export default Index;
