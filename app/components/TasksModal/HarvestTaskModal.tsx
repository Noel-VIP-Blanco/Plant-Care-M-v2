import { View, Alert } from "react-native";

import { Text, Modal, Portal, Button } from "react-native-paper";
import React, { useState } from "react";

//redux toolkit
import { removeTasks } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";

//interface
import { HarvestTaskModalProps } from "@interface/HarvestTaskModal/HarvestTaskModalProps";

const HarvestTaskModal: React.FC<HarvestTaskModalProps> = ({
  visible,
  onClose,
  harvestTasksID,
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
            Harvest Plants
          </Text>

          <View>
            <Text style={{ margin: 15, fontSize: 25, fontWeight: "bold" }}>
              Are you sure you want to harvest the plants?
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
                //remove tasks with list of id by using the redux action
                dispatch(removeTasks(harvestTasksID));
                Alert.alert(
                  "Plant Harvest",
                  "You have successfully harvested the plant"
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
