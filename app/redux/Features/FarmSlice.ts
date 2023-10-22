import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//interface

import { baseURL } from "@root/utilities/shared/BaseURL";
import { ArduinoBoardProps } from "@interface/DataProps/ArduinoBoardsProps";
import { FarmProps } from "@interface/DataProps/FarmsProps";

interface initialStateProps {
  value: FarmProps[];
}
const initialState: initialStateProps = {
  value: [],
};

export const getAllFarms = createAsyncThunk("api/getAllFarms", async () => {
  try {
    const response = await fetch(`${baseURL}/api/v1/farms`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const farms: FarmProps[] = await response.json();
    return farms;
  } catch (e) {
    throw e;
  }
});

export const farmSlice = createSlice({
  name: "farms",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetFarm: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFarms.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { resetFarm } = farmSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFarms = (state: RootState) => state.farms.value;

export default farmSlice.reducer;
