import { ScrollView, View, Image } from "react-native";
import { Button, Text, TextInput, TouchableRipple } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@root/utilities/shared/Colors";

//styles
import { ShowProfileStyle } from '@stylesheets/ShowProfile/ShowProfileStyle'
//components
import ProfileDetailItems from '@components/SettingScreen/ProfileDetailItems'
//interface
import { IShowProfile } from '@interface/Settings/IShowProfile'
const ShowProfileScreen: React.FC<IShowProfile> = ({
    handleEdit,
    initialDetailObject,
  }) =>  {
    const navigation = useNavigation();
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
            style={{ height: 120, width: 120, borderRadius: 60 }}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{initialDetailObject.role}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", margin: 15 }}>
          <View style={{ flex: 9, borderBottomRightRadius: 30 }}>
            <ScrollView style={{ marginBottom: 30 }}>
              <ProfileDetailItems initialDetailObject={initialDetailObject} />
            </ScrollView>
          </View>
        </View>
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
            handleEdit();
          }}
        >
          Edit
        </Button>
      </View>
    </View>
  </SafeAreaView>
  )
}

export default ShowProfileScreen