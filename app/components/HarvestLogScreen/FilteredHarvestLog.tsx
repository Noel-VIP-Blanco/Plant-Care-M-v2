import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Text, Menu, List, Checkbox } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
//data
import { dummyHarvestLog } from "@root/app/dummyData/DummyHarvestLog";

//components
import RenderMonthCheckBox from "@components/HarvestLogScreen/RenderMonthCheckBox";
import RenderYearCheckBox from "@components/HarvestLogScreen/RenderYearCheckBox";

//redux toolkits and data
import {
  selectHarvestLog,
  filterHarvestLog,
} from "@reduxToolkit/Features/HarvestLogSlice";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";

//interface
import { FilteredHarvestLogProps } from "@interface/FilteredHarvestLog/FilteredHarvestLogProps";

const FilteredHarvestLog: React.FC<FilteredHarvestLogProps> = ({
  checkedListYears,
  setCheckedListYears,
  checkedListMonths,
  setCheckedListMonths,
}) => {
  const { colorScheme } = useColorScheme();
  //redux toolkits and data
  const harvestData = useAppSelector(selectHarvestLog);
  const dispatch = useAppDispatch();

  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const openMenu = () => setFilterMenuVisible(true);
  const closeMenu = () => setFilterMenuVisible(false);

  //data for filtered  menu items
  const allYearsSet = new Set(
    harvestData.map((log) => log.dateHarvested.substring(0, 4))
  );
  const allYearsData = Array.from(allYearsSet).map((year) => year.toString());
  allYearsData.sort((a, b) => parseInt(b) - parseInt(a));

  const allMonthsData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //handle Year checkboxes
  const [checkedAllYear, setCheckedAllYear] = useState(false);
  const handleCheckedAllYear = () => {
    setCheckedAllYear(!checkedAllYear);
  };
  const numberOfYears = allYearsData.length;
  const [numberOfCheckedYears, setNumberOfCheckedYears] = useState(0);

  const [checkedAllMonths, setCheckedAllMonths] = useState(false);
  const handleCheckedAllMonths = () => {
    setCheckedAllMonths(!checkedAllMonths);
  };
  const numberOfMonths = allMonthsData.length;
  const [numberOfCheckedMonths, setNumberOfCheckedMonths] = useState(0);
  //useeffect for year checkboxes
  useEffect(() => {
    if (numberOfCheckedYears === numberOfYears) {
      setCheckedAllYear(true);
    } else {
      setCheckedAllYear(false);
    }
    console.log(numberOfCheckedYears);
  }, [numberOfCheckedYears]);

  useEffect(() => {
    if (checkedAllYear) {
      setNumberOfCheckedYears(numberOfYears);
      setCheckedListYears(allYearsData.map((year) => year));
    } else {
      if (!(numberOfCheckedYears >= 1)) {
        setNumberOfCheckedYears(0);
        setCheckedListYears([]);
      }
    }
    if (checkedAllYear === false && numberOfCheckedYears === numberOfYears) {
      setNumberOfCheckedYears(0);
      setCheckedListYears([]);
    }
  }, [checkedAllYear]);

  //useeffect for month checkboxes
  useEffect(() => {
    if (numberOfCheckedMonths === numberOfMonths) {
      setCheckedAllMonths(true);
    } else {
      setCheckedAllMonths(false);
    }
    console.log(numberOfCheckedMonths);
  }, [numberOfCheckedMonths]);

  useEffect(() => {
    if (checkedAllMonths) {
      setNumberOfCheckedMonths(numberOfMonths);
      setCheckedListMonths(allMonthsData.map((Month) => Month));
    } else {
      if (!(numberOfCheckedMonths >= 1)) {
        setNumberOfCheckedMonths(0);
        setCheckedListMonths([]);
      }
    }
    if (
      checkedAllMonths === false &&
      numberOfCheckedMonths === numberOfMonths
    ) {
      setNumberOfCheckedMonths(0);
      setCheckedListMonths([]);
    }
  }, [checkedAllMonths]);
  //DEBUGGING PURPOSES
  useEffect(() => {
    console.log(checkedListMonths);
  }, [checkedListMonths]);
  useEffect(() => {
    console.log(checkedListYears);
  }, [checkedListYears]);

  //filtered the table based on checkboxes
  useEffect(() => {
    dispatch(
      filterHarvestLog({
        checkedListMonths: checkedListMonths,
        checkedListYears: checkedListYears,
      })
    );
  }, [checkedListMonths, checkedListYears]);

  return (
    <View
      style={{ backgroundColor: colorScheme === "light" ? "white" : "#1E293B" }}
    >
      <Menu
        style={{ marginTop: 50 }}
        visible={filterMenuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Ionicons
              name="filter"
              size={40}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        }
      >
        <View
          style={{
            width: 200,
            backgroundColor: colorScheme === "light" ? "white" : "#1E293B",
          }}
        >
          <List.Section
            style={{
              flex: 1,
              backgroundColor: colorScheme === "light" ? "white" : "#1E293B",
            }}
          >
            <List.Accordion
              left={() => (
                <Checkbox status={checkedAllYear ? "checked" : "unchecked"} />
              )}
              onPress={() => {
                handleCheckedAllYear();
              }}
              titleStyle={{
                fontSize: 25,
                color: colorScheme === "light" ? "black" : "white",
                fontWeight: "bold",
              }}
              right={({ isExpanded }) => null} //hide arrow icon
              expanded={true}
              title="Year"
              style={{
                alignContent: "center",
                backgroundColor: colorScheme === "light" ? "white" : "#1E293B",
              }}
            >
              <View style={{ height: 120 }}>
                <FlatList
                  data={allYearsData}
                  renderItem={(
                    { item } // Destructure 'item' from the 'renderItem' function argument
                  ) => (
                    <RenderYearCheckBox
                      item={item}
                      numberOfYears={numberOfYears}
                      numberOfCheckedYears={numberOfCheckedYears}
                      setNumberOfCheckedYears={setNumberOfCheckedYears}
                      checkedAllYear={checkedAllYear}
                      setCheckedListYears={setCheckedListYears}
                    />
                  )}
                  keyExtractor={(index) => index.toString()}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              left={() => (
                <Checkbox status={checkedAllMonths ? "checked" : "unchecked"} />
              )}
              onPress={() => {
                handleCheckedAllMonths();
              }}
              titleStyle={{
                fontSize: 25,
                color: colorScheme === "light" ? "black" : "white",
                fontWeight: "bold",
              }}
              right={({ isExpanded }) => null} //hide arrow icon
              expanded={true}
              title="Months"
              style={{
                alignContent: "center",
                backgroundColor: colorScheme === "light" ? "white" : "#1E293B",
              }}
            >
              <View style={{ height: 120 }}>
                <FlatList
                  data={allMonthsData}
                  renderItem={(
                    { item } // Destructure 'item' from the 'renderItem' function argument
                  ) => (
                    <RenderMonthCheckBox
                      item={item}
                      numberOfMonths={numberOfMonths}
                      numberOfCheckedMonths={numberOfCheckedMonths}
                      setNumberOfCheckedMonths={setNumberOfCheckedMonths}
                      checkedAllMonths={checkedAllMonths}
                      setCheckedListMonths={setCheckedListMonths}
                    />
                  )}
                  keyExtractor={(index) => index.toString()}
                />
              </View>
            </List.Accordion>
          </List.Section>
        </View>
      </Menu>
    </View>
  );
};

export default FilteredHarvestLog;
