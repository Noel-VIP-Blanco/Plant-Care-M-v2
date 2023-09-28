import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import LoginScreen from "@screens/LoginScreen";
import ChangePasswordAccountScreen from "@screens/ChangePasswordAccountScreen";
import ContainersScreen from "@screens/ContainersScreen";
import HarvestLogScreen from "@screens/HarvestLogScreen";
import ProfileScreen from "@screens/ProfileScreen";
import NotificationScreen from "@screens/NotificationScreen";

import BottomTabContainer from "./BottomTabContainer";

const StackContainer = ({ initialRoute }: any) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContainersScreen"
        component={ContainersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HarvestLogScreen"
        component={HarvestLogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabContainer"
        component={BottomTabContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackContainer;
