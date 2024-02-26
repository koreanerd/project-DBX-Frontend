import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slice";
import resourceInfoReducer from "@/features/resource/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    resource: resourceInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
