import { Text } from 'react-native-paper';
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import StackContainer from './navigations/StackContainer';


const Index = () => {
    const user = {}
  return (
    <NavigationContainer>
        <StackContainer initialRoute={user ? "BottomTabContainer" : "Login"}/>
    </NavigationContainer>
  )
}

export default Index