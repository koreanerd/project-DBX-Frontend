import { createSlice } from "@reduxjs/toolkit";

export const resourceInfoSlice = createSlice({
  name: "resource",
  initialState: {
    selectedResourceData: {},
    selectedResourceCategoryId: "",
    selectedResourceId: "",
  },
  reducers: {
    setResourceInfo: (state, action) => {
      state.selectedResourceData = action.payload.selectedResourceData || {};
      state.selectedResourceCategoryId =
        action.payload.selectedResourceCategoryId || "";
      state.selectedResourceId = action.payload.selectedResourceId || "";
    },
    clearResourceInfo: (state) => {
      state.selectedResourceData = {};
      state.selectedResourceCategoryId = "";
      state.selectedResourceId = "";
    },
  },
});

export const { setResourceInfo, clearResourceInfo } = resourceInfoSlice.actions;

export default resourceInfoSlice.reducer;
