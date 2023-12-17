import { Platform, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, Button, TextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useColorScheme } from "nativewind";
import axios from "axios";

//interface
import { ModalType } from "@interface/Modals/ModalType";
import { AddTaskSerializableProps } from "@interface/DataProps/TaskItemProps";

//redux
import { AddTaskAPI } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectFilteredContainer } from "@reduxToolkit/Features/ContainerSlice";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//style
import { AddTaskModalStyle } from "@stylesheets/AddTaskModal/AddTaskModalStyle";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";
import { getFarm } from "@root/utilities/shared/LocalStorage";
import { dp, sp } from "@root/utilities/shared/SpDp";
import {
  currentUserProps,
  subscribedIdFromNotify,
} from "@interface/Auth/CurrentUserProps";

type AddTaskModalType = ModalType & {
  subIdFromNotify: subscribedIdFromNotify[];
  idFromFarm: currentUserProps[];
};
const AddTaskModal = ({
  visible,
  onClose,
  subIdFromNotify,
  idFromFarm,
}: AddTaskModalType) => {
  const { colorScheme } = useColorScheme();
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

  //container with state to use in the dropdown selection
  const containers = useAppSelector(selectFilteredContainer);
  const plants = useAppSelector(selectPlants);

  const dispatch = useAppDispatch();

  const [selectPlant, setSelectPlant] = useState("");
  const [selectContainer, setSelectContainer] = useState("");
  //data
  const plantData = plants.map(({ id, name }) => ({
    key: id.toString(),
    value: name,
  }));
  const containerData = containers.map(({ id, name }) => ({
    key: id.toString(),
    value: name,
  }));
  //date
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [dateText, setDateText] = useState("");
  const [numberOfTask, setNumberOfTask] = useState("");

  const reset = () => {
    setSelectPlant("");
    setSelectContainer("");
    setDate(new Date());
    setDateText("");
    setNumberOfTask("");
  };

  const onPickDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    let currentDate = selectedDate || date;
    const formattedDate = currentDate.toISOString().split("T")[0];

    setShowCalendar(Platform.OS === "ios"); // to prevent the calendar reappering
    setDate(currentDate);
    setDateText(formattedDate);
  };

  const showCalendarModal = () => {
    setShowCalendar(true);
  };
  const closeCalendarModal = () => {
    setShowCalendar(false);
  };
  const handleInputNumber = (text: string) => {
    const numberOnly = text.replace(/[^0-9]/g, "");
    setNumberOfTask(numberOnly);
  };

  const handleAddTask = () => {
    if (!selectPlant && !selectContainer && !dateText && !numberOfTask) {
      Alert.alert("Add New Task Failed", "All fields are required");
      return;
    }
    const dateString = dateText;
    const date = new Date(dateString);
    date.setDate(date.getDate() + 45); // add days depend on plant growth in plant id
    const expectedHarvestDate = date.toISOString().split("T")[0];

    const newTask: AddTaskSerializableProps = {
      plantId: parseInt(selectPlant),
      datePlanted: dateText,
      harvestDate: expectedHarvestDate,
      numberOfTasks: parseInt(numberOfTask),
    };
    let subIds = subIdFromNotify.map((item) => item.sub_id);
    let filteredA = idFromFarm.filter((item) =>
      subIds.includes(item.id.toString())
    );
    let result = filteredA.map((item) => item.id.toString());
    if (farmIdFromLocal) {
      dispatch(
        AddTaskAPI({
          newTasks: newTask,
          containerId: parseInt(selectContainer),
          farmId: parseInt(farmIdFromLocal),
        })
      );
    } else {
      Alert.alert(
        "Add New Task Failed",
        "You have no farm associated to your account"
      );
      reset();
      onClose();
      return;
    }

    // dispatch(addTask(addTasks));
    Alert.alert("New Task", "You have successfully added the tasks ");
    if (result.length > 0) {
      axios
        .post(`https://app.nativenotify.com/api/indie/group/notification`, {
          subIDs: result,
          appId: 13240,
          appToken: "JgacDlBDrMg8qvQWalJuRM",
          title: "Task Notification",
          message: "New Task is Added",
        })
        .catch((e) => {
          console.log("Error from add task modal line 128", e);
        });
    }

    reset();
    onClose();
  };
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        {showCalendar && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onPickDate}
          />
        )}
        <View
          className="bg-white dark:bg-slate-800"
          style={AddTaskModalStyle.mainContainer}
        >
          {/* Container for text and 2 select list */}
          <View>
            <Text
              className="text-green-800 dark:text-green-400"
              style={AddTaskModalStyle.textTitle}
            >
              Add Task
            </Text>
            <View style={AddTaskModalStyle.selectListContainer}>
              <SelectList
                setSelected={(val: any) => setSelectPlant(val)}
                data={plantData}
                search={false}
                placeholder="Select Plant"
                save="key"
                boxStyles={{
                  width: dp(400),
                  margin: dp(8),
                  backgroundColor: "white",
                }}
                inputStyles={{ width: dp(290), fontSize: sp(40) }}
                dropdownTextStyles={{
                  fontSize: sp(40),
                }}
                dropdownStyles={{ backgroundColor: "white" }}
              />
              <SelectList
                setSelected={(val: any) => setSelectContainer(val)}
                data={containerData}
                search={false}
                placeholder="Select Container"
                save="key"
                boxStyles={{
                  width: dp(400),
                  margin: dp(8),
                  backgroundColor: "white",
                }}
                inputStyles={{ width: dp(290), fontSize: sp(39) }}
                dropdownTextStyles={{ fontSize: sp(35) }}
                dropdownStyles={{ backgroundColor: "white" }}
              />
            </View>
          </View>
          {/* Container for Date button */}
          <View style={AddTaskModalStyle.dateButtonContainer}>
            <Button
              mode="elevated"
              onPress={showCalendarModal}
              icon="calendar"
              textColor="black"
              style={{ margin: dp(10), backgroundColor: "white" }}
              labelStyle={{ fontSize: sp(40) }}
            >
              Select Date Planted
            </Button>
            <Text style={{ fontSize: sp(50) }}>{dateText}</Text>
          </View>
          <TextInput
            label="Number of Tasks"
            value={numberOfTask}
            onChangeText={(text) => {
              handleInputNumber(text);
            }}
            keyboardType="numeric"
            mode="outlined"
            style={{ width: dp(500) }}
          />
          {/* Testing purposed */}
          <Button
            onPress={() => {
              let subIds = subIdFromNotify.map((item) => item.sub_id);
              let filteredA = idFromFarm.filter((item) =>
                subIds.includes(item.id.toString())
              );
              let result = filteredA.map((item) => item.id.toString());
              console.log(subIdFromNotify);
              console.log(idFromFarm);
              console.log(result);
            }}
          >
            Check List of Id{" "}
          </Button>
          <ModalButtons
            onSave={handleAddTask}
            onClose={onClose}
            labelForSave="Save Task"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default AddTaskModal;
