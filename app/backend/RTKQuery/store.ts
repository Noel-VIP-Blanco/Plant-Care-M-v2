import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { farmAPI } from "./Services/farmAPI";

export const store = configureStore({
  reducer: {
    [farmAPI.reducerPath]: farmAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(farmAPI.middleware),
});
