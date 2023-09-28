import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import {
  Text,
  Menu,
  List,
  Checkbox,
  TouchableRipple,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

//component
import RenderContainerItem from "@components/TaskScreen/RenderContainerItem";

//redux
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectFilteredContainer } from "@reduxToolkit/Features/ContainerSlice";
import { filterTaskByStatusAndContainer } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch } from "@reduxToolkit/Hooks";

//interface
import { FilteredTasksProps } from "@interface/FilteredTask/FilteredTaskProps";

const FilteredTasks: React.FC<FilteredTasksProps> = ({
  checkedStatus,
  setCheckedStatus,
  checkedListContainerId,
  setCheckedListContainerId,
}) => {
  //dispatch hook from redux toolkit
  const dispatch = useAppDispatch();

  //container with state to use in the dropdown selection
  const containers = useAppSelector(selectFilteredContainer);

  const containerData = containers.map(({ contName, contId }) => ({
    key: contId,
    value: contName,
  }));
  //handle status checkboxes
  const [checkedAllStatus, setCheckedAllStatus] = useState(false);
  const [checkedGrowing, setCheckedGrowing] = useState(false);
  const [checkedHarvesting, setCheckedHarvesting] = useState(false);

  const handleCheckedAllStatus = () => {
    setCheckedAllStatus(!checkedAllStatus);
    if (!checkedAllStatus) {
      setCheckedGrowing(true);
      setCheckedHarvesting(true);
      setCheckedStatus(["Growing", "Harvesting"]);
    } else {
      setCheckedGrowing(false);
      setCheckedHarvesting(false);
      setCheckedStatus([]);
    }
  };
  const handleCheckedGrowing = () => {
    setCheckedGrowing(!checkedGrowing);
    if (!checkedGrowing) {
      // If the checkbox was unchecked before, push the status to the list
      setCheckedStatus((prevCheckedStatus) => [
        ...prevCheckedStatus,
        "Growing",
      ]);
    } else {
      // If the checkbox was checked before, remove the taskID from the list
      setCheckedStatus((prevCheckedStatus) =>
        prevCheckedStatus.filter((status) => status !== "Growing")
      );
    }
  };
  const handleCheckedHarvesting = () => {
    setCheckedHarvesting(!checkedHarvesting);
    if (!checkedHarvesting) {
      // If the checkbox was unchecked before, push the status to the list
      setCheckedStatus((prevCheckedStatus) => [
        ...prevCheckedStatus,
        "Harvesting",
      ]);
    } else {
      // If the checkbox was checked before, remove the taskID from the list
      setCheckedStatus((prevCheckedStatus) =>
        prevCheckedStatus.filter((status) => status !== "Harvesting")
      );
    }
  };

  useEffect(() => {
    if (checkedGrowing && checkedHarvesting) {
      setCheckedAllStatus(true);
    } else {
      setCheckedAllStatus(false);
    }
  }, [checkedGrowing, checkedHarvesting]);

  //DEBUGGING PURPOSES
  useEffect(() => {
    console.log("Checked status " + checkedStatus);
    //use dispatch for action from slice
  }, [checkedStatus]);
  useEffect(() => {
    console.log("List of container " + checkedListContainerId);
  }, [checkedListContainerId]);

  //call the action from redux to filter the tasks
  useEffect(() => {
    dispatch(
      filterTaskByStatusAndContainer({ checkedStatus, checkedListContainerId })
    );
  }, [checkedStatus, checkedListContainerId]);

  // handle container checkboxes
  const [checkedAllContainer, setCheckedAllContainer] = useState(false);
  const handleCheckedAllContainerId = () => {
    setCheckedAllContainer(!checkedAllContainer);
  };
  const numberOfContainers = containerData.length;
  const [numberOfCheckedContainer, setNumberOfCheckedContainer] = useState(0);
  useEffect(() => {
    if (numberOfCheckedContainer === numberOfContainers) {
      setCheckedAllContainer(true);
    } else {
      setCheckedAllContainer(false);
    }
    console.log(numberOfCheckedContainer);
  }, [numberOfCheckedContainer]);

  useEffect(() => {
    if (checkedAllContainer) {
      setNumberOfCheckedContainer(numberOfContainers);
      setCheckedListContainerId(
        containerData.map((container) => container.key)
      );
    } else {
      if (!(numberOfCheckedContainer >= 1)) {
        setNumberOfCheckedContainer(0);
        setCheckedListContainerId([]);
      }
    }
    if (
      checkedAllContainer === false &&
      numberOfCheckedContainer === numberOfContainers
    ) {
      setNumberOfCheckedContainer(0);
      setCheckedListContainerId([]);
    }
  }, [checkedAllContainer]);

  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const openMenu = () => setFilterMenuVisible(true);
  const closeMenu = () => setFilterMenuVisible(false);
  return (
    <View>
      <Menu
        style={{ marginTop: 50 }}
        visible={filterMenuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="filter" size={40} />
          </TouchableOpacity>
        }
      >
        <View style={{ width: 200, backgroundColor: "white" }}>
          <List.Section style={{ flex: 1, backgroundColor: "white" }}>
            <List.Accordion
              left={() => (
                <Checkbox status={checkedAllStatus ? "checked" : "unchecked"} />
              )}
              titleStyle={{ fontSize: 25, color: "black", fontWeight: "bold" }}
              right={({ isExpanded }) => null} //hide arrow icon
              expanded={true}
              title="Status"
              style={{ alignContent: "center" }}
              onPress={() => {
                handleCheckedAllStatus();
              }}
            >
              <TouchableRipple
                onPress={() => {
                  handleCheckedGrowing();
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox status={checkedGrowing ? "checked" : "unchecked"} />
                  <Text style={{ fontSize: 20 }}>Growing</Text>
                </View>
              </TouchableRipple>

              <TouchableRipple
                onPress={() => {
                  handleCheckedHarvesting();
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={checkedHarvesting ? "checked" : "unchecked"}
                  />
                  <Text style={{ fontSize: 20 }}>To Be Harvest</Text>
                </View>
              </TouchableRipple>
            </List.Accordion>

            <List.Accordion
              left={() => (
                <Checkbox
                  status={checkedAllContainer ? "checked" : "unchecked"}
                />
              )}
              onPress={() => {
                handleCheckedAllContainerId();
              }}
              titleStyle={{ fontSize: 25, color: "black", fontWeight: "bold" }}
              right={({ isExpanded }) => null} //hide arrow icon
              expanded={true}
              title="Container"
              style={{ alignContent: "center" }}
            >
              <ScrollView style={{ height: 120 }} horizontal={true}>
                <View style={{ width: 300 }}>
                  <FlatList
                    data={containerData}
                    renderItem={(
                      { item } // Destructure 'item' from the 'renderItem' function argument
                    ) => (
                      <RenderContainerItem
                        item={item}
                        numberOfContainers={numberOfContainers}
                        numberOfCheckedContainer={numberOfCheckedContainer}
                        checkedAllContainer={checkedAllContainer}
                        setNumberOfCheckedContainer={
                          setNumberOfCheckedContainer
                        }
                        setCheckedListContainerId={setCheckedListContainerId}
                      />
                    )}
                    keyExtractor={(item) => item.key}
                  />
                </View>
              </ScrollView>
            </List.Accordion>
          </List.Section>
        </View>
      </Menu>
    </View>
  );
};

export default FilteredTasks;
