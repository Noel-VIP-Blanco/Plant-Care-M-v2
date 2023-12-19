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

import RenderNotification from "./RenderNotification";
import { ModalType } from "@interface/Modals/ModalType";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectNotifications } from "@reduxToolkit/Features/NotificationSlice";
import { NotificationType } from "@interface/Notification/NotificationProps";

const AllNotificationModal = ({ visible, onClose }: ModalType) => {
  const allNotifications = useAppSelector(selectNotifications);

  const readNotifications = allNotifications.filter(
    (notification) => notification.readNotification
  );
  const unreadNotifications = allNotifications.filter(
    (notification) => !notification.readNotification
  );

  // Sort each group by the "date" field in descending order
  const sortGroupByDate = (group: NotificationType[]) =>
    group.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  // Sort and merge read and unread notifications
  const sortedReadNotifications = sortGroupByDate(readNotifications);
  const sortedUnreadNotifications = sortGroupByDate(unreadNotifications);
  // Merge the two arrays
  const mergedNotifications = sortedUnreadNotifications.concat(
    sortedReadNotifications
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
              data={mergedNotifications}
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
