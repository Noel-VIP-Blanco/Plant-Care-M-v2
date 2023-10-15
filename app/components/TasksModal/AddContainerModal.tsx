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
import {
  addContainer,
  getAllContainers,
} from "@reduxToolkit/Features/ContainerSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";
import {
  AddContainersProps,
  ArduinoBoardProps,
  ContainersProps,
} from "@interface/Auth/AwsApiProps";
import { baseURL } from "@root/utilities/shared/BaseURL";

const AddContainerModal = ({ visible, onClose }: ModalType) => {
  const [arduinoBoards, setArduinoBoards] = useState<ArduinoBoardProps[]>();
  const getAllArduinoBoards = async () => {
    const arduinoBoard = await fetch(`${baseURL}/api/v1/farms/1/arduinoboards`);
    return arduinoBoard.json();
  };
  getAllArduinoBoards().then((arduinoBoardss) => {
    setArduinoBoards(arduinoBoardss);
    console.log("arduinoboards addcontainermodal.tsx line 39", arduinoBoards);
  });

  const dispatch = useAppDispatch();

  const [containerName, setContainerName] = useState("");
  const [selectArduinoBoard, setSelectArduinoBoard] = useState("");
  const [selectPlant, setSelectPlant] = useState("");

  //data for selectlists
  let arduinoBoardData: {}[] = [{}];
  if (arduinoBoards) {
    arduinoBoardData = arduinoBoards
      ?.filter((arduinoBoard) => arduinoBoard.status === "INACTIVE")
      .map((arduinoBoard) => ({
        key: arduinoBoard.id,
        value: arduinoBoard.id,
      }));
  }
  const plantData = dummyPlantItem.map(({ plantID, plantName }) => ({
    key: plantID,
    value: plantName,
  }));

  //function for adding container
  const handleAddContainer = () => {
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
      const newContainerFromDatabase = await fetch(
        `${baseURL}/api/v1/farms/1/containers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContainer),
        }
      ).then((response) => {
        return response.json();
      });

      newContainerFromDatabase.then((newCont: ContainersProps) => {
        getAllContainers("1");
      });
    };

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
