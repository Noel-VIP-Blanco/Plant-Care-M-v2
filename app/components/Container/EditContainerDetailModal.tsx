import { View, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, TextInput } from "react-native-paper";

//component
import ModalButtons from "@components/Shared/ModalButtons";

//interface
import { EditContainerDetailModalProps } from "@interface/EditContainerDetailModal/EditContainerDetailModalProps";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import {
  selectContainer,
  UpdateContainerAPI,
} from "@reduxToolkit/Features/ContainerSlice";
import { selectArduinoBoards } from "@reduxToolkit/Features/ArduinoBoardSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { UpdateContainerProps } from "@interface/DataProps/ContainerItemProps";
import { getFarm } from "@root/utilities/shared/LocalStorage";

const EditContainerDetailModal: React.FC<EditContainerDetailModalProps> = ({
  visible,
  onClose,
  closeContainerDetailModal,
  dataForEditInitial,
}) => {
  const [containerName, setContainerName] = useState("");
  const [selectArduinoBoard, setSelectArduinoBoard] = useState("");
  const [selectPlant, setSelectPlant] = useState("");

  const arduinoBoards = useAppSelector(selectArduinoBoards);
  const plants = useAppSelector(selectPlants);

  const dispatch = useAppDispatch();

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

  //function for Edit container
  const handleEditContainer = () => {
    const updateContainer: UpdateContainerProps = {
      name: containerName,
      arduinoBoardDto: {
        id: parseInt(selectArduinoBoard),
      },
      plantDto: {
        id: parseInt(selectPlant),
      },
    };
    if (farmIdFromLocal) {
      dispatch(
        UpdateContainerAPI({
          updatedContainer: updateContainer,
          containerId: dataForEditInitial.containerObj.id,
          farmId: parseInt(farmIdFromLocal), //should be get from local storage
        })
      );
    } else {
      Alert.alert(
        "Edit Container Failed",
        "You have no farm associated to your account"
      );
      return;
    }

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
