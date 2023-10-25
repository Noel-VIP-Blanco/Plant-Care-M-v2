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

const EditTaskDetailModal: React.FC<EditTaskDetailModalProps> = ({
  visible,
  onClose,
  closeTaskDetailModal,
  dataForEditInitial,
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

  const handleEditTask = () => {
    if (farmIdFromLocal) {
      Alert.alert("Edit Task", "Task Edited successfuly");
      dispatch(
        UpdateTaskAPI({
          dataForEditInitial: dataForEditInitial,
          farmId: parseInt(farmIdFromLocal),
          updatedTask: { containerId: selectContainerId, plantId: selectPlant },
        })
      );
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
            padding: 20,
            margin: 30,
            borderRadius: 30,
          }}
        >
          {/* Container for text and select list */}
          <View>
            <Text
              style={{
                margin: 10,
                fontSize: 30,
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
                boxStyles={{ width: 180, margin: 5 }}
                inputStyles={{ width: 130, fontSize: 17 }}
              />
              <SelectList
                setSelected={(key: any) => setSelectPlant(key)}
                data={plantData}
                search={true}
                placeholder="Select Plant"
                save="key"
                boxStyles={{ width: 160, margin: 5 }}
                inputStyles={{ width: 110, fontSize: 17 }}
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
