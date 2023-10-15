import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//DATA
import { dummyContainerItem } from "@root/app/dummyData/DummyContainerItem";
//interface
import { ContainerItemProps } from "@interface/DataProps/ContainerItemProps";
import { baseURL } from "@root/utilities/shared/BaseURL";
import { ContainersProps } from "@interface/Auth/AwsApiProps";

export const getAllContainers = createAsyncThunk(
  "api/getAllContainers",
  async (farmId: string) => {
    try {
      const response = await fetch(
        `${baseURL}//api/v1/farms/${farmId}/containers`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const containers: ContainersProps[] = await response.json();
      return containers;
    } catch (e) {
      throw e;
    }
  }
);
const initialState: {
  value: ContainersProps[];
  filteredData: ContainersProps[];
  status: string;
  error: string | null;
} = {
  value: [],
  filteredData: [],
  status: "idle",
  error: null,
};

export const containerSlice = createSlice({
  name: "containers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContainer: (state, action: PayloadAction<ContainersProps>) => {
      state.value.push(action.payload);
      state.filteredData.push(action.payload);
    },
    removeContainers: (state, action: PayloadAction<string[]>) => {
      const removeContainerId = action.payload;
      state.value = state.value.filter(
        (item) => !removeContainerId.includes(item.id.toString())
      );
      state.filteredData = state.filteredData.filter(
        (item) => !removeContainerId.includes(item.id.toString())
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
    builder.addCase(getAllContainers.fulfilled, (state, action) => {
      state.status = "Success";
      state.value = action.payload;
      state.filteredData = action.payload;
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
