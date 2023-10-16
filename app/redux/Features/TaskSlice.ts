import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { useAppSelector } from "@reduxToolkit/Hooks";
import { selectPlants } from "./PlantSlice";

//interface
import {
  AddTaskSerializableProps,
  TaskItemProps,
  TaskItemSerializableProps,
  TaskSerializableProps,
  UpdateTaskProps,
} from "@interface/DataProps/TaskItemProps";
import { PlantProps } from "@interface/DataProps/PlantItemProps";
import { baseURL } from "@root/utilities/shared/BaseURL";
import { getAllContainers } from "./ContainerSlice";
import { dataForEditInitialProps } from "@interface/EditTaskDetailModal/EditTaskDetailModalProps";

interface initialStateProps {
  value: TaskSerializableProps[];
  filteredData: TaskSerializableProps[];
}
// const initialState: initialStateProps = {
//   value: dummyTaskItem.map((task) => ({
//     ...task,
//     datePlanted: task.datePlanted.toISOString().split("T")[0],
//     dateExpectedHarvest: task.dateExpectedHarvest.toISOString().split("T")[0],
//   })),
//   filteredData: dummyTaskItem.map((task) => ({
//     ...task,
//     datePlanted: task.datePlanted.toISOString().split("T")[0],
//     dateExpectedHarvest: task.dateExpectedHarvest.toISOString().split("T")[0],
//   })),
// };

const initialState: initialStateProps = {
  value: [],
  filteredData: [],
};

export const getAllTasks = createAsyncThunk(
  "api/getAllTasks",
  async (farmId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/farms/${farmId}/containers/tasks/all`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const tasks: TaskSerializableProps[] = await response.json();
      return tasks;
    } catch (e) {
      throw e;
    }
  }
);

export const UpdateTaskAPI = createAsyncThunk(
  "api/updateTask",
  async (
    updateTaskObject: {
      updatedTask: UpdateTaskProps;
      dataForEditInitial: dataForEditInitialProps;
      farmId: number;
    },
    { dispatch }
  ) => {
    const response = await fetch(
      `${baseURL}/api/v1/farms/${updateTaskObject.farmId}/containers/${updateTaskObject.dataForEditInitial.taskObj.containerId}/tasks/${updateTaskObject.dataForEditInitial.taskObj.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTaskObject.updatedTask),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          // Request was successful
          console.log("Tasks Updated");
          await dispatch(getAllTasks(updateTaskObject.farmId.toString()));
        } else {
          // Server returned an error response
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Update request failed");
          });
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Tasks slice line 105: ", error.message);
      });
  }
);

export const DeleteTasksAPI = createAsyncThunk(
  "api/deleteTasksAPI",
  async (deleteTasks: { tasksIds: number[]; farmId: number }, { dispatch }) => {
    const ids = deleteTasks.tasksIds;

    const response = await fetch(
      `${baseURL}/api/v1/farms/${deleteTasks.farmId}/tasks`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskIds: ids }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          // Request was successful
          console.log("Tasks deleted successfully");
          dispatch(getAllTasks(deleteTasks.farmId.toString()));
        } else {
          // Server returned an error response
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Delete request failed");
          });
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Tasks slice line 93: ", error.message);
      });
  }
);

export const AddTaskAPI = createAsyncThunk(
  "api/addTask",
  async (
    addNewTasks: {
      newTasks: AddTaskSerializableProps;
      farmId: number;
      containerId: number;
    },
    { dispatch }
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/farms/${addNewTasks.farmId}/containers/${addNewTasks.containerId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addNewTasks.newTasks),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const tasks: TaskSerializableProps[] = await response.json();
      dispatch(addTask(tasks));
      return tasks;
    } catch (e) {
      throw e;
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //modify the add tasks when implementing database by adding the tasks directly to the database
    // and fetch the tasks from database with generated ids to update my initialstate
    addTask: (state, action: PayloadAction<TaskSerializableProps[]>) => {
      const newTasks = action.payload;

      // Push the new tasks to both state.value and state.filteredData
      state.value.push(...newTasks);
      state.filteredData.push(...newTasks);
    },

    removeTasks: (state, action: PayloadAction<string[]>) => {
      const removeTaskId = action.payload;
      state.value = state.value.filter(
        (item) => !removeTaskId.includes(item.id.toString())
      );
      state.filteredData = state.filteredData.filter(
        (item) => !removeTaskId.includes(item.id.toString())
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
      const taskIndex = state.value.findIndex(
        (task) => task.id.toString() === taskId
      );
      const filteredTaskIndex = state.filteredData.findIndex(
        (task) => task.id.toString() === taskId
      );
      if (taskIndex !== -1) {
        // Update the contId and plantId of the task
        state.value[taskIndex].containerId = contId ? parseInt(contId) : 0;
        state.value[taskIndex].plantId = plantId ? parseInt(plantId) : 0;
      }
      if (filteredTaskIndex !== -1) {
        // Update the contId and plantId of the task
        state.filteredData[filteredTaskIndex].containerId = contId
          ? parseInt(contId)
          : 0;
        state.filteredData[filteredTaskIndex].plantId = plantId
          ? parseInt(plantId)
          : 0;
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
          checkedListContainerId.includes(item.containerId.toString())
        );
      }
      //executed if both is not empty
      else {
        state.filteredData = state.value.filter(
          (item) =>
            checkedStatus.includes(item.status) &&
            checkedListContainerId.includes(item.containerId.toString())
        );
      }
    },

    searchTaskByPlantName: (
      state,
      action: PayloadAction<{ text: string; plants: PlantProps[] }>
    ) => {
      const payload = action.payload;
      if (payload.text === "") {
        state.filteredData = state.value;
      } else {
        const tempData = state.value.filter((item) => {
          const plantObj = payload.plants.find(
            (plant) => plant.id === item.plantId
          );
          if (plantObj) {
            return (
              plantObj.name.toLowerCase().indexOf(payload.text.toLowerCase()) >
              -1
            );
          } else {
            return false;
          }
        });
        state.filteredData = tempData;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.value = action.payload;
      state.filteredData = action.payload;
    });
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
