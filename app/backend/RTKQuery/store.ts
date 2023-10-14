import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { awsAPI } from "./Services/awsAPI";

export const store = configureStore({
  reducer: {
    [awsAPI.reducerPath]: awsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(awsAPI.middleware),
});
