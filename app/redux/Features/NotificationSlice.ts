import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

//interface

import { baseURL } from "@root/utilities/shared/BaseURL";
import { NotificationType } from "@interface/Notification/NotificationProps";

interface initialStateProps {
  value: NotificationType[];
}
const initialState: initialStateProps = {
  value: [],
};

export const getAllNotification = createAsyncThunk(
  "api/getAllNotifications",
  async () => {
    try {
      const response = await fetch(`${baseURL}/api/v1/notifications`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const farms: NotificationType[] = await response.json();
      return farms;
    } catch (e) {
      throw e;
    }
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotification.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const {} = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotifications = (state: RootState) =>
  state.notifications.value;

export default notificationSlice.reducer;
