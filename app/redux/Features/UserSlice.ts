import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

const initialState = {
  value: {
    photoURL: "",
  },
  tempValue: {
    photoURL: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAfterLoggedin: (state, action: PayloadAction<string>) => {
      state.value.photoURL = action.payload;
      state.tempValue.photoURL = action.payload;
    },
    temporaryEditImage: (state, action: PayloadAction<string>) => {
      state.tempValue.photoURL = action.payload;
    },
    undoEditImage: (state) => {
      state.tempValue.photoURL = state.value.photoURL;
    },
    saveEditImage: (state) => {
      state.value.photoURL = state.tempValue.photoURL;
    },
  },
});

export const {
  updateAfterLoggedin,
  temporaryEditImage,
  undoEditImage,
  saveEditImage,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value;
export const selectTempUser = (state: RootState) => state.user.tempValue;

export default userSlice.reducer;
