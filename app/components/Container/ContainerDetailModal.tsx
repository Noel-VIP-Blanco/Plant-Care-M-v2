import { View } from "react-native";
import { Text, Modal, Portal, Button } from "react-native-paper";
import React, { useState } from "react";

//data
import { dummyArduinoBoards } from "@root/app/dummyData/dummyArduinoBoards";
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";
import { dummyContainerItem } from "@root/app/dummyData/DummyContainerItem";

//redux toolkit
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";

//components
import ModalButtons from "@components/Shared/ModalButtons";
import EditContainerDetailModal from "./EditContainerDetailModal";

//interface
import { ContainerDetailModalProps } from "@interface/ContainerDetailModal/ContainerDetailModalProps";

const ContainerDetailModal: React.FC<ContainerDetailModalProps> = ({
  visible,
  onClose,
  containerItem,
  arduinoBoards,
}) => {
  //data from redux
  const containers = useAppSelector(selectContainer);

  //handle edit button
  const handleEditButton = () => {
    openEditContainerDetailModal();
  };

  //get the container name
  const containerObj = containers.find(
    (container) => container.id === containerItem.id
  );
  //get the arduino board object to know the connected plant
  const arduinoBoardObj = arduinoBoards?.find(
    (arduinoBoardItem) => arduinoBoardItem.id === containerObj?.arduinoDto.id
  );
  //get the plant name by using the plant id from the arduino board
  const plantObj = {
    plantID: "plant1",
    plantName: "Cabbage",
    plantDay: 45,
    plantMinpH: 20,
    plantMinEc: 30,
    plantMaxpH: 30,
    plantMaxEc: 40,
  };

  //opening edit container detail modal
  const [editContainerDetailModalVisible, setEditContainerDetailModalVisible] =
    useState(false);
  const openEditContainerDetailModal = () =>
    setEditContainerDetailModalVisible(true);
  const closeEditContainerDetailModal = () =>
    setEditContainerDetailModalVisible(false);

  // use data
  const dataForEditInitial = {
    containerObj: containerObj,
    arduinoBoardObj: arduinoBoardObj,
    plantObj: plantObj,
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
            height: 260,
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
                Container Details
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
                  Container Name
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {containerObj && containerObj.name}
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
                  Arduino Board
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {containerObj && containerObj.arduinoDto.id}
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
                  Plant Name
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
                  {plantObj && plantObj.plantName}
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
                  labelForSave="Edit Container"
                />
              </View>
            </View>

            <EditContainerDetailModal
              visible={editContainerDetailModalVisible}
              onClose={closeEditContainerDetailModal}
              closeContainerDetailModal={onClose}
              dataForEditInitial={dataForEditInitial}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ContainerDetailModal;
