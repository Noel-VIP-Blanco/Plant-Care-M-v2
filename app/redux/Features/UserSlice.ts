import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { currentUserProps } from "@interface/Auth/CurrentUserProps";

type initialStateProps = {
  userFromRedux: currentUserProps | null;
};
const initialState: initialStateProps = {
  userFromRedux: null,
};
export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserFromRedux: (state, action: PayloadAction<currentUserProps>) => {
      state.userFromRedux = action.payload;
    },
  },
});

export const { setUserFromRedux } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.userFromRedux;
export default userSlice.reducer;
