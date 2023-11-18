import { View, TouchableOpacity } from "react-native";
import { Surface, Text, Checkbox } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import {
  getCurrentTDS,
  getCurrentWaterLevel,
  getCurrentpH,
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
import { onValue, ref } from "firebase/database";
import { getFarm } from "@root/utilities/shared/LocalStorage";

const RenderTaskCard: React.FC<RenderTaskCardProps> = ({
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
  const arduinoBoardId = containerObj?.arduinoBoardDto.id;
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
    bgColor = "#b8e6a1";
  } else if (status === PlantStatus.Harvest) {
    bgColor = "#ebd68d";
  }
  //check if container is remove or deleted while the task is still not harvested
  if (!containerObj) {
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
                      { backgroundColor: COLORS.BACKGROUNDGOODVALUE },
                    ]}
                  >
                    <Text
                      className="text-black dark:text-black"
                      style={TaskCardStyle.itemTextDetails}
                    >
                      Acidity: {sensorWaterAcidity} pH
                    </Text>
                  </Surface>

                  <Surface
                    elevation={1}
                    style={[
                      TaskCardStyle.dataSurface,
                      { backgroundColor: COLORS.BACKGROUNDGOODVALUE },
                    ]}
                  >
                    <Text
                      className="text-black dark:text-black"
                      style={TaskCardStyle.itemTextDetails}
                    >
                      Nutrient: {sensorWaterNutrient} ec
                    </Text>
                  </Surface>

                  <Surface
                    elevation={1}
                    style={[
                      TaskCardStyle.dataSurface,
                      { backgroundColor: COLORS.BACKGROUNDCRITICALVALUE },
                    ]}
                  >
                    <Text
                      className="text-black dark:text-black"
                      style={TaskCardStyle.itemTextDetails}
                    >
                      Water Level: {sensorWaterLevel} L
                    </Text>
                  </Surface>
                </View>

                <TaskDetailModal
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
