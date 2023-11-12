import { View, Image } from "react-native";
import {
  Text,
  TouchableRipple,
  Button,
  Switch,
  Surface,
} from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
//shared
import { COLORS } from "@root/utilities/shared/Colors"; 
//stylesheet
import { ShowProfileStyle } from "@stylesheets/ShowProfile/ShowProfileStyle";
import { dp, sp } from "@root/utilities/shared/SpDp";
const NotificationScreen = () => {
  const navigation = useNavigation();
  //handle switched
  const [isPushNotifSwitchOn, setIsPushNotifSwitchOn] = useState(true);
  const onTogglePushNotifSwitch = () =>
    setIsPushNotifSwitchOn(!isPushNotifSwitchOn);

  const profileImage = "../../assets/PlantCareImages/PlantCareLogo.png";

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BACKGROUNDCOLOR }}>
      <View style={ShowProfileStyle.backArrowContiner}>
        <TouchableRipple
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" color="white" size={70} />
        </TouchableRipple>
      </View>

      <View style={ShowProfileStyle.profileDetailsContainer}>
        <View
          style={{
            marginTop: -60,
            alignItems: "center",
          }}
        >
          <View style={ShowProfileStyle.userImageContainer}>
            <Image
              source={require(profileImage)}
              style={{ height: dp(300), width: dp(300), borderRadius: 60 }}
            />
          </View>
          <Text style={{ fontSize: sp(50) }}>Admin</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#044d04",
                fontWeight: "bold",
              }}
            >
              Notification Setting
            </Text>
          </View>
          <Surface
            elevation={1}
            style={{
              borderRadius: 10,
              padding: 3,
              margin: 15,
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#097209",
                  fontWeight: "bold",
                }}
              >
                Allow Push Notification
              </Text>

              <Switch
                value={isPushNotifSwitchOn}
                onValueChange={onTogglePushNotifSwitch}
              />
            </View>
          </Surface>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 30,
            }}
          >
            Turning this on will allow your device to receive push notification
          </Text>
        </View>
      </View>
      <View style={ShowProfileStyle.lowerButtonMainContainer}>
        <View style={ShowProfileStyle.buttonContainer}>
          <Button
            textColor="green"
            style={{ margin: 15 }}
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 50 }}
            mode="elevated"
            onPress={() => {
              // handleEdit();
            }}
          >
            Save
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NotificationScreen