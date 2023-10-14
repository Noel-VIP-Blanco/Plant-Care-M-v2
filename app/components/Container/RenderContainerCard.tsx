import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, Checkbox, TouchableRipple } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//interface
import { RenderContainerCardProps } from "@interface/RenderContainerCard/RenderContainerCardProps";

//stylesheets
import { ContainerCardStyle } from "@stylesheets/ContainerCard/ContainerCardStyle";

//data
import { dummyArduinoBoards } from "@root/app/dummyData/dummyArduinoBoards";
import { dummySensor } from "@root/app/dummyData/dummySensor";

//components
import ContainerDetailModal from "./ContainerDetailModal";
import { useGetArduinoQuery } from "@backend/RTKQuery/Services/awsAPI";
import { ArduinoBoardProps } from "@interface/Auth/AwsApiProps";
const RenderContainerCard: React.FC<RenderContainerCardProps> = ({
  container,
  checkboxVisible,
  setRemoveContainerID,
}) => {
  const [arduinoBoards, setArduinoBoards] = useState<ArduinoBoardProps[]>();
  const fetchAllArduinoBoards = async () => {
    try {
      const { data: arduino } = await useGetArduinoQuery();
      if (arduino) {
        return arduino;
      }
    } catch (e) {
      return undefined;
    }
  };
  fetchAllArduinoBoards().then((allArduinoBoards) => {
    setArduinoBoards(allArduinoBoards);
  });

  //get the sensor id from the arduinoboardID
  const arduinoBoardObj = arduinoBoards?.find(
    (arduino) => arduino.id === container.arduinoDto.id
  );

  //get the sensor value for every sensor type connected on the arduino
  // const sensorWaterAcidityObj = dummySensor.find(
  //   (sensor) => sensor.sensorID === arduinoBoardObj?.waterAcidity
  // );
  // const sensorWaterLevelObj = dummySensor.find(
  //   (sensor) => sensor.sensorID === arduinoBoardObj?.waterLevel
  // );
  // const sensorWaterNutrientObj = dummySensor.find(
  //   (sensor) => sensor.sensorID === arduinoBoardObj?.waterNutrient
  // );

  const [checkedContainer, setCheckedContainer] = useState(false);

  const handleCheckboxPress = () => {
    setCheckedContainer(!checkedContainer);

    if (!checkedContainer) {
      // If the checkbox was unchecked before, push the contId to the list
      setRemoveContainerID((prevContainer) => [
        ...prevContainer,
        container.id.toString(),
      ]);
    } else {
      // If the checkbox was checked before, remove the contId from the list
      setRemoveContainerID((prevContainer) =>
        prevContainer.filter((id) => id !== container.id.toString())
      );
    }
  };

  //opening container detail modal
  const [containerDetailModalVisible, setContainerDetailModalVisible] =
    useState(false);
  const openContainerDetailModal = () => setContainerDetailModalVisible(true);
  const closeContainerDetailModal = () => setContainerDetailModalVisible(false);

  //if cancel or complete container button pressed, uncheck all checkboxes
  useEffect(() => {
    if (!checkboxVisible) {
      setCheckedContainer(false);
    }
  }, [checkboxVisible]);

  //to be fetch in real time database firebase
  const waterAcidity = 59;
  const waterNutrient = 100;
  const waterLevel = 299;
  return (
    <Surface elevation={4} style={ContainerCardStyle.surface}>
      <LinearGradient
        colors={["#417722", "#72b34d", "#abe48a"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {checkboxVisible && (
            <View style={ContainerCardStyle.containerCardBoxContainer1}>
              <View style={ContainerCardStyle.checkboxContainer}>
                <Checkbox
                  color="white"
                  onPress={() => {
                    handleCheckboxPress();
                  }}
                  status={checkedContainer ? "checked" : "unchecked"}
                />
              </View>
            </View>
          )}

          <TouchableOpacity
            style={ContainerCardStyle.containerCardBoxContainer2}
            onPress={openContainerDetailModal}
          >
            <Text style={{ fontSize: 35, margin: 3, fontWeight: "bold" }}>
              {container.name}
            </Text>
            <View style={{ width: "100%" }}>
              <View style={ContainerCardStyle.dataSurfaceContainer}>
                <Surface
                  elevation={4}
                  style={[
                    ContainerCardStyle.dataSurface,
                    { backgroundColor: COLORS.BACKGROUNDGOODVALUE },
                  ]}
                >
                  <Text style={ContainerCardStyle.itemTextDetails}>
                    Acidity: {waterAcidity} pH
                  </Text>
                </Surface>
                <Surface
                  elevation={4}
                  style={[
                    ContainerCardStyle.dataSurface,
                    { backgroundColor: COLORS.BACKGROUNDGOODVALUE },
                  ]}
                >
                  <Text style={ContainerCardStyle.itemTextDetails}>
                    Nutrient: {waterNutrient}
                    ec
                  </Text>
                </Surface>
              </View>

              <View style={ContainerCardStyle.dataSurfaceContainer}>
                <Surface
                  elevation={4}
                  style={{
                    borderRadius: 15,
                    marginHorizontal: 100,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.BACKGROUNDCRITICALVALUE,
                  }}
                >
                  <Text style={ContainerCardStyle.itemTextDetails}>
                    Water Level: {waterLevel} L
                  </Text>
                </Surface>
              </View>

              {/* Show the container detail when card is pressed */}
              <ContainerDetailModal
                containerItem={container}
                visible={containerDetailModalVisible}
                onClose={closeContainerDetailModal}
              />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Surface>
  );
};

export default RenderContainerCard;
