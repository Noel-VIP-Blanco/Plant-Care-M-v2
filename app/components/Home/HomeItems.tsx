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
//type
type IHomeScreenItems = {
  navigation: any;
};

const HomeItems: React.FC<IHomeScreenItems> = ({ navigation }) => {
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
            <Text style={HomeScreenItemStyle.screenItemTitle}>
              Room Temperature
            </Text>
            <Text style={{ fontSize: 40 }}>30°C</Text>
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
            <Text style={HomeScreenItemStyle.screenItemTitle}>
              Air Humidity
            </Text>
            <Text style={{ fontSize: 40 }}>300</Text>
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
            <Text style={HomeScreenItemStyle.screenItemTitle}>Containers</Text>
            <Button
              mode="elevated"
              rippleColor={COLORS.BACKGROUNDCOLORSECONDARY}
              onPress={() => {
                navigation.navigate("Containers");
              }}
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
            <Text style={HomeScreenItemStyle.screenItemTitle}>
              Harvest Logs
            </Text>
            <Button
              mode="elevated"
              rippleColor={COLORS.BACKGROUNDCOLORSECONDARY}
              onPress={() => {
                navigation.navigate("HarvestLog");
              }}
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
