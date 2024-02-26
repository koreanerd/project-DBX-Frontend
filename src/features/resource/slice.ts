import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface File {
  option: string;
  pngUrl: string;
  svgContent: string;
  svgUrl: string;
  _id: string;
}

interface ResourceData {
  authorName: string | null;
  categoryId: string | null;
  categoryName: string | null;
  files: File[];
  resourceId: string | null;
  resourceName: string | null;
  uploadDate: string | null;
  version: string | null;
}

interface ResourceState {
  selectedResourceData: ResourceData;
  selectedResourceCategoryId: string | "";
  selectedResourceId: string | "";
}

const initialState: ResourceState = {
  selectedResourceData: {
    authorName: null,
    categoryId: null,
    categoryName: null,
    files: [],
    resourceId: null,
    resourceName: null,
    uploadDate: null,
    version: null,
  },
  selectedResourceCategoryId: "",
  selectedResourceId: "",
};

export const resourceInfoSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setResourceInfo: (state, action: PayloadAction<Partial<ResourceState>>) => {
      const {
        selectedResourceData,
        selectedResourceCategoryId,
        selectedResourceId,
      } = action.payload;

      state.selectedResourceData =
        selectedResourceData ?? state.selectedResourceData;
      state.selectedResourceCategoryId =
        selectedResourceCategoryId ?? state.selectedResourceCategoryId;
      state.selectedResourceId = selectedResourceId ?? state.selectedResourceId;
    },
    clearResourceInfo: (state) => {
      state.selectedResourceData = {
        authorName: null,
        categoryId: null,
        categoryName: null,
        files: [],
        resourceId: null,
        resourceName: null,
        uploadDate: null,
        version: null,
      };
      state.selectedResourceCategoryId = "";
      state.selectedResourceId = "";
    },
  },
});

export const { setResourceInfo, clearResourceInfo } = resourceInfoSlice.actions;

export default resourceInfoSlice.reducer;
