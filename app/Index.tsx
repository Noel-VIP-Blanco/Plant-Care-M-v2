import { Text } from 'react-native-paper';
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
const Index = () => {
    const user = {}
  return (
    <Text>{user ? "Has user":"No user"}</Text>
  )
}

export default Index