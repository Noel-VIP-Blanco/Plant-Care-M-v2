import { configureStore } from "@reduxjs/toolkit";
import containerReducer from "./Features/ContainerSlice";
import taskReducer from "./Features/TaskSlice";
import harvestLog from "./Features/HarvestLogSlice";
// import user from "./features/UserSlice";
export const store = configureStore({
  reducer: {
    containers: containerReducer,
    tasks: taskReducer,
    harvestLog: harvestLog,
    // user: user,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
