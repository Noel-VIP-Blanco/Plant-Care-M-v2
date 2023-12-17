import { View, Image } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import { FC, useState } from "react";
import {
  INotificationItem,
  NotificationType,
} from "@interface/Notification/NotificationProps";
import OneNotificationModal from "./OneNotificationModal";

interface IRenderNotification {
  item: NotificationType;
}
const RenderNotification: FC<IRenderNotification> = ({ item }) => {
  //one notifications modal
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const openNotifModal = () => setNotifModalVisible(true);
  const closeNotifModal = () => setNotifModalVisible(false);
  //profile image
  const profileImage = "../../../assets/PlantCareImages/HydroponicLogo.png";
  //format date to string
  const date = item.date;
  const formattedDate = date.split("T")[0];
  return (
    <TouchableRipple
      key={item.id}
      rippleColor={item.readNotification ? "#afafaf" : "#babffd"}
      onPress={() => {
        openNotifModal();
      }}
      style={{
        backgroundColor: item.readNotification ? "#dfd3d3" : "#a1a7f5",
        padding: 5,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            margin: 5,
            marginLeft: 25,
            marginRight: 10,
          }}
        >
          <Image
            source={require(profileImage)}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
          />
        </View>

        <View
          style={{
            flex: 9,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {item.content}
            </Text>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Modal */}
        <OneNotificationModal
          visible={notifModalVisible}
          onClose={closeNotifModal}
          item={item}
        />
      </View>
    </TouchableRipple>
  );
};

export default RenderNotification;
