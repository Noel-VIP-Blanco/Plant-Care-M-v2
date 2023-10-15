import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//DATA
import { dummyContainerItem } from "@root/app/dummyData/DummyContainerItem";
//interface
import {
  AddContainerProps,
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";
import { baseURL } from "@root/utilities/shared/BaseURL";
import { getAllArduinoBoards } from "./ArduinoBoardSlice";

interface initialStateProps {
  value: ContainerProps[];
  filteredData: ContainerProps[];
}
const initialState: initialStateProps = {
  value: [],
  filteredData: [],
};

export const getAllContainers = createAsyncThunk(
  "api/getAllContainers",
  async (farmId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/farms/${farmId}/containers`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const containers: ContainerProps[] = await response.json();
      return containers;
    } catch (e) {
      throw e;
    }
  }
);

export const AddContainerAPI = createAsyncThunk(
  "api/addContainerAPI",
  async (
    addNewContainer: { newContainer: AddContainerProps; farmId: number },
    { dispatch }
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/farms/${addNewContainer.farmId}/containers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addNewContainer.newContainer),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const container: ContainerProps = await response.json();
      await dispatch(addContainer(container));
      await dispatch(getAllArduinoBoards(addNewContainer.farmId.toString()));
      return container;
    } catch (e) {
      throw e;
    }
  }
);

export const DeleteContainerAPI = createAsyncThunk(
  "api/deleteContainerAPI",
  async (
    deleteContainer: { containerIds: number[]; farmId: number },
    { dispatch }
  ) => {
    console.log("ContainerSlice.ts line 80", deleteContainer.containerIds);
    const ids = deleteContainer.containerIds;

    const response = await fetch(
      `${baseURL}/api/v1/farms/${deleteContainer.farmId}/containers`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ containerIds: ids }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          // Request was successful
          console.log("Containers deleted successfully");
          await dispatch(
            getAllArduinoBoards(deleteContainer.farmId.toString())
          );
          await dispatch(getAllContainers(deleteContainer.farmId.toString()));
        } else {
          // Server returned an error response
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Delete request failed");
          });
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Container slice line 106: ", error.message);
      });
  }
);

export const containerSlice = createSlice({
  name: "containers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContainer: (state, action: PayloadAction<ContainerProps>) => {
      state.value.push(action.payload);
      state.filteredData.push(action.payload);
    },
    removeContainers: (state, action: PayloadAction<number[]>) => {
      const removeContainerId = action.payload;
      state.value = state.value.filter(
        (item) => !removeContainerId.includes(item.id)
      );
      state.filteredData = state.filteredData.filter(
        (item) => !removeContainerId.includes(item.id)
      );
    },

    searchContainerByName: (state, action: PayloadAction<string>) => {
      const text = action.payload;
      if (text === "") {
        state.filteredData = state.value;
      } else {
        state.filteredData = state.value.filter((item) => {
          return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContainers.fulfilled, (state, action) => {
        state.value = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(DeleteContainerAPI.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { addContainer, searchContainerByName, removeContainers } =
  containerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectContainer = (state: RootState) => state.containers.value;
export const selectFilteredContainer = (state: RootState) =>
  state.containers.filteredData;

export default containerSlice.reducer;
