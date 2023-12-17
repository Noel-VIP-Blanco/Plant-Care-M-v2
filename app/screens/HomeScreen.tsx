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
import { Ionicons } from "@expo/vector-icons";

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

const HomeScreen = ({ navigation }: any) => {
  const [currentUser, setCurrentUser] = React.useState<currentUserProps | null>(
    null
  );
  const [farmIdFromLocal, setFarmIdFromLocal] = useState<
    string | null | undefined
  >(null);
  const [notification, setNotification] = React.useState<boolean>();

  const [sensorHumidity, setSensorHumidity] = useState("");
  const [sensorTemperature, setSensorTemperature] = useState("");
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
    getNotification()
      .then((notifFromLocal) => {
        setNotification(notifFromLocal);
      })
      .catch((error) => {
        console.log("Error getting current notification:", error);
      });
  }, []);

  console.log("Error getting current remembeme:", currentUser?.id);
  if (notification) {
    registerIndieID(`${currentUser?.id}`, 13240, "JgacDlBDrMg8qvQWalJuRM");
  } else {
    axios.delete(
      `https://app.nativenotify.com/api/app/indie/sub/13240/JgacDlBDrMg8qvQWalJuRM/${currentUser?.id}`
    );
    // unregisterIndieDevice(
    //   `${currentUser?.id}`,
    //   13240,
    //   "JgacDlBDrMg8qvQWalJuRM"
    // );
  }

  const allNotifications = useAppSelector(selectNotifications);
  console.log("All notification from database", allNotifications);
  //filtered notification that has not yet read
  const unreadNotification = allNotifications.filter(
    (notification) => notification.readNotification === false
  );

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
                  style={HeaderRightIconStyle.headerRightIcon}
                />
              </TouchableOpacity>
            }
          >
            <Text style={{ fontSize: sp(70) }}>Notifications</Text>

            {/* render the notifications  */}
            <FlatList
              style={{ height: dp(600), width: "100%" }}
              data={unreadNotification}
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
            <HomeItems navigation={navigation} />
          </ScrollView>

          {/* <Button
            onPress={() => {
              console.log("CURRENT PH", ph);
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
