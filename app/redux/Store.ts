import { configureStore } from "@reduxjs/toolkit";
import containerReducer from "./Features/ContainerSlice";
import taskReducer from "./Features/TaskSlice";
import harvestLog from "./Features/HarvestLogSlice";
import user from "./Features/UserSlice";
import arduinoBoard from "./Features/ArduinoBoardSlice";
import plants from "./Features/PlantSlice";
import farms from "./Features/FarmSlice";
import notifications from "./Features/NotificationSlice";
export const store = configureStore({
  reducer: {
    containers: containerReducer,
    tasks: taskReducer,
    harvestLog: harvestLog,
    user: user,
    arduinoBoards: arduinoBoard,
    plants: plants,
    farms: farms,
    notifications: notifications,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
