import { View, Dimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { Text, Modal, Portal, Button } from "react-native-paper";
import { Agenda, AgendaEntry, AgendaSchedule } from "react-native-calendars";

//data
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";
import { dummyContainerItem } from "@root/app/dummyData/DummyContainerItem";
import { dummyTaskItem } from "@root/app/dummyData/DummyTaskItem";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";
import { MarkedDate } from "@interface/CalendarEvents/CalendarEventsProps";

//interface
import { EventsModalProps } from "@interface/EventsModal/EventsModalProps";
import { EventItemProps } from "@interface/EventsModal/EventItemProps";

//style
import { EventsModalStyle } from "@stylesheets/EventsModal/EventsModalStyle";

const EventsModal: React.FC<EventsModalProps> = ({
  visible,
  onClose,
  selectedDate,
}) => {
  const markedDates: Record<string, MarkedDate> = {};

  for (const item of dummyTaskItem) {
    const date = new Date(item.dateExpectedHarvest);
    const formattedDate = date.toISOString().split("T")[0];

    if (!markedDates[formattedDate]) {
      markedDates[formattedDate] = {
        selected: true,
        selectedColor: "green",
      };
    }
  }
  const eventItems: EventItemProps = dummyTaskItem.reduce(
    (acc: EventItemProps, taskItem) => {
      const date = new Date(taskItem.dateExpectedHarvest);
      const formattedDate = date.toISOString().split("T")[0];

      const { taskId, farmerName, plantId, contId } = taskItem;
      //get the plant object based on the plantId from the task
      const plantObj = dummyPlantItem.find(
        (plant) => plantId === plant.plantID
      );
      const containerObj = dummyContainerItem.find(
        (container) => contId === container.contId
      );
      //check if date is already used as a key, if yes, push the data to its list of value
      if (acc[formattedDate]) {
        acc[formattedDate].push({
          id: taskId,
          height: 80,
          day: formattedDate,
          name: "Your plants are ready to harvest",
          farmerName: farmerName,
          plantName: plantObj?.plantName,
          containerName: containerObj?.contName,
        });
      } else {
        acc[formattedDate] = [
          {
            id: taskId,
            height: 80,
            day: formattedDate,
            name: "Your plants are ready to harvest",
            farmerName: farmerName,
            plantName: plantObj?.plantName,
            containerName: containerObj?.contName,
          },
        ];
      }

      return acc;
    },
    {}
  );

  const renderEvent = (reservation: any) => {
    return (
      <LinearGradient
        style={EventsModalStyle.renderEventContainer}
        colors={[COLORS.BACKGROUNDGRADIENTSTART, COLORS.BACKGROUNDGRADIENTEND]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={EventsModalStyle.renderEventText}>
          {reservation.id} - {reservation.plantName}
        </Text>
        <Text style={EventsModalStyle.renderEventText}>
          {reservation.containerName}
        </Text>
        <Text style={EventsModalStyle.renderEventText}>{reservation.day}</Text>
      </LinearGradient>
    );
  };

  const renderEmptyEvent = () => {
    return (
      <View style={EventsModalStyle.renderEmptyEventContainer}>
        <Text style={{ fontSize: 30 }}>No Events on this day</Text>
      </View>
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={EventsModalStyle.modal}
      >
        <View style={EventsModalStyle.modalInnerContainer}>
          <View style={{ flex: 0.3 }}>
            <Text style={EventsModalStyle.harvestDateText}>
              Expected Harvest Dates
            </Text>
          </View>

          <View style={{ flex: 9 }}>
            <Agenda
              items={eventItems}
              renderItem={renderEvent}
              renderEmptyData={renderEmptyEvent}
              selected={selectedDate}
              contentContainerStyle={{ paddingBottom: 100 }}
              markedDates={markedDates}
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

export default EventsModal;
