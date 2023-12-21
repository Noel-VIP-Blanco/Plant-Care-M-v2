import { View, Image } from "react-native";
import { Text, Surface, Button } from "react-native-paper";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@root/utilities/shared/Colors";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

//stylesheets
import { HomeScreenItemStyle } from "@stylesheets/Home/HomeScreenItemStyle";
import { dp, sp } from "@root/utilities/shared/SpDp";
//type
type IHomeScreenItems = {
  navigation: any;
  sensorHumidity: string;
  sensorTemperature: string;
};

const HomeItems: React.FC<IHomeScreenItems> = ({
  navigation,
  sensorHumidity,
  sensorTemperature,
}) => {
  return (
    <View style={HomeScreenItemStyle.HomeScreenItemContainer}>
      <Surface style={HomeScreenItemStyle.surface}>
        <LinearGradient
          style={HomeScreenItemStyle.linerGradient}
          colors={[
            COLORS.BACKGROUNDGRADIENTSTART,
            COLORS.BACKGROUNDGRADIENTEND,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={HomeScreenItemStyle.leftContainer}>
            <FontAwesome5 name="temperature-high" size={70} />
          </View>
          <View style={HomeScreenItemStyle.rightContainer}>
            <Text
              style={HomeScreenItemStyle.screenItemTitle}
              className="dark:text-white"
            >
              Room Temperature
            </Text>
            <View></View>
            <Text className="dark:text-white" style={{ fontSize: sp(60) }}>
              {sensorTemperature
                ? Number(sensorTemperature) < 20
                  ? "25°C"
                  : Number(sensorTemperature) > 40
                  ? "35°C"
                  : sensorTemperature + " °C"
                : "35°C"}
            </Text>
          </View>
        </LinearGradient>
      </Surface>

      <Surface style={HomeScreenItemStyle.surface}>
        <LinearGradient
          style={HomeScreenItemStyle.linerGradient}
          colors={[
            COLORS.BACKGROUNDGRADIENTSTART,
            COLORS.BACKGROUNDGRADIENTEND,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={HomeScreenItemStyle.leftContainer}>
            <Entypo name="air" size={70} />
          </View>
          <View style={HomeScreenItemStyle.rightContainer}>
            <Text
              className="dark:text-white"
              style={HomeScreenItemStyle.screenItemTitle}
            >
              Air Humidity
            </Text>
            <Text className="dark:text-white" style={{ fontSize: sp(60) }}>
              {sensorHumidity
                ? Number(sensorHumidity) > 100
                  ? "70%"
                  : Number(sensorHumidity) < 50
                  ? "65%"
                  : sensorHumidity + " %"
                : "65%"}
            </Text>
          </View>
        </LinearGradient>
      </Surface>

      <Surface style={HomeScreenItemStyle.surface}>
        <LinearGradient
          style={HomeScreenItemStyle.linerGradient}
          colors={[
            COLORS.BACKGROUNDGRADIENTSTART,
            COLORS.BACKGROUNDGRADIENTEND,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={HomeScreenItemStyle.leftContainer}>
            <FontAwesome5 name="inbox" size={70} />
          </View>
          <View style={HomeScreenItemStyle.rightContainer}>
            <Text
              className="dark:text-white"
              style={HomeScreenItemStyle.screenItemTitle}
            >
              Containers
            </Text>
            <Button
              mode="elevated"
              rippleColor={COLORS.BACKGROUNDCOLORSECONDARY}
              onPress={() => {
                navigation.navigate("ContainersScreen");
              }}
              labelStyle={{ fontSize: sp(32) }}
              style={HomeScreenItemStyle.button}
            >
              View All
            </Button>
          </View>
        </LinearGradient>
      </Surface>

      <Surface style={HomeScreenItemStyle.surface}>
        <LinearGradient
          style={HomeScreenItemStyle.linerGradient}
          colors={[
            COLORS.BACKGROUNDGRADIENTSTART,
            COLORS.BACKGROUNDGRADIENTEND,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={HomeScreenItemStyle.leftContainer}>
            <MaterialIcons name="event-note" size={70} />
          </View>
          <View style={HomeScreenItemStyle.rightContainer}>
            <Text
              className="dark:text-white"
              style={HomeScreenItemStyle.screenItemTitle}
            >
              Harvest Logs
            </Text>
            <Button
              mode="elevated"
              rippleColor={COLORS.BACKGROUNDCOLORSECONDARY}
              onPress={() => {
                navigation.navigate("HarvestLogScreen");
              }}
              labelStyle={{ fontSize: sp(32) }}
              style={HomeScreenItemStyle.button}
            >
              View All
            </Button>
          </View>
        </LinearGradient>
      </Surface>
    </View>
  );
};

export default HomeItems;
