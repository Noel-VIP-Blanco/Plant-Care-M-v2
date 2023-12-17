import { View } from "react-native";
import { Text, Portal, Modal, Button } from "react-native-paper";
import { FC } from "react";

//types
import { OneNotificationModalProps } from "@interface/Notification/OneNotificationModalProps";

//stylesheets
import { OneNotificationModalStyle } from "@stylesheets/NotificationItem/OneNotificationModalStyle";

const OneNotificationModal: FC<OneNotificationModalProps> = ({
  visible,
  onClose,
  item,
}) => {
  //format date to string
  const formattedDate = item.date.split("T")[0];
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <View style={OneNotificationModalStyle.modalMainContainer}>
          <Text style={OneNotificationModalStyle.notificationText}>
            Notification
          </Text>

          <View style={OneNotificationModalStyle.contentContainer}>
            <Text style={OneNotificationModalStyle.title}>{item.title}</Text>
            <Text style={OneNotificationModalStyle.subTitle}>
              {item.content}
            </Text>
            <Text style={OneNotificationModalStyle.date}>{formattedDate}</Text>
          </View>

          <Button
            mode="elevated"
            onPress={() => {
              onClose();
            }}
            textColor="black"
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ backgroundColor: "#44f321", padding: 5 }}
            style={{ margin: 5 }}
          >
            Close
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default OneNotificationModal;
