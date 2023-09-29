import { View, ScrollView, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Table, Row, Rows } from "react-native-reanimated-table";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//stylesheets
import { HarvestLogScreenStyle } from "@stylesheets/HarvestLogScreen/HarvestLogScreenStyle";

//components
import CustomSearchBar from "@components/Shared/CustomSearchBar";
import FilteredHarvestLog from "@components/HarvestLogScreen/FilteredHarvestLog";

//data
import { dummyPlantItem } from "../dummyData/DummyPlantItem";

//import redux toolkits and data
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import {
  selectHarvestLog,
  addFilteredListOfRowData,
  addListOfRowData,
  selectFilteredListOfRowData,
  selectListOfRowData,
} from "@reduxToolkit/Features/HarvestLogSlice";
import { selectTask } from "@reduxToolkit/Features/TaskSlice";

type rowType = [string, string, string];

const HarvestLogScreen = () => {
  return (
    <View>
      <Text>HarvestLogScreen</Text>
    </View>
  );
};

export default HarvestLogScreen;
