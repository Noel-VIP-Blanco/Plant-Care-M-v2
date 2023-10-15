import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//DATA
import { dummyContainerItem } from "@root/app/dummyData/DummyContainerItem";
//interface
import {
  ContainerItemProps,
  ContainerProps,
} from "@interface/DataProps/ContainerItemProps";

interface initialStateProps {
  value: ContainerProps[];
  filteredData: ContainerProps[];
}
const initialState: initialStateProps = {
  value: [],
  filteredData: [],
};

export const containerSlice = createSlice({
  name: "containers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContainer: (state, action: PayloadAction<ContainerProps>) => {
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
});

export const { addContainer, searchContainerByName, removeContainers } =
  containerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectContainer = (state: RootState) => state.containers.value;
export const selectFilteredContainer = (state: RootState) =>
  state.containers.filteredData;

export default containerSlice.reducer;
