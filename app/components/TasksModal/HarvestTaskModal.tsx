import { View, Alert } from "react-native";

import { Text, Modal, Portal, Button } from "react-native-paper";
import React, { useState } from "react";

//redux toolkit
import { DeleteTasksAPI, removeTasks } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";

//interface
import {
  HarvestOrRemove,
  HarvestTaskModalProps,
} from "@interface/HarvestTaskModal/HarvestTaskModalProps";

const HarvestTaskModal: React.FC<HarvestTaskModalProps> = ({
  visible,
  onClose,
  harvestTasksID,
  harvestOrRemove,
}) => {
  //redux dispatch
  const dispatch = useAppDispatch();

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
            {harvestOrRemove} Plants
          </Text>

          <View>
            <Text style={{ margin: 15, fontSize: 25, fontWeight: "bold" }}>
              Are you sure you want to {harvestOrRemove} the plants?
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <Button
              mode="elevated"
              onPress={() => {
                onClose();
              }}
              textColor="black"
              labelStyle={{ fontSize: 20 }}
              style={{ flex: 1, margin: 5 }}
              contentStyle={{ padding: 5 }}
            >
              Cancel
            </Button>
            <Button
              mode="elevated"
              onPress={() => {
                //checks if the user wants to harvest or simply remove the plants
                if (harvestOrRemove === HarvestOrRemove.Remove) {
                  dispatch(
                    DeleteTasksAPI({ tasksIds: harvestTasksID, farmId: 1 }) //farm id should be get to the tocalStorage
                  );
                } else {
                  //should be harvest dispatch
                  dispatch(
                    DeleteTasksAPI({ tasksIds: harvestTasksID, farmId: 1 }) //farm id should be get to the tocalStorage
                  );
                }
                //remove tasks with list of id by using the redux action
                //dispatch(removeTasks(harvestTasksID));
                Alert.alert(
                  `Plant ${harvestOrRemove}`,
                  `You have successfully ${harvestOrRemove} the plant`
                );
                onClose();
              }}
              textColor="black"
              style={{ flex: 1, margin: 5 }}
              labelStyle={{ fontSize: 20 }}
              contentStyle={{ backgroundColor: "#44f321", padding: 5 }}
            >
              Yes
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default HarvestTaskModal;
