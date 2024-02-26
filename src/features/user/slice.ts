import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  name: string;
  id: string;
}

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  uid: string | null;
  token: string | null;
  isInitialUser: boolean | null;
  categoryIds: Category[];
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  uid: null,
  token: null,
  isInitialUser: null,
  categoryIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const { id, email, name, uid, token, isInitialUser, categoryIds } =
        action.payload;

      state.id = id ?? state.id;
      state.email = email ?? state.email;
      state.name = name ?? state.name;
      state.uid = uid ?? state.uid;
      state.token = token ?? state.token;
      state.isInitialUser = isInitialUser ?? state.isInitialUser;
      state.categoryIds = categoryIds ?? state.categoryIds;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.uid = null;
      state.token = null;
      state.isInitialUser = null;
      state.categoryIds = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
