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
  getRememberMe,
} from "@root/utilities/shared/LocalStorage";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";
import { registerIndieID, unregisterIndieDevice } from "native-notify";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectHarvestLog } from "@reduxToolkit/Features/HarvestLogSlice";

import { FIREBASE_DATABASE } from "@root/FirebaseConfig";
import { onValue, ref } from "firebase/database";

const HomeScreen = ({ navigation }: any) => {
  // const [ph, setph] = useState("None");

  // console.log("Entered ph useeffect");
  // const db = FIREBASE_DATABASE;
  // const starCountRef = ref(db, "farm/1/arduinoBoard/1/currentpH");
  // onValue(starCountRef, (snapshot) => {
  //   if (!snapshot) {
  //     console.log("Snapshot is empty");
  //   }
  //   setph(snapshot.val());
  //   console.log(snapshot.val());
  // });
  // console.log("Exited ph useeffect");

  const [currentUser, setCurrentUser] = React.useState<currentUserProps | null>(
    null
  );
  const [rememberMe, setRememberMe] = React.useState<boolean>();
  React.useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("Error getting current user:", error);
      });

    getRememberMe()
      .then((rememberMeFromLocal) => {
        setRememberMe(rememberMeFromLocal);
      })
      .catch((error) => {
        console.log("Error getting current remembeme:", error);
      });
  }, []);

  console.log("Error getting current remembeme:", currentUser?.id);
  if (rememberMe) {
    registerIndieID(`${currentUser?.id}`, 13240, "JgacDlBDrMg8qvQWalJuRM");
  } else {
    unregisterIndieDevice(
      `${currentUser?.id}`,
      13240,
      "JgacDlBDrMg8qvQWalJuRM"
    );
  }
  //filtered notification that has not yet read
  const unreadNotification = dummyNotifications.filter(
    (notification) => notification.notifHasRead === false
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
              keyExtractor={(item) => item.notifId.toString()}
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
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;
