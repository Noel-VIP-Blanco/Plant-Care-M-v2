import { View, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, Button, TextInput } from "react-native-paper";

//intefaces
import { ModalType } from "@interface/Modals/ModalType";
import { AddContainerProps } from "@interface/DataProps/ContainerItemProps";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//redux
import { AddContainerAPI } from "@reduxToolkit/Features/ContainerSlice";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { getFarm } from "@root/utilities/shared/LocalStorage";
import { dp, sp } from "@root/utilities/shared/SpDp";

const AddContainerModal = ({ visible, onClose }: ModalType) => {
  const dispatch = useAppDispatch();

  const arduinoBoards = useAppSelector(selectArduinoBoards);
  const plants = useAppSelector(selectPlants);

  const [containerName, setContainerName] = useState("");
  const [selectArduinoBoard, setSelectArduinoBoard] = useState("");
  const [selectPlant, setSelectPlant] = useState("");

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
    if (farmIdFromLocal) {
      dispatch(
        AddContainerAPI({
          newContainer: newContainer,
          farmId: parseInt(farmIdFromLocal),
        })
      );
    } else {
      Alert.alert(
        "Add New Container Failed",
        "You have no farm associated to your account"
      );
      return;
    }

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
            padding: dp(50),
            margin: dp(70),
            borderRadius: dp(70),
          }}
        >
          <Text
            style={{
              fontSize: sp(80),
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
                margin: dp(45),
                fontSize: sp(60),
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
                boxStyles={{ width: dp(400), margin: dp(10) }}
                inputStyles={{ width: dp(280), fontSize: sp(40) }}
                dropdownTextStyles={{ fontSize: sp(40) }}
              />
              <SelectList
                setSelected={(key: any) => setSelectPlant(key)}
                data={plantData}
                search={true}
                placeholder="Plant"
                save="key"
                boxStyles={{ width: dp(400), margin: dp(10) }}
                inputStyles={{ width: dp(280), fontSize: sp(40) }}
                dropdownTextStyles={{ fontSize: sp(40) }}
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
