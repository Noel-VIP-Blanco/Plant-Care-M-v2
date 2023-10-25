import { View } from "react-native";
import { Text, Modal, Portal } from "react-native-paper";
import React, { useState } from "react";

//redux toolkit
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";

//components
import ModalButtons from "@components/Shared/ModalButtons";
import EditContainerDetailModal from "./EditContainerDetailModal";

//interface
import { ContainerDetailModalProps } from "@interface/ContainerDetailModal/ContainerDetailModalProps";
import { selectArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";

const ContainerDetailModal: React.FC<ContainerDetailModalProps> = ({
  visible,
  onClose,
  containerItem,
}) => {
  //data from redux
  const containers = useAppSelector(selectContainer);
  const arduinoBoards = useAppSelector(selectArduinoBoards);
  const plants = useAppSelector(selectPlants);
  //handle edit button
  const handleEditButton = () => {
    openEditContainerDetailModal();
  };

  //get the container name
  const containerObj = containers.find(
    (container) => container.id === containerItem.id
  );
  //get the arduino board object to know the connected plant
  const arduinoBoardObj = arduinoBoards.find(
    (arduinoBoardItem) =>
      arduinoBoardItem.id === containerObj?.arduinoBoardDto.id
  );
  //get the plant name by using the plant id from the arduino board
  const plantObj = plants.find(
    (plant) => plant.id === containerObj?.plantDto.id
  );

  //opening edit container detail modal
  const [editContainerDetailModalVisible, setEditContainerDetailModalVisible] =
    useState(false);
  const openEditContainerDetailModal = () =>
    setEditContainerDetailModalVisible(true);
  const closeEditContainerDetailModal = () =>
    setEditContainerDetailModalVisible(false);

  // use data
  const dataForEditInitial = {
    containerObj: containerItem,
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
                  {containerObj && containerObj.arduinoBoardDto.id}
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
                  {plantObj && plantObj.name}
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
