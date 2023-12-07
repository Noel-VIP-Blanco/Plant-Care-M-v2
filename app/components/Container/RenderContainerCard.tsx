import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, Checkbox } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//interface
import { RenderContainerCardProps } from "@interface/RenderContainerCard/RenderContainerCardProps";

//stylesheets
import { ContainerCardStyle } from "@stylesheets/ContainerCard/ContainerCardStyle";

//components
import ContainerDetailModal from "./ContainerDetailModal";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { dp, sp } from "@root/utilities/shared/SpDp";
import { getFarm } from "@root/utilities/shared/LocalStorage";
import {
  getCurrentTDS,
  getCurrentWaterLevel,
  getCurrentpH,
  getMaxTDS,
  getMaxpH,
  getMinTDS,
  getMinpH,
} from "@root/utilities/shared/RealtineDatabase";
const RenderContainerCard: React.FC<RenderContainerCardProps> = ({
  container,
  checkboxVisible,
  setRemoveContainerID,
}) => {
  // const { contId, contName, arduinoBoardId } = item;

  const arduinoBoards = useAppSelector(selectArduinoBoards);

  //get farmId from local
  const [farmIdFromLocal, setFarmIdFromLocal] = useState<
    string | null | undefined
  >(null);
  useEffect(() => {
    const getFarmIdFromLocal = async () => {
      const fetchedFarmId = await getFarm();
      setFarmIdFromLocal(fetchedFarmId);
    };
    getFarmIdFromLocal();
  }, []);

  //get the sensor id from the arduinoboardID

  //get the sensor value for every sensor type connected on the arduino
  const [sensorWaterAcidity, setSensorWaterAcidity] = useState("");
  const [sensorWaterNutrient, setSensorWaterNutrient] = useState("");
  const [sensorWaterLevel, setSensorWaterLevel] = useState("");

  const [minTDS, setMinTDS] = useState("");
  const [maxTDS, setMaxTDS] = useState("");
  const [minpH, setMinpH] = useState("");
  const [maxpH, setMaxpH] = useState("");

  const [pHBgColor, setpHBgColor] = useState(COLORS.BACKGROUNDGOODVALUE);
  const [tdsBgColor, setTdsBgColor] = useState(COLORS.BACKGROUNDGOODVALUE);
  const [waterBgColor, setWaterBgColor] = useState(COLORS.BACKGROUNDGOODVALUE);
  const arduinoBoardId = container.arduinoBoardDto.id;

  useEffect(() => {
    if (sensorWaterAcidity > maxpH || sensorWaterAcidity < minpH) {
      setpHBgColor(COLORS.BACKGROUNDCRITICALVALUE);
    } else {
      setpHBgColor(COLORS.BACKGROUNDGOODVALUE);
    }
  }, [minpH, maxpH, sensorWaterAcidity]);

  useEffect(() => {
    if (sensorWaterNutrient > maxTDS || sensorWaterNutrient < minTDS) {
      setTdsBgColor(COLORS.BACKGROUNDCRITICALVALUE);
    } else {
      setTdsBgColor(COLORS.BACKGROUNDGOODVALUE);
    }
  }, [minTDS, maxTDS, sensorWaterNutrient]);

  useEffect(() => {
    if (sensorWaterLevel < "20") {
      setWaterBgColor(COLORS.BACKGROUNDCRITICALVALUE);
    } else {
      setWaterBgColor(COLORS.BACKGROUNDGOODVALUE);
    }
  }, [sensorWaterLevel]);

  useEffect(() => {
    getMinpH({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setMinpH,
    });
  }, [minpH, farmIdFromLocal, arduinoBoardId]);

  useEffect(() => {
    getMaxpH({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setMaxpH,
    });
  }, [maxpH, farmIdFromLocal, arduinoBoardId]);

  useEffect(() => {
    getMinTDS({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setMinTDS,
    });
  }, [minTDS, farmIdFromLocal, arduinoBoardId]);

  useEffect(() => {
    getMaxTDS({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setMaxTDS,
    });
  }, [maxTDS, farmIdFromLocal, arduinoBoardId]);

  useEffect(() => {
    getCurrentTDS({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setSensorWaterNutrient,
    });
  }, [sensorWaterNutrient, farmIdFromLocal]);

  useEffect(() => {
    getCurrentpH({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setSensorWaterAcidity,
    });
  }, [sensorWaterAcidity, farmIdFromLocal]);

  useEffect(() => {
    getCurrentWaterLevel({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setSensorWaterLevel,
    });
  }, [sensorWaterLevel, farmIdFromLocal]);

  const [checkedContainer, setCheckedContainer] = useState(false);

  const handleCheckboxPress = () => {
    setCheckedContainer(!checkedContainer);

    if (!checkedContainer) {
      // If the checkbox was unchecked before, push the contId to the list
      setRemoveContainerID((prevContainer) => [...prevContainer, container.id]);
    } else {
      // If the checkbox was checked before, remove the contId from the list
      setRemoveContainerID((prevContainer) =>
        prevContainer.filter((id) => id !== container.id)
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

  //check the sensor data if it is outside the range
  const [isValueGood, setIsValueGood] = useState(true);
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
          borderRadius: dp(50),
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
            <Text
              className="text-black dark:text-black"
              style={{ fontSize: sp(80), margin: dp(7), fontWeight: "bold" }}
            >
              {container.name}
            </Text>
            <View style={{ width: "100%" }}>
              <View style={ContainerCardStyle.dataSurfaceContainer}>
                <Surface
                  elevation={4}
                  style={[
                    ContainerCardStyle.dataSurface,
                    { backgroundColor: pHBgColor },
                  ]}
                >
                  <Text
                    className="text-black dark:text-black"
                    style={ContainerCardStyle.itemTextDetails}
                  >
                    Acidity:{" "}
                    {sensorWaterAcidity ? sensorWaterAcidity + " pH" : `N/A`}
                  </Text>
                </Surface>
                <Surface
                  elevation={4}
                  style={[
                    ContainerCardStyle.dataSurface,
                    { backgroundColor: tdsBgColor },
                  ]}
                >
                  <Text
                    className="text-black dark:text-black"
                    style={ContainerCardStyle.itemTextDetails}
                  >
                    Nutrient:{" "}
                    {sensorWaterNutrient ? sensorWaterNutrient + " ec" : `N/A`}
                  </Text>
                </Surface>
              </View>

              <View style={ContainerCardStyle.dataSurfaceContainer}>
                <Surface
                  elevation={4}
                  style={{
                    borderRadius: dp(45),
                    marginHorizontal: dp(200),
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: waterBgColor,
                  }}
                >
                  <Text
                    className="text-black dark:text-black"
                    style={ContainerCardStyle.itemTextDetails}
                  >
                    Water Level:{" "}
                    {sensorWaterLevel ? sensorWaterLevel + " %" : `N/A`}
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
