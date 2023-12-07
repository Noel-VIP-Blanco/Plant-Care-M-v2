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
import { dp, sp } from "@root/utilities/shared/SpDp";
import { PlantProps } from "@interface/DataProps/PlantItemProps";
import { ref, update } from "firebase/database";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";

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

  const [plantDTO, setPlantDTO] = useState<PlantProps>();
  useEffect(() => {
    const plant = plants.find((plantItem) => {
      return plantItem.id === parseInt(selectPlant);
    });
    setPlantDTO(plant);
    console.log(plantDTO);
  }, [selectPlant, plantDTO]);

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
      if (selectPlant) {
        update(
          ref(
            FIREBASE_DATABASE,
            `farm/${farmIdFromLocal}/arduinoBoard/${dataForEditInitial.arduinoBoardObj?.id}/`
          ),
          {
            minpH: plantDTO?.minimumPh,
            maxTDS: plantDTO?.maximumEc,
            maxpH: plantDTO?.maximumPh,
            minTDS: plantDTO?.minimumEc,
          }
        );
      }
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
            padding: dp(50),
            margin: dp(70),
            borderRadius: dp(70),
          }}
        >
          <Text
            style={{ fontSize: sp(80), color: "#00ad00", textAlign: "center" }}
          >
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
                margin: dp(45),
                fontSize: sp(60),
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
