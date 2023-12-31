import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, FAB, Menu, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

//utilities
import { COLORS } from "@root/utilities/shared/Colors";

//stylesheets
import { HeaderRightIconStyle } from "@stylesheets/HeaderNavigation/HeaderRightIconStyle";
import { TaskScreeenStyle } from "@stylesheets/Task/TaskScreeenStyle";

//components
import CustomSearchBar from "@components/Shared/CustomSearchBar";
import FilteredTasks from "@components/TaskScreen/FilteredTasks";
import TaskCardList from "@components/TaskScreen/TaskCardList";
import AddTaskModal from "@components/TasksModal/AddTaskModal";
import AddContainerModal from "@components/TasksModal/AddContainerModal";
import HarvestTaskModal from "@components/TasksModal/HarvestTaskModal";

//redux
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import {
  addTask,
  searchTaskByPlantName,
  selectFilteredTask,
} from "@reduxToolkit/Features/TaskSlice";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { HarvestOrRemove } from "@interface/HarvestTaskModal/HarvestTaskModalProps";
import { dp, sp } from "@root/utilities/shared/SpDp";
import {
  getAllIdFromFarm,
  getSubscribedId,
} from "@root/utilities/shared/GetSubscribedId";
import { getFarm } from "@root/utilities/shared/LocalStorage";
import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";

