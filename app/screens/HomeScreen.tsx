import { View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Menu,
  Divider,
  Surface,
  TouchableRipple,
  Button,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//components
import CalendarEvents from "@components/Home/CalendarEvents";
import HomeItems from "@components/Home/HomeItems";
import EventsModal from "@components/Home/EventsModal";
import NotificationItem from "@components/Notification/NotificationItem";

//stylesheets
import { HeaderRightIconStyle } from "@stylesheets/HeaderNavigation/HeaderRightIconStyle";
import { HomeStyle } from "@stylesheets/Home/HomeStyle";

import { dummyNotifications } from "../dummyData/DummyNotification";
import { dp, sp } from "@root/utilities/shared/SpDp";
import {
  getCurrentUser,
  getFarm,
  getNotification,
  getRememberMe,
} from "@root/utilities/shared/LocalStorage";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import { registerIndieID } from "native-notify";

import axios from "axios";
import AllNotificationModal from "@components/Notification/AllNotificationModal";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectNotifications } from "@reduxToolkit/Features/NotificationSlice";
import { selectOneFarm } from "@reduxToolkit/Features/FarmSlice";
import {
  getHumidity,
  getTemperature,
} from "@root/utilities/shared/RealtineDatabase";

const HomeScreen = ({ navigation }: any) => {
  const [currentUser, setCurrentUser] = React.useState<currentUserProps | null>(
    null
  );
  const [farmIdFromLocal, setFarmIdFromLocal] = useState<
    string | null | undefined
  >(null);

  const [notification, setNotification] = React.useState<boolean>();

  React.useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });

    getFarm()
      .then((farmId) => {
        setFarmIdFromLocal(farmId);
      })
      .catch((error) => {
        console.log("Error getting current farm:", error);
      });
  }, []);

  useEffect(() => {
    setNotification(currentUser?.allowNotifications);
  }, [currentUser]);

  console.log("Error getting current remembeme:", currentUser?.id);
  console.log("Notif from local homescreen", notification);

  const oneFarm = useAppSelector(selectOneFarm);
  const mainArduinoBoard = oneFarm?.mainArduinoBoardId;
  const [sensorHumidity, setSensorHumidity] = useState("");
  const [sensorTemperature, setSensorTemperature] = useState("");

  useEffect(() => {
    getTemperature({
      farmId: farmIdFromLocal,
      mainArduinoBoard,
      setSensorTemperature,
    });
  }, [sensorTemperature, farmIdFromLocal, mainArduinoBoard]);

  useEffect(() => {
    getHumidity({
      farmId: farmIdFromLocal,
      mainArduinoBoard,
      setSensorHumidity,
    });
  }, [sensorHumidity, farmIdFromLocal, mainArduinoBoard]);
  // console.log("One farm object", oneFarm);

  const allNotifications = useAppSelector(selectNotifications);
  //filtered notification that has not yet read
  const unreadNotification = allNotifications.filter(
    (notifications) => notifications.readNotification === false
  );
  console.log("All unread notification", unreadNotification);
  const sortedUnreadNotification = [...unreadNotification].sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // sort in descending order
  });

  //all notifications modal
  const [allNotifModalVisible, setAllNotifModalVisible] = useState(false);
  const openAllNotifModal = () => setAllNotifModalVisible(true);
  const closeAllNotifModal = () => setAllNotifModalVisible(false);

  //notification menu for notification icon click
  const [notifMenuVisible, setNotifMenuVisible] = useState(false);
  const closeMenu = () => {
    setNotifMenuVisible(false);
  };
  const openMenu = () => {
    setNotifMenuVisible(true);
  };

  //open event modal
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const openeventModal = () => setEventModalVisible(true);
  const closeEventModal = () => setEventModalVisible(false);

  if (notification) {
    registerIndieID(`${currentUser?.id}`, 13240, "JgacDlBDrMg8qvQWalJuRM");
    // registerIndieID(`${currentUser?.id}`, 16867, "PWEmCyU340w68O32FbbIK6");
  } else {
    // axios.delete(
    //   `https://app.nativenotify.com/api/app/indie/sub/16867/PWEmCyU340w68O32FbbIK6/${currentUser?.id}`
    // );
    axios.delete(
      `https://app.nativenotify.com/api/app/indie/sub/13240/JgacDlBDrMg8qvQWalJuRM/${currentUser?.id}`
    );
  }
  return (
    <View style={HomeStyle.pageContainer}>
      <LinearGradient
        style={HomeStyle.linearGradient}
        colors={[COLORS.BACKGROUNDCOLOR, COLORS.BACKGROUNDGRADIENTSTART]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={HomeStyle.notificationBellContainer}>
          <Menu
            contentStyle={{ alignItems: "center" }}
            style={{ marginTop: dp(120), width: dp(590) }}
            visible={notifMenuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity
                onPress={() => {
                  openMenu();
                }}
                style={HeaderRightIconStyle.hearderRightTouchable}
              >
                <Ionicons
                  name="notifications-circle"
                  style={{
                    fontSize: dp(140),
                    color: "#ffffff",
                  }}
                  // style={HeaderRightIconStyle.headerRightIcon}
                />
                {sortedUnreadNotification.length !== 0 ? (
                  <FontAwesome
                    name="circle"
                    style={{ marginTop: dp(-40), marginLeft: dp(80) }}
                    size={dp(40)}
                    color="red"
                  />
                ) : (
                  ""
                )}
              </TouchableOpacity>
            }
          >
            <Text style={{ fontSize: sp(70) }}>Notifications</Text>

            {/* render the notifications  */}
            <FlatList
              style={{ height: dp(600), width: "100%" }}
              data={sortedUnreadNotification}
              renderItem={({ item }) => (
                <>
                  <NotificationItem notification={item} />
                  <Divider bold={true} />
                </>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <Surface style={{ width: "100%" }}>
              <TouchableRipple
                style={{
                  width: "100%",
                }}
                onPress={() => {
                  openAllNotifModal();
                  closeMenu();
                }}
              >
                <Text style={{ textAlign: "center", fontSize: sp(55) }}>
                  View All
                </Text>
              </TouchableRipple>
            </Surface>
          </Menu>
        </View>

        <View
          style={HomeStyle.bottomMainContainer}
          className="bg-white dark:bg-gray-800"
        >
          <CalendarEvents
            openEventModal={openeventModal}
            setSelectedDate={setSelectedDate}
          />

          <ScrollView>
            <HomeItems
              navigation={navigation}
              sensorHumidity={sensorHumidity}
              sensorTemperature={sensorTemperature}
            />
          </ScrollView>

          {/* <Button
            onPress={() => {
              console.log("CURRENT USER", notification);
            }}
          >
            For RealtimeDatabase Test
          </Button> */}
        </View>

        {/* Modals */}
        <EventsModal
          visible={eventModalVisible}
          onClose={closeEventModal}
          selectedDate={selectedDate}
        />

        <AllNotificationModal
          visible={allNotifModalVisible}
          onClose={closeAllNotifModal}
        />
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;
