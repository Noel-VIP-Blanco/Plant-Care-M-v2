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
import { PlantProps } from "@interface/DataProps/PlantItemProps";
import { ref, update } from "firebase/database";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import axios from "axios";
type AddContainerModalType = ModalType & {
  subIdFromNotify: any;
  idFromFarm: any;
};
const AddContainerModal = ({
  visible,
  onClose,
  subIdFromNotify,
  idFromFarm,
}: AddContainerModalType) => {
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

  const [plantDTO, setPlantDTO] = useState<PlantProps>();
  useEffect(() => {
    const plant = plants.find((plantItem) => {
      return plantItem.id === parseInt(selectPlant);
    });
    setPlantDTO(plant);
    console.log(plantDTO);
  }, [selectPlant, plantDTO]);

  //function for adding container
  const handleAddContainer = () => {
    if (
      containerName === "" ||
      selectArduinoBoard === "" ||
      selectPlant === ""
    ) {
      Alert.alert("Add New Container Failed", "Fill up all the fields");
      return;
    }

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

    //filter the id from list of id from from based on the
    // id opened their notification at native notify
    let subIds = subIdFromNotify.map((item) => item.sub_id);
    let filteredA = idFromFarm.filter((item) =>
      subIds.includes(item.id.toString())
    );
    let result = filteredA.map((item) => item.id.toString());
    console.log("Result from addcontainermodal", result);
    if (farmIdFromLocal) {
      dispatch(
        AddContainerAPI({
          newContainer: newContainer,
          farmId: parseInt(farmIdFromLocal),
        })
      );
      update(
        ref(
          FIREBASE_DATABASE,
          `farm/${farmIdFromLocal}/arduinoBoard/${selectArduinoBoard}/`
        ),
        {
          minpH: plantDTO?.minimumPh,
          maxTDS: plantDTO?.maximumEc,
          maxpH: plantDTO?.maximumPh,
          minTDS: plantDTO?.minimumEc,
        }
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
    if (result.length > 0) {
      axios
        .post(`https://app.nativenotify.com/api/indie/group/notification`, {
          subIDs: result,
          appId: 13240,
          appToken: "JgacDlBDrMg8qvQWalJuRM",
          title: "Container Notification",
          message: "New Container is Added",
        })
        .catch((e) => {
          console.log("Error from add container modal line 146", e);
        });
    }
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
          className="bg-white dark:bg-slate-800"
          style={{
            padding: dp(50),
            margin: dp(70),
            borderRadius: dp(70),
          }}
        >
          <Text
            className="text-green-800 dark:text-green-400"
            style={{
              fontSize: sp(80),

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
              className="text-green-800 dark:text-green-400"
              style={{
                margin: dp(45),
                fontSize: sp(60),
                fontWeight: "bold",
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
                boxStyles={{
                  width: dp(400),
                  margin: dp(10),
                  backgroundColor: "white",
                }}
                inputStyles={{ width: dp(280), fontSize: sp(40) }}
                dropdownTextStyles={{ fontSize: sp(40) }}
                dropdownStyles={{ backgroundColor: "white" }}
              />
              <SelectList
                setSelected={(key: any) => setSelectPlant(key)}
                data={plantData}
                search={true}
                placeholder="Plant"
                save="key"
                boxStyles={{
                  width: dp(400),
                  margin: dp(10),
                  backgroundColor: "white",
                }}
                inputStyles={{ width: dp(280), fontSize: sp(40) }}
                dropdownTextStyles={{ fontSize: sp(40) }}
                dropdownStyles={{ backgroundColor: "white" }}
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
