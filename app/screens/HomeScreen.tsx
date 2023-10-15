import { View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Menu,
  Divider,
  Surface,
  TouchableRipple,
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
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import {
  getAllContainers,
  selectContainer,
} from "@reduxToolkit/Features/ContainerSlice";
import {
  getAllArduinoBoards,
  selectArduinoBoards,
} from "@reduxToolkit/Features/ArduinoBoardSlice";
import { getAllPlant, selectPlants } from "@reduxToolkit/Features/PlantSlice";

const HomeScreen = ({ navigation }: any) => {
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

  //get all data from aws database
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllContainers("1"));
        await dispatch(getAllArduinoBoards("1"));
        await dispatch(getAllPlant("1"));
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  //data from redux
  const containers = useAppSelector(selectContainer);
  const arduinoBoards = useAppSelector(selectArduinoBoards);
  const plants = useAppSelector(selectPlants);
  console.log("All Containers homescreen", containers);
  console.log("All Arduino Boards homescreen", arduinoBoards);
  console.log("All plants homescreen", plants);

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
            style={{ marginTop: 50, width: 250 }}
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
            <Text style={{ fontSize: 25 }}>Notifications</Text>

            {/* render the notifications  */}
            <FlatList
              style={{ height: 200, width: "100%" }}
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
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  View All
                </Text>
              </TouchableRipple>
            </Surface>
          </Menu>
        </View>

        <View style={HomeStyle.bottomMainContainer}>
          <CalendarEvents
            openEventModal={openeventModal}
            setSelectedDate={setSelectedDate}
          />

          <ScrollView>
            <HomeItems navigation={navigation} />
          </ScrollView>
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
