import { View, Alert } from "react-native";

import { Text, Modal, Portal, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";

//redux toolkit
import {
  DeleteTasksAPI,
  HarvestTaskAPI,
} from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";

//interface
import {
  HarvestOrRemove,
  HarvestTaskModalProps,
} from "@interface/HarvestTaskModal/HarvestTaskModalProps";
import { getFarm } from "@root/utilities/shared/LocalStorage";
import axios from "axios";

const HarvestTaskModal: React.FC<HarvestTaskModalProps> = ({
  visible,
  onClose,
  harvestTasksID,
  harvestOrRemove,
  subIdFromNotify,
  idFromFarm,
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

  //redux dispatch
  const dispatch = useAppDispatch();

  let subIds = subIdFromNotify.map((item) => item.sub_id);
  let filteredA = idFromFarm.filter((item) =>
    subIds.includes(item.id.toString())
  );
  let result = filteredA.map((item) => item.id.toString());
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
                  if (farmIdFromLocal) {
                    dispatch(
                      DeleteTasksAPI({
                        tasksIds: harvestTasksID,
                        farmId: parseInt(farmIdFromLocal),
                      })
                    );
                  } else {
                    Alert.alert(
                      `Plant ${harvestOrRemove} failed`,
                      "You have no farm associated to your account"
                    );
                    return;
                  }
                  if (result.length > 0) {
                    axios
                      .post(
                        `https://app.nativenotify.com/api/indie/group/notification`,
                        {
                          subIDs: result,
                          appId: 13240,
                          appToken: "JgacDlBDrMg8qvQWalJuRM",
                          title: "Task Notification",
                          message: "Tasks are removed",
                        }
                      )
                      .catch((e) => {
                        console.log("Error from add task modal line 128", e);
                      });
                  }
                } else {
                  //should be harvest dispatch
                  if (farmIdFromLocal) {
                    dispatch(
                      HarvestTaskAPI({
                        tasksIds: harvestTasksID,
                        farmId: parseInt(farmIdFromLocal),
                      })
                    );
                  } else {
                    Alert.alert(
                      `Plant ${harvestOrRemove}`,
                      "You have no farm associated to your account"
                    );
                    onClose();
                    return;
                  }
                  if (result.length > 0) {
                    axios
                      .post(
                        `https://app.nativenotify.com/api/indie/group/notification`,
                        {
                          subIDs: result,
                          appId: 13240,
                          appToken: "JgacDlBDrMg8qvQWalJuRM",
                          title: "Task Notification",
                          message: "Tasks are harvested",
                        }
                      )
                      .catch((e) => {
                        console.log("Error from add task modal line 128", e);
                      });
                  }
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
