import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

//interface
import {
  CalendarEventsProps,
  MarkedDate,
} from "@interface/CalendarEvents/CalendarEventsProps";

import { dp } from "@root/utilities/shared/SpDp";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectHarvestLog } from "@reduxToolkit/Features/HarvestLogSlice";

const CalendarEvents: React.FC<CalendarEventsProps> = ({
  openEventModal,
  setSelectedDate,
}) => {
   //use redux toolkits and data
   const dispatch = useAppDispatch();
   const harvestLogs = useAppSelector(selectHarvestLog);

  const markedDates: Record<string, MarkedDate> = {};

  for (const item of harvestLogs) {
    const date = item.harvestedDate;
    const formattedDate = date.split("T")[0];

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
