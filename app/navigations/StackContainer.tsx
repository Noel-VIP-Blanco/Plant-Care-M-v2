import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {LoginScreen, ChangePasswordAccountScreen, ContainersScreen, HarvestLogScreen, ProfileScreen, NotificationScreen} from "@screens/index";
import BottomTabContainer from "./BottomTabContainer";

const StackContainer = ({ initialRoute }: any) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen 
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="ChangePasswordScreen"
        component={ChangePasswordAccountScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="ContainersScreen"
        component={ContainersScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="HarvestLogScreen"
        component={HarvestLogScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="BottomTabContainer"
        component={BottomTabContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackContainer