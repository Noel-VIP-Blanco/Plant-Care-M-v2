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
import { dp } from "@root/utilities/shared/SpDp";

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
        marginTop: dp(-180),
        width: dp(800), //"75%", // You can adjust the width as a percentage
        alignItems: "center",
        height: dp(900),
        borderRadius: dp(60),
        elevation: 2,
        backgroundColor: "white",
      }}
    >
      <Calendar
        style={{ width: dp(750), margin: dp(50) }}
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
