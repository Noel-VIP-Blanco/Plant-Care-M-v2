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

const HarvestLogScreen = ({ navigation }: any) => {
  //use redux toolkits and data
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTask);
  const harvestLogs = useAppSelector(selectHarvestLog);
  //data for row in table
  const listOfRowData = useAppSelector(selectListOfRowData);
  const filterListOfRowData = useAppSelector(selectFilteredListOfRowData);

  const tableHead = ["Plant Name", "Date Harvested", "Harvester"];

  useEffect(() => {
    const newList: rowType[] = harvestLogs.map((harvestLogItem) => {
      const taskObject = tasks.find(
        (task) => task.taskId === harvestLogItem.taskId
      );
      const plantId = taskObject?.plantId;
      const plantObject = dummyPlantItem.find(
        (plant) => plant.plantID === plantId
      );

      if (plantObject) {
        return [
          plantObject.plantName,
          harvestLogItem.dateHarvested,
          harvestLogItem.harvester,
        ];
      }

      return ["", "", ""];
    });

    dispatch(addListOfRowData(newList));
    dispatch(addFilteredListOfRowData(newList));
  }, [harvestLogs]);

  const onSearch = (text: string) => {
    if (text === "") {
      //reset the filteredLiist
      dispatch(addFilteredListOfRowData(listOfRowData));
    } else {
      let tempData = listOfRowData.filter((item) => {
        const harvesterMatch = item[2]
          .toLowerCase()
          .includes(text.toLowerCase()); // Check if the harvester name matches the search text
        const plantNameMatch = item[0]
          .toLowerCase()
          .includes(text.toLowerCase()); // Check if the plant name matches the search text

        // Return true if either harvesterMatch or plantNameMatch is true
        return harvesterMatch || plantNameMatch;
      });
      dispatch(addFilteredListOfRowData(tempData));
    }
  };

  //handle checkYear in filter
  const [checkedListYears, setCheckedListYears] = useState<string[]>([]);
  const [checkedListMonths, setCheckedListMonths] = useState<string[]>([]);

  return (
    <View style={{ backgroundColor: COLORS.BACKGROUNDCOLOR, flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={HarvestLogScreenStyle.backArrowContainer}>
          <TouchableRipple
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back"
              style={{ marginTop: 15 }}
              size={60}
              color="white"
            />
          </TouchableRipple>
        </View>
      </View>
      <View style={HarvestLogScreenStyle.containerContents}>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 0.8 }}>
              <CustomSearchBar
                onSearch={onSearch}
                searchValue="Harvester / Plant"
              />
            </View>
            <View style={{ flex: 0.1 }}>
              <FilteredHarvestLog
                checkedListYears={checkedListYears}
                setCheckedListYears={setCheckedListYears}
                checkedListMonths={checkedListMonths}
                setCheckedListMonths={setCheckedListMonths}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 30,
              marginVertical: 5,
              color: "#086308",
              fontWeight: "bold",
            }}
          >
            Harvest Logs
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView style={{ marginBottom: 150 }} horizontal={true}>
            <View>
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderColor: "black",
                }}
              >
                <Row
                  data={tableHead}
                  widthArr={[140, 140, 140]}
                  textStyle={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 20,
                  }}
                  style={{ height: 50, backgroundColor: "#3bfa3b" }}
                />
              </Table>
              {filterListOfRowData.length === 0 ? (
                <Rows
                  data={[["No Harvest Log Found"]]}
                  widthArr={[420]}
                  textStyle={{
                    textAlign: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 50,
                  }}
                  style={{ height: "100%" }}
                />
              ) : (
                <FlatList
                  style={{ marginBottom: 10 }}
                  data={filterListOfRowData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Row
                      data={item}
                      key={index}
                      widthArr={[140, 140, 140]}
                      textStyle={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 20,
                      }}
                      style={{ height: 50, backgroundColor: "#dae2da" }}
                    />
                  )}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HarvestLogScreen;
