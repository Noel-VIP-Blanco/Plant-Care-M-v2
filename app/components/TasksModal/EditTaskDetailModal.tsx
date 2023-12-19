import { View, Alert } from "react-native";
import { Text, Modal, Portal } from "react-native-paper";

import { SelectList } from "react-native-dropdown-select-list";
import React, { useEffect, useState } from "react";

//interface
import { EditTaskDetailModalProps } from "@interface/EditTaskDetailModal/EditTaskDetailModalProps";

//component
import ModalButtons from "@components/Shared/ModalButtons";

//redux toolkits
import { useAppSelector, useAppDispatch } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";
import { UpdateTaskAPI } from "@reduxToolkit/Features/TaskSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { getFarm } from "@root/utilities/shared/LocalStorage";
import { dp, sp } from "@root/utilities/shared/SpDp";
import axios from "axios";

const EditTaskDetailModal: React.FC<EditTaskDetailModalProps> = ({
  visible,
  onClose,
  closeTaskDetailModal,
  dataForEditInitial,
  result,
}) => {
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

  //data from redux
  const containers = useAppSelector(selectContainer);
  const plants = useAppSelector(selectPlants);
  //redux dispatch
  const dispatch = useAppDispatch();

  //store data after selecting item in selectlist
  const [selectContainerId, setSelectContainerId] = useState(
    dataForEditInitial.taskObj.containerId
  );
  const [selectPlant, setSelectPlant] = useState(
    dataForEditInitial.taskObj.plantId
  );
  //data for selectlists
  const containerData = containers.map((container) => ({
    key: container.id.toString(),
    value: container.name,
  }));
  const plantData = plants.map(({ id, name }) => ({
    key: id.toString(),
    value: name,
  }));

  const handleEditTask = async () => {
    if (farmIdFromLocal) {
      Alert.alert("Edit Task", "Task Edited successfuly");
      dispatch(
        UpdateTaskAPI({
          dataForEditInitial: dataForEditInitial,
          farmId: parseInt(farmIdFromLocal),
          updatedTask: { containerId: selectContainerId, plantId: selectPlant },
        })
      );
      if (result.length > 0) {
        await axios
          .post(`https://app.nativenotify.com/api/indie/group/notification`, {
            subIDs: result,
            appId: 13240,
            appToken: "JgacDlBDrMg8qvQWalJuRM",
            title: "Task Notification",
            message: `Task in reservoir ${dataForEditInitial.containerObj?.name} has successfuly edited!`,
          })
          .catch((e) => {
            console.log("Error from Render Task Card line 95", e);
          });
      }
    } else {
      Alert.alert("Edit Task", "You have no farm associated to your account");
      onClose();
      closeTaskDetailModal();
      return;
    }

    onClose();
    closeTaskDetailModal();
  };
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: "white",
            padding: dp(40),
            margin: dp(60),
            borderRadius: dp(60),
          }}
        >
          {/* Container for text and select list */}
          <View>
            <Text
              style={{
                margin: dp(25),
                fontSize: sp(80),
                fontWeight: "bold",
                color: "#00ad00",
                textAlign: "center",
              }}
            >
              Edit Task
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <SelectList
                setSelected={(key: any) => setSelectContainerId(key)}
                data={containerData}
                search={true}
                placeholder="Select Container"
                save="key"
                boxStyles={{ width: dp(440), margin: dp(10) }}
                inputStyles={{ width: dp(320), fontSize: sp(40) }}
                dropdownTextStyles={{ fontSize: sp(40) }}
              />
              <SelectList
                setSelected={(key: any) => setSelectPlant(key)}
                data={plantData}
                search={true}
                placeholder="Select Plant"
                save="key"
                boxStyles={{ width: dp(390), margin: dp(10) }}
                inputStyles={{ width: dp(260), fontSize: sp(40) }}
                dropdownTextStyles={{ fontSize: sp(40) }}
              />
            </View>
          </View>
          <ModalButtons
            onSave={handleEditTask}
            onClose={onClose}
            labelForSave="Save"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default EditTaskDetailModal;