const TaskScreen = () => {
  //complete tasks
  const [checkboxVisible, setCheckboxVisible] = useState(false);
  const showCheckbox = () => {
    setCheckboxVisible(true);
    getSubscribedId(setSubIdFromNotify);
    getAllIdFromFarm(farmIdFromLocal, setIdFromFarm);
  };
  const hideCheckbox = () => {
    setCheckboxVisible(false);
    setHarvestTasksID([]);
  };
  const [harvestTasksID, setHarvestTasksID] = useState<number[]>([]);
  const [harvestOrRemove, setHarvestOrRemove] = useState<HarvestOrRemove>(
    HarvestOrRemove.Harvest
  );
  //get farmId from local
  const [farmIdFromLocal, setFarmIdFromLocal] = useState<
    string | null | undefined
  >(null);
  useEffect(() => {
    const getFarmIdFromLocal = async () => {
      const fetchedFarmId = await getFarm();
      setFarmIdFromLocal(fetchedFarmId);
    };
    getFarmIdFromLocal();
  }, []);
  //get the subscribed ids from native notify
  const [subIdFromNotify, setSubIdFromNotify] = useState<
    subscribedIdFromNotify[]
  >([]);
  //get all the id from the farm
  const [idFromFarm, setIdFromFarm] = useState<currentUserProps[]>([]);

  //menu
  const [addMenuVisible, setAddMenuVisible] = useState(false);
  const openMenu = () => {
    setAddMenuVisible(true);
    getSubscribedId(setSubIdFromNotify);
    getAllIdFromFarm(farmIdFromLocal, setIdFromFarm);
  };
  const closeMenu = () => setAddMenuVisible(false);

  //tasks data // redux
  const filteredTask = useAppSelector(selectFilteredTask);
  const dispatch = useAppDispatch();

  //add task modal
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const openAddTaskModal = () => setAddTaskModalVisible(true);
  const closeAddTaskModal = () => setAddTaskModalVisible(false);

  //add container modal
  const [addContainerModalVisible, setAddContainerModalVisible] =
    useState(false);
  const openAddContainerModal = () => setAddContainerModalVisible(true);
  const closeAddContainerModal = () => setAddContainerModalVisible(false);

  //harvest Task modal
  const [harvestTaskModalVisible, setHarvestTaskModalVisible] = useState(false);
  const openAHarvestTaskModal = () => setHarvestTaskModalVisible(true);
  const closeHarvestTaskModal = () => {
    setHarvestTaskModalVisible(false);
    hideCheckbox();
    console.log(harvestTasksID);
  };

  //filtered tasks
  const [checkedStatus, setCheckedStatus] = useState<string[]>([]);
  const [checkedListContainerId, setCheckedListContainerId] = useState<
    string[]
  >([]);

  //function for filtering tasks based on Plant Name
  const plant = useAppSelector(selectPlants);
  const onSearch = (text: string) => {
    dispatch(searchTaskByPlantName({ text: text, plants: plant }));
  };

  return (
    <View style={{ backgroundColor: COLORS.BACKGROUNDCOLOR, flex: 1 }}>
      <View
        style={{
          marginTop: "10%",
          alignItems: "flex-end",
        }}
      >
        <Menu
          style={{ marginTop: dp(120) }}
          visible={addMenuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity
              onPress={openMenu}
              style={HeaderRightIconStyle.hearderRightTouchable}
            >
              <Ionicons
                name="add-circle"
                style={HeaderRightIconStyle.headerRightIcon}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              openAddTaskModal();
              closeMenu();
            }}
            title="Add Task"
          />
          <Menu.Item
            onPress={() => {
              openAddContainerModal();
              closeMenu();
            }}
            title="Add Container"
          />
        </Menu>
      </View>
      <View
        className="bg-white dark:bg-slate-800"
        style={TaskScreeenStyle.contentMainContainer}
      >
        <View style={TaskScreeenStyle.searchBarContainer}>
          <View style={{ flex: 0.8 }}>
            <CustomSearchBar onSearch={onSearch} searchValue="Plant" />
          </View>
          {/* for filtering task dropdown checkboxes */}
          <View style={{ flex: 0.1, marginLeft: -15 }}>
            <FilteredTasks
              checkedStatus={checkedStatus}
              setCheckedStatus={setCheckedStatus}
              checkedListContainerId={checkedListContainerId}
              setCheckedListContainerId={setCheckedListContainerId}
            />
          </View>
        </View>

        {/* <FilterTasks /> */}
        <Text
          className="text-green-800 dark:text-green-400"
          style={TaskScreeenStyle.listOfPlantTubeText}
        >
          List of Plant Tubes
        </Text>
        <TaskCardList
          idFromFarm={idFromFarm}
          subIdFromNotify={subIdFromNotify}
          checkboxVisible={checkboxVisible}
          setHarvestTasksID={setHarvestTasksID}
          filteredData={filteredTask}
        />
      </View>

      {/* Modals */}
      <AddTaskModal
        idFromFarm={idFromFarm}
        subIdFromNotify={subIdFromNotify}
        visible={addTaskModalVisible}
        onClose={closeAddTaskModal}
      />
      <AddContainerModal
        idFromFarm={idFromFarm}
        subIdFromNotify={subIdFromNotify}
        visible={addContainerModalVisible}
        onClose={closeAddContainerModal}
      />
      <HarvestTaskModal
        idFromFarm={idFromFarm}
        subIdFromNotify={subIdFromNotify}
        harvestOrRemove={harvestOrRemove}
        visible={harvestTaskModalVisible}
        onClose={closeHarvestTaskModal}
        harvestTasksID={harvestTasksID}
      />

      {/* CheckButton to havest */}
      {!checkboxVisible ? (
        <FAB
          icon="check"
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => showCheckbox()}
        />
      ) : (
        <View
          style={{
            position: "absolute",
            marginBottom: dp(30),
            bottom: 0,
            width: "100%",
            //right: "30%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            mode="elevated"
            elevation={2}
            labelStyle={{ fontSize: sp(40) }}
            contentStyle={{ height: dp(120) }}
            style={{ marginHorizontal: dp(15) }}
            onPress={() => {
              hideCheckbox();
            }}
          >
            Cancel
          </Button>
          <Button
            mode="elevated"
            elevation={2}
            textColor="black"
            labelStyle={{ fontSize: sp(40) }}
            contentStyle={{ backgroundColor: "red", height: dp(120) }}
            style={{ marginHorizontal: dp(15) }}
            onPress={() => {
              setHarvestOrRemove(HarvestOrRemove.Remove);
              openAHarvestTaskModal();
            }}
          >
            Remove
          </Button>
          <Button
            mode="elevated"
            elevation={2}
            textColor="black"
            labelStyle={{ fontSize: sp(40) }}
            contentStyle={{ backgroundColor: "#44f321", height: dp(120) }}
            style={{ marginHorizontal: dp(15) }}
            onPress={() => {
              setHarvestOrRemove(HarvestOrRemove.Harvest);
              openAHarvestTaskModal();
            }}
          >
            Harvest
          </Button>
        </View>
      )}
    </View>
  );
};

export default TaskScreen;
