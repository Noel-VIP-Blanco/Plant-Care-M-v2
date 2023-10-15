import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//interface
import { baseURL } from "@root/utilities/shared/BaseURL";
import { PlantProps } from "@interface/DataProps/PlantItemProps";

interface initialStateProps {
  value: PlantProps[];
}
const initialState: initialStateProps = {
  value: [],
};

export const getAllPlant = createAsyncThunk(
  "api/getAllPlant",
  async (farmId: string) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/farms/${farmId}/plants`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const plants: PlantProps[] = await response.json();
      return plants;
    } catch (e) {
      throw e;
    }
  }
);

export const plantSlice = createSlice({
  name: "plants",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPlant.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const {} = plantSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlants = (state: RootState) => state.plants.value;

export default plantSlice.reducer;
