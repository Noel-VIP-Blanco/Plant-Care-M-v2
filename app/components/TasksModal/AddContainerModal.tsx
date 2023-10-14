import { View, Alert } from "react-native";
import React, { useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, Button, TextInput } from "react-native-paper";

//data
import { dummyArduinoBoards } from "@root/app/dummyData/dummyArduinoBoards";
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";

//intefaces
import { ModalType } from "@interface/Modals/ModalType";
import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//redux
import { addContainer } from "@reduxToolkit/Features/ContainerSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";
import {
  AddContainersProps,
  ArduinoBoardProps,
  ContainersProps,
} from "@interface/Auth/AwsApiProps";
import {
  useAddContainerMutation,
  useGetArduinoQuery,
} from "@backend/RTKQuery/Services/awsAPI";

const AddContainerModal = ({ visible, onClose }: ModalType) => {
  const dispatch = useAppDispatch();

  const [containerName, setContainerName] = useState("");
  const [selectArduinoBoard, setSelectArduinoBoard] = useState("");
  const [selectPlant, setSelectPlant] = useState("");

  const [arduinoBoards, setArduinoBoards] = useState<ArduinoBoardProps[]>();
  const fetchAllArduinoBoards = async () => {
    try {
      const { data: arduino } = await useGetArduinoQuery();
      if (arduino) {
        return arduino;
      }
    } catch (e) {
      return undefined;
    }
  };
  fetchAllArduinoBoards().then((allArduinoBoards) => {
    setArduinoBoards(allArduinoBoards);
  });

  //data for selectlists
  let arduinoBoardData: {}[] = [{}];
  if (arduinoBoards) {
    arduinoBoardData = arduinoBoards
      .filter(
        (arduinoBoard: ArduinoBoardProps) => arduinoBoard.status === "INACTIVE"
      )
      .map((arduinoBoard: ArduinoBoardProps) => ({
        key: arduinoBoard.id,
        value: arduinoBoard.id,
      }));
  }

  const plantData = dummyPlantItem.map(({ plantID, plantName }) => ({
    key: plantID,
    value: plantName,
  }));

  //function for adding container
  const [addContainers] = useAddContainerMutation();
  const newContainer: AddContainersProps = {
    name: containerName,
    arduinoDto: {
      id: parseInt(selectArduinoBoard),
    },
    plantDto: {
      id: 1,
    },
    farmId: 1,
  };
  const addContainer = async () => {
    await addContainers({ container: newContainer, farmId: "1" });
    Alert.alert("New Container", "You have successfully added the container ");
    reset();
    onClose();
  };
  // dispatch(addContainer(newContainer));

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
                data={arduinoBoardData}
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
            onSave={addContainer}
            onClose={onClose}
            labelForSave="Add Container"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default AddContainerModal;
