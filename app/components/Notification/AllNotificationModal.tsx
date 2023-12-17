import { View, Dimensions, FlatList, Image } from "react-native";
import {
  Text,
  Portal,
  Modal,
  Button,
  TouchableRipple,
  Divider,
} from "react-native-paper";
import React from "react";
//interface

//dummydata
import { dummyNotifications } from "@root/app/dummyData/DummyNotification";

import RenderNotification from "./RenderNotification";
import { ModalType } from "@interface/Modals/ModalType";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectNotifications } from "@reduxToolkit/Features/NotificationSlice";

const AllNotificationModal = ({ visible, onClose }: ModalType) => {
  const allNotifications = useAppSelector(selectNotifications);
  const rearrangeNoticiation = [...allNotifications].sort(
    (a, b) => Number(a.readNotification) - Number(b.readNotification)
  );

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            margin: 30,
            borderRadius: 30,
            height: Dimensions.get("window").height * 0.9,
          }}
        >
          <View style={{ flex: 0.3 }}>
            <Text
              style={{
                fontSize: 28,
                color: "#00ad00",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Notifications
            </Text>
          </View>

          <View style={{ flex: 9 }}>
            <FlatList
              style={{ marginTop: 15, flex: 1 }}
              data={rearrangeNoticiation}
              renderItem={(
                { item } // Destructure 'item' from the 'renderItem' function argument
              ) => <RenderNotification item={item} />}
            />
          </View>

          <View style={{ flex: 0.6 }}>
            <Button
              mode="elevated"
              onPress={() => {
                onClose();
              }}
              textColor="black"
              labelStyle={{ fontSize: 20 }}
              contentStyle={{ backgroundColor: "#44f321", padding: 5 }}
              style={{ flex: 1, margin: 5 }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AllNotificationModal;
