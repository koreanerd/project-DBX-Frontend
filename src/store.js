import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slice";
import resourceInfoReducer from "@/features/resource/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    resource: resourceInfoReducer,
  },
});
