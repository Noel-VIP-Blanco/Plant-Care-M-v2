import { View, FlatList, Image } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useState } from "react";

//style
import { NotificationItemStyle } from "@stylesheets/NotificationItem/NotificationItemStyle";

//component
import OneNotificationModal from "@components/Notification/OneNotificationModal";

//interface
import { NotificationItemProps } from "@interface/Notification/NotificationProps";

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const profileImage = "../../../assets/PlantCareImages/PlantCareLogo.png";
  const date = new Date(notification.notifDate);
  const formattedDate = date.toISOString().split("T")[0];

  //one notifications modal
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const openNotifModal = () => setNotifModalVisible(true);
  const closeNotifModal = () => setNotifModalVisible(false);

  return (
    <TouchableRipple
      key={notification.notifId}
      rippleColor="#babffd"
      onPress={() => {
        openNotifModal();
      }}
      style={NotificationItemStyle.touchRipple}
    >
      <View style={NotificationItemStyle.mainContainer}>
        <View style={NotificationItemStyle.profilePicContainer}>
          <Image
            source={require(profileImage)}
            style={{ height: 50, width: 50, borderRadius: 30, marginLeft: 10 }}
          />
        </View>
        <View style={NotificationItemStyle.notificationContentContainer}>
          <View>
            <Text
              style={NotificationItemStyle.notificationTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {notification.notifTitle}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={NotificationItemStyle.notificationSubtitle}
            >
              {notification.notifSubTitle}
            </Text>
            <Text style={NotificationItemStyle.notificationDate}>
              {formattedDate}
            </Text>
          </View>

          {/* Modal */}
          <OneNotificationModal
            visible={notifModalVisible}
            onClose={closeNotifModal}
            item={notification}
          />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default NotificationItem;
