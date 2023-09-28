import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

//interface
import {
  CalendarEventsProps,
  MarkedDate,
} from "@interface/CalendarEvents/CalendarEventsProps";

//dummy local data
import { dummyTaskItem } from "@root/app/dummyData/DummyTaskItem";

const CalendarEvents: React.FC<CalendarEventsProps> = ({
  openEventModal,
  setSelectedDate,
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
  return (
    <View
      style={{
        marginTop: -100,
        width: "75%", // You can adjust the width as a percentage
        alignItems: "center",
        height: 385,
        borderRadius: 20,
        elevation: 2,
        backgroundColor: "white",
      }}
    >
      <Calendar
        style={{ width: 300, margin: 20 }}
        hideExtraDays
        markedDates={markedDates}
        onDayPress={(date) => {
          setSelectedDate(date.dateString);
          openEventModal();
        }}
      />
    </View>
  );
};

export default CalendarEvents;
