import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//data
import { dummyTaskItem } from "@root/app/dummyData/DummyTaskItem";
import { dummyPlantItem } from "@root/app/dummyData/DummyPlantItem";

//interface
import { TaskItemSerializableProps } from "@interface/DataProps/TaskItemProps";

const initialState = {
  value: dummyTaskItem.map((task) => ({
    ...task,
    datePlanted: task.datePlanted.toISOString().split("T")[0],
    dateExpectedHarvest: task.dateExpectedHarvest.toISOString().split("T")[0],
  })),
  filteredData: dummyTaskItem.map((task) => ({
    ...task,
    datePlanted: task.datePlanted.toISOString().split("T")[0],
    dateExpectedHarvest: task.dateExpectedHarvest.toISOString().split("T")[0],
  })),
};

export const taskSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //modify the add tasks when implementing database by adding the tasks directly to the database
    // and fetch the tasks from database with generated ids to update my initialstate
    addTask: (state, action: PayloadAction<TaskItemSerializableProps[]>) => {
      const newTasks = action.payload;

      // Push the new tasks to both state.value and state.filteredData
      state.value.push(...newTasks);
      state.filteredData.push(...newTasks);
    },

    removeTasks: (state, action: PayloadAction<string[]>) => {
      const removeTaskId = action.payload;
      state.value = state.value.filter(
        (item) => !removeTaskId.includes(item.taskId)
      );
      state.filteredData = state.filteredData.filter(
        (item) => !removeTaskId.includes(item.taskId)
      );
    },

    editTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        contId: string | undefined;
        plantId: string | undefined;
      }>
    ) => {
      const { taskId, contId, plantId } = action.payload;
      // Find the index of the task with the given taskId
      const taskIndex = state.value.findIndex((task) => task.taskId === taskId);
      const filteredTaskIndex = state.filteredData.findIndex(
        (task) => task.taskId === taskId
      );
      if (taskIndex !== -1) {
        // Update the contId and plantId of the task
        state.value[taskIndex].contId = contId ? contId : "N/A";
        state.value[taskIndex].plantId = plantId ? plantId : "N/A";
      }
      if (filteredTaskIndex !== -1) {
        // Update the contId and plantId of the task
        state.filteredData[filteredTaskIndex].contId = contId ? contId : "N/A";
        state.filteredData[filteredTaskIndex].plantId = plantId
          ? plantId
          : "N/A";
      }
    },

    filterTaskByStatusAndContainer: (
      state,
      action: PayloadAction<{
        checkedStatus: string[];
        checkedListContainerId: string[];
      }>
    ) => {
      const { checkedStatus, checkedListContainerId } = action.payload;
      //check of both list is empty
      if (checkedStatus.length === 0 && checkedListContainerId.length === 0) {
        state.filteredData = state.value; // Show all tasks
      }
      //check if status is not empty while containers is empty
      else if (
        !(checkedStatus.length === 0) &&
        checkedListContainerId.length === 0
      ) {
        state.filteredData = state.value.filter((item) =>
          checkedStatus.includes(item.status)
        );
      }
      //check if status is empty while container is not empty
      else if (
        checkedStatus.length === 0 &&
        !(checkedListContainerId.length === 0)
      ) {
        state.filteredData = state.value.filter((item) =>
          checkedListContainerId.includes(item.contId)
        );
      }
      //executed if both is not empty
      else {
        state.filteredData = state.value.filter(
          (item) =>
            checkedStatus.includes(item.status) &&
            checkedListContainerId.includes(item.contId)
        );
      }
    },

    searchTaskByPlantName: (state, action: PayloadAction<string>) => {
      const text = action.payload;
      if (text === "") {
        state.filteredData = state.value;
      } else {
        const tempData = state.value.filter((item) => {
          const plantObj = dummyPlantItem.find(
            (plant) => plant.plantID === item.plantId
          );
          if (plantObj) {
            return (
              plantObj.plantName.toLowerCase().indexOf(text.toLowerCase()) > -1
            );
          } else {
            return false;
          }
        });
        state.filteredData = tempData;
      }
    },
  },
});

export const {
  addTask,
  removeTasks,
  editTask,
  filterTaskByStatusAndContainer,
  searchTaskByPlantName,
} = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTask = (state: RootState) => state.tasks.value;
export const selectFilteredTask = (state: RootState) =>
  state.tasks.filteredData;

export default taskSlice.reducer;
