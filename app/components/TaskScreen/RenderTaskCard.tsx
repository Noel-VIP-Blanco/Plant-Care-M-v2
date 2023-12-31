import { View, TouchableOpacity } from "react-native";
import { Surface, Text, Checkbox, Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import {
  getCurrentTDS,
  getCurrentWaterLevel,
  getCurrentpH,
  getMaxTDS,
  getMaxpH,
  getMinTDS,
  getMinpH,
} from "@root/utilities/shared/RealtineDatabase";
//interface
import { PlantStatus } from "@interface/DataProps/TaskItemProps";
import { RenderTaskCardProps } from "@interface/RenderTaskCard/RenerTaskCardProps";

//stylesheet
import { TaskCardStyle } from "@stylesheets/TaskCard/TaskCardStyle";

//data from redux toolkit with app-wide state
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";

//component
import TaskDetailModal from "@components/TasksModal/TaskDetailModal";

import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { dp } from "@root/utilities/shared/SpDp";
import { getFarm } from "@root/utilities/shared/LocalStorage";

const RenderTaskCard: React.FC<RenderTaskCardProps> = ({
  idFromFarm,
  subIdFromNotify,
  item,
  checkboxVisible,
  setCompleteTasksID,
}) => {
  //data from redux
  const containers = useAppSelector(selectContainer);
  const plants = useAppSelector(selectPlants);
  const { containerId, id, plantId, status } = item;
  //handle checkbox
  const [checkedTask, setCheckedTask] = useState(false);

  //filter the sub id based on the subscribed id from native notify
  let subIds = subIdFromNotify.map((item) => item.sub_id);
  let filteredA = idFromFarm.filter((item) =>
    subIds.includes(item.id.toString())
  );
  let result = filteredA.map((item) => item.id.toString());

  const handleCheckboxPress = () => {
    setCheckedTask(!checkedTask);

    if (!checkedTask) {
      // If the checkbox was unchecked before, push the taskID to the list
      setCompleteTasksID((prevTasks) => [...prevTasks, id]);
    } else {
      // If the checkbox was checked before, remove the taskID from the list
      setCompleteTasksID((prevTasks) => prevTasks.filter((id) => id !== id));
    }
  };
  //const [bgColor, setBgColor] = useState<ColorValue>("#9DC08B");
  let bgColor: ColorValue = "#9DC08B";
  //get the plant object based on the plant ID from the task to get data like plant name
  const plantObj = plants.find((plant) => plant.id === plantId);
  //get the container obj based on the container id from the task to get arduino board connected to it
  const containerObj = containers.find(
    (container) => containerId === container.id
  );

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
  const arduinoBoardId = containerObj?.arduinoBoardDto.id;

  console.log("farm id from local", farmIdFromLocal);
  console.log("arduinoboard id from local", arduinoBoardId);

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
  }, [sensorWaterNutrient, farmIdFromLocal, arduinoBoardId]);

  useEffect(() => {
    getCurrentpH({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setSensorWaterAcidity,
    });
  }, [sensorWaterAcidity, farmIdFromLocal, arduinoBoardId]);

  useEffect(() => {
    getCurrentWaterLevel({
      farmId: farmIdFromLocal,
      arduinoBoardId,
      setSensorWaterLevel,
    });
  }, [sensorWaterLevel, farmIdFromLocal, arduinoBoardId]);

  if (status === PlantStatus.Grow) {
    //setBgColor("#b8e6a1");
    bgColor = "#b8e6a1";
  } else if (status === PlantStatus.Harvest) {
    //setBgColor("#ebd68d");
    bgColor = "#ebd68d";
  }
  //check if container is remove or deleted while the task is still not harvested
  if (!containerObj) {
    //setBgColor("#e69898");
    bgColor = "#e69898";
  }
  //if cancel or complete task button pressed, uncheck all checkboxes
  useEffect(() => {
    if (!checkboxVisible) {
      setCheckedTask(false);
    }
  }, [checkboxVisible]);
  //opening task detail modal
  const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const openTaskDetailModal = () => setTaskDetailModalVisible(true);
  const closeTaskDetailModal = () => setTaskDetailModalVisible(false);

  return (
    <Surface elevation={4} style={TaskCardStyle.surface}>
      <View
        style={[
          TaskCardStyle.taskCardMainContainer,
          { backgroundColor: bgColor, borderRadius: dp(60) },
        ]}
      >
        {/* <Button
      onPress={()=>{
        console.log(sensorWaterNutrient)
      }}>
        TEST DATABASE ONLY
      </Button> */}
        <View style={TaskCardStyle.taskCardView}>
          {checkboxVisible && (
            <View style={TaskCardStyle.taskCardBoxContainer1}>
              <View style={TaskCardStyle.checkboxContainer}>
                <Checkbox
                  color="black"
                  onPress={() => {
                    handleCheckboxPress();
                  }}
                  status={checkedTask ? "checked" : "unchecked"}
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            style={TaskCardStyle.taskCardBoxContainer2}
            onPress={() => {
              openTaskDetailModal();
            }}
          >
            <View style={TaskCardStyle.taskCardBoxContainer2}>
              <Text
                className="text-black dark:text-black"
                style={TaskCardStyle.itemTextTitle}
              >
                {plantObj ? plantObj.name : "N/A"}
              </Text>

              <View style={TaskCardStyle.itemTextDetailsContainer}>
                <View
                  style={{
                    margin: 6,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Surface
                    elevation={1}
                    style={[
                      TaskCardStyle.dataSurface,
                      { backgroundColor: pHBgColor },
                    ]}
                  >
                    <Text
                      className="text-black dark:text-black"
                      style={TaskCardStyle.itemTextDetails}
                    >
                      Acidity:{" "}
                      {sensorWaterAcidity ? sensorWaterAcidity + " pH" : `6.0'`}
                    </Text>
                  </Surface>

                  <Surface
                    elevation={1}
                    style={[
                      TaskCardStyle.dataSurface,
                      { backgroundColor: tdsBgColor },
                    ]}
                  >
                    <Text
                      className="text-black dark:text-black"
                      style={TaskCardStyle.itemTextDetails}
                    >
                      Nutrient:{" "}
                      {sensorWaterNutrient
                        ? sensorWaterNutrient + " ppm"
                        : `600' ppm`}
                    </Text>
                  </Surface>

                  <Surface
                    elevation={1}
                    style={[
                      TaskCardStyle.dataSurface,
                      { backgroundColor: waterBgColor },
                    ]}
                  >
                    <Text
                      className="text-black dark:text-black"
                      style={TaskCardStyle.itemTextDetails}
                    >
                      Water Level:{" "}
                      {sensorWaterLevel ? sensorWaterLevel + " %" : `70%'`}
                    </Text>
                  </Surface>
                </View>

                <TaskDetailModal
                  result={result}
                  taskItem={item}
                  visible={taskDetailModalVisible}
                  onClose={closeTaskDetailModal}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};

export default RenderTaskCard;
