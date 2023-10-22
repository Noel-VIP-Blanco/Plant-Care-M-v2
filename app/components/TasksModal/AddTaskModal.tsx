import { Platform, View, Alert } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Text, Modal, Portal, Button, TextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

//interface
import { ModalType } from "@interface/Modals/ModalType";
import {
  TaskItemSerializableProps,
  PlantStatus,
  TaskSerializableProps,
  AddTaskSerializableProps,
} from "@interface/DataProps/TaskItemProps";
import { TaskItemProps } from "@interface/DataProps/TaskItemProps";

//redux
import { AddTaskAPI, addTask } from "@reduxToolkit/Features/TaskSlice";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/Hooks";
import { selectFilteredContainer } from "@reduxToolkit/Features/ContainerSlice";

//components
import ModalButtons from "@components/Shared/ModalButtons";

//style
import { AddTaskModalStyle } from "@stylesheets/AddTaskModal/AddTaskModalStyle";
import { selectPlants } from "@reduxToolkit/Features/PlantSlice";

const AddTaskModal = ({ visible, onClose }: ModalType) => {
  //farm id from local
  const [farmId, setFarmId] = useState(null);

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
    // console.log({
    //   selectPlant,
    //   selectContainer,
    //   dateText,
    //   numberOfTask,
    // });

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
    //farm id should be get on local storage. to be added someday
    dispatch(
      AddTaskAPI({
        newTasks: newTask,
        containerId: parseInt(selectContainer),
        farmId: 1,
      })
    );
    // dispatch(addTask(addTasks));
    Alert.alert("New Task", "You have successfully added the tasks ");
    reset();
    onClose();
  };
  return (
    <Portal>
      <Modal style={{}} visible={visible} onDismiss={onClose}>
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
        <View style={AddTaskModalStyle.mainContainer}>
          {/* Container for text and 2 select list */}
          <View>
            <Text style={AddTaskModalStyle.textTitle}>Add Task</Text>
            <View style={AddTaskModalStyle.selectListContainer}>
              <SelectList
                setSelected={(val: any) => setSelectPlant(val)}
                data={plantData}
                search={false}
                placeholder="Select Plant"
                save="key"
                boxStyles={{ width: 150, margin: 5 }}
                inputStyles={{ width: 100, fontSize: 20 }}
              />
              <SelectList
                setSelected={(val: any) => setSelectContainer(val)}
                data={containerData}
                search={false}
                placeholder="Select Container"
                save="key"
                boxStyles={{ width: 180, margin: 5 }}
                inputStyles={{ width: 130, fontSize: 20, flexWrap: "nowrap" }}
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
              style={{ margin: 5 }}
            >
              Select Date Planted
            </Button>
            <Text style={{ fontSize: 25 }}>{dateText}</Text>
          </View>
          <TextInput
            label="Number of Tasks"
            value={numberOfTask}
            onChangeText={(text) => {
              handleInputNumber(text);
            }}
            keyboardType="numeric"
            mode="outlined"
            style={{ width: 140 }}
          />

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
