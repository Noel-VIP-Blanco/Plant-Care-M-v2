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
import { baseURL } from "@root/utilities/shared/BaseURL";
import { ArduinoBoardProps } from "@interface/Auth/AwsApiProps";
const RenderContainerCard: React.FC<RenderContainerCardProps> = ({
  container,
  checkboxVisible,
  setRemoveContainerID,
}) => {
  const [arduinoBoards, setArduinoBoards] = useState<ArduinoBoardProps[]>();
  const getAllArduinoBoards = async () => {
    const arduinoBoard = await fetch(`${baseURL}/api/v1/farms/1/arduinoboards`);
    return arduinoBoard.json();
  };
  getAllArduinoBoards().then((arduinoBoardss) => {
    setArduinoBoards(arduinoBoardss);
  });
  //get the sensor id from the arduinoboardID
  const arduinoBoardObj = arduinoBoards?.find(
    (arduino) => arduino.id === container.arduinoDto.id
  );

  //get the sensor value for every sensor type connected on the arduino
  const sensorWaterAcidityObj = 50;
  const sensorWaterLevelObj = 70;
  const sensorWaterNutrientObj = 100;

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
                    Acidity: {sensorWaterAcidityObj} pH
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
                    Nutrient: {sensorWaterNutrientObj}
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
                    Water Level: {sensorWaterLevelObj} L
                  </Text>
                </Surface>
              </View>

              {/* Show the container detail when card is pressed */}
              <ContainerDetailModal
                containerItem={container}
                arduinoBoards={arduinoBoards}
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
