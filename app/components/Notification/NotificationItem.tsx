import { View, FlatList, Image } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useState } from "react";

//style
import { NotificationItemStyle } from "@stylesheets/NotificationItem/NotificationItemStyle";

//component
import OneNotificationModal from "@components/Notification/OneNotificationModal";

//interface
import { NotificationItemProps } from "@interface/Notification/NotificationProps";
import { dp } from "@root/utilities/shared/SpDp";
import axios from "axios";
import { baseURL } from "@root/utilities/shared/BaseURL";
import { useAppDispatch } from "@reduxToolkit/Hooks";
import { getAllNotification } from "@reduxToolkit/Features/NotificationSlice";

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const profileImage = "../../../assets/PlantCareImages/PlantCareLogo.png";
  const date = notification.date;
  const formattedDate = date.split("T")[0];

  //one notifications modal
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const openNotifModal = () => setNotifModalVisible(true);
  const closeNotifModal = () => setNotifModalVisible(false);
  const dispatch = useAppDispatch();
  return (
    <TouchableRipple
      key={notification.id}
      rippleColor="#babffd"
      onPress={() => {
        axios.patch(
          `${baseURL}/api/v1/notifications/${notification.id}/toggle-is-read-notification`,
          {
            readNotification: true,
          }
        );
        dispatch(getAllNotification());
        openNotifModal();
      }}
      style={NotificationItemStyle.touchRipple}
    >
      <View style={NotificationItemStyle.mainContainer}>
        <View style={NotificationItemStyle.profilePicContainer}>
          <Image
            source={require(profileImage)}
            style={{
              height: dp(100),
              width: dp(100),
              borderRadius: 30,
              marginLeft: dp(25),
            }}
          />
        </View>
        <View style={NotificationItemStyle.notificationContentContainer}>
          <View>
            <Text
              style={NotificationItemStyle.notificationTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {notification.title}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={NotificationItemStyle.notificationSubtitle}
            >
              {notification.content}
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
