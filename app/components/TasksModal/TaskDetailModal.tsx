import { View } from "react-native";
import React, { useState } from "react";
import { Text, Modal, Portal } from "react-native-paper";

//interface
import { TaskDetailModalProps } from "@interface/TaskDetailModal/TaskDetailModalProps";

//components
import ModalButtons from "@components/Shared/ModalButtons";
import EditTaskDetailModal from "./EditTaskDetailModal";

//data from redux toolkit with app-wide state
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { dp, sp } from "@root/utilities/shared/SpDp";

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  onClose,
  taskItem,
  result,
}) => {
  //data from redux
  const containers = useAppSelector(selectContainer);
  const plants = useAppSelector(selectPlants);

  //format date to string
  const date = new Date(taskItem.harvestDate);
  const formattedExpectedHarvestDate = date.toISOString().split("T")[0];
  const date1 = new Date(taskItem.datePlanted);
  const formattedPlantedDate = date1.toISOString().split("T")[0];

  const [editTaskDetailModalVisible, setEditTaskDetailModalVisible] =
    useState(false);
  const openEditTaskDetailModal = () => setEditTaskDetailModalVisible(true);
  const closeEditTaskDetailModal = () => setEditTaskDetailModalVisible(false);

  //get task obj of the clicked task
  // const taskObj: ITaskItemSerializable = tasks.find(
  //   (task) => taskItem.taskId === task.taskId
  // )!;

  const plantObj = plants.find((plant) => plant.id === taskItem.plantId)!;
  const containerObj = containers.find(
    (container) => container.id === taskItem.containerId
  );

  //use as an initial/default data when editing task
  const dataForEditInitial = {
    taskObj: taskItem,
    containerObj: containerObj,
    plantObj: plantObj,
  };
  //open the edit task modal when edit button is pressed
  const handleEditButton = () => {
    openEditTaskDetailModal();
  };
  return (
    <Portal>
      <Modal style={{}} visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: "white",
            padding: dp(50),
            margin: dp(30),
            borderRadius: dp(60),
            height: dp(1300),
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  color: "#086308",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: sp(80),
                }}
              >
                Task Details
              </Text>
            </View>

            <View style={{ flex: 9, paddingTop: dp(1) }}>
              <View style={{ flexDirection: "row", marginBottom: dp(30) }}>
                <Text
                  style={{
                    fontSize: sp(60),
                    fontWeight: "bold",
                    marginLeft: dp(30),
                    flex: 1,
                  }}
                >
                  Plant Name
                </Text>
                <Text style={{ fontSize: sp(60), marginLeft: dp(25), flex: 1 }}>
                  {plantObj ? plantObj.name : "No Name"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: dp(30) }}>
                <Text
                  style={{
                    fontSize: sp(60),
                    fontWeight: "bold",
                    marginLeft: dp(30),
                    flex: 1,
                  }}
                >
                  Container Name
                </Text>
                <Text style={{ fontSize: sp(60), marginLeft: dp(25), flex: 1 }}>
                  {containerObj ? containerObj.name : "N/A"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: dp(30) }}>
                <Text
                  style={{
                    fontSize: sp(60),
                    fontWeight: "bold",
                    marginLeft: dp(30),
                    flex: 1,
                  }}
                >
                  Date Planted
                </Text>
                <Text style={{ fontSize: sp(60), marginLeft: dp(25), flex: 1 }}>
                  {formattedPlantedDate}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: dp(30) }}>
                <Text
                  style={{
                    fontSize: sp(60),
                    fontWeight: "bold",
                    marginLeft: dp(30),
                    flex: 1,
                  }}
                >
                  Expected Harvest
                </Text>
                <Text style={{ fontSize: sp(60), marginLeft: dp(25), flex: 1 }}>
                  {formattedExpectedHarvestDate}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: dp(30) }}>
                <Text
                  style={{
                    fontSize: sp(60),
                    fontWeight: "bold",
                    marginLeft: dp(30),
                    flex: 1,
                  }}
                >
                  Farmer
                </Text>
                <Text style={{ fontSize: sp(60), marginLeft: dp(25), flex: 1 }}>
                  To be announced
                </Text>
              </View>

              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <ModalButtons
                  onClose={onClose}
                  onSave={handleEditButton}
                  labelForSave="Edit Task"
                />
              </View>
            </View>

            <EditTaskDetailModal
              result={result}
              visible={editTaskDetailModalVisible}
              onClose={closeEditTaskDetailModal}
              closeTaskDetailModal={onClose}
              dataForEditInitial={dataForEditInitial}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default TaskDetailModal;
