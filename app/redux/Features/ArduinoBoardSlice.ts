import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//interface

import { baseURL } from "@root/utilities/shared/BaseURL";
import { ArduinoBoardProps } from "@interface/DataProps/ArduinoBoardsProps";

interface initialStateProps {
  value: ArduinoBoardProps[];
}
const initialState: initialStateProps = {
  value: [],
};

export const getAllArduinoBoards = createAsyncThunk(
  "api/getAllArduinoBoards",
  async (farmId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/farms/${farmId}/arduinoboards`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const arduinoBoards: ArduinoBoardProps[] = await response.json();
      return arduinoBoards;
    } catch (e) {
      throw e;
    }
  }
);

export const arduinoBoardSlice = createSlice({
  name: "arduinoBoards",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllArduinoBoards.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const {} = arduinoBoardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectArduinoBoards = (state: RootState) =>
  state.arduinoBoards.value;

export default arduinoBoardSlice.reducer;
