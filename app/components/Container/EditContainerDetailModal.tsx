import { View, Alert } from "react-native";
import React, { useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, TextInput } from "react-native-paper";

//data
import { dummyArduinoBoards } from "@root/app/dummyData/dummyArduinoBoards";
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";

//component
import ModalButtons from "@components/Shared/ModalButtons";

//interface
import { EditContainerDetailModalProps } from "@interface/EditContainerDetailModal/EditContainerDetailModalProps";

const EditContainerDetailModal: React.FC<EditContainerDetailModalProps> = ({
  visible,
  onClose,
  closeContainerDetailModal,
  dataForEditInitial,
}) => {
  const [containerName, setContainerName] = useState("");
  const [selectArduinoBoard, setSelectArduinoBoard] = useState("");
  const [selectPlant, setSelectPlant] = useState("");

  //data for selectlists
  const ardunoBoardData = dummyArduinoBoards
    .filter((arduinoBoard) => arduinoBoard.arduinoBoardStatus === "IN")
    .map((arduinoBoard) => ({
      key: arduinoBoard.arduinoBoardId,
      value: arduinoBoard.arduinoBoardId,
    }));

  const plantData = dummyPlantItem.map(({ plantID, plantName }) => ({
    key: plantID,
    value: plantName,
  }));

  //function for Edit container
  const handleEditContainer = () => {
    // const newContainer: IContainerItem = {
    //   contId: Math.random().toString(),
    //   contName: containerName,
    //   arduinoBoardId: selectArduinoBoard,
    // };
    // dispatch(addContainer(newContainer));
    Alert.alert(
      "Edit Container",
      "You have successfully edited the container "
    );
    reset();
    onClose();
    closeContainerDetailModal();
  };

  const reset = () => {
    setContainerName("");
    setSelectArduinoBoard("");
    setSelectPlant("");
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            margin: 30,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 30, color: "#00ad00", textAlign: "center" }}>
            Edit Container
          </Text>
          <TextInput
            label="Container Name"
            value={containerName}
            onChangeText={(text) => {
              setContainerName(text);
            }}
            mode="outlined"
          />

          {/* Container for text and select list */}
          <View>
            <Text
              style={{
                margin: 15,
                fontSize: 25,
                fontWeight: "bold",
                color: "#00ad00",
              }}
            >
              Edit Arduno Board and/or Plant
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <SelectList
                setSelected={(key: any) => setSelectArduinoBoard(key)}
                data={ardunoBoardData}
                search={true}
                placeholder="Arduino Board"
                save="key"
                boxStyles={{ width: 160, margin: 5 }}
                inputStyles={{ width: 110, fontSize: 20 }}
              />
              <SelectList
                setSelected={(key: any) => setSelectPlant(key)}
                data={plantData}
                search={true}
                placeholder="Plant"
                save="key"
                boxStyles={{ width: 160, margin: 5 }}
                inputStyles={{ width: 110, fontSize: 20 }}
              />
            </View>
          </View>

          <ModalButtons
            onSave={handleEditContainer}
            onClose={onClose}
            labelForSave="Save"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default EditContainerDetailModal;
