import { View, Alert } from "react-native";
import React, { useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, Button, TextInput } from "react-native-paper";

//intefaces
import { ModalType } from "@interface/Modals/ModalType";
import {
  AddContainerProps,
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//redux
import {
  addContainer,
  AddContainerAPI,
  selectContainer,
} from "@reduxToolkit/Features/ContainerSlice";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";

const AddContainerModal = ({ visible, onClose }: ModalType) => {
  const dispatch = useAppDispatch();

  const containers = useAppSelector(selectContainer);
  const arduinoBoards = useAppSelector(selectArduinoBoards);
  const plants = useAppSelector(selectPlants);

  const [containerName, setContainerName] = useState("");
  const [selectArduinoBoard, setSelectArduinoBoard] = useState("");
  const [selectPlant, setSelectPlant] = useState("");

  //data for selectlists
  const ardunoBoardData = arduinoBoards
    .filter((arduinoBoard) => arduinoBoard.status === "INACTIVE")
    .map((arduinoBoard) => ({
      key: arduinoBoard.id,
      value: arduinoBoard.id,
    }));

  const plantData = plants.map(({ id, name }) => ({
    key: id,
    value: name,
  }));

  //function for adding container
  const handleAddContainer = () => {
    const newContainer: AddContainerProps = {
      name: containerName,
      arduinoBoardDto: {
        id: parseInt(selectArduinoBoard),
      },
      plantDto: {
        id: parseInt(selectPlant),
      },
      farmId: 1,
    };
    dispatch(AddContainerAPI({ newContainer: newContainer, farmId: 1 }));
    //dispatch(addContainer(newContainer));
    Alert.alert("New Container", "You have successfully added the container ");
    reset();
    onClose();
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
          <Text
            style={{
              fontSize: 30,
              color: "#00ad00",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add Container
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
              Set up Arduno Board and Plant
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
            onSave={handleAddContainer}
            onClose={onClose}
            labelForSave="Add Container"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default AddContainerModal;
