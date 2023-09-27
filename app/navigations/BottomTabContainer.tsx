import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen, SettingScreen, TaskScreen } from '@screens/index';
const BottomTabContainer = () => {
    const homeName = "Home";
    const settingName = "Setting";
    const taskName = "Task";
    const Tab = createBottomTabNavigator();
  return (
<Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#6cf549" },
        tabBarActiveTintColor: "#3aeb3a",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10, width: 100 },
        tabBarStyle: { padding: 10, height: 70 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            return (iconName = focused ? (
              <Ionicons name="home" size={size} color={color} />
            ) : (
              <Ionicons name="home-outline" size={size} color={color} />
            ));
          } else if (rn === taskName) {
            return (iconName = focused ? (
              <Ionicons name="list" size={size} color={color} />
            ) : (
              <Ionicons name="list-outline" size={size} color={color} />
            ));
          } else if (rn === settingName) {
            return (iconName = focused ? (
              <Ionicons name="settings" size={size} color={color} />
            ) : (
              <Ionicons name="settings-outline" size={size} color={color} />
            ));
          }
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={taskName}
        component={TaskScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={settingName}
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabContainer