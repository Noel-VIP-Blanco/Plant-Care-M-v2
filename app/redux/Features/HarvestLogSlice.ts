import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//data
import { dummyHarvestLog } from "@root/app/dummyData/DummyHarvestLog";
import { baseURL } from "@root/utilities/shared/BaseURL";
import { HarvestLogProps } from "@interface/DataProps/HarvestLogProps";

//type
type rowType = [string, string, string];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface initialStateProps {
  value: HarvestLogProps[];
  filteredData: HarvestLogProps[];
  listOfRowData: rowType[] ,
  listOfFilteredRowData: rowType[] ,
}
const initialState: initialStateProps = {
  value: [],
  filteredData: [],
  listOfRowData: [],
  listOfFilteredRowData: [],
};
// const initialState: HarvestLogState = {
//   value: dummyHarvestLog.map((harvestLog) => ({
//     ...harvestLog,
//     dateHarvested: harvestLog.dateHarvested.toISOString().split("T")[0],
//   })),
//   filteredData: dummyHarvestLog.map((harvestLog) => ({
//     ...harvestLog,
//     dateHarvested: harvestLog.dateHarvested.toISOString().split("T")[0],
//   })),
//   listOfRowData: [],
//   listOfFilteredRowData: [],
// };

export const getAllHarvestLog = createAsyncThunk(
  "api/getAllHarvestLog",
  async (farmId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/farms/${farmId}/harvest-logs`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const harvestLogs: HarvestLogProps[] = await response.json();
      return harvestLogs;
    } catch (e) {
      throw e;
    }
  }
);


export const harvestLogSlice = createSlice({
  name: "harvestLog",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //modify the add tasks when implementing database by adding the tasks directly to the database
    // and fetch the tasks from database with generated ids to update my initialstate
    filterHarvestLog: (
      state,
      action: PayloadAction<{
        checkedListYears: string[];
        checkedListMonths: string[];
      }>
    ) => {
      const { checkedListMonths, checkedListYears } = action.payload;
      if (checkedListMonths.length === 0 && checkedListYears.length === 0) {
        state.listOfFilteredRowData = state.listOfRowData; // Show all logs
      }
      //check if checkedListMonths is not empty while checkedListYears is empty
      else if (
        !(checkedListMonths.length === 0) &&
        checkedListYears.length === 0
      ) {
        // Convert the checkedListMonths array to an array of month numbers
        const checkedListMonthNumbers = checkedListMonths.map(
          (monthName) => monthNames.indexOf(monthName) + 1
        );
        state.listOfFilteredRowData = state.listOfRowData.filter((item) => {
          // Extract the month number from the dateHarvested string
          const monthNumber = parseInt(item[1].substring(5, 7));
          // Check if the month number is in the checkedListMonthNumbers array
          return checkedListMonthNumbers.includes(monthNumber);
        });
      }
      //check if checkedListMonths is empty while checkedListYears is not empty
      else if (
        checkedListMonths.length === 0 &&
        !(checkedListYears.length === 0)
      ) {
        state.listOfFilteredRowData = state.listOfRowData.filter((item) =>
          checkedListYears.includes(item[1].substring(0, 4))
        );
      } else {
        const checkedListMonthNumbers = checkedListMonths.map(
          (monthName) => monthNames.indexOf(monthName) + 1
        );
        state.listOfFilteredRowData = state.listOfRowData.filter((item) => {
          // Extract the month number from the dateHarvested string
          const monthNumber = parseInt(item[1].substring(5, 7));
          // Check if the month number is in the checkedListMonthNumbers array
          return (
            checkedListMonthNumbers.includes(monthNumber) &&
            checkedListYears.includes(item[1].substring(0, 4))
          );
        });
      }
    },

    addListOfRowData: (state, action: PayloadAction<rowType[]>) => {
      state.listOfRowData = action.payload;
    },
    addFilteredListOfRowData: (state, action: PayloadAction<rowType[]>) => {
      state.listOfFilteredRowData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllHarvestLog.fulfilled, (state, action) => {
      state.value = action.payload;
      state.filteredData = action.payload;
    });
  },
});

//export actions to use as a function from different components
export const { filterHarvestLog,addListOfRowData  , addFilteredListOfRowData} =
  harvestLogSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHarvestLog = (state: RootState) => state.harvestLog.value;
export const selectFilteredHarvestLog = (state: RootState) =>
  state.harvestLog.filteredData;
export const selectListOfRowData = (state: RootState) =>
  state.harvestLog.listOfRowData;
export const selectFilteredListOfRowData = (state: RootState) =>
  state.harvestLog.listOfFilteredRowData;

export default harvestLogSlice.reducer;
