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

import { selectTask } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { selectContainer } from "@reduxToolkit/Features/ContainerSlice";

const EventsModal: React.FC<EventsModalProps> = ({
  visible,
  onClose,
  selectedDate,
}) => {
  const markedDates: Record<string, MarkedDate> = {};
   const dispatch = useAppDispatch();
   const tasks = useAppSelector(selectTask);
   const plant = useAppSelector(selectPlants)
   const container = useAppSelector(selectContainer)
  for (const item of tasks) {
    const date = item.harvestDate;
    const formattedDate = date.split("T")[0];

    if (!markedDates[formattedDate]) {
      markedDates[formattedDate] = {
        selected: true,
        selectedColor: "green",
      };
    }
  }
  const eventItems: EventItemProps = tasks.reduce(
    (acc: EventItemProps, taskItem) => {
      const date = taskItem.harvestDate;
      const formattedDate = date.split("T")[0];

      const { id, plantId, containerId } = taskItem;
      //get the plant object based on the plantId from the task
      const plantObj = plant.find(
        (plant) => plantId === plant.id
      );
      const containerObj = container.find(
        (container) => containerId === container.id
      );
      //check if date is already used as a key, if yes, push the data to its list of value
      if (acc[formattedDate]) {
        acc[formattedDate].push({
          id: id.toString(),
          height: 80,
          day: formattedDate,
          name: "Your plants are ready to harvest",
          plantName: plantObj?.name,
          containerName: containerObj?.name,
        });
      } else {
        acc[formattedDate] = [
          {
            id: id.toString(),
            height: 80,
            day: formattedDate,
            name: "Your plants are ready to harvest",
            plantName: plantObj?.name,
            containerName: containerObj?.name,
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
