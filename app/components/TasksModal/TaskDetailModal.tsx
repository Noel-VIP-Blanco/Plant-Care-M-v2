import { View } from "react-native";
import React, { useState } from "react";
import { Text, Modal, Portal } from "react-native-paper";

//interface
import { TaskDetailModalProps } from "@interface/TaskDetailModal/TaskDetailModalProps";

//data
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";

//components
import ModalButtons from "@components/Shared/ModalButtons";
import EditTaskDetailModal from "./EditTaskDetailModal";

//data from redux toolkit with app-wide state
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";
import { selectTask } from "@reduxToolkit/Features/TaskSlice";

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  onClose,
  taskItem,
}) => {
  //data from redux
  const tasks = useAppSelector(selectTask);
  const containers = useAppSelector(selectContainer);

  //format date to string
  const date = new Date(taskItem.dateExpectedHarvest);
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

  const plantObj = dummyPlantItem.find(
    (plant) => plant.plantID === taskItem.plantId
  )!;
  const containerObj = containers.find(
    (container) => container.contId === taskItem.contId
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
            padding: 20,
            margin: 30,
            borderRadius: 30,
            height: 350,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  color: "#086308",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 30,
                }}
              >
                Task Details
              </Text>
            </View>

            <View style={{ flex: 9, paddingTop: 10 }}>
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 15,
                    flex: 1,
                  }}
                >
                  Plant Name
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {plantObj ? plantObj.plantName : "No Name"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 15,
                    flex: 1,
                  }}
                >
                  Container Name
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {containerObj ? containerObj.contName : "N/A"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 15,
                    flex: 1,
                  }}
                >
                  Date Planted
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {formattedPlantedDate}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 15,
                    flex: 1,
                  }}
                >
                  Expected Harvest
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {formattedExpectedHarvestDate}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 15,
                    flex: 1,
                  }}
                >
                  Farmer
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {taskItem.farmerName}
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
