import { View, Alert } from "react-native";
import { Text, Modal, Portal } from "react-native-paper";

import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";

//interface
import { EditTaskDetailModalProps } from "@interface/EditTaskDetailModal/EditTaskDetailModalProps";

//data
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";

//component
import ModalButtons from "@components/Shared/ModalButtons";

//redux toolkits
import { useAppSelector, useAppDispatch } from "@reduxToolkit/Hooks";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";
import { editTask } from "@reduxToolkit/Features/TaskSlice";

const EditTaskDetailModal: React.FC<EditTaskDetailModalProps> = ({
  visible,
  onClose,
  closeTaskDetailModal,
  dataForEditInitial,
}) => {
  //data from redux
  const containers = useAppSelector(selectContainer);
  //redux dispatch
  const dispatch = useAppDispatch();

  //store data after selecting item in selectlist
  const [selectContainerId, setSelectContainerId] = useState(
    dataForEditInitial.containerObj?.contId
  );
  const [selectPlant, setSelectPlant] = useState(
    dataForEditInitial.plantObj.plantID
  );
  //data for selectlists
  const containerData = containers.map((container) => ({
    key: container.contId,
    value: container.contName,
  }));
  const plantData = dummyPlantItem.map(({ plantID, plantName }) => ({
    key: plantID,
    value: plantName,
  }));

  const handleEditTask = () => {
    Alert.alert("Edit Task", "You have successfully edited the task ");
    dispatch(
      editTask({
        taskId: dataForEditInitial.taskObj.taskId,
        contId: selectContainerId,
        plantId: selectPlant,
      })
    );
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
